import { StyleSheet, ScrollView, Pressable } from 'react-native';
import { useRoute } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { Text, View } from '@/components/Themed';
import { useNavigation } from 'expo-router';

import StatistikaIgraca from '@/components/Lige/StatistikaIgraca';
import StatistikaTimova from '@/components/Lige/StatistikaTimova';
import UtakmiceList from '@/components/Utakmnica/UtakmiceList';
import DetaljiList from '@/components/Lige/DetaljiList';
import PoredakList from '@/components/Lige/PoredakList';

import LoadingComponent from '@/components/global/LoadingComponent';
import ErrorComponent from '@/components/global/ErrorComponents';

import { fetchLigeDataResponse } from '@/API/types';
import { fetchLigeData } from '@/API';

export default function TabTwoScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const [selectedView, setSelectedView] = useState('details');

  const params = route.params as { id: string; title: string };
  if (!params?.id || !params?.title) {
    return <ErrorComponent message="Error: Couldn't find parameters" />;
  }

  useEffect(() => {
    navigation.setOptions({ title: params.title ?? 'Liga', headerStyle: styles.header });
  }, [navigation]);

  const [data, setData] = useState<null | fetchLigeDataResponse>(null);
  const [error, setError] = useState<null | Error>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const result = await fetchLigeData(params.id, { useLocalAPI: false });
        setData(result);
      } catch (err) {
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [params.id]);

  if (isLoading) {
    return <LoadingComponent />;
  }

  if (error) {
    return <ErrorComponent message={`Error: ${error.message}`} />;
  }

  if (!data) {
    return <ErrorComponent message={`Error: Couldn't find data`} />;
  }

  const { schedulesData, statsData, seasonData, standingsData } = data;

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

const VIEW_COMPONENTS = {
  utakmice: UtakmiceList,
  details: DetaljiList,
  poredak: PoredakList,
  player_stats: StatistikaIgraca,
  team_stats: StatistikaTimova,
} as Record<string, React.FC<any>>;

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
    backgroundColor: '#10181E',
  },
  selectedView: {
    backgroundColor: '#161e28',
    paddingTop: 6,
  },
});
