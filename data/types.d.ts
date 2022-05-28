export interface Person {
	name: string;
}

export type ListingStatus = 'active' | 'gone' | 'veto';

export interface Listing {
	id: string;
	address: string;
	slug: string;
	status: ListingStatus;
	links: string[];
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
