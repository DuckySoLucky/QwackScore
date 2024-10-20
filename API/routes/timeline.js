import { getPlayerName, titleCase, wrap } from "../src/helper.js";
import { getTimeline } from "../src/lib.js";

function formatPlayerName(name) {
    return name
        .split(" ")
        .map((element, index) => (index === name.split(" ").length - 1 ? element : element[0] + "."))
        .join(" ");
}

export default wrap(async function (req, res) {
    const sportEventId = req.params.sportEventId;
    if (!sportEventId || !sportEventId.match(/^sr:sport_event:\d+$/)) {
        return res.status(400).json({ error: "Invalid sportEventId" });
    }

    const timelineData = await getTimeline(sportEventId);

    const output = {};
    output.competitors = timelineData.sport_event.competitors.map((competitor) => {
        return {
            id: competitor.id,
            name: competitor.name,
            image: "https://i.imgur.com/nDDfr5c.png",
            position: competitor.qualifier === "home" ? "left" : "right",
            qualifier: competitor.qualifier,
            score: timelineData.sport_event_status[`${competitor.qualifier}_score`],
        };
    });

    output.information = {
        status: timelineData.sport_event_status.match_status,
        dateTop: new Date(timelineData.sport_event.start_time).toLocaleString().split(", ")[0].replace("20", ""),
        timeTop: new Date(timelineData.sport_event.start_time).toLocaleString().split(", ")[1],

        date: new Date(timelineData.sport_event.start_time).toLocaleString(),
        stadium: timelineData.sport_event.venue?.name ?? "Unknown",
        location: `${timelineData.sport_event.venue?.city_name ?? "Unknown"}, ${timelineData.sport_event.venue?.country_name ?? "Unknown"}`,
        capacity: timelineData.sport_event.venue?.capacity ?? "Unknown",
        attendance: timelineData.sport_event.sport_event_conditions.attendance?.count ?? "???",
        referee: timelineData.sport_event.sport_event_conditions.referees ?? [{ name: "Unknown" }],
        weather: titleCase(timelineData.sport_event.sport_event_conditions.weather?.overall_conditions ?? "Uknown"),
        round: timelineData.sport_event.sport_event_context.round.number,
    };
    output.information.referee[0].name = getPlayerName(output.information.referee[0].name);

    output.timeline = [];
    output.commentary = [];
    const ignoreElements = [
        "match_started",
        "match_ended",
        "possible_goal",
        "period_score",
        "break_start",
        "injury_time_shown",
        "video_assistant_referee",
        "video_assistant_referee_over",
        "injury_return",
    ];
    const allElements = [];
    for (const element of timelineData?.timeline ?? []) {
        if (ignoreElements.includes(element.type)) {
            continue;
        }

        for (const commentary of element.commentaries ?? []) {
            output.commentary.push({
                time: `${element.match_time}'`,
                message: commentary.text,
                position: element.competitor === "away" ? "right" : "left",
            });
        }

        if (element.type === "period_start") {
            if (element.period === 2) {
                const data = timelineData.sport_event_status.period_scores.find((element) => element.number === 1);
                output.timeline.push({
                    type: "announcement",
                    position: "center",
                    message: `HT - ${data.home_score} - ${data.away_score}`,
                });

                output.commentary.push({
                    time: "HT",
                    message: `Half Time - The first half has ended. The score is ${data.home_score} - ${data.away_score}.`,
                    position: "center",
                });
            }

            continue;
        }

        const basicFormat = ["throw_in", "free_kick", "offside", "goal_kick", "shot_saved", "corner_kick", "injury", "yellow_card", "red_card", "shot_on_target"];
        if (basicFormat.includes(element.type)) {
            const player = element.players?.at(0);
            output.timeline.push({
                type: element.type,
                time: `${element.match_time + (element.stoppage_time ?? 0)}'`,
                position: element.competitor === "away" ? "right" : "left",
                message: titleCase(element.type),
                player: player ? formatPlayerName(player.name) : undefined,
            });

            continue;
        }

        if (element.type === "shot_off_target") {
            const player = element.players?.at(0);
            output.timeline.push({
                type: element.type,
                time: `${element.match_time}'`,
                position: element.competitor === "away" ? "right" : "left",
                message: "Shot off Target",
                player: player ? formatPlayerName(player.name) : undefined,
                outcome: element.outcome,
            });
            continue;
        }

        if (element.type === "score_change") {
            const player = element.players?.at(0);
            const assistPlayer = element.players?.at(1);

            output.timeline.push({
                type: element.type,
                time: `${element.match_time}'`,
                position: element.competitor === "away" ? "right" : "left",
                message: `${element.home_score} - ${element.away_score}`,
                player: formatPlayerName(player.name),
                assistPlayer: assistPlayer ? formatPlayerName(assistPlayer.name) : undefined,
                competitor: element.competitor,
                score: {
                    home: element.home_score,
                    away: element.away_score,
                },
            });
            continue;
        }

        if (element.type === "substitution") {
            output.timeline.push({
                type: element.type,
                time: `${element.match_time}'`,
                position: element.competitor === "away" ? "right" : "left",
                message: "Substitution",
                playerIn: formatPlayerName(element.players[0].name),
                playerOut: formatPlayerName(element.players[1].name),
            });

            continue;
        }

        if (!allElements.includes(element.type)) {
            allElements.push(element.type);
            console.log(`Unused element: ${element.type}`);
        }
    }

    if (output.timeline.length) {
        output.timeline.push({
            type: "announcement",
            position: "center",
            message: `FT ${output.competitors[0].score} - ${output.competitors[1].score}`,
        });

        output.commentary.push({
            time: "FT",
            position: "center",
            message: `Full Time - The match has ended. The final score is ${output.competitors[0].score} - ${output.competitors[1].score}.`,
        });
    }

    output.timeline.reverse();

    output.scores = { away: [], home: [] };
    for (const element of output.timeline) {
        if (element.type === "score_change") {
            output.scores[element.competitor].push({
                name: element.player,
                time: element.time,
                message: `${formatPlayerName(element.player)} ${element.time}`,
            });
        }
    }

    output.season = timelineData.sport_event.sport_event_context.season;

    output.commentary.reverse();

    return res.status(200).json({ data: output });
});
