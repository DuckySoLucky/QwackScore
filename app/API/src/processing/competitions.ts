// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

export function formatCompetitions(competitionsData) {
  const output = {};

  const categories = Object.values(competitionsData.competitions).map((a) => a.category.name);
  for (const key of new Set(categories)) {
    output[key] = Object.values(competitionsData.competitions)
      .filter((a) => a.category.name === key)
      .map((item) => {
        return {
          ...item,
          image: 'https://i.imgur.com/nDDfr5c.png',
        };
      });
  }

  return Object.keys(output)
    .sort((a, b) => {
      if (a.includes('Međunarodne') && !b.includes('Međunarodne')) {
        return -1;
      }

      if (!a.includes('Međunarodne') && b.includes('Međunarodne')) {
        return 1;
      }

      return a.localeCompare(b);
    })
    .reduce((acc, key) => {
      acc[key] = output[key];
      return acc;
    }, {});
}
