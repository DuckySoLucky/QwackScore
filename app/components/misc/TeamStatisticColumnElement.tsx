import { View, Text, StyleSheet, Image } from 'react-native';
import { StatsResponseStatsTeam } from '@/API/types/stats';
import React from 'react';
import { getThemeElement } from '@/API/theme';

export default function TeamStatisticColumnElement({ item }: { item: StatsResponseStatsTeam }) {
  return (
    <View style={styles.gameDetailsContainer}>
      <Text style={styles.positionText}>{item.position}</Text>
      <View style={styles.separator} />

      <View>
        <Image source={{ uri: item.image }} style={styles.clubImage} resizeMode="contain" />
      </View>

      <View>
        <Text style={styles.clubName}>{item.name}</Text>
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
  clubName: {
    marginLeft: 10,
    color: getThemeElement('mainText') as string,
    fontSize: 15,
    fontWeight: 'bold',
  },
  amountText: {
    color: getThemeElement('mainText') as string,
    fontSize: 18,
    fontWeight: 'bold',
  },
});
