import { MINUTE_IN_SECONDS } from 'config/constants';
import redis, { cachePrefix } from 'config/redis';

import Data from './data';

export default abstract class CachedData extends Data {
	private redis;
	protected readonly prefix = this.constructor.name.toLowerCase();

	public constructor(protected readonly useCache = true) {
		super();
		this.redis = redis;
	}

	protected async getCache<Output = Record<string, unknown>>(
		key: string,
	): Promise<Output | null> {
		if (!this.useCache) {
			return null;
		}
		return this.redis.get(this.cacheKey(key));
	}

	protected async setCache<Value = any>(
		key: string,
		value: Value,
		ttl = MINUTE_IN_SECONDS * 15,
	): Promise<Value | null> {
		return this.redis.set(this.cacheKey(key), value, {
			ex: ttl,
		});
	}

	protected async clearCache(key: string) {
		await this.redis.del(this.cacheKey(key));
	}

	private cacheKey(key: string) {
		return `${cachePrefix}:${this.prefix}:${key}`;
	}
}
