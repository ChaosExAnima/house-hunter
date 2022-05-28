import { Close as CloseIcon } from '@mui/icons-material';
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	IconButton,
	Paper,
	Zoom,
} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import Image from 'next/image';
import { forwardRef, useCallback, useEffect, useState } from 'react';
import Carousel from 'react-mui-carousel-artemm';

import styles from './styles.module.css';

import type { ImagesCarouselProps } from './types';

export default function ImagesCarousel({
	images,
	...props
}: ImagesCarouselProps) {
	const [open, setOpen] = useState(false);
	const [currentIndex, setIndex] = useState(0);
	const openOverlay = () => setOpen(true);
	const closeOverlay = () => setOpen(false);

	const changeChild = useCallback(
		(event: KeyboardEvent) => {
			if (!open) {
				return;
			}
			if (event.key === 'ArrowLeft') {
				setIndex((a) => (a - 1 < 0 ? images.length - 1 : a - 1));
			} else if (event.key === 'ArrowRight') {
				setIndex((a) => (a + 1 > images.length - 1 ? 0 : a + 1));
			}
		},
		[images, open],
	);

	useEffect(() => {
		document.addEventListener('keydown', changeChild);

		return function cleanup() {
			document.removeEventListener('keydown', changeChild);
		};
	});

	return (
		<>
			<Carousel
				autoPlay={false}
				height={400}
				animation="slide"
				{...props}
				className={styles.wrapper}
			>
				{images.map(({ src, alt }) => (
					<Paper key={src}>
						<Button className={styles.item} onClick={openOverlay}>
							<Image
								src={src}
								alt={alt ?? 'Image'}
								layout="fill"
							/>
						</Button>
					</Paper>
				))}
			</Carousel>
			<Dialog
				maxWidth="lg"
				fullWidth
				open={open}
				onClose={closeOverlay}
				TransitionComponent={Transition}
			>
				<DialogContent>
					<Carousel
						autoPlay={false}
						height="80vh"
						index={currentIndex}
						animation="slide"
					>
						{images.map(({ src, alt }) => (
							<Image
								src={src}
								alt={alt ?? 'Image'}
								layout="fill"
								key={src}
							/>
						))}
					</Carousel>
				</DialogContent>
				<DialogActions className={styles.dialogActions}>
					<IconButton onClick={closeOverlay} size="large">
						<CloseIcon />
					</IconButton>
				</DialogActions>
			</Dialog>
		</>
	);
}

const Transition = forwardRef(function Transition(
	props: TransitionProps & {
		children: React.ReactElement<any, any>;
	},
	ref: React.Ref<unknown>,
) {
	return <Zoom ref={ref} {...props} />;
});
