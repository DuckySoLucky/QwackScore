import { Dimensions, StyleSheet } from 'react-native';
import { Text, View } from '@/components/Themed';
import { Summary } from '@/types/data';
import React from 'react';

export default function ProgressBarElement({ item, percentage }: { item: Summary; percentage: boolean }) {
  const total = item.home + item.away;
  const leftProgress = item.home / total;
  const rightProgress = item.away / total;
  const progress = Dimensions.get('window').width * 0.41;

  return (
    <View style={styles.bottomContainer}>
      <View style={styles.row}>
        <Text style={styles.statValue}>{percentage ? `${item.home}%` : item.home}</Text>
        <Text style={styles.statName}>{item.name}</Text>
        <Text style={styles.statValue}>{percentage ? `${item.away}%` : item.away}</Text>
      </View>

      <View style={styles.progressRow}>
        <View style={styles.leftBar} />
        <View
          style={[
            styles.leftBarFilled,
            {
              marginLeft: -(progress * leftProgress),
              width: progress * leftProgress,
            },
          ]}
        />

        <View style={styles.rightBar} />
        <View
          style={[
            styles.rightBarFilled,
            {
              width: progress * rightProgress,
            },
          ]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    paddingHorizontal: 6,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 6,
  },
  statValue: {
    fontSize: 16,
    color: '#686868',
    fontWeight: 'bold',
  },
  statName: {
    fontSize: 16,
    color: '#686868',
    fontWeight: 'bold',
  },
  rightBar: {
    marginLeft: 36,
    width: '45%',
    height: 12,
    borderRadius: 16,
    backgroundColor: '#222A36',
  },
  leftBar: {
    width: '45%',
    height: 12,
    borderRadius: 16,
    backgroundColor: '#222A36',
  },
  rightBarFilled: {
    marginLeft: '-45%',
    height: 12,
    borderRadius: 16,
    backgroundColor: '#CA5509',
    maxWidth: '45%',
  },
  leftBarFilled: {
    height: 12,
    borderRadius: 16,
    backgroundColor: '#CA5509',
  },
  progressRow: {
    flexDirection: 'row',
    padding: 6,
    backgroundColor: 'transparent',
    alignItems: 'center',
    marginHorizontal: 6,
    marginBottom: 6,
  },
  bottomContainer: {
    backgroundColor: 'transparent',
    borderBottomWidth: 1,
    borderBottomColor: '#000000',
  },
});
