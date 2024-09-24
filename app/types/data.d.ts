export type Response = {
  matches: Competition[];
  schedules: Recprd<number, Competition[]>;
};

export type Competition = {
  id: string;
  startTime: number;
  startTimeFormatted: string;
  round: number;
  status: "not_started" | "closed";
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

export type Schedules = Record<string, Competition[]>;
