import { titleCase, wrap } from "../src/helper.js";
import { getSummary } from "../src/lib.js";

function calculatRatio(left, right) {
  const total = left + right;
  const leftRatio = left / total;
  const rightRatio = right / total;

  let leftStat, rightStat;
  if (leftRatio === rightRatio) {
    leftStat = rightStat = 3;
  } else if (leftRatio > rightRatio) {
    const diff = leftRatio - rightRatio;
    leftStat = Math.min(3, Math.floor(3 * (1 - diff)));
    rightStat = Math.min(3, Math.ceil(3 * diff));
  } else {
    const diff = rightRatio - leftRatio;
    leftStat = Math.min(3, Math.ceil(3 * diff));
    rightStat = Math.min(3, Math.floor(3 * (1 - diff)));
  }

  if (isNaN(leftStat)) leftStat = 0;
  if (isNaN(rightStat)) rightStat = 0;

  return { left: leftStat, right: rightStat ?? 0 };
}

export default wrap(async function (req, res) {
  const sportEventId = req.params.sportEventId;
  if (!sportEventId || !sportEventId.match(/^sr:sport_event:\d+$/)) {
    return res.status(400).json({ error: "Invalid sportEventId" });
  }

  const summary = await getSummary(sportEventId);

  const output = { team: [] };
  if (!summary) {
    return res.status(200).json({ data: output });
  }

  for (const stat in summary[0].statistics) {
    const home = summary[0].statistics[stat] ?? 0;
    const away = summary[1].statistics[stat] ?? 0;

    output.team.push({
      id: stat,
      name: titleCase(stat, "_"),
      home: home,
      away: away,
      progress: calculatRatio(home, away),
    });
  }

  return res.status(200).json({ data: output });
});
