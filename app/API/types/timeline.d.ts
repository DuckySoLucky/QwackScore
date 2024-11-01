export type TimelineResponse = {
  season: {
    id: string;
  };
  timeline: TimelineResponseTimeline[];
  information: TimelineResponseInformation;
  commentary: Commentary[];
  scores: Record<'away' | 'home', TimelineResponseScoreData[]>;
} | null;

export type TimelineResponseTimeline = {
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

export type TimelineResponseInformation = {
  status?: string;
  dateTop?: string;
  timeTop?: string;
  date?: string;
  stadium?: string;
  location?: string;
  capacity?: number;
  attendance?: number;
  referee?: TimelineResponseInformationReferee[];
  weather?: string;
  round?: number;
};

export type TimelineResponseCommentary = {
  time: string;
  position: string;
  message: string;
};

export type TimelineResponseInformationReferee = {
  id: string;
  name: string;
  nationality: string;
  country_code: string;
  type: string;
};

export type TimelineResponseScoreData = {
  name: string;
  time: string;
  message: string;
};
