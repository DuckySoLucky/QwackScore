import { StyleSheet, Image, ScrollView, Dimensions } from "react-native";
import { Text, View } from "@/components/Themed";

import LeagueElement from "@/components/Lige/Detalji/LeagueElement";

export default function TabTwoScreen() {
  return (
    <ScrollView style={styles.outerContainer}>
      <View style={styles.container}>
        <LeagueElement key={Math.random().toString(36).substring(7)} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    paddingLeft: 6,
    paddingRight: 6,
    paddingTop: 6,
    backgroundColor: "#161e28", //
    flexDirection: "row",
  },
  container: {
    backgroundColor: "#10181E", //
    borderWidth: 1,
    borderColor: "#000000",
    borderRadius: 10,
    paddingRight: 6,
    width: Dimensions.get("window").width - 12,
    height: "100%",
  },
});
