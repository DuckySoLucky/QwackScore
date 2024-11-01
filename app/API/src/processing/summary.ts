// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

function titleCase(str, split = ' ') {
  return str
    .toLowerCase()
    .split(split)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export function formatSummary(summary) {
  const output = [];
  if (!summary) {
    return output;
  }

  const home = summary[0].statistics;
  const away = summary[1].statistics;
  for (const stat of [...new Set([...Object.keys(home), ...Object.keys(away)])]) {
    const homeStat = home[stat] ?? 0;
    const awayStat = away[stat] ?? 0;

    output.push({
      id: stat,
      name: titleCase(stat, '_'),
      home: homeStat,
      away: awayStat,
      visible: homeStat + awayStat > 0,
    });
  }

  return output;
}
