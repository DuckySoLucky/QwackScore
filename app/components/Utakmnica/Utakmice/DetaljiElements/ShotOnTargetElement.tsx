import { StyleSheet, Image } from 'react-native';
import { Text, View } from '@/components/Themed';
import { Timeline } from '@/types/data';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { getThemeElement, getThemeName } from '@/API/theme';

export default function ShotOnTargetElement({ item }: { item: Timeline }) {
  const { t: translate } = useTranslation();

  if (item.position === 'right') {
    return (
      <View style={styles.outerContainerRight}>
        <View style={styles.column}>
          <Text style={styles.mainTextRight}>{translate(`match.details.summary.events.${item.type}`)}</Text>
          <Text style={styles.secondaryTextRight}>{item.player ?? 'Uknown'}</Text>
        </View>

        <View style={styles.separatorRight} />

        <View style={styles.columnTime}>
          <Image
            source={{
              uri: getThemeName() === 'dark' ? 'https://i.imgur.com/Zsy9iFO.png' : 'https://i.imgur.com/co3GOYo.png',
            }}
            style={styles.yellowCard}
            resizeMode="contain"
          />
          <Text style={styles.timeText}>{item.time}</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.outerContainerLeft}>
      <View style={styles.columnTime}>
        <Image
          source={{
            uri: getThemeName() === 'dark' ? 'https://i.imgur.com/Zsy9iFO.png' : 'https://i.imgur.com/co3GOYo.png',
          }}
          style={styles.yellowCard}
          resizeMode="contain"
        />
        <Text style={styles.timeText}>{item.time}</Text>
      </View>

      <View style={styles.separatorLeft} />

      <View style={styles.columnLeft}>
        <Text style={styles.mainTextLeft}>{translate(`match.details.summary.events.${item.type}`)}</Text>
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
    color: getThemeElement('text') as string,
    fontWeight: 'bold',
    marginRight: 12,
  },
  mainTextLeft: {
    color: getThemeElement('text') as string,
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
