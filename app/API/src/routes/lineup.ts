import { LineupResponse } from '@/API/types/lineup';
import { fetchJson } from '@/API/src/handler';
import { config } from '@/API/config';

export const fetchLineup = async (id: string, options = { useLocalAPI: false }): Promise<LineupResponse | null> => {
  try {
    if (options.useLocalAPI) {
      const seasonData = (await fetchJson(`${config.localAPI}/lineup/${id}`)) as LineupResponse;
      if (!seasonData?.away || !seasonData?.home) {
        throw new Error(`Couldn't find the lineup with id: ${id}`);
      }

      return seasonData;
    }

    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
};
