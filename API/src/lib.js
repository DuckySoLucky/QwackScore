import config from "../config.json" assert { type: "json" };
import { broadcastMessage } from "./log.js";
import { db } from "./mongo.js";
import axios from "axios";

/**
 * Retrieves the seasons data from the API or cache.
 * @returns {Promise<{
 *  generated_at: string,
 * lastUpdated: number,
 * seasons: {
 *  id: string,
 *  name: string,
 *  start_date: string,
 *  end_date: string,
 *  year: string,
 *  competition_id: string,
 * }[]}<} The seasons data.
 */
async function fetchSeasons() {
    try {
        broadcastMessage("fetchSeasons called.", "api");
        const timeNow = Date.now();

        const cache = await db.collection("cache").findOne({ key: "seasons" });
        if (cache && cache.value.lastUpdated > Date.now() - 5 * 60 * 1000) {
            broadcastMessage(`fetchSeasons returned. [CACHE] (${Date.now() - timeNow}ms)`, "api");
            return cache.value;
        }

        const url = `https://api.sportradar.com/soccer-extended/trial/v4/hr/seasons?api_key=${config.API.SportRadar}`;
        const response = await axios.get(url, {
            headers: {
                accept: "application/json",
            },
        });

        if (response.status !== 200 || !response.data) {
            throw new Error(`fetchSeasons failed with status ${response.status}`);
        }

        const data = response.data;
        const output = {
            generated_at: data.generated_at,
            lastUpdated: Date.now(),
            seasons: data.seasons,
        };

        await db.collection("cache").updateOne({ key: "seasons" }, { $set: { value: output } }, { upsert: true });

        broadcastMessage(`fetchSeasons returned. (${Date.now() - timeNow}ms)`, "api");
        return data;
    } catch (error) {
        console.log(error);
    }
}

async function getSeasons(year) {
    try {
        const seasons = await fetchSeasons();

        const ouput = [];

        for (const season of seasons.seasons) {
            if (season.year === year || season.year === `${year.slice(2, 4) - 1}/${year.slice(2, 4)}` || new Date(season.end_date).getTime() < Date.now()) {
                ouput.push(season);
            }
        }

        return ouput.sort((a, b) => parseInt(a.competition_id.split(":").at(-1)) - parseInt(b.competition_id.split(":").at(-1))).reverse();
    } catch (error) {
        console.log(error);
    }
}

async function fetchCompetitions() {
    try {
        broadcastMessage("fetchCompetitions called.", "api");
        const timeNow = Date.now();

        const cache = await db.collection("cache").findOne({ key: "competitions" });
        if (cache && cache.value.lastUpdated > Date.now() - 5 * 60 * 1000) {
            broadcastMessage(`fetchCompetitions returned. [CACHE] (${Date.now() - timeNow}ms)`, "api");
            return cache.value;
        }

        const url = `https://api.sportradar.com/soccer-extended/trial/v4/hr/competitions?api_key=${config.API.SportRadar}`;
        const response = await axios.get(url, {
            headers: {
                accept: "application/json",
            },
        });

        if (response.status !== 200 || !response.data) {
            throw new Error(`fetchCompetitions failed with status ${response.status}`);
        }

        const data = response.data;
        const output = {
            generated_at: data.generated_at,
            lastUpdated: Date.now(),
            competitions: data.competitions,
        };

        await db.collection("cache").updateOne({ key: "competitions" }, { $set: { value: output } }, { upsert: true });

        broadcastMessage(`fetchCompetitions returned. (${Date.now() - timeNow}ms)`, "api");
        return data;
    } catch (error) {
        console.log(error);
    }
}

async function getCompetition(id) {
    try {
        const competitions = await fetchCompetitions();

        for (const competition of competitions.competitions) {
            if (competition.id !== id) {
                continue;
            }

            return competition;
        }
    } catch (error) {
        console.log(error);
    }
}

async function getSeasonSchedules(seasonId) {
    try {
        broadcastMessage("getSeasonSchedules called.", "api");
        const timeNow = Date.now();

        const cache = await db.collection("cache").findOne({ key: `seasonSchedules-${seasonId}` });
        if (cache && cache.value.lastUpdated > Date.now() - 5 * 60 * 1000) {
            broadcastMessage(`getSeasonSchedules returned. [CACHE] (${Date.now() - timeNow}ms)`, "api");
            return cache.value.schedules;
        }

        const url = `https://api.sportradar.com/soccer/trial/v4/hr/seasons/${seasonId}/schedules.json?api_key=${config.API.SportRadar}`;
        const response = await axios.get(url, {
            headers: {
                accept: "application/json",
            },
        });

        if (response.status !== 200 || !response.data) {
            throw new Error(`getSeasonSchedules failed with status ${response.status}`);
        }

        const data = response.data;
        const output = {
            generated_at: data.generated_at,
            lastUpdated: Date.now(),
            schedules: data.schedules,
        };

        await db.collection("cache").updateOne({ key: `seasonSchedules-${seasonId}` }, { $set: { value: output } }, { upsert: true });

        broadcastMessage(`getSeasonSchedules returned. (${Date.now() - timeNow}ms)`, "api");

        return data.schedules;
    } catch (error) {
        console.log(error);
    }
}

