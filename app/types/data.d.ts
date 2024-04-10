export type Response = {
  matches: Competition[];
  schedules: {
    [number]: Competition[];
  };
};

export type Competition = {
  id: string;
  startTime: number;
  startTimeFormatted: string;
  round: number;
  status: string;
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

export type Schedules = {
  [number]: Competition[];
};
