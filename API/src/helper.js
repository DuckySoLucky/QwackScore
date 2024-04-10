export function formatCompetitors(competitorData, score) {
  const output = [];
  for (const competitor of competitorData) {
    output.push({
      id: competitor.id,
      name: competitor.name,
      abbreviation: competitor.abbreviation,
      qualifier: competitor.qualifier,
      score: score[`${competitor.qualifier}_score`],
      image: getImage(competitor.id),
    });
  }

  return output;
}

const images = {
  // Istra
  "sr:competitor:25529":
    "https://cdn.discordapp.com/attachments/970319574048333865/1223269770057482290/srcompetitor25529.png?ex=66193dc0&is=6606c8c0&hm=f7493f126caad246d493fd36d27ff180f748fabf73657a1a6333af3c089b0791&",
  // Slaven
  "sr:competitor:2042":
    "https://cdn.discordapp.com/attachments/970319574048333865/1223269770280042536/srcompetitor2042.png?ex=66193dc0&is=6606c8c0&hm=62ce626bc75f57741063eeecadec8fdd726a1d4ac4a1701f4156ae778e7cd599&",
  // Rudes
  "sr:competitor:35226":
    "https://cdn.discordapp.com/attachments/970319574048333865/1223269785190797494/srcompetitor35226.png?ex=66193dc4&is=6606c8c4&hm=4d0920218c85516cacde9ebb67f9c3b740a26166f31887dfb3159e4d45421e8b&",
  // Varaždin
  "sr:competitor:282653":
    "https://cdn.discordapp.com/attachments/970319574048333865/1223269770502344834/srcompetitor282653.png?ex=66193dc0&is=6606c8c0&hm=220315353f32ecb42a4a675b9e0ea58773ab6fc5c57a7cbbdabb76259fee020f&",
  // Gorica
  "sr:competitor:43917":
    "https://media.discordapp.net/attachments/970319574048333865/1223269770703667260/srcompetitor43917.png?ex=66193dc0&is=6606c8c0&hm=3fa4abf320aace11722b52f77196191cd1e7707906061414487e67c163333d25&",
  // Osijek
  "sr:competitor:2040":
    "https://media.discordapp.net/attachments/970319574048333865/1223269770934358166/srcompetitor2040.png?ex=66193dc0&is=6606c8c0&hm=405a4df3c83b4bf19754aecb9736433a3c31a83016c96f3b6310594ec0d405ed&",
  // Lokomotiva
  "sr:competitor:36246":
    "https://cdn.discordapp.com/attachments/970319574048333865/1223269771160584202/srcompetitor36246.png?ex=66193dc0&is=6606c8c0&hm=9fe598d10a11f60dd324e7a48288e27fbb5c86d0f20f5942043b048222c9317f&",
  // Dinamo
  "sr:competitor:2032":
    "https://cdn.discordapp.com/attachments/970319574048333865/1223269771961958410/srcompetitor2032.png?ex=66193dc0&is=6606c8c0&hm=8748fb98a3d6400d0bbba2aa43aae54eeb4d513bf35d9b81dca831c2f6647980&",
  // Hajduk
  "sr:competitor:2036":
    "https://cdn.discordapp.com/attachments/970319574048333865/1223269772213620776/srcompetitor2036.png?ex=66193dc0&is=6606c8c0&hm=d50e87a29fa78fb1f3920bbf0e11b1be3205c2c669655cd4e4cda78bb4e82a21&",
  // Rijeka
  "sr:competitor:2039":
    "https://cdn.discordapp.com/attachments/970319574048333865/1223269772431458335/srcompetitor2039.png?ex=66193dc1&is=6606c8c1&hm=0f138be75131c641abe2cf8084d19435c5c02ef98155ef46a1de42cb0ec32378&",
  // default
  default:
    "https://media.discordapp.net/attachments/970319574048333865/1223271293957312622/default-removebg-preview.png?ex=66193f2b&is=6606ca2b&hm=09fd00eda2fc4ba7292b1cf810c58ca9a211a44a25654d9e606703486dd97a49&",
};

export function getImage(clubId) {
  return images[clubId] ?? images.default;
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
