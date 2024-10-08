import { StyleSheet, Image, ScrollView, ActivityIndicator, Pressable, Dimensions } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Text, View } from '@/components/Themed';
import { Timeline } from '@/types/data';

export default function FreeKickElement({ item }: { item: Timeline }) {
  if (item.position === 'right') {
    return (
      <View style={styles.outerContainerRight}>
        <Text style={styles.mainTextRight}>Free Kick</Text>

        <View style={styles.seperatorRight} />

        <View style={styles.column}>
          <Image source={{ uri: 'https://i.imgur.com/uaCclHH.png' }} style={styles.yellowCard} resizeMode="contain" />
          <Text style={styles.timeText}>{item.time}</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.outerContainerLeft}>
      <View style={styles.column}>
        <Image source={{ uri: 'https://i.imgur.com/uaCclHH.png' }} style={styles.yellowCard} resizeMode="contain" />
        <Text style={styles.timeText}>{item.time}</Text>
      </View>

      <View style={styles.seperatorLeft} />

      <Text style={styles.mainTextLeft}>Free Kick</Text>
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
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    marginRight: 6,
    width: 40,
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
  column2: {
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    marginRight: 12,
  },
  mainTextRight: {
    textAlign: 'right',
    color: '#C0C0C0',
    fontWeight: 'bold',
    marginRight: 12,
  },
  mainTextLeft: {
    textAlign: 'left',
    color: '#C0C0C0',
    fontWeight: 'bold',
    marginLeft: 12,
  },
});
