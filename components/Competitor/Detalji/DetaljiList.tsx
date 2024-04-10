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

import YellowCardElement from "@/components/Competitor/Detalji/Elements/YellowCardElement";
import SubstitutionElement from "@/components/Competitor/Detalji/Elements/SubstitutionElement";
import FreeKickElement from "@/components/Competitor/Detalji/Elements/FreeKickElement";
import ThrowInElement from "@/components/Competitor/Detalji/Elements/ThrowInElement";
import ShotSavedElement from "@/components/Competitor/Detalji/Elements/ShotSavedElement";
import CornerKickElement from "@/components/Competitor/Detalji/Elements/CornerKickElement";
import ShotOffTarget from "@/components/Competitor/Detalji/Elements/ShotOffTarget";
import InjuryElement from "@/components/Competitor/Detalji/Elements/InjuryElement";
import ScoreChangeElement from "@/components/Competitor/Detalji/Elements/ScoreChangeElement";

export default function DetaljiList({ timelineData }) {
  const [selectedForm, setSelectedForm] = useState("default");

  const renderItem = ({ item: timeline, index }) => {
    switch (timeline.type) {
      case "announcement":
      case "match_ended":
      case "break_start":
        return (
          <View style={styles.timeBar} key={index}>
            <Text style={styles.timeText} key={index + Math.random()}>
              {timeline.message}
            </Text>
          </View>
        );

      case "yellow_card":
        return <YellowCardElement key={index} side={timeline.position} player={timeline.player} time={timeline.time} />;
      case "substitution":
        return (
          <SubstitutionElement
            key={index}
            side={timeline.position}
            playerIn={timeline.player_in}
            playerOut={timeline.player_out}
            time={timeline.time}
          />
        );

      case "score_change":
        return (
          <ScoreChangeElement
            key={index}
            side={timeline.position}
            player={timeline.player}
            home={timeline.home_score}
            away={timeline.away_score}
            time={timeline.time}
          />
        );

      case "free_kick":
        if (selectedForm !== "all") return;
        return <FreeKickElement key={index} side={timeline.position} time={timeline.time} />;

      case "throw_in":
        if (selectedForm !== "all") return;
        return <ThrowInElement key={index} side={timeline.position} time={timeline.time} />;

      case "shot_saved":
        if (selectedForm !== "all") return;
        return <ShotSavedElement key={index} side={timeline.position} time={timeline.time} />;

      case "corner_kick":
        if (selectedForm !== "all") return;
        return <CornerKickElement key={index} side={timeline.position} player={timeline.player} time={timeline.time} />;

      case "goal_kick":
        if (selectedForm !== "all") return;
        return <ShotOffTarget key={index} side={timeline.position} time={timeline.time} />;

      case "injury":
        if (selectedForm !== "all") return;
        return <InjuryElement key={index} side={timeline.position} player={timeline.player} time={timeline.time} />;

      default:
      // console.log("Unknown timeline type: ", timeline.type);
    }
  };

  const renderComponents = () => {
    return (
      <View style={styles.containerOrSomething} key={Math.random()}>
        {timelineData.timeline.length ? (
          <>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={selectedForm === "default" ? styles.selectedButtonElement : styles.buttonElement}
                onPress={() => setSelectedForm("default")}
                activeOpacity={1}
                key={"default"}
              >
                <Text
                  style={selectedForm === "default" ? styles.selectedButtonText : styles.buttonText}
                  key={"detaultText"}
                >
                  Default
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={selectedForm === "all" ? styles.selectedButtonElement : styles.buttonElement}
                onPress={() => setSelectedForm("all")}
                activeOpacity={1}
                key={"all"}
              >
                <Text style={selectedForm === "all" ? styles.selectedButtonText : styles.buttonText} key={"allText"}>
                  Sve
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.container}>
              {timelineData.timeline.map((timeline, index) => {
                return renderItem({ item: timeline, index });
              })}
            </View>
          </>
        ) : (
          <></>
        )}

        <View style={styles.matchInformationContainer}>
          <Text style={styles.matchInformation} key={"MI"}>
            Match Information
          </Text>
          <View style={styles.seperator} />

          <View style={styles.row}>
            <Text style={styles.matchInformationText} key={"dateText"}>
              Datum i Vrijeme
            </Text>
            <Text style={styles.matchInformationText} key={"dateValue"}>
              {timelineData.information.date}
            </Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.matchInformationText} key={"locationText"}>
              Stadion
            </Text>
            <Text style={styles.matchInformationText} key={"location"}>
              {timelineData.information.stadium}
            </Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.matchInformationText} key={"locationText2"}>
              Mjesto
            </Text>
            <Text style={styles.matchInformationText} key={"locationValue2"}>
              {timelineData.information.location}
            </Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.matchInformationText} key={"risustvovanjeText"}>
              Prisustvovanje
            </Text>
            <Text style={styles.matchInformationText} key={"prisustvovanjeValue"}>
              {timelineData.information.attendance.toLocaleString()} /{" "}
              {timelineData.information.capacity.toLocaleString()}
            </Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.matchInformationText} key={"sudacText"}>
              Sudac
            </Text>
            <Text style={styles.matchInformationText} key={"sudacValue"}>
              {timelineData.information.referee[0].name}
            </Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.matchInformationText} key={"rundaText"}>
              Runda
            </Text>
            <Text style={styles.matchInformationText} key={"rundaValue"}>
              {timelineData.information.round}
            </Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.matchInformationText} key={"vrijemeText"}>
              Vrijeme
            </Text>
            <Text style={styles.matchInformationText} key={"vrijemeValue"}>
              {timelineData.information.weather}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <FlatList
      data={[1]}
      renderItem={renderComponents}
      keyExtractor={(item, index) => index.toString()}
      style={styles.outerContainer}
      key={"flatList"}
    />
  );
}

const styles = StyleSheet.create({
  containerOrSomething: {
    backgroundColor: "#161F29",
    paddingBottom: 3,
  },
  outerContainer: {
    backgroundColor: "#161F29",
    flex: 1,
  },
  container: {
    backgroundColor: "#10181E",
    marginLeft: 6,
    marginRight: 6,
    marginTop: 6,
    marginBottom: 6,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#00000",
  },
  timeBar: {
    marginLeft: 6,
    marginRight: 6,
    marginTop: 6,
    height: 24,
    backgroundColor: "#0C1216",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#00000",
  },
  timeText: {
    color: "#C0C0C0",
    fontWeight: "bold",
    fontSize: 16,
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
    marginTop: 6,
    marginBottom: 6,
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
    marginTop: 6,
    marginBottom: 6,
  },
  buttonText: {
    color: "#686868",
    fontSize: 12,
    fontWeight: "bold",
    width: 50,
    textAlign: "center",
  },
  selectedButtonText: {
    color: "#161F29",
    fontSize: 12,
    fontWeight: "bold",
    width: 50,
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#10181E",
    marginLeft: 6,
    marginRight: 6,
    marginTop: 6,
    marginBottom: 6,

    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#00000",
  },
  seperator: {
    width: "95%",
    height: 1,
    backgroundColor: "#222A36",
    marginTop: 6,
    marginBottom: 6,
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
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 12,
    backgroundColor: "transparent",
  },
  matchInformationText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#C0C0C0",
    marginTop: 3,
  },
});
