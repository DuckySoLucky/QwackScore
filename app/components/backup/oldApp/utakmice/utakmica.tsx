import { StyleSheet, Image, ScrollView, Pressable, ActivityIndicator, Dimensions } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Text, View } from '@/components/Themed';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from 'expo-router';

import DetaljiList from '@/components/old/Competitor/Detalji/DetaljiList';
import PostaveList from '@/components/old/Competitor/Postave/PostaveList';
import StatistikaList from '@/components/old/Competitor/Statistika/StatistikaList';
import { useRoute } from '@react-navigation/native';

const API_ENDPOINTS = {
  standings: 'http://192.168.90.103:3000/timeline',
  lineups: 'http://192.168.90.103:3000/lineup',
  summary: 'http://192.168.90.103:3000/summary',
};

async function fetchData(endpoint: string, id: string) {
  const response = await fetch(`${endpoint}/${id}`);
  const data = await response.json();
  return data.data;
}

const VIEW_COMPONENTS = {
  default: DetaljiList,
  postave: PostaveList,
  statistika: StatistikaList,
};

export default function ModalScreen() {
  const route = useRoute();

  const sportEvent = route.params.match;

  /*const sportEvent = {
    id: "sr:sport_event:41736959",
  };*/

  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, []);

  const [isLoading, setIsLoading] = useState(true);
  const [timelineData, setTimelineData] = useState<SchedulesDataResponse | null>(null);
  const [lineupsData, setLineupsData] = useState<SchedulesDataResponse | null>(null);
  const [summaryData, setSummaryData] = useState<SchedulesDataResponse | null>(null);

  useEffect(() => {
    setIsLoading(true);

    const fetchAllData = async () => {
      try {
        const timelineData = await fetchData(API_ENDPOINTS.standings, sportEvent.id);
        setTimelineData(timelineData);

        const lineupsData = await fetchData(API_ENDPOINTS.lineups, sportEvent.id);
        setLineupsData(lineupsData);

        const summaryData = await fetchData(API_ENDPOINTS.summary, sportEvent.id);
        setSummaryData(summaryData);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchAllData().then(() => setIsLoading(false));
  }, []);

  const [selectedView, setSelectedView] = useState('default');
  const ViewComponent = VIEW_COMPONENTS[selectedView as keyof typeof VIEW_COMPONENTS] || VIEW_COMPONENTS.default;
  const handleViewChange = (view: string) => {
    setSelectedView(view);
  };

  if (isLoading) {
    return (
      <View style={styles.background}>
        <ActivityIndicator size="large" color="#00ff00" />
      </View>
    );
  }

  const totalScore = timelineData.scores.away.length + timelineData.scores.home.length;
  const lineupAmount = Object.keys(lineupsData.away)
    .map((key) => lineupsData.away[key].length + lineupsData.home[key].length)
    .reduce((a, b) => a + b, 0);
  const summaryDisabled = summaryData.team.length;

  return (
    <View style={styles.navbar}>
      <View style={styles.outerContainer}>
        <AntDesign style={styles.backIcon} size={28} name="arrowleft" />
        <Image
          source={{
            uri: 'https://media.discordapp.net/attachments/970319574048333865/1224086326551253133/image.png?ex=661c363a&is=6609c13a&hm=1eb594e564e0d4a637cd90cd5ef77824dbe893a84b3bbba9185205a8c3f18dd5&=&format=webp&quality=lossless',
          }}
          style={styles.shareIcon}
          resizeMode="contain"
        />

        <View style={styles.row}>
          <View style={styles.column}>
            <Image
              source={{
                uri: timelineData.competitors[0].image,
              }}
              style={styles.leftClubIcon}
              resizeMode="contain"
            />

            <Text style={styles.clubName}>{timelineData.competitors[0].name}</Text>
          </View>

          <View style={styles.column}>
            <Text style={styles.dateText}>
              {timelineData.information.status === 'ended'
                ? `${timelineData.competitors[0].score} - ${timelineData.competitors[1].score}`
                : `${timelineData.information.dateTop}`}
            </Text>
            <Text style={styles.timeText}>
              {timelineData.information.status === 'ended' ? 'Finished' : `${timelineData.information.timeTop}`}
            </Text>
          </View>

          <View style={styles.column}>
            <Image
              source={{
                uri: timelineData.competitors[1].image,
              }}
              style={styles.rightClubIcon}
              resizeMode="contain"
            />
            <Text style={styles.clubName}>{timelineData.competitors[1].name}</Text>
          </View>
        </View>

        {totalScore ? (
          <View style={styles.rowScoredGoals}>
            <View style={styles.goalScorersTextContainerRight}>
              {timelineData.scores.home.map((score) => {
                return <Text style={styles.goalScorersTextRight}>{score.message}</Text>;
              })}
            </View>

            <Image
              source={{
                uri: 'https://media.discordapp.net/attachments/970319574048333865/1224481718774534164/image.png?ex=661da677&is=660b3177&hm=92d0931d1c66359c56b34f807c7b442a9b81956b9f5601335f02f4759dd3e93b&=&format=webp&quality=lossless',
              }}
              style={styles.footballScoreIcon}
              resizeMode="contain"
            />

            <View style={styles.goalScorersTextContainerLeft}>
              {timelineData.scores.away.map((score) => {
                return <Text style={styles.goalScorersTextLeft}>{score.message}</Text>;
              })}
            </View>
          </View>
        ) : (
          <></>
        )}

        <View style={styles.scrollViewCenter}>
          <Pressable onPress={() => handleViewChange('default')}>
            <Text style={selectedView === 'default' ? styles.selectedTitle : styles.title}>Detalji</Text>
          </Pressable>
          {lineupAmount ? (
            <Pressable onPress={() => handleViewChange('postave')}>
              <Text style={selectedView === 'postave' ? styles.selectedTitle : styles.title}>Postave</Text>
            </Pressable>
          ) : (
            <></>
          )}

          {summaryDisabled ? (
            <Pressable onPress={() => handleViewChange('statistika')}>
              <Text style={selectedView === 'statistika' ? styles.selectedTitle : styles.title}>Statistika</Text>
            </Pressable>
          ) : (
            <></>
          )}
        </View>
      </View>

      {isLoading ? (
        <View style={styles.background}>
          <ActivityIndicator size="large" color="#00ff00" />
        </View>
      ) : (
        <ViewComponent timelineData={timelineData} lineupsData={lineupsData} summaryData={summaryData} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  navbar: {
    backgroundColor: '#0C1216',
    flex: 1,
  },
  outerContainer: {
    backgroundColor: 'transparent',
  },
  shareIcon: {
    position: 'absolute',
    top: 50,
    right: 16,
    height: 28,
    width: 28,
  },
  backIcon: {
    marginTop: 50,
    marginLeft: 16,
    height: 32,
    width: 32,
    color: '#C0C0C0',
  },
  leftClubIcon: {
    height: 64,
    width: 64,
  },
  rightClubIcon: {
    height: 64,
    width: 64,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 32,
    backgroundColor: 'transparent',
  },
  column: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    maxWidth: 96,
  },
  dateText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  timeText: {
    fontSize: 16,
  },
  clubName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 4,
    alignContent: 'center',
    textAlign: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#686868',
    marginRight: 40,
    textAlign: 'center',
    alignItems: 'center',
    width: 86,
  },
  selectedTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#CA5509',
    marginRight: 40,
    textAlign: 'center',
    alignItems: 'center',
    width: 86,
  },
  goalScorersTextContainerRight: {
    width: 128,
    marginTop: 16,
    backgroundColor: 'transparent',
  },
  goalScorersTextRight: {
    color: '#C0C0C0',
    fontSize: 13,
    textAlign: 'right',
  },
  goalScorersTextLeft: {
    color: '#C0C0C0',
    fontSize: 12,
    textAlign: 'left',
  },
  goalScorersTextContainerLeft: {
    width: 128,
    marginTop: 16,
    backgroundColor: 'transparent',
  },
  rowScoredGoals: {
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  footballScoreIcon: {
    height: 24,
    width: 24,
    marginTop: 16,
    marginLeft: 24,
    marginRight: 24,
  },
  background: {
    backgroundColor: '#161F29',
    flex: 1,
  },
  scrollViewCenter: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: 'transparent',
    marginLeft: 5,
    height: 35,
    marginTop: 16,
  },
});
