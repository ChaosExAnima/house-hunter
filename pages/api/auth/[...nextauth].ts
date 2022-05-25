import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

import makeTheme from 'config/theme';
import getSecret from 'utils/get-secret';

const validEmails = getSecret('VALID_EMAILS')
	.split(',')
	.map((emails) => emails.trim());

const theme = makeTheme();

export default NextAuth({
	providers: [
		GoogleProvider({
			clientId: getSecret('GOOGLE_CLIENT_ID'),
			clientSecret: getSecret('GOOGLE_CLIENT_SECRET'),
		}),
	],
	callbacks: {
		signIn({ account, profile }) {
			if (account.provider === 'google' && !!profile.email_verified) {
				if (validEmails.includes(profile.email!)) {
					return true;
				}
				console.warn(
					`Unknown email tried logging in: ${profile.email}`,
					profile,
				);
			}
			return false;
		},
	},
	theme: {
		colorScheme: theme.palette.mode,
		brandColor: theme.palette.primary.main,
	},
});
