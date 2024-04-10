import { StyleSheet, ActivityIndicator, Pressable, FlatList } from "react-native";
import React from "react";
import { Text, View } from "@/components/Themed";
import { useNavigation } from "expo-router";

import BestClubElementColumn from "@/components/Lige/Detalji/BestClubElementColumn";

export default function DetaljiList({ statsData, season, handlePress }) {
  const navigation = useNavigation();

  const renderItem = ({ item: key }) => {
    if (!statsData.teams[key]?.length) {
      return <View key={key + Math.random()}></View>;
    }

    return (
      <View style={styles.container} key={key + Math.random()}>
        <Text style={styles.roundText}>{titleCase(key)}</Text>
        {statsData.teams[key].slice(0, 3).map((team) => {
          return <BestClubElementColumn data={team} key={team.id} />;
        })}

        <Pressable onPress={() => navigation.navigate("lige/customModal", { season: season, data: statsData })}>
          <View style={styles.containerExpand}>
            <Text style={styles.expandText}>Proširite</Text>
          </View>
        </Pressable>
      </View>
    );
  };

  return (
    <FlatList
      data={Object.keys(statsData.teams)}
      renderItem={renderItem}
      keyExtractor={(item) => item}
      contentContainerStyle={styles.outerContainer}
    />
  );
}

function titleCase(str: string) {
  const output = str
    .toLowerCase()
    .split("_")
    .map(function (word) {
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");

  return output.includes("/") ? output.toUpperCase() : output;
}

const styles = StyleSheet.create({
  outerContainer: {
    backgroundColor: "#161e28",
    position: "relative",
  },
  container: {
    marginTop: 6,
    backgroundColor: "#10181E",
    borderWidth: 1,
    borderColor: "#000000",
    borderRadius: 10,
    paddingRight: 6,
  },
  roundText: {
    color: "#686868",
    fontWeight: "bold",
    marginLeft: 6,
    marginTop: 6,
  },
  containerExpand: {
    marginTop: 6,
    backgroundColor: "#0C1216",
    borderWidth: 1,
    borderColor: "#000000",
    borderRadius: 5,
    width: 378 - 12,
    marginLeft: 6,
    flexDirection: "row",
    alignItems: "center",
    textAlign: "center",
    justifyContent: "center",
    marginBottom: 6,
  },
  expandText: {
    color: "#C0C0C0",
    fontWeight: "bold",
    textAlign: "center",
    paddingBottom: 3,
  },
});
