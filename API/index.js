const port = process.env.PORT || 3000;
import express from "express";
const app = express();

import schedulesRoute from "./routes/schedules.js";
app.get("/schedules/:seasonId", schedulesRoute);

import seasonsRoute from "./routes/seasons.js";
app.get("/seasons", seasonsRoute);

import statsRoute from "./routes/stats.js";
app.get("/stats/:seasonId", statsRoute);

import standingsRoute from "./routes/standings.js";
app.get("/standings/:seasonId", standingsRoute);

import timelineRoute from "./routes/timeline.js";
app.get("/timeline/:sportEventId", timelineRoute);

import lineupRoute from "./routes/lineup.js";
app.get("/lineup/:sportEventId", lineupRoute);

import summaryRoute from "./routes/summary.js";
app.get("/summary/:sportEventId", summaryRoute);

app.listen(port, () => {
  console.log(`Now listening on port ${port}`);
});
