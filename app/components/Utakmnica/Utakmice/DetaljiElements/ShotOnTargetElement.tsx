import { StyleSheet, Image, ScrollView, ActivityIndicator, Pressable, Dimensions } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Text, View } from '@/components/Themed';
import { Timeline } from '@/types/data';

export default function ShotOnTargetElement({ item }: { item: Timeline }) {
  if (item.position === 'right') {
    return (
      <View style={styles.outerContainerRight}>
        <View style={styles.column}>
          <Text style={styles.mainTextRight}>Shot on Target</Text>
          <Text style={styles.secondaryTextRight}>{item.player ?? 'Uknown'}</Text>
        </View>

        <View style={styles.seperatorRight} />

        <View style={styles.columnTime}>
          <Image source={{ uri: 'https://i.imgur.com/Zsy9iFO.png' }} style={styles.yellowCard} resizeMode="contain" />
          <Text style={styles.timeText}>{item.time}</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.outerContainerLeft}>
      <View style={styles.columnTime}>
        <Image source={{ uri: 'https://i.imgur.com/Zsy9iFO.png' }} style={styles.yellowCard} resizeMode="contain" />
        <Text style={styles.timeText}>{item.time}</Text>
      </View>

      <View style={styles.seperatorLeft} />

      <View style={styles.columnLeft}>
        <Text style={styles.mainTextLeft}>Shot on Target</Text>
        <Text style={styles.secondaryTextLeft}>{item.player ?? 'Uknown'}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainerRight: {
    marginLeft: 6,
    marginRight: 6,
    height: 64,
    backgroundColor: 'transparent',
    marginTop: 12,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  outerContainerLeft: {
    marginRight: 6,
    height: 64,
    backgroundColor: 'transparent',
    marginTop: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginLeft: 12,
  },
  column: {
    flexDirection: 'column',
    alignItems: 'flex-end',
    backgroundColor: 'transparent',
    marginRight: 6,
  },
  columnLeft: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    backgroundColor: 'transparent',
    marginRight: 6,
  },
  columnTime: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    marginRight: 6,
    textAlign: 'left',
  },
  yellowCard: {
    borderRadius: 1,
    height: 32,
    width: 26,
    marginTop: 6,
  },
  timeText: {
    marginTop: 3,
    color: '#686868',
    fontSize: 12,
    textAlign: 'center',
  },
  seperatorRight: {
    height: '80%',
    width: 1,
    backgroundColor: '#222A36',
    marginRight: 12,
  },
  seperatorLeft: {
    height: '80%',
    width: 1,
    backgroundColor: '#222A36',
    marginRight: 12,
    marginLeft: 6,
  },
  mainTextRight: {
    color: '#C0C0C0',
    fontWeight: 'bold',
    marginRight: 12,
  },
  mainTextLeft: {
    color: '#C0C0C0',
    fontWeight: 'bold',
    marginLeft: 12,
  },
  secondaryTextRight: {
    color: '#686868',
    marginRight: 12,
  },
  secondaryTextLeft: {
    color: '#686868',
    marginLeft: 12,
  },
});
