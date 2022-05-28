import { ApiSuccessResponse } from 'globals';
import { useMutation, useQuery } from 'react-query';

import { fetchApi } from 'utils/fetch';

import type { PlaceDetail, PlaceIndex } from 'pages/api/place/types';

export function usePlaces({ limit = 5 }: UsePlacesProps) {
	return useQuery(['usePlaces', { limit }], () =>
		fetchApi<PlaceIndex>(`/place?limit=${limit}`),
	);
}

export function usePlaceDetails(id: number) {
	return useQuery(['usePlaceDetails', id], () =>
		fetchApi<PlaceDetail>(`/place/${id}`),
	);
}

export function usePlaceReviewMutation(id: number, rating: number) {
	return useMutation(['usePlaceReviewMutation', id, rating], () =>
		fetchApi<ApiSuccessResponse>(`/place/${id}/review`, {
			method: 'PUT',
			body: rating.toFixed(2),
		}),
	);
}
