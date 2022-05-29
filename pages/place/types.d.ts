import { ParsedUrlQuery } from 'querystring';

import { Listing } from 'data/types';

export interface PlaceDetailsProps {
	id: string;
	place: Listing;
}

export interface PlaceDetailsContext extends ParsedUrlQuery {
	address: string;
}
