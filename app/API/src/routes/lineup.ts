import { LineupResponse } from '@/API/types/lineup';
import { fetchJson } from '@/API/src/handler';
import { config } from '@/API/config';
import { formatLineup } from '../processing/lineup';
import { broadcastMessage } from '@/API/log';
import { CONFIG } from '@/API/storage';

export const fetchLineup = async (id: string, options = { useLocalAPI: false }): Promise<LineupResponse | null> => {
  try {
    broadcastMessage(`fetchLineup(${id}) called.`, 'api');
    const timeNow = Date.now();

    if (options.useLocalAPI) {
      const seasonData = (await fetchJson(`${config.localAPI}/lineup/${id}`)) as LineupResponse;
      if (!seasonData?.away || !seasonData?.home) {
        throw new Error(`Couldn't find the lineup with id: ${id}`);
      }

      broadcastMessage(`fetchLineup(${id}) returned. (${Date.now() - timeNow}ms)`, 'api');
      return seasonData;
    }

    const url = `https://api.sportradar.com/soccer/trial/v4/${CONFIG.getCached('language')}/sport_events/${id}/lineups.json?api_key=${config.sportRadarAPIKey}`;
    const repsonse = await fetchJson(url);

    broadcastMessage(`fetchLineup(${id}) returned. (${Date.now() - timeNow}ms)`, 'api');
    return formatLineup(repsonse);
  } catch (error) {
    console.error(error);
    return null;
  }
};
