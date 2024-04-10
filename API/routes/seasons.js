import { formatCompetitors, wrap } from "../src/helper.js";
import { getSeasonSchedules, getSeasons } from "../src/lib.js";
import moment from "moment";

export default wrap(async function (req, res) {
  const seasonsData = await getSeasons("2024");

  const output = {
    seasons: seasonsData,
  };

  output.seasons.sort((a, b) => {
    return parseInt(a.competition_id.split(":").at(-1)) - parseInt(b.competition_id.split(":").at(-1));
  });

  return res.status(200).json({ data: output });
});
