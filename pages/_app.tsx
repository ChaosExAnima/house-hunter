import { CacheProvider, EmotionCache } from '@emotion/react';
import {
	Box,
	CssBaseline,
	ThemeProvider,
	StyledEngineProvider,
} from '@mui/material';
import { SessionProvider } from 'next-auth/react';
import Head from 'next/head';

import createEmotionCache from 'config/emotion-cache';
import theme from 'config/theme';

import type { Session } from 'next-auth';
import type { AppProps } from 'next/app';

interface AppPageProps {
	title?: string[];
	session?: Session;
	[key: string]: any;
}

const clientSideEmotionCache = createEmotionCache();

function App(props: AppProps & { emotionCache?: EmotionCache }) {
	const {
		Component: PageComponent,
		pageProps: appPageProps,
		emotionCache = clientSideEmotionCache,
	} = props;
	const { title = [], session, ...pageProps } = appPageProps as AppPageProps;

	const titleParts: string[] = [...title, 'House Hunter 🏹'];

	return (
		<CacheProvider value={emotionCache}>
			<Head>
				<title>{titleParts.join(' » ')}</title>
				<meta
					name="viewport"
					content="minimum-scale=1, initial-scale=1, width=device-width"
				/>
			</Head>
			<StyledEngineProvider injectFirst>
				<ThemeProvider theme={theme}>
					<SessionProvider session={session}>
						<CssBaseline />
						<Box
							sx={{
								display: 'flex',
								flexDirection: 'column',
								minHeight: '100vh',
							}}
						>
							<PageComponent {...pageProps} />
						</Box>
					</SessionProvider>
				</ThemeProvider>
			</StyledEngineProvider>
		</CacheProvider>
	);
}

export default App;
