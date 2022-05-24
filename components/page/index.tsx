import { Box, Container } from '@mui/material';
import { ContainerProps } from '@mui/material';
import { ReactNode } from 'react';

interface PageProps {
	maxWidth?: ContainerProps['maxWidth'];
	children: ReactNode;
}

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
