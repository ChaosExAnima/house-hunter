import { Box, Button, TextField, Typography } from '@mui/material';
import { FormEvent, useCallback, useState } from 'react';

import Loader from 'components/loader';
import Page from 'components/page';
import theme from 'config/theme';

const fieldName = 'placeLink';

const topMargin = theme().spacing(2);

export default function NewPlace() {
	const [loading, setLoading] = useState(false);
	const submit = useCallback(async (event: FormEvent<HTMLFormElement>) => {
		setLoading(true);
		event.preventDefault();
		const formdata = new FormData(event.currentTarget);
		const res = await fetch('/api/place', {
			method: 'post',
			body: formdata.get(fieldName),
		});
		const body = await res.json();
		console.log(body);
	}, []);
	return (
		<Page maxWidth="md">
			<Typography variant="h2">Add a new place</Typography>
			<Loader show={loading} />
			{!loading && (
				<Box onSubmit={submit} component="form" mt={topMargin}>
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
		</Page>
	);
}
