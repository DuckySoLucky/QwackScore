import React from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import { PlayerStat, StatsDataReponse, TeamStat } from '@/types/data';
import TeamStatisticColumnElement from '@/components/misc/TeamStatisticColumnElement';

function titleCase(str: string) {
  return str
    .toLowerCase()
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

const CUSTOM_KEYS = {
  'PTS/G': 'Points / Goals',
  'P/G': 'P/G',
} as Record<string, string>;

const StatistikaTimova = ({ statsData }: { statsData: StatsDataReponse }) => {
  const renderTeamStats = ({ item }: { item: [string, TeamStat[]] }) => {
    const [key, data] = item;
    if (data.length < 5) {
      return null;
    }

    return (
      <View style={styles.container}>
        <Text style={styles.roundText}>{CUSTOM_KEYS[key] ?? titleCase(key)}</Text>
        {data.slice(0, 5).map((item, index) => (
          <TeamStatisticColumnElement key={index} item={item} />
        ))}
      </View>
    );
  };

  return (
    <View style={styles.outerContainer}>
      <FlatList data={Object.entries(statsData.teams)} renderItem={renderTeamStats} keyExtractor={(item) => item[0]} />
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

export default StatistikaTimova;
