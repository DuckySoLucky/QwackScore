import { StyleSheet } from 'react-native';
import React from 'react';
import { Text, View } from '@/components/Themed';
import { Commentary } from '@/types/data';

export default function CommentaryElement({ item }: { item: Commentary }) {
  if (item.position === 'right') {
    return (
      <View style={styles.outerContainerRight}>
        <Text style={styles.mainTextRight}>{item.message}</Text>

        <View style={styles.seperatorRight} />

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

      <View style={styles.seperatorLeft} />

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
    color: '#686868',
    fontSize: 16,
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
  },
  mainTextRight: {
    textAlign: 'right',
    color: '#C0C0C0',
    fontWeight: 'bold',
    marginRight: 12,
    fontSize: 12,
    flexWrap: 'wrap',
    maxWidth: '80%',
  },
  mainTextLeft: {
    textAlign: 'left',
    color: '#C0C0C0',
    fontWeight: 'bold',
    marginLeft: 12,
    fontSize: 12,
    flexWrap: 'wrap',
    maxWidth: '80%',
  },
});
