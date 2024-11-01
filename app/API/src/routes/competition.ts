import { CompetitionResponse } from '@/API/types/competition';
import { fetchJson } from '@/API/src/handler';
import { config } from '@/API/config';

export const fetchSeason = async (
  id: string,
  options = { useLocalAPI: false }
): Promise<CompetitionResponse | null> => {
  try {
    if (options.useLocalAPI) {
      const seasonData = (await fetchJson(`${config.localAPI}/competition/${id}`)) as CompetitionResponse;
      if (!seasonData?.id) {
        throw new Error(`Couldn't find the season with id: ${id}`);
      }

      return seasonData;
    }

    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
};
