import { StyleSheet, Image } from "react-native";

import { Text, View } from "@/components/Themed";

const ballImage = "https://i.imgur.com/Q6nxcJk.png";
  
export default function FootballGameAlert(data: { score: string; firstImage: string; secondImage: string }) {
  return (
    <View style={styles.container}>
      <Image source={{ uri: data.firstImage }} style={styles.leftImage} resizeMode="contain" />

      <Image source={{ uri: ballImage }} style={styles.middleImage} resizeMode="contain" />

      <Image source={{ uri: data.secondImage }} style={styles.rightImage} resizeMode="contain" />

      <View style={styles.score}>
        <Text style={styles.scoreText}>{data.score}</Text>
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
    width: 30.11,
    height: 42,

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
    marginBottom: 15,
  },
  scoreText: {
    fontSize: 15,
    fontWeight: "bold",
  },
});
