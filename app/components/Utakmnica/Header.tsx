import { StyleSheet, ScrollView, Pressable, ActivityIndicator, Image } from 'react-native';
import React, { useState, useEffect } from 'react';

import { Text, View } from '@/components/Themed';
import { Schedule, TimelineData } from '@/types/data';

export default function Header({ item, timelineData }: { item: Schedule; timelineData: TimelineData }) {
  const firstTeam = item.competitors[0];
  const secondTeam = item.competitors[1];
  const totalScore = (firstTeam.score ?? 0) + (secondTeam.score ?? 0);

  return (
    <View style={styles.container}>
      <View style={styles.teamContainer}>
        <Image source={{ uri: firstTeam.image }} style={styles.teamImage} resizeMode="contain" />
        <Text style={styles.teamName}>{firstTeam.name}</Text>
        <View style={styles.scoresContainer}>
          {timelineData.scores.home.map((score, index) => (
            <Text style={styles.playerScoreText} key={index}>
              {score.message}
            </Text>
          ))}
        </View>
      </View>

      <View style={styles.scoreContainer}>
        <Text style={styles.scoreText}>
          {item.status === 'closed'
            ? `${firstTeam.score} - ${secondTeam.score}`
            : item.startTimeFormatted.split(' ')[1]}
        </Text>
        <Text style={styles.stateText}>
          {item.status === 'closed' ? 'FINISHED' : item.startTimeFormatted.split(' ')[0]}
        </Text>
        {totalScore > 0 ? (
          <View style={styles.scoresContainer}>
            <Image source={{ uri: 'https://i.imgur.com/h0GzKuO.png' }} style={styles.scoreImage} resizeMode="contain" />
          </View>
        ) : null}
      </View>

      <View style={styles.teamContainer}>
        <Image source={{ uri: secondTeam.image }} style={styles.teamImage} resizeMode="contain" />
        <Text style={styles.teamName}>{secondTeam.name}</Text>
        <View style={styles.scoresContainer}>
          {timelineData.scores.away.map((score, index) => (
            <Text style={styles.playerScoreText} key={index}>
              {score.message}
            </Text>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#10181E',
    paddingTop: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  teamContainer: {
    backgroundColor: 'transparent',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 40,
    flex: 1,
  },
  teamImage: {
    height: 64,
    width: 64,
  },
  teamName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 4,
    textAlign: 'center',
  },
  scoreContainer: {
    alignItems: 'center',
    backgroundColor: 'transparent',
    flex: 1,
    flexDirection: 'column',
    marginTop: 40,
  },
  scoreText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  stateText: {
    fontSize: 16,
    marginTop: 4,
  },
  playerScoreText: {
    fontSize: 12,
    color: 'gray',
  },
  scoresContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 10,
    backgroundColor: 'transparent',
  },
  scoreImage: {
    height: 16,
    width: 16,
    marginTop: 20,
  },
});
