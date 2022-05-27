import { ContainerProps } from '@mui/material';

interface PageProps {
	maxWidth?: ContainerProps['maxWidth'];
	children: ReactNode;
	margin?: boolean;
	paper?: boolean;
}
