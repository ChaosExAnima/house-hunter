import { ApiSuccessResponse, ApiTokenRequest } from 'globals';

interface JobCreateRequest extends ApiTokenRequest {
	query: {
		type: 'streeteasy';
		target: string;
		token?: string;
		forceAuth?: 'true';
	};
}

interface JobCreateResponse extends ApiSuccessResponse {
	id: string;
}
