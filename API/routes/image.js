import config from "../config.json" assert { type: "json" };
import { getPlayerImages } from "../src/lib.js";
import { wrap } from "../src/helper.js";

export default wrap(async function (req, res) {
    const playerId = req.params.playerId;
    if (!playerId || !playerId.match(/^sr:player:\d+$/)) {
        return res.status(400).json({ error: "Invalid playerId" });
    }

    const data = await getPlayerImages();

    const output = data.find((a) => a.player_id === playerId);

    if (output?.links?.length) {
        const imageUri = `https://api.sportradar.com/soccer-images-t3/getty/world-cup/headshots/players/${output.id}/450x450-crop.jpg?api_key=${config.API.SportRadar}`;

        /*
        const base64 = await fetch(imageUri)
            .then((res) => res.arrayBuffer())
            .then((arrayBuffer) => Buffer.from(arrayBuffer))
            .then((buffer) => buffer.toString("base64"));
            */

        return res.status(200).json({
            URL: imageUri,
            //base64: base64,
        });
    }

    return res.status(200).json({ URL: "https://i.imgur.com/ii2W4sU.png" });
});
