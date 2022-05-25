import GoogleIcon from '@mui/icons-material/google';
import { Button, CircularProgress, Paper, Typography } from '@mui/material';
import { signIn, useSession } from 'next-auth/react';

import Page from 'components/page';
import { spacing } from 'config/theme';

export default function Home() {
	const { data: session, status } = useSession();
	if (status === 'loading') {
		return (
			<Page>
				<CircularProgress />
			</Page>
		);
	}
	const firstName = session && (session.user?.name || '').split(' ')[0];
	return (
		<Page maxWidth="sm">
			<Paper sx={{ padding: spacing, margin: spacing }}>
				<Typography variant="h2" textAlign="center">
					{status === 'authenticated' &&
						`Welcome, ${firstName || 'Human'}!`}
					{status === 'unauthenticated' && 'Log in:'}
				</Typography>
				{status === 'unauthenticated' && (
					<Button
						onClick={() => signIn()}
						sx={{ margin: `${spacing} auto`, display: 'flex' }}
					>
						Sign in with&nbsp;
						<GoogleIcon />
					</Button>
				)}
			</Paper>
		</Page>
	);
}
