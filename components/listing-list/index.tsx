import { useQuery } from 'react-query';

import ListingCard from 'components/listing-card';
import Loader from 'components/loader';
import { fetchApi } from 'utils/fetch';

import type { PlaceIndex } from 'pages/api/place/types';

export default function ListingList() {
	const { data, error, status } = useQuery('/place', () =>
		fetchApi<PlaceIndex>('/place'),
	);
	if (status === 'loading' || status === 'idle') {
		return <Loader />;
	}
	if (error) {
		console.log(error);
	}

	return (
		<div>
			{data?.places.map((place) => (
				<ListingCard key={place.id} listing={place} />
			))}
		</div>
	);
}
