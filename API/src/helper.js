export function formatCompetitors(competitorData, score) {
    const output = [];
    for (const competitor of competitorData) {
        output.push({
            id: competitor.id,
            name: competitor.name,
            abbreviation: competitor.abbreviation,
            qualifier: competitor.qualifier,
            score: score[`${competitor.qualifier}_score`],
            image: "https://i.imgur.com/nDDfr5c.png",
        });
    }

    return output;
}

export function wrap(fn) {
    return function (req, res, next) {
        return fn(req, res, next).catch((err) => {
            next(err);
        });
    };
}

export function getPlayerName(name) {
    return name.includes(",") ? (name.split(",")[1] + " " + name.split(",")[0]).trim() : name;
}

export function titleCase(str, split = " ") {
    return str
        .toLowerCase()
        .split(split)
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
}
