import { CacheProvider, EmotionCache } from '@emotion/react';
import {
	Box,
	CssBaseline,
	ThemeProvider,
	StyledEngineProvider,
} from '@mui/material';
import { SessionProvider } from 'next-auth/react';
import Head from 'next/head';
import { useMemo } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

import CommandButtons from 'components/command-buttons';
import { PaletteProvider, usePalette } from 'components/palette';
import createEmotionCache from 'config/emotion-cache';
import makeTheme from 'config/theme';
import faviconSvg from 'utils/favicon';

import type { Session } from 'next-auth';
import type { AppProps } from 'next/app';

interface AppPageProps {
	title?: string[];
	session?: Session;
	[key: string]: any;
}

const clientSideEmotionCache = createEmotionCache();
const queryClient = new QueryClient();

function App(props: AppProps & { emotionCache?: EmotionCache }) {
	const {
		Component: PageComponent,
		pageProps: appPageProps,
		emotionCache = clientSideEmotionCache,
	} = props;
	const { title = [], session, ...pageProps } = appPageProps as AppPageProps;

	// Update the theme only if the mode changes
	const { palette, ...commands } = usePalette();
	const theme = useMemo(() => makeTheme(palette), [palette]);

	const titleParts: string[] = [...title, 'House Hunter 🏹'];

	return (
		<CacheProvider value={emotionCache}>
			<Head>
				<title>{titleParts.join(' » ')}</title>
				<meta
					name="viewport"
					content="minimum-scale=1, initial-scale=1, width=device-width"
				/>
				<link rel="icon" href={`data:image/svg+xml,${faviconSvg()}`} />
				<meta name="theme-color" content={theme.palette.primary.main} />
			</Head>
			<StyledEngineProvider injectFirst>
				<PaletteProvider value={{ palette, ...commands }}>
					<ThemeProvider theme={theme}>
						<SessionProvider session={session}>
							<QueryClientProvider client={queryClient}>
								<CssBaseline />
								<Box
									sx={{
										display: 'flex',
										flexDirection: 'column',
										minHeight: '100vh',
									}}
								>
									<PageComponent {...pageProps} />
									<CommandButtons />
								</Box>
								<ReactQueryDevtools
									initialIsOpen={false}
									position="bottom-right"
								/>
							</QueryClientProvider>
						</SessionProvider>
					</ThemeProvider>
				</PaletteProvider>
			</StyledEngineProvider>
		</CacheProvider>
	);
}

export default App;
