export interface Person {
	name: string;
}

export interface Listing {
	id: string;
	address: string;
	active: boolean;
	links: string[];
	neighborhood: string;
	price: number;
	images: string[];
	agent?: string;
	fee?: number;
	contact?: Person;
	comments: Map<Person, string[]>;
	ratings: Map<Person, number>;
}
