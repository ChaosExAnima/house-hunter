import mem from 'mem';

import Data from './data';
import SheetData from './sheets';

import type { Listing, RowListing } from './types';

export default class ScrapedData extends Data {
	public listings: Listing[] = [];
	public activeListings: Listing[] = [];
	public oldListings: Listing[] = [];

	public constructor(private sheets: SheetData = new SheetData()) {
		super();
	}

	public async init(): Promise<this> {
		await this.sheets.init();
		return super.init();
	}

	public async refresh(): Promise<this> {
		await this.sheets.refresh();
		this.listings = this.sheets.allListings.map(this.rowToListing);
		for (const listing of this.listings) {
			if (listing.status === 'active') {
				this.activeListings.push(listing);
			} else {
				this.oldListings.push(listing);
			}
		}
		return this;
	}

	public get = mem((id: string) => {
		return this.listings.find((listing) => listing.id === id);
	});

	private rowToListing(row: RowListing): Listing {
		return {
			address: '',
			price: 0,
			neighborhood: 'NYC',
			...row,
		};
	}
}
