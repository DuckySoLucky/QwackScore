// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import moment from 'moment';

function formatTime(time) {
  return moment(time).calendar(null, {
    sameDay: `[{today}] HH:mm`,
    nextDay: '[{tomorrow}] HH:mm',
    nextWeek: 'DD.MM.YY HH:mm',
    lastDay: '[{yesterday}] HH:mm',
    lastWeek: 'DD.MM.YY HH:mm',
    sameElse: 'DD.MM.YY HH:mm',
  });
}

export function formatCompetitors(competitorData, score) {
  const output = [];
  for (const competitor of competitorData) {
    output.push({
      id: competitor.id,
      name: competitor.name,
      abbreviation: competitor.abbreviation,
      qualifier: competitor.qualifier,
      score: score[`${competitor.qualifier}_score`],
      image: 'https://i.imgur.com/nDDfr5c.png',
    });
  }

  return output;
}

export function formatSchedules(schedulesData) {
  const schedules = {};
  for (const schedule of schedulesData) {
    const matchData = schedule.sport_event;

    const roundNumber = matchData.sport_event_context.round.number ?? Object.keys(schedules).length + 1;

    schedules[roundNumber] ??= [];
    schedules[roundNumber].push({
      id: matchData.id,
      startTime: new Date(matchData.start_time).getTime(),
      startTimeFormatted: formatTime(matchData.start_time),
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
    .filter((round) => round.status === 'closed')
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

  return {
    currentRound: todaysMatches[0]?.round,
    matches: shuffle(todaysMatches, last3Matches),
    firstThreeMatchs,
    schedules,
  };
}
