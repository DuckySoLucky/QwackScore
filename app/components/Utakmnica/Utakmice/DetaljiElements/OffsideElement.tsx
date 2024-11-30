import { StyleSheet, Image } from 'react-native';
import React from 'react';
import { Text, View } from '@/components/Themed';
import { Timeline } from '@/types/data';
import { useTranslation } from 'react-i18next';
import { getThemeElement } from '@/API/theme';

export default function OffsideElement({ item }: { item: Timeline }) {
  const { t: translate } = useTranslation();

  if (item.position === 'right') {
    return (
      <View style={styles.outerContainerRight}>
        <Text style={styles.mainTextRight}>{translate(`match.details.summary.events.${item.type}`)}</Text>

        <View style={styles.separatorRight} />

        <View style={styles.column}>
          <Image source={{ uri: 'https://i.imgur.com/GQg5JsV.png' }} style={styles.yellowCard} resizeMode="contain" />
          <Text style={styles.timeText}>{item.time}</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.outerContainerLeft}>
      <View style={styles.column}>
        <Image source={{ uri: 'https://i.imgur.com/GQg5JsV.png' }} style={styles.yellowCard} resizeMode="contain" />
        <Text style={styles.timeText}>{item.time}</Text>
      </View>

      <View style={styles.separatorLeft} />

      <Text style={styles.mainTextLeft}>{translate(`match.details.summary.events.${item.type}`)}</Text>
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
  separatorRight: {
    height: '80%',
    width: 1,
    backgroundColor: getThemeElement('separator') as string,
    marginRight: 12,
  },
  separatorLeft: {
    height: '80%',
    width: 1,
    backgroundColor: getThemeElement('separator') as string,
    marginRight: 12,
    marginLeft: 6,
  },
  mainTextRight: {
    textAlign: 'right',
    color: getThemeElement('text') as string,
    fontWeight: 'bold',
    marginRight: 12,
  },
  mainTextLeft: {
    textAlign: 'left',
    color: getThemeElement('text') as string,
    fontWeight: 'bold',
    marginLeft: 12,
  },
});
