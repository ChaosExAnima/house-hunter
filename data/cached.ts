import { MINUTE_IN_SECONDS } from 'config/constants';
import redis, { cachePrefix } from 'config/redis';
import getSecret from 'utils/get-secret';

import Data from './data';

const disableCache = getSecret('DISABLE_CACHE', 'no') === 'yes';

export default abstract class CachedData extends Data {
	private redis;
	private bypassTimes = 0;
	protected readonly prefix = this.constructor.name.toLowerCase();
	protected readonly defaultTtl = MINUTE_IN_SECONDS * 15;

	public constructor(protected readonly useCache = disableCache) {
		super();
		this.redis = redis;
	}

	protected async getCache<Output = Record<string, unknown>>(
		key: string,
	): Promise<Output | null> {
		if (!this.useCache) {
			return null;
		} else if (this.bypassTimes > 0) {
			this.bypassTimes--;
			return null;
		}
		return this.redis.get(this.cacheKey(key));
	}

	protected async setCache<Value = any>(
		key: string,
		value: Value,
		ttl = this.defaultTtl,
	): Promise<Value | null> {
		return this.redis.set(this.cacheKey(key), value, {
			ex: ttl,
		});
	}

	protected async clearCache(key: string) {
		await this.redis.del(this.cacheKey(key));
	}

	protected bypassCache(times = 1) {
		this.bypassTimes += times;
	}

	private cacheKey(key: string) {
		return `${cachePrefix}:${this.prefix}:${key}`;
	}
}
