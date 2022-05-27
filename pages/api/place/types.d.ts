import { NextApiResponse } from 'next';

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
	places: [];
}

export interface PlaceDetail extends ApiSuccessResponse {
	place: {
		address: string;
	};
}

export interface PlaceNew extends ApiSuccessResponse {
	address: string;
}
