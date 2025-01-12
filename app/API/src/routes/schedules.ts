import { formatSchedules } from '../processing/schedules';
import { SchedulesResponse } from '@/API/types/schedules';
import { fetchJson } from '@/API/src/handler';
import { config } from '@/API/config';
import { broadcastMessage } from '@/API/log';
import { CONFIG } from '@/API/storage';
import * as MOCKUP from '../mock/index';

export const fetchSchedules = async (
  id: string,
  options = { useLocalAPI: false, useMockupAPI: false },
): Promise<SchedulesResponse | null> => {
  try {
    broadcastMessage(`fetchSchedules(${id}) called.`, 'api');
    const timeNow = Date.now();
    if (options.useMockupAPI) {
      return formatSchedules(MOCKUP.SCHEDULES) as SchedulesResponse;
    }

    if (options.useLocalAPI) {
      const schedulesData = (await fetchJson(`${config.localAPI}/schedules/${id}`)) as SchedulesResponse;
      if (!schedulesData?.currentRound) {
        throw new Error(`Couldn't find the schedules with id: ${id}`);
      }

      broadcastMessage(`fetchSchedules(${id}) returned. (${Date.now() - timeNow}ms)`, 'api');
      return schedulesData;
    }

    const url = `https://api.sportradar.com/soccer/trial/v4/${CONFIG.getCached('language')}/seasons/${id}/schedules.json?api_key=${CONFIG.getCached('sportRadarAPIKey')}`;
    const response = await fetchJson(url);

    broadcastMessage(`fetchSchedules(${id}) returned. (${Date.now() - timeNow}ms)`, 'api');
    return formatSchedules(response.schedules) as SchedulesResponse;
  } catch (error) {
    console.error(error);
    return null;
  }
};
