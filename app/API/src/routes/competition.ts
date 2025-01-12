import { CompetitionResponse } from '@/API/types/competition';
import { fetchJson } from '@/API/src/handler';
import { config } from '@/API/config';
import { broadcastMessage } from '@/API/log';
import { CONFIG } from '@/API/storage';
import * as MOCKUP from '../mock/index';

export const fetchSeason = async (
  id: string,
  options = { useLocalAPI: false, useMockupAPI: false, name: null } as {
    useLocalAPI: boolean;
    useMockupAPI: boolean;
    name: string | null;
  },
): Promise<CompetitionResponse | null> => {
  try {
    broadcastMessage(`fetchSeason(${id}) called.`, 'api');
    const timeNow = Date.now();

    if (options.useMockupAPI) {
      const seasons = MOCKUP.SEASONS;
      return ((options.name
        ? seasons.find((season: CompetitionResponse) => season?.name === options.name)
        : seasons.at(-1)) ?? seasons.at(-1)) as CompetitionResponse;
    }

    if (options.useLocalAPI) {
      const seasonData = (await fetchJson(`${config.localAPI}/competition/${id}`)) as CompetitionResponse;
      if (!seasonData?.id) {
        throw new Error(`Couldn't find the season with id: ${id}`);
      }

      broadcastMessage(`fetchSeason(${id}) returned. (${Date.now() - timeNow}ms)`, 'api');
      return seasonData;
    }

    const url = `https://api.sportradar.com/soccer/trial/v4/${CONFIG.getCached('language')}/competitions/${id}/seasons.json?api_key=${CONFIG.getCached('sportRadarAPIKey')}`;
    const response = await fetchJson(url);

    broadcastMessage(`fetchSeason(${id}) returned. (${Date.now() - timeNow}ms)`, 'api');
    return ((options.name
      ? response.seasons.find((season: CompetitionResponse) => season?.name === options.name)
      : response.seasons.at(-1)) ?? response.seasons.at(-1)) as CompetitionResponse;
  } catch (error) {
    console.error(error);
    return null;
  }
};
