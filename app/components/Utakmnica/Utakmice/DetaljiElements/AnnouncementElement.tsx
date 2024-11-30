import { StyleSheet } from 'react-native';
import { Text } from '@/components/Themed';
import { Timeline } from '@/types/data';
import React from 'react';
import { InnerContainer } from '@/components/theme/Container';
import { getThemeElement } from '@/API/theme';

function AnnouncementElement({ item }: { item: Timeline }) {
  return (
    <InnerContainer style={styles.container}>
      <Text style={styles.timeText}>{item.message}</Text>
    </InnerContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    marginLeft: 6,
    marginRight: 6,
    marginTop: 6,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  timeText: {
    color: getThemeElement('text') as string,
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default AnnouncementElement;
