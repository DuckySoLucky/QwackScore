import { StatsResponse } from '@/API/types/stats';
import { fetchJson } from '@/API/src/handler';
import { config } from '@/API/config';
import { formatStats } from '../processing/stats';

export const fetchStats = async (id: string, options = { useLocalAPI: false }): Promise<StatsResponse | null> => {
  try {
    if (options.useLocalAPI) {
      const statsData = (await fetchJson(`${config.localAPI}/stats/${id}`)) as StatsResponse;
      if (!statsData?.players) {
        throw new Error(`Couldn't find the stats with id: ${id}`);
      }

      return statsData;
    }

    const standingsUrl = `https://api.sportradar.com/soccer/trial/v4/en/seasons/${id}/standings.json?api_key=${config.sportRadarAPIKey}`;
    const playerStatsUrl = `https://api.sportradar.com/soccer/trial/v4/en/seasons/${id}/leaders.json?api_key=${config.sportRadarAPIKey}`;
    const response = await fetchJson(standingsUrl);
    const playerStatsResponse = await fetchJson(playerStatsUrl);

    return formatStats(playerStatsResponse.lists, response.standings[0]);
  } catch (error) {
    console.error(error);
    return null;
  }
};
