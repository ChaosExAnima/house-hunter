import { UpstashRedisAdapter } from '@next-auth/upstash-redis-adapter';
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

import redis from 'config/redis';
import makeTheme from 'config/theme';
import getSecret from 'utils/get-secret';

const validEmails = getSecret('VALID_EMAILS')
	.split(',')
	.map((emails) => emails.trim());

const theme = makeTheme();
const secret = getSecret('NEXTAUTH_SECRET');

export default NextAuth({
	secret,
	adapter: UpstashRedisAdapter(redis, {
		baseKeyPrefix: getSecret('UPSTASH_REDIS_REST_PREFIX') + ':',
	}),
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
					console.log(`User logged in: ${profile.email}`);
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
		colorScheme: 'dark',
		brandColor: theme.palette.primary.main,
		logo: `/bow.svg`,
	},
});
