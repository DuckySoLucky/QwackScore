import { CompetitionResponse } from '@/API/types/competition';
import { fetchJson } from '@/API/src/handler';
import { config } from '@/API/config';
import { broadcastMessage } from '@/API/log';
import { CONFIG } from '@/API/storage';

export const fetchSeason = async (
  id: string,
  options = { useLocalAPI: false },
): Promise<CompetitionResponse | null> => {
  try {
    broadcastMessage(`fetchSeason(${id}) called.`, 'api');
    const timeNow = Date.now();

    if (options.useLocalAPI) {
      const seasonData = (await fetchJson(`${config.localAPI}/competition/${id}`)) as CompetitionResponse;
      if (!seasonData?.id) {
        throw new Error(`Couldn't find the season with id: ${id}`);
      }

      broadcastMessage(`fetchSeason(${id}) returned. (${Date.now() - timeNow}ms)`, 'api');
      return seasonData;
    }

    const url = `https://api.sportradar.com/soccer/trial/v4/${CONFIG.getCached('language')}/competitions/${id}/seasons.json?api_key=${config.sportRadarAPIKey}`;
    const response = await fetchJson(url);

    broadcastMessage(`fetchSeason(${id}) returned. (${Date.now() - timeNow}ms)`, 'api');
    return response.seasons.at(-1) as CompetitionResponse;
  } catch (error) {
    console.error(error);
    return null;
  }
};
