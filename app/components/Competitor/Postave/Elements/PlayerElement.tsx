import { StyleSheet, Image, ScrollView, ActivityIndicator, Pressable, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import { Text, View } from "@/components/Themed";

export default function DetaljiList({ name, number }: { name: string; number: number }) {
  return (
    <View style={styles.playerElement}>
      <Image
        source={{
          uri: "https://media.discordapp.net/attachments/970319574048333865/1225114042633289748/image.png?ex=661ff35d&is=660d7e5d&hm=1682154eec1692573d4a5c872d5542badb46803d5d5dd0a14d5ca94884e37b8b&=&format=webp&quality=lossless",
        }}
        style={styles.playerImage}
        resizeMode="contain"
      />
      <Text style={styles.playerNumber}>{number}</Text>

      <Text style={styles.playerName}>{name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  playerElement: {
    alignItems: "center",
    backgroundColor: "transparent",
  },
  playerNumber: {
    fontSize: 12,
    color: "black",
    fontWeight: "bold",
    marginTop: -28,
  },
  playerImage: {
    width: 32,
    height: 32,
  },
  playerName: {
    marginTop: 12,
    fontSize: 12,
    color: "white",
    maxWidth: 80,
    textAlign: "center",
  },
});
