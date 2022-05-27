import {
	Card,
	CardActionArea,
	CardContent,
	CardMedia,
	Typography,
} from '@mui/material';
import Image from 'next/image';
import { useMemo } from 'react';

import theme from 'config/theme';

import defaultImage from './default.jpg';
import styles from './style.module.css';

import type { ListingCardProps } from './types';

export default function ListingCard({
	listing,
	maxWidth = 'sm',
}: ListingCardProps) {
	const size = useMemo(
		() =>
			theme().breakpoints.values[maxWidth] +
			(theme().breakpoints.unit ?? 'px'),
		[maxWidth],
	);
	const imageSrc = listing.images.at(0);
	return (
		<Card>
			<CardActionArea>
				<CardMedia className={styles.media}>
					<div className={styles.mediaWrapper}>
						<Image
							src={imageSrc || defaultImage}
							layout="fill"
							objectFit="cover"
							alt={`Image of ${listing.address}`}
							sizes={size}
						/>
					</div>
				</CardMedia>
				<CardContent>
					<Typography variant="h5" gutterBottom>
						{listing.address}
					</Typography>
					<Typography variant="body2" color="text.secondary">
						Test text!
					</Typography>
				</CardContent>
			</CardActionArea>
		</Card>
	);
}
