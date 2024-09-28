import { StyleSheet, ScrollView, Pressable, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from 'expo-router';
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import Header from '@/components/Utakmnica/Header';
import { Schedule } from '@/types/data';
import DetaljiList from '@/components/Utakmnica/Utakmice/Detalji';

const queryClient = new QueryClient();

export default function TabTwoScreen() {
  return (
    <QueryClientProvider client={queryClient}>
      <Output />
    </QueryClientProvider>
  );
}
``
const VIEW_COMPONENTS = {
  detalji: DetaljiList,
} as Record<string, React.ComponentType<any>>;

function Output() {
  const navigation = useNavigation();
  const route = useRoute();
  const [selectedView, setSelectedView] = useState('details');
  const utakmicaData = JSON.parse(route.params.item) as Schedule;

  const {
    isLoading,
    error,
    data: summaryData,
  } = useQuery({
    queryKey: ['timelineData', utakmicaData?.id],
    queryFn: () =>
      fetch(`http://192.168.0.104:3000/timeline/${utakmicaData.id}`)
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
    if (summaryData) {
      navigation.setOptions({
        // headerTitle: '',
        // headerStyle: styles.header,
        header: () => <Header item={utakmicaData} timelineData={summaryData} />,
      });
    }
  }, [summaryData]);

  if (isLoading) {
    return <ActivityIndicator size="large" color="#00ff00" />;
  }

  if (error) {
    return <Text>Error: {error?.message}</Text>;
  }

  const ViewComponent = VIEW_COMPONENTS[selectedView] || VIEW_COMPONENTS.detalji;
  return (
    <View style={styles.container}>
      <View style={styles.scrollContainer}>
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

      <ViewComponent summaryData={summaryData} />
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
