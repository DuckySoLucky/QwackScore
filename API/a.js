process.on("uncaughtException", (error) => console.log(error));

import { formatCompetitors } from "./src/helper.js";
import { fetchCompetitions, fetchSeasons, getCompetition, getSeasonSchedules, getSeasons } from "./src/lib.js";

/*
const hnlSeason = seasons.find((season) => season.name === "HNL 23/24");
const hnlCompetition = await getCompetition(hnlSeason.competition_id);
const seasonId = hnlSeason.id;
const competitionId = hnlSeason.competition_id;
const categoryId = hnlCompetition.category.id;
console.log({
  seasonId,
  competitionId,
  categoryId,
});

console.log(seasons);
const HNLLeagueID = "sr:league:57034";*/

const seasons = await getSeasons("2024");

const season = seasons.find((season) => season.name === "HNL 23/24");
console.log(season);
const schedules = await getSeasonSchedules(season.id);

const output = {};
for (const schedule of schedules) {
  const matchData = schedule.sport_event;
  const roundNumber = matchData.sport_event_context.round.number;

  output[roundNumber] ??= [];
  output[roundNumber].push({
    id: matchData.id,
    startTime: new Date(matchData.start_time).getTime(),
    round: roundNumber,
    status: schedule.sport_event_status.status,
    competitors: formatCompetitors(matchData.competitors, schedule.sport_event_status),
  });
}
console.log(output["28"][0]);
