import { Box, Container } from '@mui/material';

import type { PageProps } from './types';

export default function Page({ maxWidth = 'md', children }: PageProps) {
	return (
		<Container
			maxWidth={maxWidth}
			sx={{
				display: 'flex',
				flexDirection: 'column',
				flexGrow: 1,
			}}
			component="main"
		>
			<Box flexGrow="1">{children}</Box>
		</Container>
	);
}
