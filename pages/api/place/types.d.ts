import { NextApiResponse } from 'next';

import { Listing } from 'data/types';

export type Method = 'GET' | 'POST' | 'PUT';
export type ApiResponse<Response extends ApiSuccessResponse> = NextApiResponse<
	Response | ApiErrorResponse
>;

interface ApiResponseBase {
	error: boolean;
}

interface ApiSuccessResponse {
	error: false;
}

export interface ApiErrorResponse extends ApiResponseBase {
	error: true;
	message: string;
}

export interface PlaceIndex extends ApiSuccessResponse {
	places: Listing[];
}

export interface PlaceDetail extends ApiSuccessResponse {
	place: Listing;
}

export interface PlaceNew extends ApiSuccessResponse {
	address: string;
}
