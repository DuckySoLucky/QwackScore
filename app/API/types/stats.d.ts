export type StatsResponse = {
  players: {
    [key: string]: StatsResponseStatsPlayer[] | null;
  };
  teams: {
    [key: string]: StatsResponseStatsTeam[] | null;
  };
} | null;

export type StatsResponseStatsPlayer = {
  id: string;
  name: string;
  team: string;
  clubImage: string;
  clubName: string;
  amount: number;
  position: number;
};

export type StatsResponseStatsTeam = {
  id: string;
  name: string;
  image: string;
  amount: number;
  position: number;
};
