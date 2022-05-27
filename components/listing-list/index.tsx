import { Skeleton, Stack } from '@mui/material';
import { useQuery } from 'react-query';

import ErrorDisplay from 'components/error-display';
import ListingCard from 'components/listing-card';
import { fetchApi } from 'utils/fetch';

import type { ListingListProps } from './types';
import type { PlaceIndex } from 'pages/api/place/types';

export default function ListingList({ height, limit = 10 }: ListingListProps) {
	const { data, error, status } = useQuery(`/place?limit=${limit}`, () =>
		fetchApi<PlaceIndex>(`/place?limit=${limit}`),
	);
	if (status === 'loading' || status === 'idle') {
		return (
			<Stack spacing={2}>
				{[...Array(limit)].map((_num, index) => (
					<Skeleton key={index} variant="rectangular" height={150} />
				))}
			</Stack>
		);
	}
	if (error) {
		return <ErrorDisplay error={error} />;
	}

	return (
		<Stack spacing={2}>
			{data?.places.map((place) => (
				<ListingCard key={place.id} listing={place} height={height} />
			))}
		</Stack>
	);
}
