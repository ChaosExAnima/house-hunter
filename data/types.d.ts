export interface Person {
	name: string;
}

export interface Listing {
	id: string;
	address: string;
	slug: string;
	active: boolean;
	links: string[];
	neighborhood: string;
	price: number;
	images: Image[];
	agent?: string;
	fee?: number;
	contact?: Person;
	comments: Record<string, string[]>;
	ratings: Record<string, number>;
}