async function getPlayerStats(seasonId) {
    try {
        broadcastMessage("getStats called.", "api");
        const timeNow = Date.now();

        const cache = await db.collection("cache").findOne({ key: `stats-${seasonId}` });
        if (cache && cache.value.lastUpdated > Date.now() - 5 * 60 * 1000) {
            broadcastMessage(`getStats returned. [CACHE] (${Date.now() - timeNow}ms)`, "api");
            return cache.value;
        }

        const url = `https://api.sportradar.com/soccer/trial/v4/hr/seasons/${seasonId}/leaders.json?api_key=${config.API.SportRadar}`;
        const response = await axios.get(url, {
            headers: {
                accept: "application/json",
            },
        });

        if (response.status !== 200 || !response.data) {
            throw new Error(`getStats failed with status ${response.status}`);
        }

        const data = response.data;
        const output = {
            generated_at: data.generated_at,
            lastUpdated: Date.now(),
            data: data.lists,
        };

        await db.collection("cache").updateOne({ key: `stats-${seasonId}` }, { $set: { value: output } }, { upsert: true });

        broadcastMessage(`getStats returned. (${Date.now() - timeNow}ms)`, "api");
        return output;
    } catch (error) {
        console.log(error);
    }
}

async function getStandings(seasonId) {
    try {
        broadcastMessage("getStandings called.", "api");
        const timeNow = Date.now();

        const cache = await db.collection("cache").findOne({ key: `standings-${seasonId}` });
        if (cache && cache.value.lastUpdated > Date.now() - 5 * 60 * 1000) {
            broadcastMessage(`getStandings returned. [CACHE] (${Date.now() - timeNow}ms)`, "api");
            return cache.value.data;
        }

        const url = `https://api.sportradar.com/soccer/trial/v4/hr/seasons/${seasonId}/standings.json?api_key=${config.API.SportRadar}`;
        const response = await axios.get(url, {
            headers: {
                accept: "application/json",
            },
        });

        if (response.status !== 200 || !response.data) {
            throw new Error(`getStandings failed with status ${response.status}`);
        }

        const data = response.data;
        const output = {
            generated_at: data.generated_at,
            lastUpdated: Date.now(),
            data: data.standings,
        };

        await db.collection("cache").updateOne({ key: `standings-${seasonId}` }, { $set: { value: output } }, { upsert: true });

        broadcastMessage(`getStandings returned. (${Date.now() - timeNow}ms)`, "api");
        return output.data;
    } catch (error) {
        console.log(error);
    }
}

async function getFormStandings(seasonId) {
    try {
        broadcastMessage("getFormStandings called.", "api");
        const timeNow = Date.now();

        const cache = await db.collection("cache").findOne({ key: `formStandings-${seasonId}` });
        if (cache && cache.value.lastUpdated > Date.now() - 5 * 60 * 1000) {
            broadcastMessage(`getFormStandings returned. [CACHE] (${Date.now() - timeNow}ms)`, "api");
            return cache.value.data;
        }

        const url = `https://api.sportradar.com/soccer/trial/v4/hr/seasons/${seasonId}/form_standings.json?api_key=${config.API.SportRadar}`;
        const response = await axios.get(url, {
            headers: {
                accept: "application/json",
            },
        });

        if (response.status !== 200 || !response.data) {
            throw new Error(`getFormStandings failed with status ${response.status}`);
        }

        const data = response.data;
        const output = {
            generated_at: data.generated_at,
            lastUpdated: Date.now(),
            data: data.season_form_standings,
        };

        await db.collection("cache").updateOne({ key: `formStandings-${seasonId}` }, { $set: { value: output } }, { upsert: true });

        broadcastMessage(`getFormStandings returned. (${Date.now() - timeNow}ms)`, "api");
        return output.data;
    } catch (error) {
        console.log(error);
    }
}

