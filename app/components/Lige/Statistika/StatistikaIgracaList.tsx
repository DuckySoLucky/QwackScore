import { StyleSheet, FlatList, ActivityIndicator, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { Text, View } from "@/components/Themed";
import { useNavigation } from "expo-router";

import BestPlayerElementColumn from "@/components/Lige/Detalji/BestPlayerElementColumn";

export default function DetaljiList({ statsData, season, handlePress }) {
  const navigation = useNavigation();

  const renderItem = ({ item: key }) => (
    <View style={styles.container}>
      <Text style={styles.roundText}>{titleCase(key)}</Text>
      {statsData.players[key].slice(0, 3).map((player) => {
        return <BestPlayerElementColumn data={player} key={player.id} />;
      })}

      <Pressable onPress={() => navigation.navigate("lige/customModal", { season: season, data: data })}>
        <View style={styles.containerExpand}>
          <Text style={styles.expandText}>Proširite</Text>
        </View>
      </Pressable>
    </View>
  );

  return (
    <FlatList
      data={Object.keys(statsData.players)}
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
    flex: 1,
  },
  container: {
    marginTop: 6,
    backgroundColor: "#10181E",
    borderWidth: 1,
    borderColor: "#000000",
    borderRadius: 10,
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
