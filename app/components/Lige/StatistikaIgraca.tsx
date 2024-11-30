import PlayerStatisticColumnElement from '../misc/PlayerStatisticColumnElement';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import { StatsResponseStatsPlayer } from '@/API/types/stats';
import ErrorComponent from '../global/ErrorComponents';
import { StatsDataReponse } from '@/types/data';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { getThemeElement } from '@/API/theme';

function titleCase(str: string) {
  return str
    .toLowerCase()
    .replaceAll('_', ' ')
    .split(' ')
    .map(function (word) {
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(' ');
}

const StatistikaIgraca = ({ statsData }: { statsData: StatsDataReponse }) => {
  const { t: translate } = useTranslation();

  if (!statsData?.players || Object.keys(statsData?.players ?? {}).length === 0) {
    return <ErrorComponent message="Couldn't find player stats data" />;
  }

  const renderPlayerStats = ({ item }: { item: [string, StatsResponseStatsPlayer[]] }) => {
    const [key, data] = item;
    if (!data) {
      return null;
    }

    return (
      <View style={styles.container}>
        <Text style={styles.roundText}>
          {translate(`league.statistics.stats.${key}`.trim()).includes('league.statistics.stats.')
            ? titleCase(key)
            : translate(`league.statistics.stats.${key}`)}
        </Text>
        {data.slice(0, 5).map((item, index) => (
          <PlayerStatisticColumnElement key={index} item={item} />
        ))}
      </View>
    );
  };

  return (
    <View style={styles.outerContainer}>
      <FlatList
        data={Object.entries(statsData.players)}
        renderItem={renderPlayerStats}
        keyExtractor={(item) => item[0]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    width: '100%',
    height: '100%',
    paddingBottom: 90,
  },
  container: {
    ...(getThemeElement('containerElement') as object),
    borderRadius: 5,
    marginHorizontal: 6,
    marginBottom: 6,
    paddingBottom: 6,
  },
  roundText: {
    fontSize: 18,
    color: '#686868',
    marginLeft: 6,
    fontWeight: 'bold',
  },
});

export default StatistikaIgraca;
