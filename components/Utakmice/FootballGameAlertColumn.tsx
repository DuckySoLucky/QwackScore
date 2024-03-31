import { StyleSheet, Image } from "react-native";

import { Text, View } from "@/components/Themed";

export default function FootballGameAlertColumn() {
  const first = "Osijek";
  const second = "Rudeš";

  return (
    <View style={styles.container}>
      <Text style={styles.dateText}>{"09.03.24\nFT"}</Text>
      <View style={styles.seperator}></View>

      <View style={styles.images}>
        <View style={styles.row}>
          <Image
            source={{
              uri: "https://media.discordapp.net/attachments/970319574048333865/1222929460974845982/image.png?ex=661800d0&is=66058bd0&hm=51c2dfe96155af594aa69dafa44a7dce79ed33e2fe433646b93313ebf06b4b65&=&format=webp&quality=lossless",
            }}
            style={styles.topImage}
            resizeMode="contain"
          />
          <Text style={styles.clubName}>{first}</Text>
        </View>

        <View style={styles.row}>
          <Image
            source={{
              uri: "https://media.discordapp.net/attachments/970319574048333865/1222929485163270195/image.png?ex=661800d6&is=66058bd6&hm=af497949987417a05a3980d6bded2c612bfa671b8681b86d545aa3c47ce7e2dd&=&format=webp&quality=lossless",
            }}
            style={styles.bottomImage}
            resizeMode="contain"
          />
          <Text style={styles.clubName}>{second}</Text>
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
  },
  dateText: {
    marginTop: 7.5,
    marginLeft: 6,
    color: "#686868",
    fontWeight: "bold",
    textAlign: "center",
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
  },
  topImage: {
    height: 18,
    width: 18,
  },
  bottomImage: {
    marginTop: 4,
    height: 18,
    width: 18,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#0C1216",
  },
  clubName: {
    marginLeft: 15,
    color: "#C0C0C0",
    fontSize: 13,
    fontWeight: "bold",
  },
  seperator2: {
    position: "absolute",
    right: 48,
    height: "80%",
    width: 1,
    backgroundColor: "#222A36",
    marginLeft: 10,
  },
  notificationIcon: {
    position: "absolute",
    right: 6,
    height: 32,
    width: 32,
  },
});
