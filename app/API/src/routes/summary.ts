import { SummaryResponse } from '@/API/types/summary';
import { fetchJson } from '@/API/src/handler';
import { config } from '@/API/config';
import { formatSummary } from '../processing/summary';

export const fetchSummary = async (id: string, options = { useLocalAPI: false }): Promise<SummaryResponse | null> => {
  try {
    if (options.useLocalAPI) {
      const summaryData = (await fetchJson(`${config.localAPI}/summary/${id}`)) as SummaryResponse;
      if (!summaryData?.length) {
        throw new Error(`Couldn't find the summary with id: ${id}`);
      }

      return summaryData;
    }

    const url = `https://api.sportradar.com/soccer/trial/v4/en/sport_events/${id}/summary.json?api_key=${config.sportRadarAPIKey}`;
    const response = await fetchJson(url);

    return formatSummary(response.statistics?.totals?.competitors);
  } catch (error) {
    console.error(error);
    return null;
  }
};
