import { StyleSheet, Image } from "react-native";

import { Text, View } from "@/components/Themed";

export default function BestClubElementColumn({ data }) {
  return (
    <View style={styles.container}>
      <Text style={styles.positionText}>{data.position}</Text>
      <View style={styles.seperator}></View>

      <Image
        source={{
          uri: data.clubImage,
        }}
        style={styles.clubLogo}
        resizeMode="contain"
      />

      <View style={styles.column}>
        <Text style={styles.clubName}>{data.name}</Text>
        <Text style={styles.playerName}>{data.clubName}</Text>
      </View>

      <Text style={styles.scoreAmount}>{data.amount}</Text>
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
    marginRight: 6,
  },
  positionText: {
    marginLeft: 12,
    color: "#686868",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 20,
    alignItems: "center",
  },
  seperator: {
    height: "80%",
    width: 1,
    backgroundColor: "#222A36",
    marginLeft: 10,
  },

  column: {
    flexDirection: "column",
    marginLeft: 20,
    backgroundColor: "transparent",
  },
  clubName: {
    color: "#C0C0C0",
    fontWeight: "bold",
    fontSize: 15,
  },
  playerName: {
    color: "#686868",
    fontWeight: "bold",
    fontSize: 12,
  },

  scoreAmount: {
    position: "absolute",
    right: 6,
    height: 32,
    width: 32,
    color: "#686868",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 20,
    alignItems: "center",
  },
  clubLogo: {
    height: 32,
    width: 32,
    marginLeft: 15,
  },
});
