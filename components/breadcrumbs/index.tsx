import { NavigateNext as NavigateNextIcon } from '@mui/icons-material';
import {
	Breadcrumbs as MuiBreadcrumbs,
	Skeleton,
	Typography,
} from '@mui/material';

import Link from 'components/link';
import useLoading from 'components/loading-context';
import { spacing } from 'config/theme';

import type { BreadcrumbProp, BreadcrumbProps } from './types';

export default function Breadcrumbs({ items, ...props }: BreadcrumbProps) {
	const loading = useLoading();
	return (
		<MuiBreadcrumbs
			aria-label="breadcrumbs"
			separator={<NavigateNextIcon fontSize="small" />}
			sx={{ mb: spacing }}
			{...props}
		>
			<Link underline="hover" color="inherit" href="/">
				Home
			</Link>
			{items.map((item) => (
				<Breadcrumb
					key={JSON.stringify(item)}
					item={item}
					loading={loading}
				/>
			))}
		</MuiBreadcrumbs>
	);
}

function Breadcrumb({ item, loading }: BreadcrumbProp) {
	if (!item) {
		return null;
	}
	let child;
	if (loading) {
		child = <Skeleton width={70} />;
	} else if (typeof item === 'string') {
		child = item;
	} else {
		child = (
			<Link
				underline="hover"
				color="inherit"
				key={item.href}
				href={item.href}
			>
				{item.text}
			</Link>
		);
	}

	return (
		<Typography color="text.primary" aria-current="page">
			{child}
		</Typography>
	);
}
