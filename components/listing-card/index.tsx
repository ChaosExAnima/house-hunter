import {
	Card,
	CardActionArea,
	CardContent,
	CardMedia,
	Chip,
	Divider,
	Rating,
	Stack,
	Typography,
} from '@mui/material';
import classNames from 'classnames';
import Image from 'next/image';
import { useMemo } from 'react';

import theme from 'config/theme';
import { useLink } from 'utils/hooks';
import { currency } from 'utils/text';

import defaultImage from './default.jpg';
import styles from './style.module.css';

import type { ListingCardProps } from './types';

export default function ListingCard({
	listing,
	maxWidth = 'sm',
	height = 'normal',
}: ListingCardProps) {
	const onClick = useLink(`/place/${listing.slug}`);
	const size = useMemo(
		() =>
			theme().breakpoints.values[maxWidth] +
			(theme().breakpoints.unit ?? 'px'),
		[maxWidth],
	);
	const { ratings } = listing;

	const rating = useMemo(() => {
		const values = Object.values(ratings);
		if (!values.length) {
			return null;
		}
		return values.reduce((a, b) => a + b, 0) / values.length;
	}, [ratings]);
	const imageSrc = listing.images.at(0);
	return (
		<Card>
			<CardActionArea onClick={onClick}>
				<CardMedia sx={{ height: height === 'normal' ? 300 : 150 }}>
					<div
						className={classNames({
							[styles.mediaWrapper]: true,
							[styles.defaultImage]: !imageSrc,
						})}
					>
						<Chip
							label="New"
							color="primary"
							className={styles.chip}
							size="small"
							clickable
						/>
						<Image
							src={imageSrc?.src || defaultImage}
							layout="fill"
							objectFit="cover"
							alt={`Image of ${listing.address}`}
							sizes={size}
						/>
					</div>
				</CardMedia>
				<CardContent>
					<Typography variant="h5" gutterBottom component="p">
						{listing.address}
					</Typography>
					<Stack
						direction="row"
						divider={<Divider orientation="vertical" flexItem />}
						spacing={2}
						justifyContent="flex-start"
					>
						<Typography variant="body2" color="text.secondary">
							{currency(listing.price)}
						</Typography>
						<Typography
							variant="body2"
							color="text.secondary"
							flexGrow={1}
						>
							{listing.neighborhood}
						</Typography>
						{rating !== null && (
							<Rating value={rating} precision={0.5} readOnly />
						)}
					</Stack>
				</CardContent>
			</CardActionArea>
		</Card>
	);
}
