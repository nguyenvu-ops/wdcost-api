let cache = {};

export function getCache(key) {
  const item = cache[key];
  if (!item) return null;
  if (Date.now() > item.expire) {
    delete cache[key];
    return null;
  }
  return item.value;
}

export function setCache(key, value, ttlSeconds = 600) {
  cache[key] = { value, expire: Date.now() + ttlSeconds * 1000 };
}