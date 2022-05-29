import { ParsedUrlQuery } from 'querystring';

export interface PlaceDetailsProps {
	id: string;
}

export interface PlaceDetailsContext extends ParsedUrlQuery {
	address: string;
}
