import { ApiSuccessResponse } from 'globals';
import { NextApiRequest } from 'next';

import { Listing } from 'data/types';

export interface PlaceIndexRequest extends NextApiRequest {
	query: {
		active?: string;
	};
}
export interface PlaceIndex extends ApiSuccessResponse {
	places: Listing[];
}

export interface PlaceDetailRequest extends NextApiRequest {
	query: {
		id: string;
	};
}
export interface PlaceDetail extends ApiSuccessResponse {
	place: Listing;
}

export interface PlaceNew extends ApiSuccessResponse {
	address: string;
}
