import { StyleSheet, ScrollView, ActivityIndicator } from "react-native";
import { View } from "@/components/Themed";
import React, { useEffect, useState, useRef } from "react";

import FootballGameResultAlert from "@/components/old/Utakmice/FootballGameResultAlert";
import PlayerStatsAlert from "@/components/old/Utakmice/PlayerStatsAlert";
import FootballGameAlert from "@/components/old/Utakmice/FootballGameAlert";
import FootballGameList from "@/components/old/Utakmice/FootballGameList";
import { Competition, Response } from "../../types/data";

import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";
import { NewsResult } from "@/components/Utakmice/NewsResult";
import { UtakmiceList } from "@/components/Utakmice/UtakmiceList";

const queryClient = new QueryClient();

export default function TabOneScreen() {
  return (
    <QueryClientProvider client={queryClient}>
      <Output seasonId={"sr:season:118691"} />
    </QueryClientProvider>
  );
}

function Output({ seasonId }: { seasonId: string }) {
  const {
    isPending,
    error,
    data: schedulesData,
  } = useQuery({
    queryKey: ["standingsData"],
    queryFn: () =>
      fetch(`http://192.168.90.103:3000/schedules/${seasonId}`)
        .then((res) => res.json())
        .then((data) => data.data),
  });

  if (isPending) {
    return <ActivityIndicator size="large" color="#00ff00" />;
  }

  if (error) {
    return <View>Error: {error.message}</View>;
  }

  return (
    <View style={styles.container}>
      <ScrollView horizontal style={styles.topNews}>
        {schedulesData.matches.map((match: Competition) => {
          return <NewsResult data={match} key={match.id} />;
        })}
      </ScrollView>

      <UtakmiceList schedulesData={schedulesData.schedules} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#161e28",
  },
  topNews: {
    marginRight: 6,
    marginLeft: 6,
    marginTop: 6,
  },
});
