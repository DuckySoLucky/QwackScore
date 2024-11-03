import React from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import TeamStatisticColumnElement from '@/components/misc/TeamStatisticColumnElement';
import { StatsResponse, StatsResponseStatsTeam } from '@/API/types/stats';
import ErrorComponent from '../global/ErrorComponents';
import { useTranslation } from 'react-i18next';

const StatistikaTimova = ({ statsData }: { statsData: StatsResponse }) => {
  const { t: translate } = useTranslation();
  if (!statsData?.teams || Object.keys(statsData?.teams ?? {}).length === 0) {
    return <ErrorComponent message="Couldn't find team stats data" />;
  }

  const renderTeamStats = ({ item }: { item: [string, StatsResponseStatsTeam[]] }) => {
    const [key, data] = item;
    if (!data || data.length === 0) {
      return null;
    }

    return (
      <View style={styles.container}>
        <Text style={styles.roundText}>{translate(`league.statistics.stats.${key}`)}</Text>
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
