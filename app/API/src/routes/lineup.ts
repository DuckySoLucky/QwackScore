import { LineupResponse } from '@/API/types/lineup';
import { fetchJson } from '@/API/src/handler';
import { config } from '@/API/config';
import { formatLineup } from '../processing/lineup';

export const fetchLineup = async (id: string, options = { useLocalAPI: false }): Promise<LineupResponse | null> => {
  try {
    if (options.useLocalAPI) {
      const seasonData = (await fetchJson(`${config.localAPI}/lineup/${id}`)) as LineupResponse;
      if (!seasonData?.away || !seasonData?.home) {
        throw new Error(`Couldn't find the lineup with id: ${id}`);
      }

      return seasonData;
    }

    const url = `https://api.sportradar.com/soccer/trial/v4/en/sport_events/${id}/lineups.json?api_key=${config.sportRadarAPIKey}`;
    const repsonse = await fetchJson(url);

    return formatLineup(repsonse);
  } catch (error) {
    console.error(error);
    return null;
  }
};
