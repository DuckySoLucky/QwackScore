import { SeasonsResponse } from '@/API/types/seasons';
import { fetchJson } from '@/API/src/handler';
import { config } from '@/API/config';
import { formatSeasons } from '../processing/seasons';
import { broadcastMessage } from '@/API/log';
import { CONFIG } from '@/API/storage';

export const fetchSeasons = async (options = { useLocalAPI: false }): Promise<SeasonsResponse | null> => {
  try {
    broadcastMessage(`fetchSeasons() called.`, 'api');
    const timeNow = Date.now();

    if (options.useLocalAPI) {
      const seasonData = (await fetchJson(`${config.localAPI}/seasons`)) as SeasonsResponse;
      if (!seasonData?.seasons?.length) {
        throw new Error(`Couldn't fetch seasons`);
      }

      broadcastMessage(`fetchSeasons() returned. (${Date.now() - timeNow}ms)`, 'api');
      return seasonData;
    }

    const url = `https://api.sportradar.com/soccer-extended/trial/v4/${CONFIG.getCached('language')}/seasons?api_key=${config.sportRadarAPIKey}`;
    const response = await fetchJson(url);

    broadcastMessage(`fetchSeasons() returned. (${Date.now() - timeNow}ms)`, 'api');
    return formatSeasons(response) as unknown as SeasonsResponse;
  } catch (error) {
    console.error(error);
    return null;
  }
};
