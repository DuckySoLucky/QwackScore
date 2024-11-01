import { SchedulesMatch } from '@/API/types/schedules';
import { StyleSheet, Image } from 'react-native';
import { Text, View } from '@/components/Themed';
import { Link } from 'expo-router';
import React from 'react';

function NewsResult({ data }: { data: SchedulesMatch }) {
  if (!data || !data.competitors || data.competitors.length !== 2) {
    return null;
  }

  const firstImage = data.competitors[0].image;
  const secondImage = data.competitors[1].image;

  const text = ['not_started', 'postponed'].includes(data.status)
    ? data.startTimeFormatted.split(' ').join('\n')
    : `${data.competitors[0].score} - ${data.competitors[1].score}`;

  return (
    <Link href={{ pathname: '/utakmica', params: { item: JSON.stringify(data) } }} style={{ marginRight: 6 }}>
      <View style={styles.container}>
        <Image source={{ uri: firstImage }} style={styles.leftImage} resizeMode="contain" />

        <Image source={{ uri: 'https://i.imgur.com/Q6nxcJk.png' }} style={styles.middleImage} resizeMode="contain" />

        <Image source={{ uri: secondImage }} style={styles.rightImage} resizeMode="contain" />

        <View
          style={
            ['not_started', 'postponed'].includes(data.status)
              ? styles.textPositionNotStarted
              : styles.textPositionScore
          }
        >
          <Text
            style={
              ['not_started', 'postponed'].includes(data.status) ? styles.textStyleNotStarted : styles.textStyleScore
            }
          >
            {text}
          </Text>
        </View>
      </View>
    </Link>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#10181E',
    borderColor: '#000000',
    borderWidth: 1,
    height: 96,
    width: 96,
    marginRight: 6,
    borderRadius: 10,
    flexDirection: 'row',
  },
  leftImage: {
    marginLeft: 10,
    marginTop: 12,
    height: 50,
    width: 35,
  },
  rightImage: {
    marginLeft: -20,
    marginTop: 12,
    height: 50,
    width: 35,
  },
  middleImage: {
    height: 45,
    width: 50,
    zIndex: -1,
    marginTop: 15,
    marginLeft: -20,
  },
  textPositionNotStarted: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#10181E',
    marginBottom: 5,
  },
  textPositionScore: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#10181E',
    marginBottom: 5,
  },
  textStyleNotStarted: {
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  textStyleScore: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default NewsResult;
