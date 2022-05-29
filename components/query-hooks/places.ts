import { ApiSuccessResponse } from 'globals';
import { useMutation, useQuery } from 'react-query';

import { Listing } from 'data/types';
import { fetchApi } from 'utils/fetch';

import type { UsePlacesProps } from './types';
import type { PlaceDetail, PlaceIndex } from 'pages/api/place/types';

export function usePlaces({ limit = 5, places }: UsePlacesProps = {}) {
	return useQuery(
		['usePlaces', { limit }],
		() => fetchApi<PlaceIndex>(`/place?limit=${limit}`),
		{ initialData: places ? { error: false, places } : undefined },
	);
}

export function usePlaceDetails(id: string, place?: Listing) {
	return useQuery(
		['usePlaceDetails', id],
		() => fetchApi<PlaceDetail>(`/place/${id}`),
		{ initialData: place ? { error: false, place } : undefined },
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
