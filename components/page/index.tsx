import { Container, Paper } from '@mui/material';

import { spacing } from 'config/theme';

import type { PageProps } from './types';

export default function Page({
	maxWidth = 'sm',
	children,
	margin = true,
	paper = true,
}: PageProps) {
	return (
		<Container
			maxWidth={maxWidth}
			sx={{
				display: 'flex',
				flexDirection: 'column',
				flexGrow: 1,
				minHeight: '100vh',
				my: margin ? spacing : 0,
			}}
			component="main"
		>
			{paper && (
				<Paper sx={{ padding: spacing, margin: spacing }}>
					{children}
				</Paper>
			)}
			{!paper && children}
		</Container>
	);
}
