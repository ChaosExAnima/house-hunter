import { Breakpoint } from '@mui/material';

interface PageProps {
	maxWidth?: Breakpoint;
	children: ReactNode;
	margin?: boolean;
	paper?: boolean;
}
