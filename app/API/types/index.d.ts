import { CompetitionResponse } from './competition';
import { SchedulesResponse } from './schedules';
import { StatsResponse } from './stats';
import { StandignsResponse } from './standings';
import { TimelineResponse } from './timeline';
import { SummaryResponse } from './summary';
import { LineupResponse } from './lineup';

export type fetchLigeDataResponse = {
  seasonData: CompetitionResponse | null;
  schedulesData: SchedulesResponse | null;
  statsData: StatsResponse | null;
  standingsData: StandignsResponse | null;
} | null;

export type fetchUtakmicaDataResponse = {
  timelineData: TimelineResponse | null;
  schedulesData: SchedulesResponse | null;
  timelineData: TimelineResponse | null;
  lineupData: LineupResponse | null;
  standingsData: StandignsResponse | null;
  summaryData: SummaryResponse | null;
} | null;
