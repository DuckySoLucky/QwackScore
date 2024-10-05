import { StyleSheet, ScrollView, Pressable, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';

import { Text, View } from '@/components/Themed';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from 'expo-router';
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import Header from '@/components/Utakmnica/Header';
import { Schedule, SchedulesDataResponse } from '@/types/data';
import DetaljiList from '@/components/Utakmnica/Utakmice/Detalji';
import UtakmiceList from '@/components/Utakmnica/UtakmiceList';
import PostaveList from '@/components/Utakmnica/Utakmice/Postave';
import PoredakList from '@/components/Lige/PoredakList';
import StatistikaList from '@/components/Utakmnica/StatistikaList';
import CommentaryList from '@/components/Utakmnica/CommentaryList';

const queryClient = new QueryClient();

export default function TabTwoScreen() {
  return (
    <QueryClientProvider client={queryClient}>
      <Output />
    </QueryClientProvider>
  );
}

const VIEW_COMPONENTS = {
  detalji: DetaljiList,
  utakmice: UtakmiceList,
  postave: PostaveList,
  poredak: PoredakList,
  stats: StatistikaList,
  commentary: CommentaryList,
} as Record<string, React.ComponentType<any>>;

function Output() {
  const navigation = useNavigation();
  const route = useRoute();
  const [selectedView, setSelectedView] = useState('details');
  const utakmicaData = JSON.parse(route.params.item) as Schedule;

  const {
    isLoading,
    error,
    data: timelineData,
  } = useQuery({
    queryKey: ['timelineData', utakmicaData?.id],
    queryFn: () =>
      fetch(`http://192.168.90.103:3000/timeline/${utakmicaData.id}`)
        .then((res) => res.json())
        .then((data) => data.data),
  });

  const {
    isLoading: isLoadingSchedule,
    error: errorSchedule,
    data: schedulesData,
  } = useQuery({
    queryKey: ['schedulesData', utakmicaData?.id],
    queryFn: () =>
      fetch(`http://192.168.90.103:3000/schedules/${timelineData.season.id}`)
        .then((res) => res.json())
        .then((data) => data.data),
  });

  const {
    isLoading: isLoadingStandingsData,
    error: errorStandings,
    data: standingsData,
  } = useQuery({
    queryKey: ['standingsData', utakmicaData?.id],
    queryFn: () =>
      fetch(`http://192.168.90.103:3000/standings/${timelineData.season.id}`)
        .then((res) => res.json())
        .then((data) => data.data),
  });

  const {
    isLoading: isLoadingLineups,
    error: errorLineups,
    data: lineupsData,
  } = useQuery({
    queryKey: ['lineupsData', utakmicaData?.id],
    queryFn: () =>
      fetch(`http://192.168.90.103:3000/lineup/${utakmicaData.id}`)
        .then((res) => res.json())
        .then((data) => data.data),
  });

  const {
    isLoading: isLoadingSummary,
    error: errorSummary,
    data: summaryData,
  } = useQuery({
    queryKey: ['summaryData', utakmicaData?.id],
    queryFn: () =>
      fetch(`http://192.168.90.103:3000/summary/${utakmicaData.id}`)
        .then((res) => res.json())
        .then((data) => data.data),
  });

  useEffect(() => {
    navigation.setOptions({
      headerTitle: '',
      headerStyle: { display: 'none', height: 0 },
    });
  }, []);

  useEffect(() => {
    if (timelineData) {
      navigation.setOptions({
        // headerTitle: '',
        // headerStyle: styles.header,
        header: () => <Header item={utakmicaData} timelineData={timelineData} />,
      });
    }
  }, [timelineData]);

  if (isLoading || isLoadingSchedule || isLoadingLineups || isLoadingStandingsData || isLoadingSummary) {
    return <ActivityIndicator size="large" color="#00ff00" />;
  }

  if (error || errorSchedule || errorLineups || errorStandings || errorSummary) {
    return (
      <Text>
        Error:{' '}
        {error?.message ||
          errorSchedule?.message ||
          errorLineups?.message ||
          errorStandings?.message ||
          errorSummary?.message}
      </Text>
    );
  }

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
      ])
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
        lineupsData={lineupsData}
        standingsData={standingsData}
        summaryData={summaryData}
      />
    </View>
  );
}

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
