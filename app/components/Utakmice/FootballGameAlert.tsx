import { StyleSheet, Image } from "react-native";

import { Text, View } from "@/components/Themed";

const ballImage =
  "https://media.discordapp.net/attachments/970319574048333865/1222892505117491200/image.png?ex=6617de65&is=66056965&hm=f7cb3f02da2f4067dbb324094b92793014836ba5a881f615def5456cec1190ca&=&format=webp&quality=lossless";

export default function FootballGameAlert(data: {
  time: string;
  firstImage: string;
  secondImage: string;
}) {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: data.firstImage }}
        style={styles.leftImage}
        resizeMode="contain"
      />

      <Image
        source={{ uri: ballImage }}
        style={styles.middleImage}
        resizeMode="contain"
      />

      <Image
        source={{ uri: data.secondImage }}
        style={styles.rightImage}
        resizeMode="contain"
      />

      <View style={styles.score}>
        <Text style={styles.scoreText}>
          {data.time.toString().replace("{NEXT_LINE}", "\n")}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#10181E",
    borderWidth: 1,
    borderColor: "#000000",
    height: 96,
    width: 96,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    borderRadius: 10,
    marginRight: 6,
  },
  leftImage: {
    marginLeft: 10,
    marginTop: 12,

    height: 42,
    width: 32.32,
  },
  middleImage: {
    width: 43.78,
    height: 43.69,

    zIndex: -1,
    marginLeft: -43.78 + 31 - 5,
    marginTop: 12,
  },
  rightImage: {
    height: 42,
    width: 30.11,

    marginLeft: 15.89 - 31,
    marginTop: 12,
  },
  score: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#10181E",
    marginBottom: 5,
  },
  scoreText: {
    fontSize: 11,
    fontWeight: "bold",

    textAlign: "center",
  },
});
