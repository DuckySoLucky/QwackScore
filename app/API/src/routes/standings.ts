import { StandignsResponse } from '@/API/types/standings';
import { fetchJson } from '@/API/src/handler';
import { config } from '@/API/config';
import { formatStandings } from '../processing/standings';
import { broadcastMessage } from '@/API/log';
import { CONFIG } from '@/API/storage';
import * as MOCKUP from '../mock/index';

export const fetchStandings = async (
  id: string,
  options = { useLocalAPI: false, useMockupAPI: false },
): Promise<StandignsResponse | null> => {
  try {
    broadcastMessage(`fetchStandings(${id}) called.`, 'api');
    const timeNow = Date.now();

    if (options.useMockupAPI) {
      return formatStandings(MOCKUP.STANDINGS[0], MOCKUP.FORM_STANDINGS[0]) as StandignsResponse;
    }

    if (options.useLocalAPI) {
      const standingsData = (await fetchJson(`${config.localAPI}/standings/${id}`)) as StandignsResponse;
      if (!standingsData?.length) {
        throw new Error(`Couldn't find the standings with id: ${id}`);
      }

      broadcastMessage(`fetchStandings(${id}) returned. (${Date.now() - timeNow}ms)`, 'api');
      return standingsData;
    }

    const standingsUrl = `https://api.sportradar.com/soccer/trial/v4/${CONFIG.getCached('language')}/seasons/${id}/standings.json?api_key=${CONFIG.getCached('sportRadarAPIKey')}`;
    const formStandingsUrl = `https://api.sportradar.com/soccer/trial/v4/${CONFIG.getCached('language')}/seasons/${id}/form_standings.json?api_key=${CONFIG.getCached('sportRadarAPIKey')}`;
    const response = await fetchJson(standingsUrl);
    const formResponse = await fetchJson(formStandingsUrl);

    broadcastMessage(`fetchStandings(${id}) returned. (${Date.now() - timeNow}ms)`, 'api');
    return formatStandings(response.standings[0], formResponse.season_form_standings[0]);
  } catch (error) {
    console.error(error);
    return null;
  }
};
