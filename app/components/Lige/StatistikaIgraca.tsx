import PlayerStatisticColumnElement from '../misc/PlayerStatisticColumnElement';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import { StatsResponseStatsPlayer } from '@/API/types/stats';
import ErrorComponent from '../global/ErrorComponents';
import { StatsDataReponse } from '@/types/data';
import React from 'react';

function titleCase(str: string) {
  return str
    .toLowerCase()
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

const StatistikaIgraca = ({ statsData }: { statsData: StatsDataReponse }) => {
  if (!statsData?.players || Object.keys(statsData?.players ?? {}).length === 0) {
    return <ErrorComponent message="Error: Couldn't find player stats data" />;
  }

  const renderPlayerStats = ({ item }: { item: [string, StatsResponseStatsPlayer[]] }) => {
    const [key, data] = item;
    if (!data) {
      return null;
    }

    return (
      <View style={styles.container}>
        <Text style={styles.roundText}>{titleCase(key)}</Text>
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
    backgroundColor: '#10181E',
    borderColor: '#000000',
    borderRadius: 5,
    borderWidth: 1,
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
