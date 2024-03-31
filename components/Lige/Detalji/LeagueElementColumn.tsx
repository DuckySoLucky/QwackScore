import { StyleSheet, Image } from "react-native";

import { Text, View } from "@/components/Themed";

export default function LeagueElementColumn({ season }) {
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: "https://media.discordapp.net/attachments/970319574048333865/1222971718830788828/image.png?ex=6618282b&is=6605b32b&hm=25805bbc9dd4c95bbe8da48c9c8668b096be65f88f8af693598877594f940ca6&=&format=webp&quality=lossless",
        }}
        style={styles.logoImage}
        resizeMode="contain"
      />

      <Text>{season.name}</Text>
      <Image
        source={{
          uri: "https://media.discordapp.net/attachments/970319574048333865/1222974383438561391/image.png?ex=66182aa6&is=6605b5a6&hm=8a41fcfe01f5b17609647e57c8946225d59ffe47dad0cd51c1313a3238519734&=&format=webp&quality=lossless",
        }}
        style={styles.dropdownIcon}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",

    width: "100%",
    marginTop: 12,
    backgroundColor: "transparent",
  },
  logoImage: {
    height: 32,
    width: 32,
    marginLeft: 6,
  },
  dropdownIcon: {
    position: "absolute",
    right: 12,

    height: 32,
    width: 32,
  },
  mainText: {
    color: "#C0C0C0",
    fontWeight: "bold",
    marginLeft: 12,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
  },
});
