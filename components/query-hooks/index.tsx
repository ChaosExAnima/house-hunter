import { useQuery } from 'react-query';

import { fetchApi } from 'utils/fetch';

import type { PlaceIndex } from 'pages/api/place/types';

export function usePlaces({ limit = 5 }: UsePlacesProps) {
	return useQuery(['usePlaces', { limit }], () =>
		fetchApi<PlaceIndex>(`/place?limit=${limit}`),
	);
}
