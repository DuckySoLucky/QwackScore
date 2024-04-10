import { getPlayerName, titleCase, wrap } from "../src/helper.js";
import { getLineup } from "../src/lib.js";

export default wrap(async function (req, res) {
  const sportEventId = req.params.sportEventId;
  if (!sportEventId || !sportEventId.match(/^sr:sport_event:\d+$/)) {
    return res.status(400).json({ error: "Invalid sportEventId" });
  }

  const lineup = await getLineup(sportEventId);

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
      .filter((player) => player.type === "goalkeeper")
      .map((player) => ({
        ...player,
        name: getPlayerName(player.name),
      }));
    output[competitor.qualifier].defenders = starterPlayers
      .filter((player) => player.type === "defender")
      .map((player) => ({
        ...player,
        name: getPlayerName(player.name),
      }));
    output[competitor.qualifier].midfielders = starterPlayers
      .filter((player) => player.type === "midfielder")
      .map((player) => ({
        ...player,
        name: getPlayerName(player.name),
      }));
    output[competitor.qualifier].forwards = starterPlayers
      .filter((player) => player.type === "forward")
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

    output[competitor.qualifier].coach = [competitor.manager];
    output[competitor.qualifier].coach[0].name = getPlayerName(competitor.manager?.name ?? "");
  }

  return res.status(200).json({ data: output });
});
