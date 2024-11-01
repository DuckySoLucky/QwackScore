import { TimelineResponse } from '@/API/types/timeline';
import { fetchJson } from '@/API/src/handler';
import { config } from '@/API/config';
import { formatTimeline } from '../processing/timeline';

export const fetchTimeline = async (id: string, options = { useLocalAPI: false }): Promise<TimelineResponse | null> => {
  try {
    if (options.useLocalAPI) {
      const timelineData = (await fetchJson(`${config.localAPI}/timeline/${id}`)) as TimelineResponse;
      if (!timelineData) {
        throw new Error(`Couldn't find the timeline with id: ${id}`);
      }

      return timelineData;
    }

    const url = `https://api.sportradar.com/soccer/trial/v4/en/sport_events/${id}/timeline.json?api_key=${config.sportRadarAPIKey}`;
    const response = await fetchJson(url);

    return formatTimeline(response) as TimelineResponse;
  } catch (error) {
    console.error(error);
    return null;
  }
};
