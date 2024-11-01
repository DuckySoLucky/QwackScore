import { StyleSheet, ScrollView, Pressable } from 'react-native';
import { useRoute } from '@react-navigation/native';
import React, { useState, useEffect, useLayoutEffect } from 'react';
import { Text, View } from '@/components/Themed';
import { useNavigation } from 'expo-router';

import { Schedule, SchedulesDataResponse } from '@/types/data';
import { fetchUtakmicaDataResponse } from '@/API/types';
import { fetchUtakmicaData } from '@/API';

import Header from '@/components/Utakmnica/Header';
import DetaljiList from '@/components/Utakmnica/Utakmice/Detalji';
import UtakmiceList from '@/components/Utakmnica/UtakmiceList';
import PostaveList from '@/components/Utakmnica/Utakmice/Postave';
import PoredakList from '@/components/Lige/PoredakList';
import StatistikaList from '@/components/Utakmnica/StatistikaList';
import CommentaryList from '@/components/Utakmnica/CommentaryList';
import LoadingComponent from '@/components/global/LoadingComponent';
import ErrorComponent from '@/components/global/ErrorComponents';
import { CONFIG } from '@/API/storage';

export default function TabTwoScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const params = route.params as { item: string };

  const [data, setData] = useState<null | fetchUtakmicaDataResponse>(null);
  const [selectedView, setSelectedView] = useState('details');
  const [error, setError] = useState<null | Error>(null);
  const [isLoading, setIsLoading] = useState(true);

  const utakmicaData = JSON.parse(params.item) as Schedule;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: '',
      headerStyle: { display: 'none', height: 0 },
    });
  }, [navigation]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const result = await fetchUtakmicaData(utakmicaData.id, {
          useLocalAPI: CONFIG.getCached('useLocalAPI') as boolean,
        });
        setData(result);
      } catch (err) {
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [utakmicaData.id]);

  useLayoutEffect(() => {
    if (data?.timelineData) {
      navigation.setOptions({
        header: () => <Header item={utakmicaData} timelineData={data.timelineData} />,
      });
    }
  }, [data, navigation, utakmicaData]);

  if (isLoading) {
    return <LoadingComponent />;
  }

  if (error) {
    return <ErrorComponent message={`Error: ${error.message}`} />;
  }

  if (!data) {
    return <ErrorComponent message={`Error: Couldn't find data`} />;
  }

  const { timelineData, schedulesData, lineupData, standingsData, summaryData } = data;

  const firstCompetitor = utakmicaData.competitors[0].id;
  const secondCompetitor = utakmicaData.competitors[1].id;
  const newSchedulesData = {
    schedules: Object.fromEntries(
      Object.entries((schedulesData as SchedulesDataResponse).schedules).map(([round, games]) => [
        round,
        games.filter((game) => {
          const competitorIds = game.competitors.map((competitor) => competitor.id);
          return [firstCompetitor, secondCompetitor].some((id) => competitorIds.includes(id));
        }),
      ]),
    ),
  };

  const ViewComponent = VIEW_COMPONENTS[selectedView] || VIEW_COMPONENTS.detalji;
  return (
    <View style={styles.container}>
      <View style={styles.scrollContainer}>
        <ScrollView horizontal style={styles.scroll}>
          <Pressable onPress={() => setSelectedView('details')}>
            <Text style={selectedView === 'details' ? styles.selectedTitle : styles.title}>Detalji</Text>
          </Pressable>

          <Pressable onPress={() => setSelectedView('postave')}>
            <Text style={selectedView === 'postave' ? styles.selectedTitle : styles.title}>Postave</Text>
          </Pressable>

          <Pressable onPress={() => setSelectedView('poredak')}>
            <Text style={selectedView === 'poredak' ? styles.selectedTitle : styles.title}>Poredak</Text>
          </Pressable>

          <Pressable onPress={() => setSelectedView('stats')}>
            <Text style={selectedView === 'stats' ? styles.selectedTitle : styles.title}>Statistika</Text>
          </Pressable>

          <Pressable onPress={() => setSelectedView('commentary')}>
            <Text style={selectedView === 'commentary' ? styles.selectedTitle : styles.title}>Commentary</Text>
          </Pressable>

          <Pressable onPress={() => setSelectedView('utakmice')}>
            <Text style={selectedView === 'utakmice' ? styles.selectedTitle : styles.title}>Utakmice</Text>
          </Pressable>
        </ScrollView>
      </View>

      <ViewComponent
        timelineData={timelineData}
        schedulesData={newSchedulesData}
        lineupsData={lineupData}
        standingsData={standingsData}
        summaryData={summaryData}
      />
    </View>
  );
}

const VIEW_COMPONENTS = {
  detalji: DetaljiList,
  postave: PostaveList,
  poredak: PoredakList,
  stats: StatistikaList,
  commentary: CommentaryList,
  utakmice: UtakmiceList,
} as Record<string, React.ComponentType<any>>;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#10181E',
  },
  scroll: {
    paddingLeft: 10,
    height: 32,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#686868',
    marginRight: 40,
    textAlign: 'center',
    alignItems: 'center',
  },
  selectedTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#CA5509',
    marginRight: 40,
    textAlign: 'center',
    alignItems: 'center',
  },
  scrollContainer: {
    backgroundColor: 'transparent',
  },
});
