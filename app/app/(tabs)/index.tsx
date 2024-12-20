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
import i18n from '@/API/translation';
import('../../API/translation');
i18n.changeLanguage(CONFIG.getCached('language') as string);

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
    <View>
      <View style={styles.newsContainer}>
        <ScrollView horizontal={true}>
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
  newsContainer: {
    backgroundColor: 'transparent',
    marginVertical: 6,
  },
});
