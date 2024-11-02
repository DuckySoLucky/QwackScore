import { CompetitionsResponse } from '@/API/types/competitions';
import { fetchJson } from '@/API/src/handler';
import { config } from '@/API/config';
import { formatCompetitions } from '../processing/competitions';
import { broadcastMessage } from '@/API/log';
import { CONFIG } from '@/API/storage';

export const fetchCompetitions = async (options = { useLocalAPI: false }): Promise<CompetitionsResponse | null> => {
  try {
    broadcastMessage(`fetchCompetitions() called.`, 'api');
    const timeNow = Date.now();
    if (options.useLocalAPI) {
      const competitionsData = (await fetchJson(`${config.localAPI}/competitions`)) as CompetitionsResponse;
      if (!competitionsData) {
        throw new Error(`Couldn't find competitions`);
      }

      broadcastMessage(`fetchCompetitions() returned. (${Date.now() - timeNow}ms)`, 'api');
      return competitionsData;
    }

    const url = `https://api.sportradar.com/soccer-extended/trial/v4/${CONFIG.getCached('language')}/competitions?api_key=${config.sportRadarAPIKey}`;
    const response = await fetchJson(url);

    broadcastMessage(`fetchCompetitions() returned. (${Date.now() - timeNow}ms)`, 'api');
    return formatCompetitions(response) as CompetitionsResponse;
  } catch (error) {
    console.error(error);
    return null;
  }
};
