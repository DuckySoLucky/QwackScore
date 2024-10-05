import { Summary, SummaryData } from '@/types/data';
import React, { useCallback } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import ProgressBarElement from './Statistika/ProgressBarElement';
import { Text } from '@/components/Themed';

export default function StatistikaList({ summaryData }: { summaryData: SummaryData }) {
  const renderItem = useCallback(
    (item: Summary) => {
      if (item.visible === false) {
        return <></>;
      }

      return <ProgressBarElement item={item} percentage={summaryData.indexOf(item) === 0} />;
    },
    [summaryData]
  );

  const statsItems = summaryData.filter((item) => item.visible === true).length;

  return (
    <View style={styles.outerContainer}>
      {statsItems === 0 ? (
        <>
          <Text style={{ color: 'white', textAlign: 'center', margin: 10, fontWeight: 'bold' }}>
            No stats data available
          </Text>
        </>
      ) : (
        <>
          <FlatList
            data={summaryData}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => renderItem(item)}
            onEndReachedThreshold={0.5}
            style={styles.container}
          />
        </>
      )}
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
  roundText: {
    fontSize: 18,
    color: '#686868',
    marginLeft: 6,
    fontWeight: 'bold',
  },
  container: {
    backgroundColor: '#10181E',
    borderColor: '#000000',
    borderRadius: 5,
    borderWidth: 1,
    marginHorizontal: 6,
    marginBottom: 70,
  },
  statContainer: {
    alignItems: 'center',
  },
  statValue: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    alignItems: 'center',
  },

  borderLine: {
    width: '100%',
    height: 1,
    backgroundColor: '#000000',
    marginVertical: 12,
  },
});
