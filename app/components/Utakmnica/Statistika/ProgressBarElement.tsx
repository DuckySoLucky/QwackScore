import { Dimensions, StyleSheet } from 'react-native';
import { Text, View } from '@/components/Themed';
import { Summary } from '@/types/data';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { getThemeElement } from '@/API/theme';

export default function ProgressBarElement({ item, percentage }: { item: Summary; percentage: boolean }) {
  const { t: translate } = useTranslation();

  const total = item.home + item.away;
  const leftProgress = item.home / total;
  const rightProgress = item.away / total;
  const progress = Dimensions.get('window').width * 0.41;

  return (
    <View style={styles.bottomContainer}>
      <View style={styles.row}>
        <Text style={styles.statValue}>{percentage ? `${item.home}%` : item.home}</Text>
        <Text style={styles.statName}>{translate(`match.statistics.stats.${item.id}`)}</Text>
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
    fontWeight: 'bold',
    color: getThemeElement('text') as string,
  },
  statName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: getThemeElement('mainText') as string,
  },
  rightBar: {
    marginLeft: 36,
    width: '45%',
    height: 12,
    borderRadius: 16,
    backgroundColor: getThemeElement('background') as string,
    borderColor: getThemeElement('borderColor') as string,
    borderWidth: 1,
  },
  leftBar: {
    width: '45%',
    height: 12,
    borderRadius: 16,
    backgroundColor: getThemeElement('background') as string,
    borderColor: getThemeElement('borderColor') as string,
    borderWidth: 1,
  },
  rightBarFilled: {
    marginLeft: '-45%',
    height: 12,
    borderRadius: 16,
    backgroundColor: getThemeElement('selectedUtakmicaElement') as string,
    maxWidth: '45%',
    borderColor: getThemeElement('borderColor') as string,
    borderWidth: 1,
  },
  leftBarFilled: {
    height: 12,
    borderRadius: 16,
    backgroundColor: getThemeElement('selectedUtakmicaElement') as string,
    borderColor: getThemeElement('borderColor') as string,
    borderWidth: 1,
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
    borderBottomColor: getThemeElement('separator') as string,
    borderRadius: 16,
  },
});
