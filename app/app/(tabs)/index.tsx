import { StyleSheet, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { View } from '@/components/Themed';

import NewsResult from '@/components/Utakmnica/Utakmice/NewsResult';
import UtakmiceList from '@/components/Utakmnica/UtakmiceList';
import LoadingComponent from '@/components/global/LoadingComponent';
import ErrorComponent from '@/components/global/ErrorComponents';

import { fetchSchedules } from '@/API/src/routes/schedules';
import { SchedulesMatch, SchedulesResponse } from '@/API/types/schedules';
import { CONFIG } from '@/API/storage';

export default function TabOneScreen() {
  const seasonId = CONFIG.getCached('defaultLeague') as string;

  const [schedulesData, setData] = useState<null | SchedulesResponse>(null);
  const [error, setError] = useState<null | Error>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const result = await fetchSchedules(seasonId, { useLocalAPI: CONFIG.getCached('useLocalAPI') as boolean });
        setData(result);
      } catch (err) {
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [seasonId]);

  if (isLoading) {
    return <LoadingComponent />;
  }

  if (error) {
    return <ErrorComponent message={`${error.message}`} />;
  }

  if (!schedulesData) {
    return <ErrorComponent message={`Couldn't find data`} />;
  }

  return (
    <View style={styles.outerContainer}>
      <View style={styles.newsContainer}>
        <ScrollView horizontal={true} style={styles.topNews}>
          {schedulesData.matches.slice(0, 5).map((match: SchedulesMatch) => (
            <NewsResult data={match} key={`${match.id}-${Math.random()}`} />
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
