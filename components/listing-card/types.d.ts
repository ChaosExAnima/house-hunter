import { Breakpoint } from '@mui/material';

import { Listing } from 'data/types';

export type ListingCardHeight = 'slim' | 'normal';

export interface ListingCardProps {
	listing: Listing;
	maxWidth?: Breakpoint;
	height?: ListingCardHeight;
}
