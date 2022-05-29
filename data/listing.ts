import mem from 'mem';

import Data from './data';
import SheetData from './sheets';

import type { Listing, RowListing } from './types';

export default class ListingData extends Data {
	public listings: Listing[] = [];
	public activeListings: Listing[] = [];
	public oldListings: Listing[] = [];

	public constructor(
		readonly useCache = true,
		private readonly sheets = new SheetData(useCache),
	) {
		super();
	}

	public async init(): Promise<this> {
		await this.sheets.init();
		return super.init();
	}

	public async refresh(): Promise<this> {
		await this.sheets.refresh();
		this.listings = this.sheets.allListings.map(this.rowToListing);
		for (const rowListing of this.sheets.allListings) {
			const listing = this.rowToListing(rowListing);
			if (listing.address && listing.status === 'active') {
				this.activeListings.push(listing);
			} else if (listing.address) {
				this.oldListings.push(listing);
			}
		}
		return this;
	}

	public readonly get = mem((id: string) =>
		this.listings.find((listing) => listing.id === id),
	);

	public readonly getBySlug = mem((slug: string) =>
		this.listings.find((listing) => listing.slug === slug),
	);

	private rowToListing(row: RowListing): Listing {
		return {
			address: '',
			price: 0,
			neighborhood: 'NYC',
			...row,
		};
	}
}
