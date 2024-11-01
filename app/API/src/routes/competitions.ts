import { CompetitionsResponse } from '@/API/types/competitions';
import { fetchJson } from '@/API/src/handler';
import { config } from '@/API/config';

export const fetchCompetitions = async (options = { useLocalAPI: false }): Promise<CompetitionsResponse | null> => {
  try {
    if (options.useLocalAPI) {
      const competitionsData = (await fetchJson(`${config.localAPI}/competitions`)) as CompetitionsResponse;
      if (!competitionsData) {
        throw new Error(`Couldn't find competitions`);
      }

      return competitionsData;
    }

    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
};
