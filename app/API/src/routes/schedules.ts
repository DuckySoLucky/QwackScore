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

    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
};
