import { StyleSheet, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { View } from "@/components/Themed";

import FootballGameList from "@/components/Utakmice/FootballGameList";

export default function DetaljiList({ season, handlePress }) {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<Response | null>(null);

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
  }, []);

  if (isLoading || data === null) {
    return <ActivityIndicator size="large" color="#00ff00" />;
  }

  return (
    <View style={styles.container}>
      <FootballGameList data={data} key={Math.random().toString(36).substring(7)} />
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
