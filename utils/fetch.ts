import type { ApiErrorResponse, ApiSuccessResponse } from 'globals';

export async function fetchApi<Response extends ApiSuccessResponse>(
	uri: string,
	options?: RequestInit,
) {
	const res = await fetch(`/api${uri}`, options);
	const json = await res.json();
	if (!res.ok) {
		throw new Error((json as ApiErrorResponse).message);
	}
	return json as Response;
}
