import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

import getSecret from 'utils/get-secret';

export default NextAuth({
	providers: [
		GoogleProvider({
			clientId: getSecret('GOOGLE_CLIENT_ID'),
			clientSecret: getSecret('GOOGLE_CLIENT_SECRET'),
		}),
	],
});
