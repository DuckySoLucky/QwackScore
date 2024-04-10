import { StyleSheet, Image } from "react-native";

import { Text, View } from "@/components/Themed";

export default function FootballGameResultAlert(data: { name: string; playerImage: string }) {
  return (
    <View style={styles.container}>
      <Image source={{ uri: data.playerImage }} style={styles.playerImage} resizeMode="contain" />

      <View style={styles.playerScore}>
        <Text style={styles.playerScoreText}>9.51</Text>
      </View>

      <View style={styles.score}>
        <Text style={styles.scoreText}>{data.name}</Text>
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
  playerImage: {
    width: 64,
    height: 64,
    marginLeft: 126 - 107 - 3,
    marginTop: 7,
    borderRadius: 50,
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
    fontSize: 12,
    fontWeight: "bold",
  },
  playerScore: {
    backgroundColor: "#56C863",
    marginTop: 59,
    marginLeft: -20,
    zIndex: 1,

    borderRadius: 6,
    width: 24,
    height: 15,
  },
  playerScoreText: {
    fontSize: 11,
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
  },
});
