import { ApiSuccessResponse } from 'globals';

import { Listing } from 'data/types';

export interface PlaceIndex extends ApiSuccessResponse {
	places: Listing[];
}

export interface PlaceDetail extends ApiSuccessResponse {
	place: Listing;
}

export interface PlaceNew extends ApiSuccessResponse {
	address: string;
}
