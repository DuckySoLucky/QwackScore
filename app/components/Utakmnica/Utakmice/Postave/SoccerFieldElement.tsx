import { TimelineDataResponse, Timeline, LineupsDataResponse } from '@/types/data';
import { View, FlatList, Text, StyleSheet, Pressable, ScrollView, Image, Dimensions } from 'react-native';
import { useState } from 'react';
import PlayerElement from './PlayerElement';

export default function SoccerFieldElement({ lineupsData }: { lineupsData: LineupsDataResponse }) {
  return (
    <View style={styles.outerContainer}>
      <Image
        source={{
          uri: 'https://i.imgur.com/C7SWI7G.png',
        }}
        style={styles.fieldIcon}
        resizeMode="contain"
      />

      <View style={styles.lineupContainer}>
        <View style={styles.goalKeeperRow}>
          {lineupsData.home.goalkeeper.map((player) => {
            return <PlayerElement name={player.name} number={player.jersey_number} />;
          })}
        </View>

        <View style={styles.defenderRow}>
          {lineupsData.home.defenders.map((player) => {
            return <PlayerElement name={player.name} number={player.jersey_number} />;
          })}
        </View>

        <View style={styles.midfielderRow}>
          {lineupsData.home.midfielders.map((player) => {
            return <PlayerElement name={player.name} number={player.jersey_number} />;
          })}
        </View>

        <View style={styles.forwardRow}>
          {lineupsData.home.forwards.map((player) => {
            return <PlayerElement name={player.name} number={player.jersey_number} />;
          })}
        </View>

        <View style={styles.forwardRow}>
          {lineupsData.away.forwards.map((player) => {
            return <PlayerElement name={player.name} number={player.jersey_number} />;
          })}
        </View>

        <View style={styles.midfielderRow}>
          {lineupsData.away.midfielders.map((player) => {
            return <PlayerElement name={player.name} number={player.jersey_number} />;
          })}
        </View>

        <View style={styles.defenderRow}>
          {lineupsData.away.defenders.map((player) => {
            return <PlayerElement name={player.name} number={player.jersey_number} />;
          })}
        </View>

        <View style={styles.goalKeeperRow}>
          {lineupsData.away.goalkeeper.map((player) => {
            return <PlayerElement name={player.name} number={player.jersey_number} />;
          })}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    height: 600,
    marginHorizontal: 6,
    backgroundColor: '#161e28',
  },
  fieldIcon: {
    height: 600,
  },
  lineupContainer: {
    height: 572,
    marginTop: -600 + 14,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  goalKeeperRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  defenderRow: {
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'space-around',
    marginHorizontal: 16,
  },
  midfielderRow: {
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'space-around',
    marginHorizontal: 16,
  },
  forwardRow: {
    flexDirection: 'row',
    marginTop: 25,
    justifyContent: 'space-around',
    marginHorizontal: 16,
  },
});
