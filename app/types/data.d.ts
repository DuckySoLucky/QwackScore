export type SchedulesDataResponse = {
  matches: Schedule[];
  schedules: Recprd<number, Schedule[]>;
  firstThreeMatchs: Schedule[];
};

export type Schedule = {
  id: string;
  startTime: number;
  startTimeFormatted: string;
  round: number;
  status: 'not_started' | 'closed';
  competitors: {
    id: string;
    name: string;
    abbreviation: string;
    qualifier: string;
    image: string;
    score?: number;
  }[];
  winner?: string;
};

export type Schedules = Record<string, Schedule[]>;

export type StatsDataReponse = {
  players: Record<string, PlayerStat[]>;
  teams: Record<string, TeamStat[]>;
};

export type PlayerStat = {
  id: string;
  name: string;
  clubImage: string;
  clubName: string;
  amount: number;
  position: number;
};

export type TeamStat = {
  id: string;
  name: string;
  image: string;
  amount: number;
  position: number;
};

export type StandingsData = {
  id: string;
  name: string;
  image: string;
  played: number;
  goals_diff: number;
  points: number;
  position: number;
  form: string;
};
