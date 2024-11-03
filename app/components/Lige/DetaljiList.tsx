import PlayerStatisticColumnElement from '../misc/PlayerStatisticColumnElement';
import TeamStatisticColumnElement from '../misc/TeamStatisticColumnElement';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import UtakmiceColumnElement from '../Utakmnica/Utakmice/UtakmiceColumnElement';
import { SchedulesMatch, SchedulesResponse } from '@/API/types/schedules';
import { StatsResponse, StatsResponseStatsPlayer, StatsResponseStatsTeam } from '@/API/types/stats';
import React from 'react';
import ErrorComponent from '../global/ErrorComponents';
import { useTranslation } from 'react-i18next';

function getCombinedData(schedulesData: SchedulesResponse, statsData: StatsResponse) {
  const { t: translate } = useTranslation();
  const combinedData = [];

  if (schedulesData?.firstThreeMatchs && schedulesData.firstThreeMatchs.length > 0) {
    combinedData.push(
      { type: 'header', title: translate(`league.details.matches`) },
      ...schedulesData.firstThreeMatchs.map((match: SchedulesMatch) => ({ type: 'match', item: match })),
    );
  }

  if (statsData?.teams && statsData.teams['points']) {
    combinedData.push(
      { type: 'header', title: translate(`league.details.points`) },
      ...statsData.teams['points'].slice(0, 5).map((club: StatsResponseStatsTeam) => ({ type: 'team', item: club })),
    );
  }

  if (statsData?.players && statsData.teams['PTS/G']) {
    combinedData.push(
      { type: 'header', title: translate(`league.details.pointsPerGoal`) },
      ...statsData.teams['PTS/G'].slice(0, 3).map((club: StatsResponseStatsTeam) => ({ type: 'team', item: club })),
    );
  }

  if (statsData?.players && statsData.players['goals']) {
    combinedData.push(
      { type: 'header', title: translate(`league.details.bestStrikers`) },
      ...statsData.players['goals'].slice(0, 3).map((club) => ({ type: 'player', item: club })),
    );
  }

  return combinedData;
}

export default function DetaljiList({
  schedulesData,
  statsData,
}: {
  schedulesData: SchedulesResponse;
  statsData: StatsResponse;
}) {
  if (!schedulesData || !statsData) {
    return <ErrorComponent message="Couldn't find data" />;
  }

  const combinedData = getCombinedData(schedulesData, statsData);

  const groupedData = [];
  let currentGroup = [] as {
    type: string;
    title?: string;
    item: StatsResponseStatsPlayer | StatsResponseStatsTeam | SchedulesMatch;
  }[];

  combinedData.forEach((item) => {
    if (item.type === 'header') {
      if (currentGroup.length > 0) {
        groupedData.push(currentGroup);
      }

      currentGroup = [item];
    } else {
      currentGroup.push(item);
    }
  });

  if (currentGroup.length > 0) {
    groupedData.push(currentGroup);
  }

  const renderGroup = ({
    item,
  }: {
    item: { type: string; title?: string; item: StatsResponseStatsPlayer | StatsResponseStatsTeam | SchedulesMatch }[];
  }) => (
    <View style={styles.container}>
      {item.map((subItem, index) => {
        switch (subItem.type) {
          case 'header':
            return (
              <Text key={index} style={styles.roundText}>
                {subItem.title}
              </Text>
            );
          case 'match':
            return <UtakmiceColumnElement key={index} item={subItem.item as SchedulesMatch} />;
          case 'team':
            return <TeamStatisticColumnElement key={index} item={subItem.item as StatsResponseStatsTeam} />;
          case 'player':
            return <PlayerStatisticColumnElement key={index} item={subItem.item as StatsResponseStatsPlayer} />;
          default:
            return null;
        }
      })}
    </View>
  );

  if (groupedData.length === 0) {
    return <ErrorComponent message="Couldn't find any data" />;
  }

  return (
    <View style={styles.outerContainer}>
      <FlatList data={groupedData} renderItem={renderGroup} keyExtractor={(item, index) => `group-${index}`} />
    </View>
  );
}

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
