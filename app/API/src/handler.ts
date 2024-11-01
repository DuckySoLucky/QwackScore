const cache = new Map();

export const fetchJson = async (url: string) => {
  try {
    if (cache.has(url)) {
      return cache.get(url);
    }

    const response = await fetch(url, {
      headers: {
        accept: 'application/json',
      },
    });
    const data = await response.json();

    const formattedData = data?.data ?? data;

    cache.set(url, formattedData);
    return formattedData;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const clearCache = () => cache.clear();
