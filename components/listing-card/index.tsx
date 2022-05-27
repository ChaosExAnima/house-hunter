import {
	Card,
	CardActionArea,
	CardContent,
	CardMedia,
	Chip,
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
	const imageSrc = listing.images.at(0);
	return (
		<Card>
			<CardActionArea onClick={onClick}>
				<CardMedia sx={{ height: height === 'normal' ? 300 : 150 }}>
					<div className={styles.mediaWrapper}>
						<Chip
							label="New"
							color="primary"
							className={styles.chip}
							size="small"
							clickable
						/>
						<Image
							src={imageSrc || defaultImage}
							layout="fill"
							objectFit="cover"
							alt={`Image of ${listing.address}`}
							sizes={size}
							className={classNames({
								[styles.defaultImage]: !imageSrc,
							})}
						/>
					</div>
				</CardMedia>
				<CardContent>
					<Typography variant="h5" gutterBottom component="p">
						{listing.address}
					</Typography>
					<Typography variant="body2" color="text.secondary">
						{currency(listing.price)}
						&nbsp;-&nbsp;
						{listing.neighborhood}
					</Typography>
				</CardContent>
			</CardActionArea>
		</Card>
	);
}
