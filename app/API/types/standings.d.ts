export type StandignsResponse =
  | {
      id: string;
      name: string;
      image: string;
      played: number;
      goals_diff: number;
      points: number;
      position: number;
      form: string;
    }[]
  | null;
