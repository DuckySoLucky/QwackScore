import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, Pressable, ActivityIndicator } from 'react-native';
import { Text, View } from '@/components/Themed';
import DetaljiList from '@/components/old/Lige/Detalji/DetaljiList';
import PoredakList from '@/components/old/Lige/Poredak/PoredakList';
import UtakmiceList from '@/components/old/Lige/Utakmice/UtakmiceList';
import StatistikaIgracaList from '@/components/old/Lige/Statistika/StatistikaIgracaList';
import StatistikaClubaList from '@/components/old/Lige/Statistika/StatistikaClubaList';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from 'expo-router';
import { QueryClient, QueryClientProvider, useQuery, useQueries } from '@tanstack/react-query';

const API_ENDPOINTS = {
  standings: 'http://192.168.90.103:3000/standings',
  schedules: 'http://192.168.90.103:3000/schedules',
  stats: 'http://192.168.90.103:3000/stats',
};

async function fetchData(endpoint: string, id: string) {
  const response = await fetch(`${endpoint}/${id}`);
  const data = await response.json();
  return data.data;
}

const VIEW_COMPONENTS = {
  poredak: PoredakList,
  utakmice: UtakmiceList,
  player_stats: StatistikaIgracaList,
  team_stats: StatistikaClubaList,
  default: DetaljiList,
};

const queryClient = new QueryClient();

export default function LigaDetaljiScreen({ state = 'details' }) {
  const route = useRoute();
  const season = route.params.season;
  if (!season) {
    return <Text>Season not found</Text>;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <DetaljiElement seasonId={season} state={state} />
    </QueryClientProvider>
  );

  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({ title: season.name });
  }, []);

  const [isLoading, setIsLoading] = useState(true);
  const [statsData, setStatsData] = useState<SchedulesDataResponse | null>(null);
  const [schedulesData, setSchedulesData] = useState<SchedulesDataResponse | null>(null);
  const [standingsData, setStandingsData] = useState<SchedulesDataResponse | null>(null);

  useEffect(() => {
    setIsLoading(true);

    const fetchAllData = async () => {
      try {
        const standingsData = await fetchData(API_ENDPOINTS.standings, season.id);
        setStandingsData(standingsData);

        const schedulesData = await fetchData(API_ENDPOINTS.schedules, season.id);
        setSchedulesData(schedulesData);

        const statsData = await fetchData(API_ENDPOINTS.stats, season.id);
        setStatsData(statsData);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchAllData().then(() => setIsLoading(false));
  }, []);

  const [selectedView, setSelectedView] = useState(state);
  const ViewComponent = VIEW_COMPONENTS[selectedView as keyof typeof VIEW_COMPONENTS] || VIEW_COMPONENTS.default;

  const handleViewChange = (view: string) => {
    setSelectedView(view);
  };

  if (isLoading) {
    return <ActivityIndicator size="large" color="#00ff00" />;
  }

  const teamStatsDisabled = Object.keys(statsData.players).length
    ? Object.keys(statsData.players)
        .map((player) => player.team.length)
        .reduce((acc, curr) => acc + curr, 0) === 0
    : true;

  const playerStatsDisabled = Object.keys(statsData.players).length
    ? Object.keys(statsData.players)
        .map((player) => player.stats.length)
        .reduce((acc, curr) => acc + curr, 0) === 0
    : true;
}

function DetaljiElement({ seasonId, state }) {
  const queryMultiple = () => {
    const {
      isPending,
      error,
      data: standingsData,
    } = useQuery({
      queryKey: ['standingsData'],
      queryFn: () => fetch(`${API_ENDPOINTS.standings}/${seasonId}`).then((res) => res.json()),
    });

    const {
      isPending: isPendingSchedules,
      error: errorSchedules,
      data: schedulesData,
    } = useQuery({
      queryKey: ['schedulesData'],
      queryFn: () => fetch(`${API_ENDPOINTS.schedules}/${seasonId}`).then((res) => res.json()),
    });

    const {
      isPending: isPendingStats,
      error: errorStats,
      data: statsData,
    } = useQuery({
      queryKey: ['statsData'],
      queryFn: () => fetch(`${API_ENDPOINTS.stats}/${seasonId}`).then((res) => res.json()),
    });

    return {
      isPending,
      error,
      standingsData,
      isPendingSchedules,
      errorSchedules,
      schedulesData,
      isPendingStats,
      errorStats,
      statsData,
    };
  };

  const {
    isPending,
    error,
    standingsData,
    isPendingSchedules,
    errorSchedules,
    schedulesData,
    isPendingStats,
    errorStats,
    statsData,
  } = queryMultiple();

  if (isPending) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  const [selectedView, setSelectedView] = useState(state);
  const handleViewChange = (view: string) => {
    setSelectedView(view);
  };

  const statsDataKeys = Object.keys(statsData.players);
  const teamStatsDisabled = statsDataKeys.length
    ? statsDataKeys.map((player) => player.team.length).reduce((acc, curr) => acc + curr, 0) === 0
    : true;

  const playerStatsKeys = Object.keys(statsData.players);
  const playerStatsDisabled = playerStatsKeys.length
    ? playerStatsKeys.map((player) => player.stats.length).reduce((acc, curr) => acc + curr, 0) === 0
    : true;

  return (
    <View style={styles.container}>
      <ScrollView horizontal style={styles.scroll}>
        <Pressable onPress={() => handleViewChange('utakmice')}>
          <Text style={selectedView === 'utakmice' ? styles.selectedTitle : styles.title}>Utakmice</Text>
        </Pressable>

        <Pressable onPress={() => handleViewChange('details')}>
          <Text style={selectedView === 'details' ? styles.selectedTitle : styles.title}>Detalji</Text>
        </Pressable>

        <Pressable onPress={() => handleViewChange('poredak')}>
          <Text style={selectedView === 'poredak' ? styles.selectedTitle : styles.title}>Poredak</Text>
        </Pressable>

        <Pressable onPress={() => handleViewChange('player_stats')}>
          <Text style={selectedView === 'player_stats' ? styles.selectedTitle : styles.title}>Statistika Igraca</Text>
        </Pressable>

        <Pressable onPress={() => handleViewChange('team_stats')}>
          <Text style={selectedView === 'team_stats' ? styles.selectedTitle : styles.title}>Statistika Timova</Text>
        </Pressable>
      </ScrollView>

      {/*
        <View style={styles.statsContainer}>
          <ViewComponent
            statsData={statsData}
            utakmiceData={schedulesData}
            standingsData={standingsData}
            season={season}
            handlePress={handleViewChange}
          />
        </View>
      */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#121212',
  },
  scroll: {
    marginLeft: 5,
    height: 40,
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

  statsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#161e28',
    height: 730,
    width: '100%',
  },
});
