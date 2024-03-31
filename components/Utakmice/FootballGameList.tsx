import React, { useRef, useEffect, memo } from "react";
import { StyleSheet, FlatList } from "react-native";
import { Text, View } from "@/components/Themed";

import FootballGameListColumn from "@/components/Utakmice/FootballGameListColumn";
import { Competition, Response, Schedules } from "@/types/data";

const MemoizedFootballGameListColumn = memo(FootballGameListColumn);

export default function FootballGameList({ data }) {
  const scrollViewRef = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      scrollViewRef.current?.scrollToOffset({ offset: data.currentRound * 290, animated: false });
    }, 1);
  }, []);

  const renderItem = ({ item: { round, matches } }) => (
    <View style={styles.test} key={round}>
      <Text style={styles.roundText}>Runda {round}</Text>
      {matches.map((match) => {
        if (match.status === "closed" || match.status === "not_started") {
          return <MemoizedFootballGameListColumn data={match} key={match.id} />;
        } else {
          return null;
        }
      })}
    </View>
  );

  const groupedData = Object.entries(data.schedules).map(([round, matches]) => ({ round, matches }));

  return (
    <FlatList
      contentContainerStyle={[styles.outerContainer, styles.container]}
      ref={scrollViewRef}
      data={groupedData}
      renderItem={renderItem}
      keyExtractor={(item) => item.round}
    />
  );
}
const styles = StyleSheet.create({
  outerContainer: {
    marginTop: 5,
    backgroundColor: "#161e28",
  },
  container: {
    backgroundColor: "#10181E",
    borderWidth: 1,
    borderColor: "#000000",
    borderRadius: 10,
    marginBottom: 10,
  },
  roundText: {
    color: "#686868",
    fontWeight: "bold",
    marginLeft: 6,
    marginTop: 6,
  },
  test: {
    backgroundColor: "transparent",
    paddingRight: 6,
    paddingBottom: 12,
  },
});
