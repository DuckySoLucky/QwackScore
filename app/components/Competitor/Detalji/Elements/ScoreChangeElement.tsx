import { StyleSheet, Image, ScrollView, ActivityIndicator, Pressable, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import { Text, View } from "@/components/Themed";

export default function DetaljiList({
  side,
  player,
  time,
  home,
  away,
}: {
  side: string;
  player: string;
  time: string;
  home: number;
  away: number;
}) {
  if (side === "right") {
    return (
      <View style={styles.outerContainer}>
        <Text
          style={{
            ...styles.playerName,
            marginRight: 12,
          }}
        >
          {player}
        </Text>
        <Text style={styles.scoreText}>
          {home} - {away}
        </Text>

        <View style={styles.seperator} />

        <View style={styles.column}>
          <Image
            source={{
              uri: "https://media.discordapp.net/attachments/970319574048333865/1224481718774534164/image.png?ex=661da677&is=660b3177&hm=92d0931d1c66359c56b34f807c7b442a9b81956b9f5601335f02f4759dd3e93b&=&format=webp&quality=lossless",
            }}
            style={styles.yellowCard}
            resizeMode="contain"
          />
          <Text style={styles.yellowCardTime}>{time}</Text>
        </View>
      </View>
    );
  }

  return (
    <View
      style={{
        ...styles.outerContainer,
        justifyContent: "flex-start",
        marginLeft: 12,
      }}
    >
      <View style={styles.column}>
        <Image
          source={{
            uri: "https://media.discordapp.net/attachments/970319574048333865/1224481718774534164/image.png?ex=661da677&is=660b3177&hm=92d0931d1c66359c56b34f807c7b442a9b81956b9f5601335f02f4759dd3e93b&=&format=webp&quality=lossless",
          }}
          style={styles.yellowCard}
          resizeMode="contain"
        />
        <Text style={styles.yellowCardTime}>{time}</Text>
      </View>

      <View
        style={{
          ...styles.seperator,
          marginLeft: 6,
        }}
      />

      <Text style={styles.scoreText}>
        {away} - {home}
      </Text>
      <View style={styles.column2}>
        <Text
          style={{
            ...styles.playerName,
            textAlign: "left",
          }}
        >
          {player}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    marginLeft: 6,
    marginRight: 6,
    height: 64,
    backgroundColor: "transparent",
    marginTop: 12,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  column: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
    marginRight: 6,
    width: 40,
  },
  yellowCard: {
    borderRadius: 1,
    height: 32,
    width: 26,
    marginTop: 6,
  },
  yellowCardTime: {
    marginTop: 3,
    color: "#686868",
    fontSize: 12,
  },
  seperator: {
    height: "80%",
    width: 1,
    backgroundColor: "#222A36",
    marginRight: 12,
  },
  column2: {
    backgroundColor: "transparent",
    marginRight: 12,
  },
  playerName: {
    textAlign: "right",
    color: "#C0C0C0",
    fontWeight: "bold",
  },
  yellowCardReason: {
    textAlign: "right",
    color: "#686868",
  },
  playerNameLeft: {
    textAlign: "left",
    color: "#C0C0C0",
    fontWeight: "bold",
  },
  yellowCardReasonLeft: {
    textAlign: "left",
    color: "#686868",
  },
  scoreText: {
    fontSize: 24,
    fontWeight: "bold",
    marginRight: 12,
  },
});
