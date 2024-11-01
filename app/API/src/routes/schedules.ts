import { formatSchedules } from '../processing/schedules';
import { SchedulesResponse } from '@/API/types/schedules';
import { fetchJson } from '@/API/src/handler';
import { config } from '@/API/config';

export const fetchSchedules = async (
  id: string,
  options = { useLocalAPI: false }
): Promise<SchedulesResponse | null> => {
  try {
    if (options.useLocalAPI) {
      const schedulesData = (await fetchJson(`${config.localAPI}/schedules/${id}`)) as SchedulesResponse;
      if (!schedulesData?.currentRound) {
        throw new Error(`Couldn't find the schedules with id: ${id}`);
      }

      return schedulesData;
    }

    const url = `https://api.sportradar.com/soccer/trial/v4/en/seasons/${id}/schedules.json?api_key=${config.sportRadarAPIKey}`;
    const response = await fetchJson(url);

    return formatSchedules(response.schedules) as SchedulesResponse;
  } catch (error) {
    console.error(error);
    return null;
  }
};
