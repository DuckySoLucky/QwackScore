import { wrap } from "../src/helper.js";
import { getSeasons } from "../src/lib.js";

export default wrap(async function (req, res) {
    const seasonsData = await getSeasons("2025");

    const output = {
        seasons: seasonsData,
    };

    output.seasons.sort((a, b) => {
        return parseInt(a.competition_id.split(":").at(-1)) - parseInt(b.competition_id.split(":").at(-1));
    });

    return res.status(200).json({ data: output });
});
