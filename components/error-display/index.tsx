import { Alert } from '@mui/material';

import type { ErrorDisplayProps } from './types';

export default function ErrorDisplay({
	error,
	severity = 'error',
	prefix = 'Error',
	...props
}: ErrorDisplayProps) {
	if (!error) {
		return null;
	}
	let message = 'Unknown error';
	if (error instanceof Error) {
		message = error.message;
	} else if (typeof error === 'string') {
		message = error;
	}

	return (
		<Alert {...props} severity={severity}>
			{prefix}: {message}
		</Alert>
	);
}
