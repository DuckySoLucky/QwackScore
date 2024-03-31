import React, { useState, useEffect } from "react";
import { ScrollView, StyleSheet, Pressable, ActivityIndicator } from "react-native";

import { Text, View } from "@/components/Themed";

import DetaljiList from "@/components/Lige/Detalji/DetaljiList";
import PoredakList from "@/components/Lige/Poredak/PoredakList";
import UtakmiceList from "@/components/Lige/Utakmice/UtakmiceList";
import StatistikaIgracaList from "@/components/Lige/Statistika/StatistikaIgracaList";
import StatistikaClubaList from "@/components/Lige/Statistika/StatistikaClubaList";

import { useRoute } from "@react-navigation/native";

import { useNavigation } from "expo-router";

export default function LigaDetaljiScreen({ state = "details" }) {
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({ title: season.name });
  }, []);

  const route = useRoute();
  const { season } = route.params;

  let [selectedView, setSelectedView] = useState(state);
  let [isLoading, setIsLoading] = useState(false);

  const renderView = (handlePress) => {
    switch (selectedView) {
      case "poredak":
        return <PoredakList season={season} handlePress={handlePress} />;
      case "utakmice":
        return <UtakmiceList season={season} handlePress={handlePress} />;
      case "player_stats":
        return <StatistikaIgracaList season={season} handlePress={handlePress} />;
      case "team_stats":
        return <StatistikaClubaList season={season} handlePress={handlePress} />;
      default:
        selectedView = "details";
        return <DetaljiList season={season} handlePress={handlePress} />;
    }
  };

  const handlePress = (view) => {
    setSelectedView(view);
  };

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 0);
  }, [selectedView]);

  return (
    <View style={styles.container}>
      <ScrollView horizontal style={styles.scroll}>
        <Pressable onPress={() => handlePress("details")}>
          <Text style={selectedView === "details" ? styles.selectedTitle : styles.title}>Detalji</Text>
        </Pressable>
        <Pressable onPress={() => handlePress("utakmice")}>
          <Text style={selectedView === "utakmice" ? styles.selectedTitle : styles.title}>Utakmice</Text>
        </Pressable>
        <Pressable onPress={() => handlePress("poredak")}>
          <Text style={selectedView === "poredak" ? styles.selectedTitle : styles.title}>Poredak</Text>
        </Pressable>
        <Pressable onPress={() => handlePress("player_stats")}>
          <Text style={selectedView === "player_stats" ? styles.selectedTitle : styles.title}>Statistika Igraca</Text>
        </Pressable>
        <Pressable onPress={() => handlePress("team_stats")}>
          <Text style={selectedView === "team_stats" ? styles.selectedTitle : styles.title}>Statistika Timova</Text>
        </Pressable>
      </ScrollView>

      <View style={styles.statsContainer}>
        {isLoading ? <ActivityIndicator size="large" color="#00ff00" /> : renderView(handlePress)}
      </View>
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
