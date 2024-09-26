import { wrap } from "../src/helper.js";
import { getCompetition, getSeasons } from "../src/lib.js";

export default wrap(async function (req, res) {
    const competitionId = req.params.competitionId;
    if (!competitionId || !competitionId.match(/^sr:competition:\d+$/)) {
        return res.status(400).json({ error: "Invalid competitionId" });
    }

    const output = await getCompetition(competitionId);

    return res.status(200).json({
        data: output.seasons.at(-1),
    });
});
