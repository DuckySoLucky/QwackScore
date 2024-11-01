export type SummaryResponse =
  | {
      id: string;
      name: string;
      home: number;
      away: number;
      visible: boolean;
    }[]
  | null;
