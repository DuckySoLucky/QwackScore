import { StyleSheet, ScrollView, ActivityIndicator, Button, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { Text, View } from "@/components/Themed";

import PoredakListElement from "@/components/Lige/Poredak/PoredakListElement";

export default function GamesList({ season, handlePress }) {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<Response | null>(null);
  const [selectedForm, setSelectedForm] = useState("default");

  useEffect(() => {
    fetch(`http://192.168.0.111:3000/standings/${season.id}`)
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
    <View style={styles.outerContainer}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={selectedForm === "default" ? styles.selectedButtonElement : styles.buttonElement}
          onPress={() => setSelectedForm("default")}
          activeOpacity={1}
        >
          <Text style={selectedForm === "default" ? styles.selectedButtonText : styles.buttonText}>Default</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={selectedForm === "forma" ? styles.selectedButtonElement : styles.buttonElement}
          onPress={() => setSelectedForm("forma")}
          activeOpacity={1}
        >
          <Text style={selectedForm === "forma" ? styles.selectedButtonText : styles.buttonText}>Forma</Text>
        </TouchableOpacity>
      </View>

      {selectedForm === "default" ? (
        <View style={styles.container}>
          <View style={styles.row}>
            <Text style={styles.positionRow}>#</Text>
            <Text style={styles.teamNameRow}>Tim</Text>
            <Text style={styles.PRow}>P</Text>
            <Text style={styles.GDRow}>GD</Text>
            <Text style={styles.PTSRow}>PTS</Text>
          </View>

          {data.map((team) => {
            return (
              <PoredakListElement
                data={team}
                type="default"
                last={data.indexOf(team) === data.length - 1}
                key={team.id}
              />
            );
          })}
        </View>
      ) : (
        <View style={styles.container}>
          <View style={styles.row}>
            <Text style={styles.positionRow}>#</Text>
            <Text style={styles.teamNameRow}>Tim</Text>
            <Text style={styles.formaRow}>Forma</Text>
          </View>

          {data.map((team) => {
            return (
              <PoredakListElement data={team} type="form" last={data.indexOf(team) === data.length - 1} key={team.id} />
            );
          })}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    backgroundColor: "#161e28",
    paddingBottom: 12,
    paddingRight: 6,
    paddingLeft: 6,
    width: "100%",
    height: "100%",
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
    borderBottomWidth: 1,
    borderBottomColor: "#000000",
    backgroundColor: "transparent",
    alignItems: "center",
  },
  positionRow: {
    color: "#686868",
    fontWeight: "bold",
    fontSize: 16,
    marginLeft: 13,
  },
  teamNameRow: {
    color: "#686868",
    fontWeight: "bold",
    fontSize: 16,
    marginLeft: 19,
  },
  PRow: {
    color: "#686868",
    fontWeight: "bold",
    fontSize: 16,
    marginLeft: 170,
  },
  GDRow: {
    color: "#686868",
    fontWeight: "bold",
    fontSize: 16,
    marginLeft: 26,
  },
  PTSRow: {
    color: "#686868",
    fontWeight: "bold",
    fontSize: 16,
    marginLeft: 26,
  },
  formaRow: {
    color: "#686868",
    fontWeight: "bold",
    fontSize: 16,
    position: "absolute",
    right: 13,
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 10,
    marginLeft: 6,
    backgroundColor: "transparent",
  },
  buttonElement: {
    backgroundColor: "#161F29",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#686868",
    paddingTop: 3,
    paddingBottom: 3,
    paddingLeft: 6,
    paddingRight: 6,
    marginRight: 6,
  },
  selectedButtonElement: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#686868",
    paddingTop: 3,
    paddingBottom: 3,
    paddingLeft: 6,
    paddingRight: 6,
    marginRight: 6,
  },
  buttonText: {
    color: "#686868",
    fontSize: 12,
    fontWeight: "bold",
  },
  selectedButtonText: {
    color: "#161F29",
    fontSize: 12,
    fontWeight: "bold",
  },
});
