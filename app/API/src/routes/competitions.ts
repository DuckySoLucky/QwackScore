import { CompetitionsResponse } from '@/API/types/competitions';
import { fetchJson } from '@/API/src/handler';
import { config } from '@/API/config';
import { formatCompetitions } from '../processing/competitions';

export const fetchCompetitions = async (options = { useLocalAPI: false }): Promise<CompetitionsResponse | null> => {
  try {
    if (options.useLocalAPI) {
      const competitionsData = (await fetchJson(`${config.localAPI}/competitions`)) as CompetitionsResponse;
      if (!competitionsData) {
        throw new Error(`Couldn't find competitions`);
      }

      return competitionsData;
    }

    const url = `https://api.sportradar.com/soccer-extended/trial/v4/en/competitions?api_key=${config.sportRadarAPIKey}`;
    const response = await fetchJson(url);

    return formatCompetitions(response) as CompetitionsResponse;
  } catch (error) {
    console.error(error);
    return null;
  }
};
