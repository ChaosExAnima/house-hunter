import {
	KingBed as BedIcon,
	Bathtub as BathIcon,
	AttachMoney as MoneyIcon,
	SquareFoot as SqFootIcon,
} from '@mui/icons-material';
import { Alert, Skeleton, Typography } from '@mui/material';
import { useMemo } from 'react';
import { useQuery } from 'react-query';

import Breadcrumbs from 'components/breadcrumbs';
import DetailsList from 'components/details-list';
import ErrorDisplay from 'components/error-display';
import ImagesCarousel from 'components/images-carousel';
import Link from 'components/link';
import LinkList from 'components/link-list';
import { Loading } from 'components/loading-context';
import Page from 'components/page';
import Price from 'components/price';
import ScrapedData from 'data/scraped';
import { Listing } from 'data/types';
import { fetchApi } from 'utils/fetch';
import { useSessionCheck } from 'utils/hooks';
import { currency } from 'utils/text';

import type { PlaceDetailsContext, PlaceDetailsProps } from './types';
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
	const isLoggedIn = useSessionCheck();
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

	const loading = status === 'loading' || !isLoggedIn;

	if (!data && !loading) {
		return <PlaceDetailsLost />;
	}
	const { place } = data ?? {};
	return (
		<Loading value={loading}>
			<ImagesCarousel images={place?.images} />
			<Page maxWidth="md">
				<ErrorDisplay error={error} gutterBottom />
				{!error && place && <Alerts status={place.status} />}
				<Breadcrumbs
					items={[
						{ href: '/place', text: 'Places' },
						place?.address ?? '',
					]}
				/>
				<Typography variant="h3" component="h1" gutterBottom>
					{loading && <Skeleton />}
					{!loading && place?.address}
				</Typography>
				<LinkList links={place?.links ?? []} />
				<DetailsList
					items={[
						{
							icon: <MoneyIcon />,
							tooltip: 'Monthy rent',
							text: (
								<Typography>
									<Price
										amount={place?.price ?? 0}
										noDollar
									/>{' '}
									a month
								</Typography>
							),
							subtext: priceSubtext,
							force: true,
						},
						{
							icon: <BedIcon />,
							tooltip: 'Bedrooms',
							text: place?.bedrooms,
							force: true,
						},
						{
							icon: <BathIcon />,
							tooltip: 'Bathrooms',
							text: place?.bathrooms,
							force: true,
						},
						{
							icon: <SqFootIcon />,
							tooltip: 'Square feet',
							text: place?.sqfeet,
						},
					]}
				/>
			</Page>
		</Loading>
	);
}

export async function getStaticProps(
	context: GetStaticPropsContext<PlaceDetailsContext>,
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
	const data = await new ScrapedData().init();
	const listing = data.getBySlug(address.trim());

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
	const data = await new ScrapedData().init();
	const paths = data.listings.map(({ slug }) => `/place/${slug}`);
	return {
		paths,
		fallback: true,
	};
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

function Alerts({ status }: Pick<Listing, 'status'>) {
	let text = '';
	if (status === 'gone') {
		text = 'This listing is no longer active.';
	} else if (status === 'veto') {
		text = 'The listing has been vetoed.';
	}

	if (text) {
		return (
			<Alert severity="warning" sx={{ mb: '1em' }}>
				{text}
			</Alert>
		);
	}
	return null;
}
