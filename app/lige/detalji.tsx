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

const API_ENDPOINTS = {
  standings: "http://192.168.0.111:3000/standings",
  schedules: "http://192.168.0.111:3000/schedules",
  stats: "http://192.168.0.111:3000/stats",
};

async function fetchData(endpoint, id) {
  const response = await fetch(`${endpoint}/${id}`);
  const data = await response.json();
  return data.data;
}

const VIEW_COMPONENTS = {
  poredak: PoredakList,
  utakmice: UtakmiceList,
  player_stats: StatistikaIgracaList,
  team_stats: StatistikaClubaList,
  default: DetaljiList,
};

export default function LigaDetaljiScreen({ state = "details" }) {
  const route = useRoute();
  const season = route.params.season;

  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({ title: season.name });
  }, []);

  const [isLoading, setIsLoading] = useState(true);
  const [statsData, setStatsData] = useState<Response | null>(null);
  const [schedulesData, setSchedulesData] = useState<Response | null>(null);
  const [standingsData, setStandingsData] = useState<Response | null>(null);

  useEffect(() => {
    setIsLoading(true);

    const fetchAllData = async () => {
      try {
        const standingsData = await fetchData(API_ENDPOINTS.standings, season.id);
        setStandingsData(standingsData);

        const schedulesData = await fetchData(API_ENDPOINTS.schedules, season.id);
        setSchedulesData(schedulesData);

        const statsData = await fetchData(API_ENDPOINTS.stats, season.id);
        setStatsData(statsData);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchAllData().then(() => setIsLoading(false));
  }, []);

  const [selectedView, setSelectedView] = useState(state);
  const ViewComponent = VIEW_COMPONENTS[selectedView] || VIEW_COMPONENTS.default;

  const handleViewChange = (view) => {
    setSelectedView(view);
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal style={styles.scroll}>
        <Pressable onPress={() => handleViewChange("details")}>
          <Text style={selectedView === "details" ? styles.selectedTitle : styles.title}>Detalji</Text>
        </Pressable>
        <Pressable onPress={() => handleViewChange("utakmice")}>
          <Text style={selectedView === "utakmice" ? styles.selectedTitle : styles.title}>Utakmice</Text>
        </Pressable>
        <Pressable onPress={() => handleViewChange("poredak")}>
          <Text style={selectedView === "poredak" ? styles.selectedTitle : styles.title}>Poredak</Text>
        </Pressable>
        <Pressable onPress={() => handleViewChange("player_stats")}>
          <Text style={selectedView === "player_stats" ? styles.selectedTitle : styles.title}>Statistika Igraca</Text>
        </Pressable>
        <Pressable onPress={() => handleViewChange("team_stats")}>
          <Text style={selectedView === "team_stats" ? styles.selectedTitle : styles.title}>Statistika Timova</Text>
        </Pressable>
      </ScrollView>

      <View style={styles.statsContainer}>
        {isLoading ? (
          <ActivityIndicator size="large" color="#00ff00" />
        ) : (
          <ViewComponent
            statsData={statsData}
            utakmiceData={schedulesData}
            standingsData={standingsData}
            season={season}
            handlePress={handleViewChange}
          />
        )}
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
