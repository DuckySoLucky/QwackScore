import { titleCase, wrap } from "../src/helper.js";
import { getSummary } from "../src/lib.js";

export default wrap(async function (req, res) {
    const sportEventId = req.params.sportEventId;
    if (!sportEventId || !sportEventId.match(/^sr:sport_event:\d+$/)) {
        return res.status(400).json({ error: "Invalid sportEventId" });
    }

    const summary = await getSummary(sportEventId);

    const output = [];
    if (!summary) {
        return res.status(200).json({ data: output });
    }

    const home = summary[0].statistics;
    const away = summary[1].statistics;
    for (const stat of [...new Set([...Object.keys(home), ...Object.keys(away)])]) {
        const homeStat = home[stat] ?? 0;
        const awayStat = away[stat] ?? 0;

        output.push({
            id: stat,
            name: titleCase(stat, "_"),
            home: homeStat,
            away: awayStat,
            visible: homeStat + awayStat > 0,
        });
    }

    return res.status(200).json({ data: output });
});
