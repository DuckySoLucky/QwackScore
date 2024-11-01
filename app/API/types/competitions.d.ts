export type CompetitionsResponse = {
  [string: string]: CompetitionResponseCompetitor[];
} | null;

export type CompetitionResponseCompetitor = {
  id: string;
  name: string;
  gender: string;
  category: {
    id: string;
    name: string;
    country_code: string;
  };
  image: string;
};
