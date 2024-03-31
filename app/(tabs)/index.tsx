import { StyleSheet, ScrollView, ActivityIndicator } from "react-native";
import { View } from "@/components/Themed";
import React, { useEffect, useState, useRef } from "react";

import FootballGameResultAlert from "@/components/Utakmice/FootballGameResultAlert";
import PlayerStatsAlert from "@/components/Utakmice/PlayerStatsAlert";
import FootballGameAlert from "@/components/Utakmice/FootballGameAlert";
import FootballGameList from "@/components/Utakmice/FootballGameList";
import { Competition, Response } from "../../types/data";

export default function TabOneScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<Response | null>(null);
  const scrollViewRef = useRef<ScrollView | null>(null);

  useEffect(() => {
    fetch("http://192.168.0.111:3000/schedules/sr:season:106503")
      .then((response) => response.json())
      .then((data) => {
        setData(data.data);
        setIsLoading(false);
        scrollViewRef.current?.scrollTo({ x: 0, y: 0, animated: false });
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
      <ScrollView horizontal style={styles.topNews} ref={scrollViewRef}>
        {data.matches.map((match: Competition) => {
          if (match.status === "closed") {
            return (
              <FootballGameResultAlert
                score={`${match.competitors[0].score} - ${match.competitors[1].score}`}
                firstImage={match.competitors[0].image}
                secondImage={match.competitors[1].image}
                key={Math.random().toString(36).substring(7)}
              />
            );
          } else if (match.status === "not_started") {
            return (
              <FootballGameAlert
                time={match.startTimeFormatted.split(" ").join("\n")}
                firstImage={match.competitors[0].image}
                secondImage={match.competitors[1].image}
                key={Math.random().toString(36).substring(7)}
              />
            );
          }
        })}

        <PlayerStatsAlert
          name="S. Levak"
          playerImage="https://media.discordapp.net/attachments/970319574048333865/1222902848866619442/sLeval.png?ex=6617e807&is=66057307&hm=6065150b66f05faf6c1d0f395e1b424e433c35275ebe2c2f36ad34e104b98e3f&=&format=webp&quality=lossless"
        />
      </ScrollView>

      <FootballGameList data={data} key={Math.random().toString(36).substring(7)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#161e28",
    height: "100%",
    paddingBottom: 6,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  topNews: {
    height: 116,
    marginTop: 12,
    marginLeft: 5,
  },
});
