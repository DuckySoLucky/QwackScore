import { SummaryResponse } from '@/API/types/summary';
import { fetchJson } from '@/API/src/handler';
import { config } from '@/API/config';

export const fetchSummary = async (id: string, options = { useLocalAPI: false }): Promise<SummaryResponse | null> => {
  try {
    if (options.useLocalAPI) {
      const summaryData = (await fetchJson(`${config.localAPI}/summary/${id}`)) as SummaryResponse;
      if (!summaryData?.length) {
        throw new Error(`Couldn't find the summary with id: ${id}`);
      }

      return summaryData;
    }

    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
};
