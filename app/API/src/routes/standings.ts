import { StandignsResponse } from '@/API/types/standings';
import { fetchJson } from '@/API/src/handler';
import { config } from '@/API/config';

export const fetchStandings = async (
  id: string,
  options = { useLocalAPI: false }
): Promise<StandignsResponse | null> => {
  try {
    if (options.useLocalAPI) {
      const standingsData = (await fetchJson(`${config.localAPI}/standings/${id}`)) as StandignsResponse;
      if (!standingsData?.length) {
        throw new Error(`Couldn't find the standings with id: ${id}`);
      }

      return standingsData;
    }

    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
};
