import { createHash } from 'crypto';
import {
	GoogleSpreadsheet,
	GoogleSpreadsheetWorksheet,
} from 'google-spreadsheet';
import mem from 'mem';

import getSecret from 'utils/get-secret';
import { slugify } from 'utils/text';

import type { SheetListing, RowListing } from './types';

export default class SheetData {
	private doc = new GoogleSpreadsheet(getSecret('GOOGLE_SHEET_ID'));
	private initialized = false;
	private sheet?: GoogleSpreadsheetWorksheet;
	private rows: SheetListing[] = [];
	private breakRow: number = 0;

	private listings: RowListing[] = [];

	private readonly SHEET_INDEX = 0;
	private readonly HEADER_ROW = 2;
	private readonly ROW_BREAK_TEXT = 'nixed';

	public async init() {
		if (this.initialized) {
			return this;
		}
		const key = getSecret('GOOGLE_SERVICE_KEY');
		await this.doc.useServiceAccountAuth({
			client_email: getSecret('GOOGLE_SERVICE_EMAIL'),
			private_key: key.trim(),
		});

		await this.doc.loadInfo();
		this.sheet = this.doc.sheetsByIndex[this.SHEET_INDEX];

		await this.sheet.loadHeaderRow(this.HEADER_ROW);
		await this.refresh();

		this.initialized = true;
		return this;
	}

	public get activeListings() {
		this.initCheck();
		return this.filteredListings(this.listings);
	}

	public get oldListings() {
		this.initCheck();
		return this.filteredListings(this.listings, false);
	}

	private filteredListings = mem((listings: RowListing[], isActive = true) =>
		listings.filter(({ status }) =>
			isActive ? status === 'active' : status !== 'active',
		),
	);

	public async refresh() {
		this.initCheck();
		this.rows = await this.sheet!.getRows();

		for (const row of this.rows) {
			// Skip blank rows.
			if (!row.Link) {
				continue;
			}

			// Figure out if this is an active listing.
			let active = true;
			if (this.breakRow && this.breakRow < row.rowIndex) {
				active = false;
			}

			// Set the break row if it's not already set.
			if (
				!this.breakRow &&
				row.Link.toLowerCase() === this.ROW_BREAK_TEXT
			) {
				this.breakRow = row.rowIndex;
			}
			try {
				const listing = this.rowToListing(row, active);
				this.listings.push(listing);
			} catch (err) {
				console.warn('Sheet refresh error:', err);
			}
		}
		return this;
	}

	protected rowToListing(row: SheetListing, active: boolean): RowListing {
		const id = row.Link ?? row['Second link'] ?? row.Address;
		if (!id) {
			throw new Error(`Could not parse row: ${JSON.stringify(row)}`);
		}
		return {
			id: createHash('sha256').update(id).digest('base64'),
			address: row.Address?.trim(),
			slug: slugify((row.Address ?? id).trim()),
			status: active ? 'active' : 'veto',
			links: [row.Link, row['Second link']].filter(Boolean) as string[],
			price: row.Price ?? 0,
			contact: row['Person In Contact'],
		};
	}

	protected initCheck() {
		if (!this.initialized) {
			throw new Error('Sheet not initialized');
		}
	}
}
