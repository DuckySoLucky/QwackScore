import React, { useState, useEffect } from "react";
import { ScrollView, StyleSheet, Pressable, ActivityIndicator } from "react-native";
import { Link } from "expo-router";

import { Text, View } from "@/components/Themed";

import DetaljiList from "@/components/old/Lige/Detalji/DetaljiList";
import PoredakList from "@/components/old/Lige/Poredak/PoredakList";

export default function LigaPoredakScreen() {
  return (
    <View style={styles.container}>
      <Text>YOOOOOOO</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#121212",
  },
  scroll: {
    marginLeft: 5,
    height: 40,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#686868",
    marginRight: 40,
    textAlign: "center",
    alignItems: "center",
  },
  selectedTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#CA5509",
    marginRight: 40,
    textAlign: "center",
    alignItems: "center",
  },

  statsContainer: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#161e28",
    height: 730,
    width: "100%",
  },
});
