// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

export function formatSeasons(seasons) {
  const ouput = [];

  const year = '2025';
  for (const season of seasons.seasons) {
    if (
      season.year === year ||
      season.year === `${year.slice(2, 4) - 1}/${year.slice(2, 4)}` ||
      new Date(season.end_date).getTime() < Date.now()
    ) {
      ouput.push(season);
    }
  }

  return {
    seasons: ouput.sort(
      (a, b) => parseInt(a.competition_id.split(':').at(-1)) - parseInt(b.competition_id.split(':').at(-1))
    ),
  };
}
