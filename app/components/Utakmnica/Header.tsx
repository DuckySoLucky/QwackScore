import { TimelineResponse } from '@/API/types/timeline';
import ErrorComponent from '../global/ErrorComponents';
import { StyleSheet, Image } from 'react-native';
import { Text, View } from '@/components/Themed';
import { Schedule } from '@/types/data';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { getThemeElement } from '@/API/theme';

export default function Header({ item, timelineData }: { item: Schedule; timelineData: TimelineResponse }) {
  const { t: translate } = useTranslation();
  if (!timelineData) {
    return <ErrorComponent message="Couldn't find timeline data" />;
  }

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
          {item.status === 'not_started'
            ? item.startTimeFormatted.split(' ')[0]
            : translate(`match.details.information.statuses.${item.status}`).toUpperCase()}
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
    backgroundColor: getThemeElement('innerContainer') as string,
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
    color: getThemeElement('teamName') as string,
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
    color: getThemeElement('teamName') as string,
  },
  stateText: {
    color: getThemeElement('teamName') as string,
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 4,
  },
  playerScoreText: {
    fontSize: 12,
    color: getThemeElement('text') as string,
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
