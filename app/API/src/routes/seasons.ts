import { SeasonsResponse } from '@/API/types/seasons';
import { fetchJson } from '@/API/src/handler';
import { config } from '@/API/config';
import { formatSeasons } from '../processing/seasons';

export const fetchSeasons = async (options = { useLocalAPI: false }): Promise<SeasonsResponse | null> => {
  try {
    if (options.useLocalAPI) {
      const seasonData = (await fetchJson(`${config.localAPI}/seasons`)) as SeasonsResponse;
      if (!seasonData?.seasons?.length) {
        throw new Error(`Couldn't fetch seasons`);
      }

      return seasonData;
    }

    const url = `https://api.sportradar.com/soccer-extended/trial/v4/en/seasons?api_key=${config.sportRadarAPIKey}`;
    const response = await fetchJson(url);

    return formatSeasons(response) as unknown as SeasonsResponse;
  } catch (error) {
    console.error(error);
    return null;
  }
};
