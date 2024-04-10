import { StyleSheet, Image, ScrollView, ActivityIndicator, Pressable, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import { Text, View } from "@/components/Themed";

import PlayerElement from "@/components/Competitor/Postave/Elements/PlayerElement";

export default function DetaljiList({ lineupsData }) {
  return (
    <>
      <Image
        source={{
          uri: "https://media.discordapp.net/attachments/970319574048333865/1225121612672536678/image.png?ex=661ffa6a&is=660d856a&hm=ee910be7aa58684cbee452324f4fcc84ebf4dc478353aad3dd0c3c1a7ea5a165&=&format=webp&quality=lossless",
        }}
        style={styles.fieldIcon}
        resizeMode="contain"
      />

      <View style={styles.lineupContainer}>
        <View style={styles.goalKeeperRow}>
          {lineupsData.home.goalkeeper.map((player) => {
            return <PlayerElement name={player.name} number={player.jersey_number} />;
          })}
        </View>

        <View style={styles.defenderRow}>
          {lineupsData.home.defenders.map((player) => {
            return <PlayerElement name={player.name} number={player.jersey_number} />;
          })}
        </View>

        <View style={styles.midfielderRow}>
          {lineupsData.home.midfielders.map((player) => {
            return <PlayerElement name={player.name} number={player.jersey_number} />;
          })}
        </View>

        <View style={styles.forwardRow}>
          {lineupsData.home.forwards.map((player) => {
            return <PlayerElement name={player.name} number={player.jersey_number} />;
          })}
        </View>

        <View style={styles.forwardRowBottom}>
          {lineupsData.away.forwards.map((player) => {
            return <PlayerElement name={player.name} number={player.jersey_number} />;
          })}
        </View>

        <View style={styles.midfielderRowBottom}>
          {lineupsData.away.midfielders.map((player) => {
            return <PlayerElement name={player.name} number={player.jersey_number} />;
          })}
        </View>

        <View style={styles.defenderRowBottom}>
          {lineupsData.away.defenders.map((player) => {
            return <PlayerElement name={player.name} number={player.jersey_number} />;
          })}
        </View>

        <View style={styles.goalKeeperRowBottom}>
          {lineupsData.away.goalkeeper.map((player) => {
            return <PlayerElement name={player.name} number={player.jersey_number} />;
          })}
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  fieldIcon: {
    width: Dimensions.get("window").width - 12,
    height: 600,
    marginLeft: 6,
    marginRight: 6,
  },
  lineupContainer: {
    width: Dimensions.get("window").width - 12,
    height: 576,
    marginLeft: 6,
    marginRight: 6,
    marginTop: -588,
    backgroundColor: "transparent",
    marginBottom: 12,
  },
  goalKeeperRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 16,
    backgroundColor: "transparent",
  },
  defenderRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginHorizontal: 16,
    marginTop: 16,
    backgroundColor: "transparent",
  },
  midfielderRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginHorizontal: 16,
    marginTop: 16,
    backgroundColor: "transparent",
  },
  forwardRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "transparent",
    marginHorizontal: 16,
    marginTop: 16,
  },

  goalKeeperRowBottom: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
    backgroundColor: "transparent",
  },
  defenderRowBottom: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginHorizontal: 16,
    marginTop: 10,
    backgroundColor: "transparent",
  },
  midfielderRowBottom: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginHorizontal: 16,
    marginTop: 10,
    backgroundColor: "transparent",
  },
  forwardRowBottom: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 12,
    backgroundColor: "transparent",
  },
});
