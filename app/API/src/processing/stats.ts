// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

export function formatStats(playerStats, standing) {
  const output = { players: {}, teams: {} };

  for (const element of playerStats) {
    if (!element.leaders) {
      continue;
    }

    const allPlayers = element.leaders.map((leader) => leader.players).flat();
    output.players[element.type] = allPlayers.map((player) => {
      return {
        id: player.id,
        name: player.name.includes(',')
          ? (player.name.split(',')[1] + ' ' + player.name.split(',')[0]).trim()
          : player.name,
        clubImage: 'https://i.imgur.com/nDDfr5c.png',
        clubName: player.competitors[0].name,
        amount: player.competitors[0].datapoints[0].value,
        position: allPlayers.indexOf(player) + 1,
      };
    });
  }

  const statNames = [
    'points',
    'PTS/G',
    'pobjeda',
    'gubitaka',
    'P/G',
    'razlika_golova',
    'zabijeni_golovi',
    'primljeni_golovi',
    'nerijeseno',
  ];
  const statKey = [
    'points',
    'points_per_game',
    'win',
    'loss',
    '{win}/{loss}',
    'goals_diff',
    'goals_for',
    'goals_against',
    'draw',
  ];

  if (!standing?.groups.length) {
    return res.status(200).json({ data: null });
  }

  for (const statName of statNames) {
    output.teams[statName] = [];
    for (const team of standing.groups[0].standings) {
      const key = statKey[statNames.indexOf(statName)];
      if (!team[key]) {
        continue;
      }

      const amount =
        key === '{win}/{loss}'
          ? (team.win / team.loss).toFixed(1)
          : team[key].toString().includes('.')
          ? team[key].toFixed(1)
          : team[key];

      output.teams[statName].push({
        id: team.competitor.id,
        name: team.competitor.name,
        image: 'https://i.imgur.com/nDDfr5c.png',
        amount: amount,
      });
    }

    output.teams[statName] = output.teams[statName].sort((a, b) => b.position - a.position);
    for (let i = 0; i < output.teams[statName].length; i++) {
      output.teams[statName][i].position = i + 1;
    }
  }

  return output;
}
