export type SchedulesResponse = {
  currentRound: number;
  matches: SchedulesMatch[];
  firstThreeMatchs: SchedulesMatch[];
  schedules: Record<string, Match[]>;
} | null;

export type SchedulesMatch = {
  id: string;
  startTime: number;
  startTimeFormatted: string;
  round: number;
  status: string;
  competitors: SchedulesCompetitor[];
  winner?: string;
};

export type SchedulesCompetitor = {
  id: string;
  name: string;
  abbreviation: string;
  qualifier: string;
  score?: number;
  image: string;
};
