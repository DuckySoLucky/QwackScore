import { getPlayerName, titleCase, wrap } from "../src/helper.js";
import { getTimeline } from "../src/lib.js";

export default wrap(async function (req, res) {
    const sportEventId = req.params.sportEventId;
    if (!sportEventId || !sportEventId.match(/^sr:sport_event:\d+$/)) {
        return res.status(400).json({ error: "Invalid sportEventId" });
    }

    const timelineData = await getTimeline(sportEventId);

    const validElements = [
        "yellow_card",
        "free_kick",
        "throw_in",
        "shot_saved",
        "corner_kick",
        "goal_kick",
        "injury",
        "period_score",
        "score_change",
        "substitution",
        "break_start",
    ];
    const skipElements = ["match_started", "period_start", "shot_on_target", "shot_off_target", "possible_goal", "injury_time_shown", "injury_return", "match_ended"];

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
        stadium: timelineData.sport_event.venue.name,
        location: `${timelineData.sport_event.venue.city_name}, ${timelineData.sport_event.venue.country_name}`,
        capacity: timelineData.sport_event.venue.capacity,
        attendance: timelineData.sport_event.sport_event_conditions.attendance?.count ?? "???",
        referee: timelineData.sport_event.sport_event_conditions.referees ?? [{ name: "Unknown" }],
        weather: titleCase(timelineData.sport_event.sport_event_conditions.weather?.overall_conditions ?? "Uknown"),
        round: timelineData.sport_event.sport_event_context.round.number,
    };
    output.information.referee[0].name = getPlayerName(output.information.referee[0].name);

    output.timeline = [];
    let stoppageTime = 0;
    for (const element of timelineData?.timeline ?? []) {
        stoppageTime = element.stoppage_time ? element.stoppage_time : stoppageTime;
        if (!validElements.includes(element.type)) {
            if (skipElements.includes(element.type)) {
                continue;
            }

            // console.log(`Skipping ${element.type}`);
            continue;
        }

        if (element.type === "break_start") {
            const data = timelineData.sport_event_status.period_scores.find((element) => element.number === 1);

            output.timeline.push({
                type: "announcement",
                time: `${element.match_time}'`,
                message: `HT ${data.home_score} - ${data.away_score}`,
                position: "center",
            });
            continue;
        }

        const outputObject = {
            type: element.type,
            time: `${element.match_time + (element.stoppage_time ?? 0)}'`,
            position: element.competitor === "away" ? "right" : "left",
        };

        if (element.type === "score_change") {
            outputObject.home_score = element.home_score;
            outputObject.away_score = element.away_score;
            outputObject.competitor = element.competitor;
        }

        if (element.players) {
            if (["corner_kick", "injury", "score_change", "yellow_card"].includes(element.type)) {
                const player = element.players[0];

                const playerName = getPlayerName(player.name);

                outputObject.player = playerName;
            } else if (element.type === "substitution") {
                const firstPlayer = element.players[0];
                const secondPlayer = element.players[1];

                const firstPlayerName = getPlayerName(firstPlayer.name);
                const secondPlayerName = getPlayerName(secondPlayer.name);

                outputObject.player_in = secondPlayerName;
                outputObject.player_out = firstPlayerName;
            }
        }

        output.timeline.push(outputObject);
    }

    if (output.timeline.length) {
        output.timeline.push({
            type: "announcement",
            time: `${timelineData.sport_event_status.match_status.match_time + stoppageTime}'`,
            message: `FT ${output.competitors[0].score} - ${output.competitors[1].score}`,
            position: "center",
        });
    }

    output.timeline.reverse();

    output.scores = { away: [], home: [] };
    for (const element of output.timeline) {
        if (element.type === "score_change") {
            output.scores[element.competitor].push({
                name: element.player,
                time: element.time,
                message: `${element.player} ${element.time}`,
            });
        }
    }

    return res.status(200).json({ data: output });
});
