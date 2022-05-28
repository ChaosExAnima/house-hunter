import { Redis } from '@upstash/redis';

import getSecret from 'utils/get-secret';

const redis = new Redis({
	url: getSecret('UPSTASH_REDIS_REST_URL'),
	token: getSecret('UPSTASH_REDIS_REST_TOKEN'),
});

export default redis;
