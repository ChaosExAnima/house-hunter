import GoogleIcon from '@mui/icons-material/google';
import { Button, Divider, Typography } from '@mui/material';
import { signIn, useSession } from 'next-auth/react';

import ListingList from 'components/listing-list';
import Loader from 'components/loader';
import Logo from 'components/logo';
import Menu from 'components/menu';
import Page from 'components/page';
import { spacing } from 'config/theme';

export default function Home() {
	const { data: session, status } = useSession();
	if (status === 'loading') {
		return (
			<Page paper={false}>
				<Loader />
			</Page>
		);
	}
	const firstName = session && (session.user?.name || '').split(' ')[0];
	return (
		<Page>
			<Logo />
			<Typography variant="h2" textAlign="center" mb={spacing}>
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
			{status === 'authenticated' && (
				<>
					<Divider />
					<Menu />
					<Divider />
					<ListingList height="slim" />
				</>
			)}
		</Page>
	);
}
