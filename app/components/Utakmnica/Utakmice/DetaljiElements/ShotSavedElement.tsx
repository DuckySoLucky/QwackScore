import { StyleSheet, Image } from 'react-native';
import React, { useTransition } from 'react';
import { Text, View } from '@/components/Themed';
import { Timeline } from '@/types/data';
import { useTranslation } from 'react-i18next';

const images = [
  'https://i.imgur.com/U2qQpQF.png',
  'https://i.imgur.com/IYEHHqi.png',
  'https://i.imgur.com/adhBakO.png',
];

function getRandomImage() {
  return images[1];
  // return images[Math.floor(Math.random() * images.length)];
}

export default function ShotSavedElement({ item }: { item: Timeline }) {
  const { t: translate } = useTranslation();

  if (item.position === 'right') {
    return (
      <View style={styles.outerContainerRight}>
        <Text style={styles.mainTextRight}>{translate('match.details.summary.events.shot_saved')}</Text>

        <View style={styles.seperatorRight} />

        <View style={styles.column}>
          <Image source={{ uri: getRandomImage() }} style={styles.yellowCard} resizeMode="contain" />
          <Text style={styles.timeText}>{item.time}</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.outerContainerLeft}>
      <View style={styles.column}>
        <Image source={{ uri: getRandomImage() }} style={styles.yellowCard} resizeMode="contain" />
        <Text style={styles.timeText}>{item.time}</Text>
      </View>

      <View style={styles.seperatorLeft} />

      <Text style={styles.mainTextLeft}>{translate('match.details.summary.events.shot_saved')}</Text>
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
