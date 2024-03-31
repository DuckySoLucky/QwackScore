import { StyleSheet, Image, ScrollView, ActivityIndicator, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { Text, View } from "@/components/Themed";
import { useNavigation } from "expo-router";

import FootballGameAlertColumn from "@/components/Utakmice/FootballGameAlertColumn";
import BestPlayerElementColumn from "@/components/Lige/Detalji/BestPlayerElementColumn";
import BestClubElementColumn from "@/components/Lige/Detalji/BestClubElementColumn";
import FootballGameListColumn from "@/components/Utakmice/FootballGameListColumn";
import LigaDetaljiScreen from "@/app/lige/detalji";

export default function DetaljiList({ season, handlePress }) {
  const [isLoading, setIsLoading] = useState(true);
  const [utakmiceData, setData] = useState<Response | null>(null);
  const [statsData, setStatsData] = useState<Response | null>(null);
  const navigation = useNavigation();

  useEffect(() => {
    fetch(`http://192.168.0.111:3000/schedules/${season.id}`)
      .then((response) => response.json())
      .then((data) => {
        setData(data.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setIsLoading(false);
      });

    fetch(`http://192.168.0.111:3000/stats/${season.id}`)
      .then((response) => response.json())
      .then((data) => {
        setStatsData(data.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setIsLoading(false);
      });
  }, []);

  if (isLoading || utakmiceData === null || statsData === null) {
    return <ActivityIndicator size="large" color="#00ff00" />;
  }

  return (
    <ScrollView>
      <View style={styles.outerContainer}>
        <Text style={styles.roundText}>Utakmice</Text>
        <View style={styles.container}>
          {utakmiceData.firstThreeMatchs.map((match) => {
            return <FootballGameListColumn data={match} key={match.id} />;
          })}

          <Pressable onPress={() => handlePress("utakmice")}>
            <View style={styles.containerExpand}>
              <Text style={styles.expandText}>Proširite</Text>
            </View>
          </Pressable>
        </View>

        {statsData.teams.points.length ? (
          <>
            <Text style={styles.roundText}>Postignuti Bodovi</Text>
            <View style={styles.container}>
              {statsData.teams.points.slice(0, 3).map((club) => {
                return <BestClubElementColumn data={club} key={club.id} />;
              })}

              <Pressable onPress={() => handlePress("poredak")}>
                <View style={styles.containerExpand}>
                  <Text style={styles.expandText}>Proširite</Text>
                </View>
              </Pressable>
            </View>
          </>
        ) : null}

        {statsData.players.goals?.length ? (
          <>
            <Text style={styles.roundText}>Postignuti Golovi</Text>
            <View style={styles.container}>
              {statsData.players.goals.slice(0, 3).map((player) => {
                return <BestPlayerElementColumn data={player} key={player.id} />;
              })}

              <Pressable
                onPress={() => navigation.navigate("lige/customModal", { season: season, data: utakmiceData })}
              >
                <View style={styles.containerExpand}>
                  <Text style={styles.expandText}>Proširite</Text>
                </View>
              </Pressable>
            </View>
          </>
        ) : null}
      </View>
    </ScrollView>
  );
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
