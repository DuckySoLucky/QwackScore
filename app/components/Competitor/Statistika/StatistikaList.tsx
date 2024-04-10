import {
  Animated,
  StyleSheet,
  Image,
  ScrollView,
  ActivityIndicator,
  Pressable,
  Dimensions,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Text, View } from "@/components/Themed";

import SoccerFieldElement from "@/components/Competitor/Postave/Elements/SoccerFieldElement";
import CoachElement from "@/components/Competitor/Postave/Elements/SubstitutionElement";
import SubstitutionElement from "@/components/Competitor/Postave/Elements/SubstitutionElement";
import ProgressElement from "@/components/Competitor/Statistika/Elements/ProgressElement";

export default function DetaljiList({ summaryData }) {
  const renderComponents = () => {
    return (
      <View style={styles.outerContainer}>
        <View style={styles.container}>
          {summaryData.team.map((stat) => {
            if (!stat.home && !stat.away) {
              return <></>;
            }

            return (
              <ProgressElement
                name={stat.name}
                left={stat.home}
                right={stat.away}
                leftProgress={stat.progress.left}
                rightProgress={stat.progress.right}
                key={stat.id}
              />
            );
          })}
        </View>
      </View>
    );
  };

  return <FlatList data={[1]} renderItem={renderComponents} keyExtractor={(item, index) => index.toString()} />;
}

const styles = StyleSheet.create({
  outerContainer: {
    backgroundColor: "#161F29",
    paddingBottom: 12,
    paddingRight: 6,
    paddingLeft: 6,
    flex: 1,
  },
  container: {
    marginTop: 6,
    backgroundColor: "#10181E",
    borderWidth: 1,
    borderColor: "#000000",
    borderRadius: 10,
    height: "auto",
  },
  row: {
    flexDirection: "row",
    padding: 6,
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 6,
  },
  scoreValue: {
    fontSize: 18,
    color: "#686868",
    fontWeight: "bold",
  },
  scoreLabel: {
    fontSize: 16,
    color: "#686868",
    fontWeight: "bold",
  },
  rightBar: {
    marginLeft: 24,
    width: 166,
    height: 16,
    borderTopEndRadius: 10,
    borderBottomEndRadius: 10,
    backgroundColor: "#222A36",
  },
  leftBar: {
    width: 166,
    height: 16,
    borderTopStartRadius: 10,
    borderBottomStartRadius: 10,
    backgroundColor: "#222A36",
  },
  rightBarFilled: {
    marginLeft: -166,
    height: 16,
    borderTopEndRadius: 10,
    borderBottomEndRadius: 10,
    backgroundColor: "#CA5509",
  },
  leftBarFilled: {
    height: 16,
    borderTopStartRadius: 10,
    borderBottomStartRadius: 10,
    backgroundColor: "#CA5509",
  },
  progressRow: {
    flexDirection: "row",
    padding: 6,
    backgroundColor: "transparent",
    alignItems: "center",
    marginHorizontal: 6,
    borderBottomWidth: 1,
    borderBottomColor: "#000000",
  },
});
