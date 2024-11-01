import { StatsResponseStatsPlayer } from '@/API/types/stats';
import { View, Text, StyleSheet, Image } from 'react-native';
import React from 'react';

export default function PlayerStatisticColumnElement({ item }: { item: StatsResponseStatsPlayer }) {
  return (
    <View style={styles.gameDetailsContainer}>
      <Text style={styles.positionText}>{item.position}</Text>
      <View style={styles.seperator} />

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
    backgroundColor: '#0C1216',
    borderColor: '#000000',
    borderRadius: 5,
    borderWidth: 1,
    marginHorizontal: 6,
    marginTop: 6,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
  },
  positionText: {
    marginLeft: 12,
    color: '#686868',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 18,
    alignItems: 'center',
  },
  seperator: {
    height: '80%',
    width: 1,
    backgroundColor: '#222A36',
    marginLeft: 10,
  },
  clubImage: {
    height: 32,
    width: 32,
    marginLeft: 12,
  },
  playerName: {
    marginLeft: 10,
    color: '#C0C0C0', //'#686868',
    fontSize: 14,
    fontWeight: 'bold',
  },
  clubName: {
    marginLeft: 10,
    color: '#686868', //'#686868',
    fontSize: 10,
    fontWeight: 'bold',
  },
  amountText: {
    color: '#C0C0C0',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
