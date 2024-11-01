import { SeasonsResponse } from '@/API/types/seasons';
import { fetchJson } from '@/API/src/handler';
import { config } from '@/API/config';

export const fetchSeasons = async (options = { useLocalAPI: false }): Promise<SeasonsResponse | null> => {
  try {
    if (options.useLocalAPI) {
      const seasonData = (await fetchJson(`${config.localAPI}/seasons`)) as SeasonsResponse;
      if (!seasonData?.seasons?.length) {
        throw new Error(`Couldn't fetch seasons`);
      }

      return seasonData;
    }

    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
};
