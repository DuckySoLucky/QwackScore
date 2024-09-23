import { formatCompetitors, wrap } from "../src/helper.js";
import { getSeasonSchedules } from "../src/lib.js";
import moment from "moment";

export default wrap(async function (req, res) {
    const seasonId = req.params.seasonId;
    if (!seasonId || !seasonId.match(/^sr:season:\d+$/)) {
        return res.status(400).json({ error: "Invalid seasonId" });
    }

    const schedulesData = await getSeasonSchedules(seasonId);
    if (!schedulesData) {
        return res.status(404).json({ error: "Schedules not found" });
    }

    const schedules = {};
    for (const schedule of schedulesData) {
        const matchData = schedule.sport_event;
        const roundNumber = matchData.sport_event_context.round.number;

        schedules[roundNumber] ??= [];
        schedules[roundNumber].push({
            id: matchData.id,
            startTime: new Date(matchData.start_time).getTime(),
            startTimeFormatted: moment(matchData.start_time).calendar(null, {
                sameDay: "[Danas] HH:mm",
                nextDay: "[Sutra] HH:mm",
                nextWeek: "DD.MM.YYYY HH:mm",
                lastDay: "[Jucer] HH:mm",
                lastWeek: "DD.MM.YYYY HH:mm",
                sameElse: "DD.MM.YYYY HH:mm",
            }),
            round: roundNumber,
            status: schedule.sport_event_status.status,
            competitors: formatCompetitors(matchData.competitors, schedule.sport_event_status),
            winner: matchData.competitors.find((c) => c.id === schedule.sport_event_status.winner_id)?.name,
        });
    }

    let todaysMatches = Object.values(schedules)
        .flat()
        .filter((round) => {
            const currentTime = new Date().getTime();
            const matchTime = round.startTime;

            return matchTime >= currentTime && matchTime <= currentTime + 72 * 60 * 60 * 1000;
        });

    if (todaysMatches.length === 0) {
        todaysMatches = Object.values(schedules)
            .flat()
            .filter((round) => {
                const currentTime = new Date().getTime();
                const matchTime = round.startTime;

                return matchTime >= currentTime;
            })
            .slice(0, 3);
    }

    const last3Matches = Object.values(schedules)
        .flat()
        .reverse()
        .filter((round) => round.status === "closed")
        .slice(0, 3);

    const shuffle = (first, second) => {
        const matches = [...first, ...second];
        for (let i = matches.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [matches[i], matches[j]] = [matches[j], matches[i]];
        }

        return matches;
    };

    const firstThreeMatchs = Object.values(schedules)
        .flat()
        .filter((round) => round.startTime >= Date.now())
        .sort((a, b) => a.startTime - b.startTime)
        .slice(0, 3);

    const output = {
        currentRound: todaysMatches[0]?.round,
        matches: shuffle(todaysMatches, last3Matches),
        firstThreeMatchs,
        schedules,
    };

    return res.status(200).json({ data: output });
});
