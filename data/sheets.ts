import { createHash } from 'crypto';
import {
	GoogleSpreadsheet,
	GoogleSpreadsheetWorksheet,
} from 'google-spreadsheet';
import mem from 'mem';

import getSecret from 'utils/get-secret';
import { slugify } from 'utils/text';

import CachedData from './cached';

import type { SheetListing, RowListing } from './types';

const getDoc = mem(async () => {
	const doc = new GoogleSpreadsheet(getSecret('GOOGLE_SHEET_ID'));
	doc.useServiceAccountAuth({
		client_email: getSecret('GOOGLE_SERVICE_EMAIL'),
		private_key: getSecret('GOOGLE_SERVICE_KEY').trim(),
	});
	await doc.loadInfo();
	return doc;
});

export default class SheetData extends CachedData {
	private sheet?: GoogleSpreadsheetWorksheet;
	private rows: SheetListing[] = [];
	private breakRow: number = 0;

	protected listings: RowListing[] = [];

	private readonly SHEET_INDEX = 0;
	private readonly HEADER_ROW = 2;
	private readonly ROW_BREAK_TEXT = 'nixed';

	public async init() {
		if (this.initialized) {
			return this;
		}
		const doc = await getDoc();
		this.sheet = doc.sheetsByIndex[this.SHEET_INDEX];
		await this.sheet.loadHeaderRow(this.HEADER_ROW);

		return super.init();
	}

	public get allListings() {
		this.initCheck();
		return this.listings;
	}

	public get activeListings() {
		this.initCheck();
		return this.filteredListings(this.listings);
	}

	public get oldListings() {
		this.initCheck();
		return this.filteredListings(this.listings, false);
	}

	public async refresh() {
		this.initCheck();
		const cachedRows = await this.getCache<RowListing[]>('listings');
		if (cachedRows) {
			console.log(`Loaded ${cachedRows.length} from cache`);
			this.listings = cachedRows;
			return this;
		}
		this.rows = await this.sheet!.getRows();

		for (const row of this.rows) {
			// Skip blank rows.
			if (!row.Link) {
				continue;
			}

			// Set the break row if it's not already set.
			if (
				!this.breakRow &&
				row.Link.toLowerCase() === this.ROW_BREAK_TEXT
			) {
				this.breakRow = row.rowIndex;
				continue;
			}

			// Figure out if this is an active listing.
			let active = true;
			if (this.breakRow < row.rowIndex) {
				active = false;
			}
			try {
				const listing = this.rowToListing(row, active);
				this.listings.push(listing);
			} catch (err) {
				console.warn('Sheet refresh error:', err);
			}
		}
		await this.setCache('listings', this.listings);
		return this;
	}

	private rowToListing(row: SheetListing, active: boolean): RowListing {
		const id = row.Link ?? row['Second link'] ?? row.Address;
		if (!id) {
			throw new Error(`Could not parse row: ${JSON.stringify(row)}`);
		}
		return {
			id: createHash('sha256').update(id).digest('hex'),
			row: row.rowIndex,
			address: row.Address?.trim(),
			slug: slugify((row.Address ?? id).trim()),
			status: active ? 'active' : 'veto',
			links: [row.Link, row['Second link']].filter(Boolean) as string[],
			price: Number.parseFloat(
				row.Price?.replace(/[^0-9\.-]*/g, '') ?? '0',
			),
			contact: row['Person In Contact'],
			comments: {},
			ratings: {},
			images: [],
		};
	}

	private filteredListings = mem((listings: RowListing[], isActive = true) =>
		listings.filter(({ status }) =>
			isActive ? status === 'active' : status !== 'active',
		),
	);
}
