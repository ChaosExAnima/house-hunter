import { ApiSuccessResponse, ApiTokenRequest } from 'globals';

interface JobCreateRequest extends ApiTokenRequest {
	body: {
		type?: string;
	};
}

interface JobCreateResponse extends ApiSuccessResponse {
	id: string;
}
