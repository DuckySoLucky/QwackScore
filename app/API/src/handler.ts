const cache = new Map();

export const fetchJson = async (url: string) => {
  try {
    if (cache.has(url)) {
      return cache.get(url);
    }

    const response = await fetch(url);
    const data = await response.json();

    cache.set(url, data.data);

    return data.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const clearCache = () => cache.clear();
