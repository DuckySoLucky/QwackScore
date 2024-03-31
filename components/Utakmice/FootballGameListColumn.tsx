import { StyleSheet, Image } from "react-native";

import { Text, View } from "@/components/Themed";

export default function FootballGameResultAlert({ data }) {
  const firstElement = data.competitors[0];
  const secondElement = data.competitors[1];

  let startTime = data.startTimeFormatted;
  const splitStartTime = startTime.split(" ");
  const dateYear = splitStartTime[0];
  if (data.status === "closed") {
    const splitDateYear = dateYear.split(".");
    splitDateYear[2] = splitDateYear[2].slice(2);

    startTime = splitDateYear.join(".") + "\nFT";
  } else {
    const dateYear = splitStartTime[0];
    if (dateYear !== "Danas" && dateYear !== "Sutra" && dateYear !== "Jucer") {
      const splitDateYear = dateYear.split(".");
      splitDateYear[2] = splitDateYear[2].slice(2);

      startTime = splitDateYear.join(".") + "\n" + splitStartTime[1];
    }
  }

  let winner = data.winner;
  if (data.competitors[0].score === data.competitors[1].score) {
    winner = null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.dateText}>{startTime}</Text>
      <View style={styles.seperator}></View>

      <View style={styles.images}>
        <View style={styles.row}>
          <Image
            source={{
              uri: firstElement.image,
            }}
            style={styles.topImage}
            resizeMode="contain"
          />
          <Text style={data.winner === firstElement.name ? styles.winnerRowName : styles.rowName}>
            {firstElement.name}
          </Text>

          <Text style={data.winner === firstElement.name ? styles.winnerRowScore : styles.rowScore}>
            {firstElement.score}
          </Text>
        </View>

        <View style={styles.row}>
          <Image
            source={{
              uri: secondElement.image,
            }}
            style={styles.bottomImage}
            resizeMode="contain"
          />
          <Text style={data.winner === secondElement.name ? styles.winnerRowName : styles.rowName}>
            {secondElement.name}
          </Text>

          <Text style={data.winner === secondElement.name ? styles.winnerRowScore : styles.rowScore}>
            {secondElement.score}
          </Text>
        </View>
      </View>

      <View style={styles.seperator2}></View>

      <Image
        source={{
          uri: "https://media.discordapp.net/attachments/970319574048333865/1222934624590889022/image.png?ex=6618059f&is=6605909f&hm=85095f9315a2fe3516cccb4a72834701a5d6d7f2393f4fa2057b445d172df069&=&format=webp&quality=lossless",
        }}
        style={styles.notificationIcon}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 6,
    backgroundColor: "#0C1216",
    borderWidth: 1,
    borderColor: "#000000",
    borderRadius: 5,
    width: 378 - 12,
    height: 50,
    marginLeft: 6,
    flexDirection: "row",
    alignItems: "center",
    textAlign: "center",
  },
  dateText: {
    marginLeft: 6,
    color: "#686868",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 9,
    width: 40,
  },
  seperator: {
    height: "80%",
    width: 1,
    backgroundColor: "#222A36",
    marginLeft: 10,
  },
  images: {
    marginLeft: 10,
    backgroundColor: "#0C1216",
    height: 40,
    justifyContent: "center",
  },
  topImage: {
    position: "absolute",
    left: 0,
    top: -3,

    height: 18,
    width: 18,
    backgroundColor: "transparent",
  },
  bottomImage: {
    position: "absolute",
    left: 0,
    bottom: -3,

    height: 18,
    width: 18,
    backgroundColor: "transparent",
  },
  row: {
    flexDirection: "row",
    backgroundColor: "#0C1216",
  },
  rowName: {
    marginLeft: 25,
    color: "#686868",
    fontSize: 12,
    fontWeight: "bold",
  },
  winnerRowName: {
    marginLeft: 25,
    color: "#C0C0C0",
    fontSize: 12,
    fontWeight: "bold",
  },
  rowScore: {
    position: "absolute",
    left: 210,
    color: "#686868",
    fontSize: 12,
    fontWeight: "bold",
  },
  winnerRowScore: {
    position: "absolute",
    left: 210,
    color: "#C0C0C0",
    fontSize: 12,
    fontWeight: "bold",
  },
  notificationIcon: {
    position: "absolute",
    right: 6,
    marginLeft: 5,
    height: 32,
    width: 32,
  },
  seperator2: {
    position: "absolute",
    right: 48,
    marginLeft: 24,
    height: "80%",
    width: 1,
    backgroundColor: "#222A36",
  },
});
