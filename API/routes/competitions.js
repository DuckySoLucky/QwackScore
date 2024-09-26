import { wrap } from "../src/helper.js";
import { getCompetitions } from "../src/lib.js";

export default wrap(async function (req, res) {
    const output = {};

    const competitionsData = await getCompetitions();

    const categories = Object.values(competitionsData.competitions).map((a) => a.category.name);
    for (const key of new Set(categories)) {
        output[key] = Object.values(competitionsData.competitions)
            .filter((a) => a.category.name === key)
            .map((item) => {
                return {
                    ...item,
                    image: "https://i.imgur.com/nDDfr5c.png",
                };
            });
    }

    const sortedData = Object.keys(output)
        .sort((a, b) => {
            if (a.includes("Međunarodne") && !b.includes("Međunarodne")) {
                return -1;
            }

            if (!a.includes("Međunarodne") && b.includes("Međunarodne")) {
                return 1;
            }

            return a.localeCompare(b);
        })
        .reduce((acc, key) => {
            acc[key] = output[key];
            return acc;
        }, {});

    return res.status(200).json({
        data: sortedData,
    });
});
