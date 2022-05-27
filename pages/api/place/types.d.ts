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

export interface PlaceReviewCount extends ApiSuccessResponse {
	count: number;
}

export interface PlaceNew extends ApiSuccessResponse {
	address: string;
}
