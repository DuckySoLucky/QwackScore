import { StyleSheet, Image, ScrollView, ActivityIndicator, Pressable, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import { Text, View } from "@/components/Themed";

export default function DetaljiList({
  side,
  playerIn,
  playerOut,
  time,
}: {
  side: string;
  playerIn: string;
  playerOut: string;
  time: string;
}) {
  if (side === "right") {
    return (
      <View style={styles.outerContainer}>
        <View style={styles.column2}>
          <Text style={styles.playerName}>In: {playerIn}</Text>
          <Text style={styles.yellowCardReason}>Out: {playerOut}</Text>
        </View>

        <View style={styles.seperator} />

        <View style={styles.column}>
          <Image
            source={{
              uri: "https://media.discordapp.net/attachments/970319574048333865/1224721418420490352/image.png?ex=661e85b4&is=660c10b4&hm=7c0bf5a8e4d0f0a90bbcb66536d0bd9f5d5f575ce1d27b5fb63fdefdf4229b04&=&format=webp&quality=lossless",
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
            uri: "https://media.discordapp.net/attachments/970319574048333865/1224721418420490352/image.png?ex=661e85b4&is=660c10b4&hm=7c0bf5a8e4d0f0a90bbcb66536d0bd9f5d5f575ce1d27b5fb63fdefdf4229b04&=&format=webp&quality=lossless",
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

      <View style={styles.column2}>
        <Text
          style={{
            ...styles.playerName,
            textAlign: "left",
          }}
        >
          In: {playerIn}
        </Text>
        <Text
          style={{
            ...styles.yellowCardReason,
            textAlign: "left",
          }}
        >
          Out: {playerOut}
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
    flexDirection: "column",
    justifyContent: "center",
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
});
