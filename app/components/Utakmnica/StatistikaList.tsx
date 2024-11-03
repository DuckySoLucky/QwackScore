import ProgressBarElement from './Statistika/ProgressBarElement';
import { View, FlatList, StyleSheet } from 'react-native';
import ErrorComponent from '../global/ErrorComponents';
import { Summary, SummaryData } from '@/types/data';
import React, { useCallback } from 'react';

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
    <View style={styles.outerContainer}>
      <FlatList
        data={summaryData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => renderItem(item)}
        onEndReachedThreshold={0.5}
        style={styles.container}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: '#161e28',
    paddingTop: 6,
  },
  container: {
    backgroundColor: '#10181E',
    borderColor: '#000000',
    borderRadius: 5,
    borderWidth: 1,
    marginHorizontal: 6,
    marginBottom: 70,
  },
});
