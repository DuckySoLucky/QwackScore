import { fetchSchedules } from '@/API/src/routes/schedules';
import { fetchStandings } from '@/API/src/routes/standings';
import { fetchStats } from '@/API/src/routes/stats';
import { fetchLigeDataResponse, fetchUtakmicaDataResponse } from '@/API/types';
import { fetchSeason } from './routes/competition';
import { fetchTimeline } from './routes/timeline';
import { fetchLineup } from './routes/lineup';
import { fetchSummary } from './routes/summary';

export const fetchLigeData = async (id: string, options = { useLocalAPI: false }): Promise<fetchLigeDataResponse> => {
  if (options.useLocalAPI) {
    const seasonData = await fetchSeason(id, options);
    if (!seasonData?.id) {
      throw new Error(`Couldn't find the selected competition with id: ${id}`);
    }

    const schedulesData = await fetchSchedules(seasonData.id, options);
    const statsData = await fetchStats(seasonData.id, options);
    const standingsData = await fetchStandings(seasonData.id, options);

    return { seasonData, schedulesData, statsData, standingsData };
  }

  console.log('balls');
  return null;
};

export const fetchUtakmicaData = async (
  id: string,
  options = { useLocalAPI: false }
): Promise<fetchUtakmicaDataResponse> => {
  if (options.useLocalAPI) {
    const timelineData = await fetchTimeline(id, options);
    if (!timelineData) {
      throw new Error(`Couldn't find the selected match with id: ${id}`);
    }

    const lineupData = await fetchLineup(id, options);
    const summaryData = await fetchSummary(id, options);
    const schedulesData = await fetchSchedules(timelineData.season.id, options);
    const standingsData = await fetchStandings(timelineData.season.id, options);

    return { timelineData, schedulesData, lineupData, standingsData, summaryData };
  }

  return null;
};
