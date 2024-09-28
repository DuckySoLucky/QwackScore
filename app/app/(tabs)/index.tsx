import { StyleSheet, ScrollView, ActivityIndicator, Text } from 'react-native';
import { View } from '@/components/Themed';
import React from 'react';
import { Schedule } from '../../types/data';
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import { NewsResult } from '@/components/Utakmnica/Utakmice/NewsResult';
import UtakmiceList from '@/components/Utakmnica/UtakmiceList';

const queryClient = new QueryClient();

export default function TabOneScreen() {
  return (
    <QueryClientProvider client={queryClient}>
      <Output seasonId={'sr:season:118691'} />
    </QueryClientProvider>
  );
}

function Output({ seasonId }: { seasonId: string }) {
  const {
    isPending,
    error,
    data: schedulesData,
  } = useQuery({
    queryKey: ['standingsData'],
    queryFn: () =>
      fetch(`http://192.168.0.104:3000/schedules/${seasonId}`)
        .then((res) => res.json())
        .then((data) => data.data),
  });

  if (isPending) {
    return <ActivityIndicator size="large" color="#00ff00" />;
  }

  if (error) {
    return <View>Error: {error.message}</View>;
  }

  return (
    <View style={styles.outerContainer}>
      <View style={styles.newsContainer}>
        <ScrollView horizontal={true} style={styles.topNews}>
          {schedulesData.matches.slice(0, 5).map((match: Schedule) => (
            <NewsResult data={match} key={match.id} />
          ))}
        </ScrollView>
      </View>

      <UtakmiceList schedulesData={schedulesData} />
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    backgroundColor: '#161e28',
  },
  newsContainer: {
    backgroundColor: 'transparent',
    marginVertical: 6,
  },
  topNews: {
    paddingHorizontal: 6,
  },
});
