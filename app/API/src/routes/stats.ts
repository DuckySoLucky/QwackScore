import { StatsResponse } from '@/API/types/stats';
import { fetchJson } from '@/API/src/handler';
import { config } from '@/API/config';
import { formatStats } from '../processing/stats';
import { broadcastMessage } from '@/API/log';
import { CONFIG } from '@/API/storage';

export const fetchStats = async (id: string, options = { useLocalAPI: false }): Promise<StatsResponse | null> => {
  try {
    broadcastMessage(`fetchStats(${id}) called.`, 'api');
    const timeNow = Date.now();

    if (options.useLocalAPI) {
      const statsData = (await fetchJson(`${config.localAPI}/stats/${id}`)) as StatsResponse;
      if (!statsData?.players) {
        throw new Error(`Couldn't find the stats with id: ${id}`);
      }

      broadcastMessage(`fetchStats(${id}) returned. (${Date.now() - timeNow}ms)`, 'api');
      return statsData;
    }

    const standingsUrl = `https://api.sportradar.com/soccer/trial/v4/${CONFIG.getCached('language')}/seasons/${id}/standings.json?api_key=${CONFIG.getCached('sportRadarAPIKey')}`;
    const playerStatsUrl = `https://api.sportradar.com/soccer/trial/v4/${CONFIG.getCached('language')}/seasons/${id}/leaders.json?api_key=${CONFIG.getCached('sportRadarAPIKey')}`;
    const response = await fetchJson(standingsUrl);
    const playerStatsResponse = await fetchJson(playerStatsUrl);

    broadcastMessage(`fetchStats(${id}) returned. (${Date.now() - timeNow}ms)`, 'api');
    return formatStats(playerStatsResponse.lists, response.standings[0]);
  } catch (error) {
    console.error(error);
    return null;
  }
};
