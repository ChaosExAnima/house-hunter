import NextAuth, { CallbacksOptions } from 'next-auth';
import GoogleProvider, { GoogleProfile } from 'next-auth/providers/google';

import getSecret from 'utils/get-secret';

const validEmails = getSecret('VALID_EMAILS')
	.split(',')
	.map((emails) => emails.trim());

export default NextAuth({
	secret: getSecret('SECRET'),
	providers: [
		GoogleProvider({
			clientId: getSecret('GOOGLE_CLIENT_ID'),
			clientSecret: getSecret('GOOGLE_CLIENT_SECRET'),
		}),
	],
	callbacks: {
		signIn({ account, profile }) {
			if (account.provider === 'google') {
				return (
					!!profile.email_verified &&
					validEmails.includes(profile.email!)
				);
			}
			return false;
		},
	},
});
