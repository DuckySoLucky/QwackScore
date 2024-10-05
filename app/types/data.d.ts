export type SchedulesDataResponse = {
  matches: Schedule[];
  schedules: Record<number, Schedule[]>;
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

export type TimelineData = {
  scores: Record<'away' | 'home', ScoreData[]>;
};

export type ScoreData = {
  name: string;
  time: string;
  message: string;
};

export type TimelineDataResponse = {
  timeline: Timeline[];
  information: Record<string, number | string | object | Array>;
  commentary: Commentary[];
};

export type Timeline = {
  type: string;
  time: string;
  position: string;
  message: string;
  player?: string;
  outcome?: string;
  playerIn?: string;
  playerOut?: string;
  assistPlayer: string;
  score: Record<'home' | 'away', number>;
};

export type LineupsDataResponse = Record<'away' | 'home', Lineup>;

export type Lineup = Record<
  'goalkeeper' | 'defenders' | 'midfielders' | 'forwards' | 'coach' | 'substitutions' | 'coach',
  Substitution[]
>;

export type Substitution = {
  name: string;
  type: string;
  jersey_number: number;
  position: string;
  id: string;
};

export type SummaryData = Summary[];

export type Summary = {
  id: string;
  name: string;
  home: number;
  away: number;
  visible: boolean;
};

export type Commentary = {
  time: string;
  position: string;
  message: string;
};
