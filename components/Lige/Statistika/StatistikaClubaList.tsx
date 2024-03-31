import { StyleSheet, ScrollView, ActivityIndicator, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { Text, View } from "@/components/Themed";
import { useNavigation } from "expo-router";

import BestClubElementColumn from "@/components/Lige/Detalji/BestClubElementColumn";

export default function DetaljiList({ statsData, season, handlePress }) {
  const navigation = useNavigation();

  return (
    <ScrollView>
      <View style={styles.outerContainer}>
        {Object.keys(statsData.teams).map((key) => {
          if (!statsData.teams[key]?.length) {
            return <View></View>;
          }

          return (
            <View style={styles.container}>
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
        })}
      </View>
    </ScrollView>
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
