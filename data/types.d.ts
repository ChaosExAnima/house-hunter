import { GoogleSpreadsheetRow } from 'google-spreadsheet';

export type ListingStatus = 'active' | 'gone' | 'veto';

export interface SheetListing extends GoogleSpreadsheetRow {
	Link?: string;
	'Second link'?: string;
	Address?: string;
	Price?: number;
	'Agent / Has Fee'?: string;
	'Person In Contact'?: string;
}

export interface RowListing {
	id: string;
	row: number;
	slug: string;
	status: ListingStatus;
	links: string[];
	address?: string;
	price?: number;
	neighborhood?: string;
	contact?: string;
	comments: Record<string, string[]>;
	ratings: Record<string, number>;
	images: Image[];
	agent?: string;
	fee?: number;
}

export interface Listing extends RowListing {
	address: string;
	price: number;
	neighborhood: string;
	bedrooms?: number;
	bathrooms?: number;
	sqfeet?: number;
}
