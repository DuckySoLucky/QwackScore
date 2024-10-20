import React from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import { PlayerStat, StatsDataReponse } from '@/types/data';
import PlayerStatisticColumnElement from '../misc/PlayerStatisticColumnElement';

function titleCase(str: string) {
  return str
    .toLowerCase()
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

const StatistikaIgraca = ({ statsData }: { statsData: StatsDataReponse }) => {
  if (!statsData?.players) {
    return (
      <View style={styles.container}>
        <Text style={styles.roundText}>No player stats available</Text>
      </View>
    );
  }

  const renderPlayerStats = ({ item }: { item: [string, PlayerStat[]] }) => {
    const [key, data] = item;
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
