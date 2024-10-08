import { StyleSheet } from 'react-native';
import { Text, View } from '@/components/Themed';
import { Timeline } from '@/types/data';
import React from 'react';

export function AnnouncementElement({ item }: { item: Timeline }) {
  return (
    <View style={styles.container}>
      <Text style={styles.timeText}>{item.message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginLeft: 6,
    marginRight: 6,
    marginTop: 6,
    height: 24,
    backgroundColor: '#0C1216',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#00000',
  },
  timeText: {
    color: '#C0C0C0',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
