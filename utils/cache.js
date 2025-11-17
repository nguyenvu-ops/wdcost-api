let cache = {};
let cacheExpiry = {};

export function getCache(key) {
  if (!cache[key]) return null;
  if (Date.now() > cacheExpiry[key]) {
    delete cache[key];
    delete cacheExpiry[key];
    return null;
  }
  return cache[key];
}

export function setCache(key, value, ttl = 600000) {
  cache[key] = value;
  cacheExpiry[key] = Date.now() + ttl;
}

export function clearCache(key) {
  delete cache[key];
  delete cacheExpiry[key];
}

export function clearAllCache() {
  cache = {};
  cacheExpiry = {};
}
