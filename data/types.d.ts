import { GoogleSpreadsheetRow } from 'google-spreadsheet';

type ListingStatus = 'active' | 'gone' | 'veto';

interface SheetListing extends GoogleSpreadsheetRow {
	Link?: string;
	'Second link'?: string;
	Address?: string;
	Price?: string;
	'Agent / Has Fee'?: string;
	'Person In Contact'?: string;
}

interface RowListing {
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

interface Listing extends RowListing {
	address: string;
	price: number;
	neighborhood: string;
	bedrooms?: number;
	bathrooms?: number;
	sqfeet?: number;
}

type JobState = 'queued' | 'working' | 'complete' | 'error';

interface Job {
	id: string;
	type: string;
	created: number; // Timestamp.
	state: JobState;
	error?: Error;
}

interface RemoteJob extends Job {
	target: string;
}

interface StreetEasyJob extends RemoteJob {
	type: 'streeteasy';
}
