import { TimelineResponse } from '@/API/types/timeline';
import { fetchJson } from '@/API/src/handler';
import { config } from '@/API/config';

export const fetchTimeline = async (id: string, options = { useLocalAPI: false }): Promise<TimelineResponse | null> => {
  try {
    if (options.useLocalAPI) {
      const timelineData = (await fetchJson(`${config.localAPI}/timeline/${id}`)) as TimelineResponse;
      if (!timelineData) {
        throw new Error(`Couldn't find the timeline with id: ${id}`);
      }

      return timelineData;
    }

    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
};
