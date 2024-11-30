import { StyleSheet } from 'react-native';
import React from 'react';
import { Text, View } from '@/components/Themed';
import { Commentary } from '@/types/data';
import { getThemeElement } from '@/API/theme';

export default function CommentaryElement({ item }: { item: Commentary }) {
  if (item.position === 'right') {
    return (
      <View style={styles.outerContainerRight}>
        <Text style={styles.mainTextRight}>{item.message}</Text>

        <View style={styles.separatorRight} />

        <View style={styles.column}>
          <Text style={styles.timeText}>{item.time}</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.outerContainerLeft}>
      <View style={styles.column}>
        <Text style={styles.timeText}>{item.time}</Text>
      </View>

      <View style={styles.separatorLeft} />

      <Text style={styles.mainTextLeft}>{item.message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainerRight: {
    marginLeft: 6,
    marginRight: 6,
    height: 64,
    backgroundColor: 'transparent',
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
    marginRight: 12,
  },
  timeText: {
    fontSize: 16,
    color: getThemeElement('text') as string,
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
  },
  mainTextRight: {
    textAlign: 'right',
    color: getThemeElement('text') as string,
    fontWeight: 'bold',
    marginRight: 12,
    fontSize: 12,
    flexWrap: 'wrap',
    maxWidth: '80%',
  },
  mainTextLeft: {
    textAlign: 'left',
    color: getThemeElement('text') as string,
    fontWeight: 'bold',
    marginLeft: 12,
    fontSize: 12,
    flexWrap: 'wrap',
    maxWidth: '80%',
  },
});
