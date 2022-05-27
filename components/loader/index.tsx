import { Box, CircularProgress } from '@mui/material';

import { spacing } from 'config/theme';

import styles from './styles.module.css';

import type { LoaderProps } from './types';

export default function Loader({ show = true, ...props }: LoaderProps) {
	if (!show) {
		return null;
	}
	return (
		<Box sx={{ my: spacing }} {...props} className={styles.wrapper}>
			<CircularProgress size="5em" thickness={2} color="primary" />
		</Box>
	);
}
