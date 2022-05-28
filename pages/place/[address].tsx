import { Skeleton, Typography } from '@mui/material';
import { useQuery } from 'react-query';

import Breadcrumbs from 'components/breadcrumbs';
import ErrorDisplay from 'components/error-display';
import ImagesCarousel from 'components/images-carousel';
import Link from 'components/link';
import Page from 'components/page';
import { fetchApi } from 'utils/fetch';

import type { PlaceDetailsProps } from './types';
import type {
	GetStaticPathsResult,
	GetStaticPropsContext,
	GetStaticPropsResult,
	InferGetStaticPropsType,
} from 'next';
import type { PlaceDetail } from 'pages/api/place/types';

export default function PlaceDetails({
	id,
}: InferGetStaticPropsType<typeof getStaticProps>) {
	const { status, data, error } = useQuery(`/place/${id}`, () =>
		fetchApi<PlaceDetail>(`/place/${id}`),
	);
	if (status === 'loading') {
		return <PlaceDetailsSkeleton />;
	}
	if (!data) {
		return <PlaceDetailsLost />;
	}
	const { place } = data;
	return (
		<>
			<ImagesCarousel images={place.images} />
			<Page maxWidth="md">
				<ErrorDisplay error={error} />
				<Breadcrumbs
					items={[{ href: '/place', text: 'Places' }, place.address]}
				/>
				<Typography variant="h3" component="h1">
					{place.address}
				</Typography>
			</Page>
		</>
	);
}

export async function getStaticProps(
	context: GetStaticPropsContext<{ address: string }>,
): Promise<GetStaticPropsResult<PlaceDetailsProps>> {
	if (!context.params?.address) {
		return {
			notFound: true,
		};
	}
	const { address } = context.params;
	if (!address) {
		return {
			notFound: true,
		};
	}
	const { default: listings } = await import('data/listing-fixtures');
	const listing = listings.find(({ slug }) => slug === address);
	if (!listing) {
		return {
			notFound: true,
		};
	}
	return {
		props: {
			id: listing.id,
		},
	};
}

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
	const { default: listings } = await import('data/listing-fixtures');
	return {
		paths: listings.map(({ slug }) => `/place/${slug}`),
		fallback: true,
	};
}

function PlaceDetailsSkeleton() {
	return (
		<Page maxWidth="md">
			<Typography variant="h3" component="h1">
				<Skeleton />
			</Typography>
		</Page>
	);
}

function PlaceDetailsLost() {
	return (
		<Page>
			<Typography variant="h3" component="h1" gutterBottom>
				Are you lost?
			</Typography>
			<Typography>No listing here!</Typography>
			<Typography>
				<Link href="/">Go home</Link>
			</Typography>
		</Page>
	);
}
