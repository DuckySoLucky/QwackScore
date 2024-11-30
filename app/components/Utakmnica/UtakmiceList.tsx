import { View, FlatList, Text, ActivityIndicator, StyleSheet } from 'react-native';
import UtakmiceColumnElement from './Utakmice/UtakmiceColumnElement';
import { SchedulesResponse } from '@/API/types/schedules';
import ErrorComponent from '../global/ErrorComponents';
import React, { useCallback } from 'react';
import { Schedule } from '@/types/data';
import { useTranslation } from 'react-i18next';
import { getThemeElement } from '@/API/theme';
import { Container } from '../theme/Container';

export default function UtakmiceList({ schedulesData }: { schedulesData: SchedulesResponse }) {
  const { t: translate } = useTranslation();
  const renderItem = useCallback((item: Schedule) => {
    return <UtakmiceColumnElement item={item} key={`${item.id}-${Math.random()}`} />;
  }, []);

  if (!schedulesData) {
    return <ErrorComponent message="Error: Couldn't find schedules data" />;
  }

  const renderFooter = () => {
    return <ActivityIndicator style={{ marginVertical: 20 }} />;
  };

  return (
    <Container style={styles.container}>
      <FlatList
        data={Object.keys(schedulesData.schedules)}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <View>
            <Text style={styles.roundText}>{`${translate(`match.matches.round`)} ${item}`}</Text>
            {Object.values(schedulesData.schedules[item]).map((value) => renderItem(value))}
          </View>
        )}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
      />
    </Container>
  );
}

const styles = StyleSheet.create({
  roundText: {
    fontSize: 18,
    color: getThemeElement('mainText') as string,
    marginLeft: 6,
    fontWeight: 'bold',
  },
  container: {
    marginHorizontal: 6,
  },
});
