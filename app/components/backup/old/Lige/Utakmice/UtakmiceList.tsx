import { StyleSheet, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { View } from "@/components/Themed";

import FootballGameList from "@/components/old/Utakmice/FootballGameList";

export default function DetaljiList({ utakmiceData, season, handlePress }) {
  return (
    <View style={styles.container}>
      <FootballGameList data={utakmiceData} key={Math.random().toString(36).substring(7)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#161e28",
  },
});
