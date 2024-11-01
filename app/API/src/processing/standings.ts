// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

export function formatStandings(standing, formStanding) {
  const output = [];
  for (const team of standing.groups[0].standings) {
    if (!formStanding.groups) {
      continue;
    }

    output.push({
      id: team.competitor.id,
      name: team.competitor.name,
      image: 'https://i.imgur.com/nDDfr5c.png',
      played: team.played,
      goals_diff: team.goals_diff,
      points: team.points,
      position: standing.groups[0].standings.indexOf(team) + 1,
      form: (
        formStanding.groups[0].form_standings[standing.groups[0].standings.indexOf(team)] ??
        formStanding.groups[0].form_standings.at(-1)
      ).form
        .split('')
        .reverse()
        .slice(1)
        .join(''),
    });
  }

  return output;
}
