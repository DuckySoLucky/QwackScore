// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

function getPlayerName(name) {
  return name.includes(',') ? (name.split(',')[1] + ' ' + name.split(',')[0]).trim() : name;
}

function titleCase(str, split = ' ') {
  return str
    .toLowerCase()
    .split(split)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export function formatLineup(lineup) {
  const output = {
    away: {
      goalkeeper: [],
      defenders: [],
      midfielders: [],
      forwards: [],
      substitutions: [],
      coach: [],
    },
    home: {
      goalkeeper: [],
      defenders: [],
      midfielders: [],
      forwards: [],
      substitutions: [],
      coach: [],
    },
  };
  for (const competitor of lineup.lineups?.competitors ?? []) {
    const starterPlayers = competitor.players.filter((player) => player.starter);

    output[competitor.qualifier].goalkeeper = starterPlayers
      .filter((player) => player.type === 'goalkeeper')
      .map((player) => ({
        ...player,
        name: getPlayerName(player.name),
      }));
    output[competitor.qualifier].defenders = starterPlayers
      .filter((player) => player.type === 'defender')
      .map((player) => ({
        ...player,
        name: getPlayerName(player.name),
      }));
    output[competitor.qualifier].midfielders = starterPlayers
      .filter((player) => player.type === 'midfielder')
      .map((player) => ({
        ...player,
        name: getPlayerName(player.name),
      }));
    output[competitor.qualifier].forwards = starterPlayers
      .filter((player) => player.type === 'forward')
      .map((player) => ({
        ...player,
        name: getPlayerName(player.name),
      }));
    output[competitor.qualifier].substitutions = competitor.players
      .filter((player) => !player.starter)
      .sort((a, b) => (b.played ?? 0) - (a.played ?? 0))
      .map((player) => ({
        ...player,
        name: getPlayerName(player.name),
        type: titleCase(player.type),
      }));

    if (competitor.manager) {
      output[competitor.qualifier].coach = [competitor.manager];
      output[competitor.qualifier].coach[0].name = getPlayerName(competitor.manager?.name ?? '');
    }
  }

  return output;
}
