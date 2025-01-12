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
import { CONFIG } from '@/API/storage';
import { useTranslation } from 'react-i18next';
import { getThemeElement } from '@/API/theme';

export default function TabTwoScreen() {
  const { t: translate } = useTranslation();
  const route = useRoute();
  const navigation = useNavigation();
  const [selectedView, setSelectedView] = useState('details');
  const params = route.params as { id: string; title: string };

  useEffect(() => {
    navigation.setOptions({
      title: params.title ?? 'Liga',
      headerTransparent: true,
    });
  }, [navigation, params.title]);

  const [data, setData] = useState<null | fetchLigeDataResponse>(null);
  const [error, setError] = useState<null | Error>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const result = await fetchLigeData(params.id, {
          useLocalAPI: CONFIG.getCached('useLocalAPI') as boolean,
          useMockupAPI: CONFIG.getCached('useMockupAPI') as boolean,
          name: params.title,
        });
        setData(result);
      } catch (err) {
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [params.id, params.title]);

  if (!params?.id || !params?.title) {
    return <ErrorComponent message="Couldn't find parameters" />;
  }

  if (isLoading) {
    return <LoadingComponent />;
  }

  if (error) {
    return <ErrorComponent message={`${error.message}`} />;
  }

  if (!data) {
    return <ErrorComponent message={`Couldn't find data`} />;
  }

  const { schedulesData, statsData, seasonData, standingsData } = data;

  const ViewComponent = VIEW_COMPONENTS[selectedView] ?? VIEW_COMPONENTS.details;
  return (
    <View style={styles.container}>
      <View style={{ backgroundColor: getThemeElement('innerContainer') as string }}>
        <ScrollView horizontal style={styles.scroll}>
          <Pressable onPress={() => setSelectedView('details')}>
            <Text style={selectedView === 'details' ? styles.selectedTitle : styles.title}>
              {translate('league.details.title')}
            </Text>
          </Pressable>

          <Pressable onPress={() => setSelectedView('utakmice')}>
            <Text style={selectedView === 'utakmice' ? styles.selectedTitle : styles.title}>
              {translate('league.matches.title')}
            </Text>
          </Pressable>

          <Pressable onPress={() => setSelectedView('poredak')}>
            <Text style={selectedView === 'poredak' ? styles.selectedTitle : styles.title}>
              {translate('league.standings.title')}
            </Text>
          </Pressable>

          <Pressable onPress={() => setSelectedView('player_stats')}>
            <Text style={selectedView === 'player_stats' ? styles.selectedTitle : styles.title}>
              {translate('league.statistics.players')}
            </Text>
          </Pressable>

          <Pressable onPress={() => setSelectedView('team_stats')}>
            <Text style={selectedView === 'team_stats' ? styles.selectedTitle : styles.title}>
              {translate('league.statistics.teams')}
            </Text>
          </Pressable>
        </ScrollView>
      </View>

      <View style={{ backgroundColor: getThemeElement('background') as string, paddingTop: 6 }}>
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
  details: DetaljiList,
  utakmice: UtakmiceList,
  poredak: PoredakList,
  player_stats: StatistikaIgraca,
  team_stats: StatistikaTimova,
} as Record<string, React.FC<any>>;

const styles = StyleSheet.create({
  container: {
    backgroundColor: getThemeElement('innerContainer') as string,
    paddingTop: 100,
  },
  scroll: {
    paddingLeft: 12,
    height: 30,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: getThemeElement('mainText') as string,
    marginRight: 40,
    textAlign: 'center',
    alignItems: 'center',
  },
  selectedTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: getThemeElement('selectedUtakmicaElement') as string,
    marginRight: 40,
    textAlign: 'center',
    alignItems: 'center',
  },
});
