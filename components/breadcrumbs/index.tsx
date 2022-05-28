import { NavigateNext as NavigateNextIcon } from '@mui/icons-material';
import { Breadcrumbs as MuiBreadcrumbs, Typography } from '@mui/material';

import Link from 'components/link';
import { spacing } from 'config/theme';

import type { BreadcrumbProps } from './types';

export default function Breadcrumbs({ items, ...props }: BreadcrumbProps) {
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
			{items.map((item) =>
				typeof item === 'string' ? (
					<Typography
						color="text.primary"
						key={item}
						aria-current="page"
					>
						{item}
					</Typography>
				) : (
					<Link
						underline="hover"
						color="inherit"
						key={item.href}
						href={item.href}
					>
						{item.text}
					</Link>
				),
			)}
		</MuiBreadcrumbs>
	);
}
