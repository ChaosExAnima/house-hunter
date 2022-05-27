import { Alert, Box, Button, TextField, Typography } from '@mui/material';
import { FormEvent } from 'react';
import { useMutation } from 'react-query';

import Loader from 'components/loader';
import Page from 'components/page';
import theme from 'config/theme';

const fieldName = 'placeLink';

const topMargin = theme().spacing(2);

export default function NewPlace() {
	const { mutate, status, error } = useMutation((url: string) =>
		fetch('/api/place', { method: 'post', body: url }),
	);
	const submit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const formdata = new FormData(event.currentTarget);
		const url = formdata.get(fieldName);
		if (url) {
			mutate(url.toString());
		}
	};

	return (
		<Page maxWidth="md">
			<Typography variant="h2">Add a new place</Typography>
			<Loader show={status === 'loading'} />
			{(status === 'error' || status === 'idle') && (
				<Box onSubmit={submit} component="form" mt={topMargin}>
					{error instanceof Error && (
						<Alert severity="error">Error: {error.message}</Alert>
					)}
					<TextField
						type="url"
						name={fieldName}
						placeholder="Enter the listing url here"
					/>
					<Button
						type="submit"
						color="primary"
						sx={{ mt: topMargin }}
					>
						Submit
					</Button>
				</Box>
			)}
			{status === 'success' && (
				<Box mt={topMargin}>
					<Typography>
						Redirecting you to the new listing&hellip;
					</Typography>
				</Box>
			)}
		</Page>
	);
}