async function getTimeline(sportEvent) {
    try {
        broadcastMessage("getTimeline called.", "api");
        const timeNow = Date.now();

        const cache = await db.collection("cache").findOne({ key: `timeList-${sportEvent}` });
        if (cache && cache.value.lastUpdated > Date.now() - 5 * 60 * 1000) {
            broadcastMessage(`getTimeline returned. [CACHE] (${Date.now() - timeNow}ms)`, "api");
            return cache.value.data;
        }

        const url = `https://api.sportradar.com/soccer/trial/v4/hr/sport_events/${sportEvent}/timeline.json?api_key=${config.API.SportRadar}`;
        const response = await axios.get(url, {
            headers: {
                accept: "application/json",
            },
        });

        if (response.status !== 200 || !response.data) {
            throw new Error(`getTimeline failed with status ${response.status}`);
        }

        const data = response.data;
        const output = {
            generated_at: data.generated_at,
            lastUpdated: Date.now(),
            data: data,
        };

        await db.collection("cache").updateOne({ key: `timeList-${sportEvent}` }, { $set: { value: output } }, { upsert: true });

        broadcastMessage(`getTimeline returned. (${Date.now() - timeNow}ms)`, "api");
        return output.data;
    } catch (error) {
        console.log(error);
    }
}

async function getLineup(sportEvent) {
    try {
        broadcastMessage("getLineup called.", "api");
        const timeNow = Date.now();

        const cache = await db.collection("cache").findOne({ key: `lineup-${sportEvent}` });
        if (cache && cache.value.lastUpdated > Date.now() - 5 * 60 * 1000) {
            broadcastMessage(`getLineup returned. [CACHE] (${Date.now() - timeNow}ms)`, "api");
            return cache.value.data;
        }

        const url = `https://api.sportradar.com/soccer/trial/v4/hr/sport_events/${sportEvent}/lineups.json?api_key=${config.API.SportRadar}`;
        const response = await axios.get(url, {
            headers: {
                accept: "application/json",
            },
        });

        if (response.status !== 200 || !response.data) {
            throw new Error(`getLineup failed with status ${response.status}`);
        }

        const data = response.data;
        const output = {
            generated_at: data.generated_at,
            lastUpdated: Date.now(),
            data: data,
        };

        await db.collection("cache").updateOne({ key: `lineup-${sportEvent}` }, { $set: { value: output } }, { upsert: true });

        broadcastMessage(`getLineup returned. (${Date.now() - timeNow}ms)`, "api");
        return output.data;
    } catch (error) {
        console.log(error);
    }
}

async function getSummary(sportEvent) {
    try {
        broadcastMessage("getSummary called.", "api");
        const timeNow = Date.now();

        const cache = await db.collection("cache").findOne({ key: `summary-${sportEvent}` });
        if (cache && cache.value.lastUpdated > Date.now() - 5 * 60 * 1000) {
            broadcastMessage(`getSummary returned. [CACHE] (${Date.now() - timeNow}ms)`, "api");
            return cache.value.data;
        }

        const url = `https://api.sportradar.com/soccer/trial/v4/hr/sport_events/${sportEvent}/summary.json?api_key=${config.API.SportRadar}`;
        const response = await axios.get(url, {
            headers: {
                accept: "application/json",
            },
        });

        if (response.status !== 200 || !response.data) {
            throw new Error(`getSummary failed with status ${response.status}`);
        }

        const data = response.data;
        const output = {
            generated_at: data.generated_at,
            lastUpdated: Date.now(),
            data: data.statistics?.totals?.competitors,
        };

        await db.collection("cache").updateOne({ key: `summary-${sportEvent}` }, { $set: { value: output } }, { upsert: true });

        broadcastMessage(`getSummary returned. (${Date.now() - timeNow}ms)`, "api");
        return output.data;
    } catch (error) {
        console.log(error);
    }
}

async function getPlayerImages() {
    broadcastMessage("getPlayerImages called.", "api");
    const timeNow = Date.now();

    const cache = await db.collection("cache").findOne({ key: "headshotManifest" });
    if (cache && cache.value.lastUpdated > Date.now() - 6 * 60 * 60 * 1000) {
        broadcastMessage(`getPlayerImages returned. [CACHE] (${Date.now() - timeNow}ms)`, "api");
        return cache.value.data;
    }

    const url = `https://api.sportradar.com/soccer-images-t3/getty/world-cup/headshots/players/2022/manifest.json?api_key=${config.API.SportRadar}`;
    const response = await axios.get(url, {
        headers: {
            accept: "application/json",
        },
    });

    if (response.status !== 200 || !response.data) {
        throw new Error(`getPlayerImages failed with status ${response.status}`);
    }

    const data = response.data;
    const output = {
        lastUpdated: Date.now(),
        data: data.assetlist,
    };

    console.log(output);

    await db.collection("cache").updateOne({ key: "headshotManifest" }, { $set: { value: output } }, { upsert: true });

    broadcastMessage(`getPlayerImages returned. (${Date.now() - timeNow}ms)`, "api");
    return output.data;
}

export {
    getSeasons,
    getCompetition,
    fetchCompetitions,
    fetchSeasons,
    getSeasonSchedules,
    getPlayerStats,
    getStandings,
    getFormStandings,
    getTimeline,
    getLineup,
    getSummary,
    getPlayerImages,
};
