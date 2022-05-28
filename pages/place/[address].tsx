import {
	KingBed as BedIcon,
	Bathtub as BathIcon,
	AttachMoney as MoneyIcon,
	SquareFoot as SqFootIcon,
} from '@mui/icons-material';
import { Skeleton, Typography } from '@mui/material';
import { useMemo } from 'react';
import { useQuery } from 'react-query';

import Breadcrumbs from 'components/breadcrumbs';
import DetailsList from 'components/details-list';
import ErrorDisplay from 'components/error-display';
import ImagesCarousel from 'components/images-carousel';
import Link from 'components/link';
import Page from 'components/page';
import Price from 'components/price';
import { fetchApi } from 'utils/fetch';
import { currency } from 'utils/text';

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
	const priceSubtext = useMemo(() => {
		const budget = Number.parseInt(
			process.env.NEXT_PUBLIC_BUDGET ?? '5000',
		);
		if (!data) {
			return '';
		}
		const cost = data.place.price;

		if (cost > budget) {
			return `${currency(cost - budget)} over budget`;
		} else if (cost < budget) {
			return `${currency(budget - cost)} under budget`;
		}
		return null;
	}, [data]);
	if (status === 'loading') {
		return <PlaceDetailsSkeleton />;
	}
	if (!data) {
		return <PlaceDetailsLost />;
	}
	const { place } = data;
	return (
		<>
			{place.images.length !== 0 && (
				<ImagesCarousel images={place.images} />
			)}
			<Page maxWidth="md">
				<ErrorDisplay error={error} />
				<Breadcrumbs
					items={[{ href: '/place', text: 'Places' }, place.address]}
				/>
				<Typography variant="h3" component="h1" gutterBottom>
					{place.address}
				</Typography>
				<DetailsList
					items={[
						{
							icon: <MoneyIcon />,
							tooltip: 'Monthy rent',
							text: <Price amount={place.price} noDollar />,
							subtext: priceSubtext,
							force: true,
						},
						{
							icon: <BedIcon />,
							tooltip: 'Bedrooms',
							text: place.bedrooms,
							force: true,
						},
						{
							icon: <BathIcon />,
							tooltip: 'Bathrooms',
							text: place.bathrooms,
							force: true,
						},
						{
							icon: <SqFootIcon />,
							tooltip: 'Square feet',
							text: place.sqfeet,
						},
					]}
				/>
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
		<>
			<Skeleton
				variant="rectangular"
				height={400}
				width={800}
				sx={{ margin: '0 auto' }}
			/>
			<Page maxWidth="md">
				<Typography variant="h3" component="h1">
					<Skeleton />
				</Typography>
			</Page>
		</>
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
