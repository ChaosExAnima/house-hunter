import { AlertProps } from '@mui/material';

export interface ErrorDisplayProps extends AlertProps {
	error?: unknown;
	prefix?: string;
}
