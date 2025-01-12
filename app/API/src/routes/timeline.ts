import { TimelineResponse } from '@/API/types/timeline';
import { fetchJson } from '@/API/src/handler';
import { config } from '@/API/config';
import { formatTimeline } from '../processing/timeline';
import { broadcastMessage } from '@/API/log';
import { CONFIG } from '@/API/storage';
import * as MOCKUP from '../mock/index';

export const fetchTimeline = async (
  id: string,
  options = { useLocalAPI: false, useMockupAPI: false },
): Promise<TimelineResponse | null> => {
  try {
    broadcastMessage(`fetchTimeline(${id}) called.`, 'api');
    const timeNow = Date.now();

    if (options.useMockupAPI) {
      return formatTimeline(MOCKUP.TIMELINE) as TimelineResponse;
    }

    if (options.useLocalAPI) {
      const timelineData = (await fetchJson(`${config.localAPI}/timeline/${id}`)) as TimelineResponse;
      if (!timelineData) {
        throw new Error(`Couldn't find the timeline with id: ${id}`);
      }

      broadcastMessage(`fetchTimeline(${id}) returned. (${Date.now() - timeNow}ms)`, 'api');
      return timelineData;
    }

    const url = `https://api.sportradar.com/soccer/trial/v4/${CONFIG.getCached('language')}/sport_events/${id}/timeline.json?api_key=${CONFIG.getCached('sportRadarAPIKey')}`;
    const response = await fetchJson(url);

    broadcastMessage(`fetchTimeline(${id}) returned. (${Date.now() - timeNow}ms)`, 'api');
    return formatTimeline(response) as TimelineResponse;
  } catch (error) {
    console.error(error);
    return null;
  }
};
