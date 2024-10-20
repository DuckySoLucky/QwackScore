import { StyleSheet, ScrollView, Pressable, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from 'expo-router';
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import UtakmiceList from '@/components/Utakmnica/UtakmiceList';
import DetaljiList from '@/components/Lige/DetaljiList';
import PoredakList from '@/components/Lige/PoredakList';
import StatistikaIgraca from '@/components/Lige/StatistikaIgraca';
import StatistikaTimova from '@/components/Lige/StatistikaTimova';

const queryClient = new QueryClient();

export default function TabTwoScreen() {
  return (
    <QueryClientProvider client={queryClient}>
      <Output />
    </QueryClientProvider>
  );
}

const VIEW_COMPONENTS = {
  utakmice: UtakmiceList,
  details: DetaljiList,
  poredak: PoredakList,
  player_stats: StatistikaIgraca,
  team_stats: StatistikaTimova,
} as Record<string, React.ComponentType<any>>;

function Output() {
  const route = useRoute();
  const navigation = useNavigation();
  const [selectedView, setSelectedView] = useState('details');

  useEffect(() => {
    navigation.setOptions({ title: route.params?.title ?? 'Liga', headerStyle: styles.header });
  }, [navigation]);

  const {
    isPending,
    error,
    data: seasonData,
  } = useQuery({
    queryKey: ['standingsData'],
    queryFn: () =>
      fetch(`http://192.168.90.105:3000/competition/${route.params.id}`)
        .then((res) => res.json())
        .then((data) => data.data),
  });

  const {
    isPending: isPendingSchedules,
    error: errorSchedules,
    data: schedulesData,
  } = useQuery({
    queryKey: ['schedulesData', seasonData?.id],
    queryFn: () =>
      seasonData?.id
        ? fetch(`http://192.168.90.105:3000/schedules/${seasonData.id}`)
            .then((res) => res.json())
            .then((data) => data.data)
        : Promise.resolve(null),
    enabled: !!seasonData?.id,
  });

  const {
    isPending: isPendingStats,
    error: errorStats,
    data: statsData,
  } = useQuery({
    queryKey: ['statsData', seasonData?.id],
    queryFn: () =>
      seasonData?.id
        ? fetch(`http://192.168.90.105:3000/stats/${seasonData.id}`)
            .then((res) => res.json())
            .then((data) => data.data)
        : Promise.resolve(null),
    enabled: !!seasonData?.id,
  });

  const {
    isPending: isPendingStandings,
    error: errorStandings,
    data: standingsData,
  } = useQuery({
    queryKey: ['standingsData', seasonData?.id],
    queryFn: () =>
      seasonData?.id
        ? fetch(`http://192.168.90.105:3000/standings/${seasonData.id}`)
            .then((res) => res.json())
            .then((data) => data.data)
        : Promise.resolve(null),
    enabled: !!seasonData?.id,
  });

  if (isPending || isPendingSchedules || isPendingStats || isPendingStandings) {
    return <ActivityIndicator size="large" color="#00ff00" />;
  }

  if (error || errorSchedules || errorStats || errorStandings) {
    return (
      <Text>
        Error: {error?.message || errorSchedules?.message || errorSchedules?.message || errorStandings?.message}
      </Text>
    );
  }

  const ViewComponent = VIEW_COMPONENTS[selectedView] ?? VIEW_COMPONENTS.details;
  return (
    <View>
      <View style={styles.container}>
        <ScrollView horizontal style={styles.scroll}>
          <Pressable onPress={() => setSelectedView('details')}>
            <Text style={selectedView === 'details' ? styles.selectedTitle : styles.title}>Detalji</Text>
          </Pressable>

          <Pressable onPress={() => setSelectedView('utakmice')}>
            <Text style={selectedView === 'utakmice' ? styles.selectedTitle : styles.title}>Utakmice</Text>
          </Pressable>

          <Pressable onPress={() => setSelectedView('poredak')}>
            <Text style={selectedView === 'poredak' ? styles.selectedTitle : styles.title}>Poredak</Text>
          </Pressable>

          <Pressable onPress={() => setSelectedView('player_stats')}>
            <Text style={selectedView === 'player_stats' ? styles.selectedTitle : styles.title}>Statistika Igraca</Text>
          </Pressable>

          <Pressable onPress={() => setSelectedView('team_stats')}>
            <Text style={selectedView === 'team_stats' ? styles.selectedTitle : styles.title}>Statistika Timova</Text>
          </Pressable>
        </ScrollView>
      </View>

      <View style={styles.selectedView}>
        <ViewComponent
          schedulesData={schedulesData}
          statsData={statsData}
          seasonData={seasonData}
          standingsData={standingsData}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 5,
    backgroundColor: '#10181E',
  },
  scroll: {
    paddingLeft: 10,
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
  header: {
    backgroundColor: '#10181E', // 10181E
  },
  selectedView: {
    backgroundColor: '#161e28',
    paddingTop: 6,
  },
});
