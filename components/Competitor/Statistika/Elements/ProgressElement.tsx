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

export default function DetaljiList({
  name,
  left,
  right,
  leftProgress,
  rightProgress,
}: {
  name: number;
  left: string;
  right: number;
  leftProgress: number;
  rightProgress: number;
}) {
  return (
    <View style={styles.bottomContainer}>
      <View style={styles.row}>
        <Text style={styles.scoreValue}>{left}</Text>
        <Text style={styles.scoreLabel}>{name}</Text>
        <Text style={styles.scoreValue}>{right}</Text>
      </View>

      <View style={styles.progressRow}>
        <View style={styles.leftBar} />
        <View
          style={[
            styles.leftBarFilled,
            {
              marginLeft: -27.6666666667 * leftProgress,
              width: 27.6666666667 * leftProgress,
            },
          ]}
        />

        <View style={styles.rightBar} />
        <View
          style={[
            styles.rightBarFilled,
            {
              width: 27.6666666667 * rightProgress,
            },
          ]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
    marginBottom: 6,
  },
  bottomContainer: {
    backgroundColor: "transparent",
    borderBottomWidth: 1,
    borderBottomColor: "#000000",
  },
});
