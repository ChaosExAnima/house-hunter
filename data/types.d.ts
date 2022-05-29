import { GoogleSpreadsheetRow } from 'google-spreadsheet';

export interface Person {
	name: string;
}

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
	address?: string;
	slug: string;
	status: ListingStatus;
	links: string[];
	price?: number;
	neighborhood?: string;
	contact?: string;
}

export interface Listing extends RowListing {
	address: string;
	price: number;
	bedrooms?: number;
	bathrooms?: number;
	sqfeet?: number;
	neighborhood: string;
	images: Image[];
	agent?: string;
	fee?: number;
	contact?: Person;
	comments: Record<string, string[]>;
	ratings: Record<string, number>;
}
