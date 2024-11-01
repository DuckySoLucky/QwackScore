export type LineupResponse = Record<'away' | 'home', Lineup>;

export type LineupResponseLineup = Record<
  'goalkeeper' | 'defenders' | 'midfielders' | 'forwards' | 'coach' | 'substitutions' | 'coach',
  Substitution[]
>;

export type LineupResponseSubstitution = {
  name: string;
  type: string;
  jersey_number: number;
  position: string;
  id: string;
};
