import Data from './data';
import SheetData from './sheets';

import type { Listing, RowListing } from './types';

export default class ScrapedData extends Data {
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
		this.activeListings = this.sheets.activeListings.map(this.rowToListing);
		this.oldListings = this.sheets.oldListings.map(this.rowToListing);
		return this;
	}

	private rowToListing(row: RowListing): Listing {
		return {
			address: '',
			price: 0,
			neighborhood: 'NYC',
			...row,
		};
	}
}
