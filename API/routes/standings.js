import { wrap } from "../src/helper.js";
import { getFormStandings, getStandings } from "../src/lib.js";

export default wrap(async function (req, res) {
    const seasonId = req.params.seasonId;
    if (!seasonId || !seasonId.match(/^sr:season:\d+$/)) {
        return res.status(400).json({ error: "Invalid seasonId" });
    }

    const standing = (await getStandings(seasonId))[0];
    const formStanding = (await getFormStandings(seasonId))[0];
    if (!standing || !formStanding) {
        console.log(standing, formStanding);
        return res.status(404).json({ error: "Standings not found" });
    }

    const output = [];
    for (const team of standing.groups[0].standings) {
        if (!formStanding.groups) {
            continue;
        }

        output.push({
            id: team.competitor.id,
            name: team.competitor.name,
            image: "https://i.imgur.com/nDDfr5c.png",
            played: team.played,
            goals_diff: team.goals_diff,
            points: team.points,
            position: standing.groups[0].standings.indexOf(team) + 1,
            form: formStanding.groups[0].form_standings[standing.groups[0].standings.indexOf(team)].form.split("").reverse().slice(1).join(""),
        });
    }

    console.log(output);

    return res.status(200).json({ data: output });
});
