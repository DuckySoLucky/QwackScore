import { StatsResponse } from '@/API/types/stats';
import { fetchJson } from '@/API/src/handler';
import { config } from '@/API/config';

export const fetchStats = async (id: string, options = { useLocalAPI: false }): Promise<StatsResponse | null> => {
  try {
    if (options.useLocalAPI) {
      const statsData = (await fetchJson(`${config.localAPI}/stats/${id}`)) as StatsResponse;
      if (!statsData?.players) {
        throw new Error(`Couldn't find the stats with id: ${id}`);
      }

      return statsData;
    }

    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
};
