import { SummaryResponse } from '@/API/types/summary';
import { fetchJson } from '@/API/src/handler';
import { config } from '@/API/config';
import { formatSummary } from '../processing/summary';
import { broadcastMessage } from '@/API/log';
import { CONFIG } from '@/API/storage';

export const fetchSummary = async (id: string, options = { useLocalAPI: false }): Promise<SummaryResponse | null> => {
  try {
    broadcastMessage(`fetchSummary(${id}) called.`, 'api');
    const timeNow = Date.now();

    if (options.useLocalAPI) {
      const summaryData = (await fetchJson(`${config.localAPI}/summary/${id}`)) as SummaryResponse;
      if (!summaryData?.length) {
        throw new Error(`Couldn't find the summary with id: ${id}`);
      }

      broadcastMessage(`fetchSummary(${id}) returned. (${Date.now() - timeNow}ms)`, 'api');
      return summaryData;
    }

    const url = `https://api.sportradar.com/soccer/trial/v4/${CONFIG.getCached('language')}/sport_events/${id}/summary.json?api_key=${config.sportRadarAPIKey}`;
    const response = await fetchJson(url);

    broadcastMessage(`fetchSummary(${id}) returned. (${Date.now() - timeNow}ms)`, 'api');
    return formatSummary(response.statistics?.totals?.competitors);
  } catch (error) {
    console.error(error);
    return null;
  }
};
