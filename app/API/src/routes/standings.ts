import { StandignsResponse } from '@/API/types/standings';
import { fetchJson } from '@/API/src/handler';
import { config } from '@/API/config';
import { formatStandings } from '../processing/standings';

export const fetchStandings = async (
  id: string,
  options = { useLocalAPI: false },
): Promise<StandignsResponse | null> => {
  try {
    if (options.useLocalAPI) {
      const standingsData = (await fetchJson(`${config.localAPI}/standings/${id}`)) as StandignsResponse;
      if (!standingsData?.length) {
        throw new Error(`Couldn't find the standings with id: ${id}`);
      }

      return standingsData;
    }

    const standingsUrl = `https://api.sportradar.com/soccer/trial/v4/en/seasons/${id}/standings.json?api_key=${config.sportRadarAPIKey}`;
    const formStandingsUrl = `https://api.sportradar.com/soccer/trial/v4/en/seasons/${id}/form_standings.json?api_key=${config.sportRadarAPIKey}`;
    const response = await fetchJson(standingsUrl);
    const formResponse = await fetchJson(formStandingsUrl);

    return formatStandings(response.standings[0], formResponse.season_form_standings[0]);
  } catch (error) {
    console.error(error);
    return null;
  }
};
