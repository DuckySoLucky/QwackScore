import ProgressBarElement from './Statistika/ProgressBarElement';
import { FlatList, StyleSheet } from 'react-native';
import ErrorComponent from '../global/ErrorComponents';
import { Summary, SummaryData } from '@/types/data';
import React, { useCallback } from 'react';
import { getThemeElement } from '@/API/theme';

export default function StatistikaList({ summaryData }: { summaryData: SummaryData }) {
  const renderItem = useCallback(
    (item: Summary) => {
      if (item.visible === false) {
        return <></>;
      }

      return <ProgressBarElement item={item} percentage={summaryData.indexOf(item) === 0} />;
    },
    [summaryData],
  );

  if (!summaryData) {
    return <ErrorComponent message="Couldn't find stats data" />;
  }

  const statsItems = summaryData.filter((item) => item.visible === true).length;
  if (statsItems === 0) {
    return <ErrorComponent message="Couldn't find stats data" />;
  }

  return (
    <FlatList
      data={summaryData}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => renderItem(item)}
      onEndReachedThreshold={0.5}
      style={styles.container}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    ...(getThemeElement('containerElement') as object),
    borderRadius: 5,
    marginHorizontal: 6,
    marginBottom: 70,
    marginTop: 10,
  },
});
