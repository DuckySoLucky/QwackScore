import { CompetitionResponse } from '@/API/types/competition';
import { fetchJson } from '@/API/src/handler';
import { config } from '@/API/config';

export const fetchSeason = async (
  id: string,
  options = { useLocalAPI: false },
): Promise<CompetitionResponse | null> => {
  try {
    if (options.useLocalAPI) {
      const seasonData = (await fetchJson(`${config.localAPI}/competition/${id}`)) as CompetitionResponse;
      if (!seasonData?.id) {
        throw new Error(`Couldn't find the season with id: ${id}`);
      }

      return seasonData;
    }

    const url = `https://api.sportradar.com/soccer/trial/v4/en/competitions/${id}/seasons.json?api_key=${config.sportRadarAPIKey}`;
    const response = await fetchJson(url);

    return response.seasons.at(-1) as CompetitionResponse;
  } catch (error) {
    console.error(error);
    return null;
  }
};
