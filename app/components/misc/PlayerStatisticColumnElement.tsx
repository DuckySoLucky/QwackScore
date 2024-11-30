import { StatsResponseStatsPlayer } from '@/API/types/stats';
import { View, Text, StyleSheet, Image } from 'react-native';
import React from 'react';
import { getThemeElement } from '@/API/theme';

export default function PlayerStatisticColumnElement({ item }: { item: StatsResponseStatsPlayer }) {
  return (
    <View style={styles.gameDetailsContainer}>
      <Text style={styles.positionText}>{item.position}</Text>
      <View style={styles.separator} />

      <View>
        <Image source={{ uri: item.clubImage }} style={styles.clubImage} resizeMode="contain" />
      </View>

      <View>
        <Text style={styles.playerName}>{item.name}</Text>
        <Text style={styles.clubName}>{item.clubName}</Text>
      </View>

      <View style={{ position: 'absolute', right: 14 }}>
        <Text style={styles.amountText}>{item.amount}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  gameDetailsContainer: {
    ...(getThemeElement('innerContainerElement') as object),
    borderRadius: 5,
    marginHorizontal: 6,
    marginTop: 6,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
  },
  positionText: {
    marginLeft: 12,
    color: getThemeElement('mainText') as string,
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 18,
    alignItems: 'center',
  },
  separator: {
    height: '80%',
    width: 1,
    backgroundColor: getThemeElement('separator') as string,
    marginLeft: 10,
  },
  clubImage: {
    height: 32,
    width: 32,
    marginLeft: 12,
  },
  playerName: {
    marginLeft: 10,
    color: getThemeElement('text') as string,
    fontSize: 14,
    fontWeight: 'bold',
  },
  clubName: {
    marginLeft: 10,
    color: getThemeElement('mainText') as string,
    fontSize: 10,
    fontWeight: 'bold',
  },
  amountText: {
    color: getThemeElement('mainText') as string,
    fontSize: 18,
    fontWeight: 'bold',
  },
});
