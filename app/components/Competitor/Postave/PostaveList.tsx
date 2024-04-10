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

export default function DetaljiList({ timelineData, lineupsData }) {
  const [selectedForm, setSelectedForm] = useState("default");

  const renderComponents = () => {
    return (
      <View style={styles.outerContainer}>
        <SoccerFieldElement lineupsData={lineupsData} />

        <View style={styles.row}>
          <TouchableOpacity
            style={selectedForm === "default" ? styles.selectedButtonElement : styles.buttonElement}
            onPress={() => setSelectedForm("default")}
            activeOpacity={1}
          >
            <Image
              source={{
                uri: timelineData.competitors[0].image,
              }}
              style={styles.clubSelectImage}
              resizeMode="contain"
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={selectedForm === "all" ? styles.selectedButtonElement : styles.buttonElement}
            onPress={() => setSelectedForm("all")}
            activeOpacity={1}
          >
            <Image
              source={{
                uri: timelineData.competitors[1].image,
              }}
              style={styles.clubSelectImage}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>

        <CoachElement
          name={selectedForm === "default" ? lineupsData.away.coach[0].name : lineupsData.home.coach[0].name}
          type={null}
          number={null}
        />

        <View style={styles.matchInformationContainer}>
          <Text style={styles.matchInformation}>Substitutions</Text>
          <View style={styles.seperator} />

          {(selectedForm === "default" ? lineupsData.away.substitutions : lineupsData.home.substitutions).map(
            (substitution, index) => {
              return (
                <SubstitutionElement
                  key={index}
                  name={substitution.name}
                  type={substitution.type}
                  number={substitution.jersey_number}
                />
              );
            }
          )}
        </View>
      </View>
    );
  };

  return <FlatList data={[1]} renderItem={renderComponents} keyExtractor={(item, index) => index.toString()} />;
}

const styles = StyleSheet.create({
  outerContainer: {
    backgroundColor: "#161F29",
    flex: 1,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 6,
    backgroundColor: "transparent",
  },
  clubSelectImage: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  buttonElement: {
    backgroundColor: "#10181E",
    height: 32,
    width: 180,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#000000",
    borderRadius: 8,
  },
  selectedButtonElement: {
    backgroundColor: "rgba(85, 85, 255, 0.15)",
    height: 32,
    width: 180,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#5555FF",
    borderRadius: 8,
  },

  matchInformationContainer: {
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: "#10181E",
    marginLeft: 6,
    marginRight: 6,
    marginTop: 6,
    marginBottom: 6,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#00000",
    paddingBottom: 6,
  },
  matchInformation: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#686868",
    textAlign: "center",
  },
  seperator: {
    width: "95%",
    height: 1,
    backgroundColor: "#222A36",
    marginTop: 6,
    marginBottom: 6,
    marginLeft: "2.5%",
  },
});
