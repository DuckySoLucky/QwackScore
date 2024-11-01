export type SeasonsResponse = {
  seasons: SeasonsResponseSeason[];
};

export type SeasonsResponseSeason = {
  id: string;
  name: string;
  start_date: string;
  end_date: string;
  year: string;
  competition_id: string;
};
