import { TimelineResponse, TimelineResponseCommentary } from '@/API/types/timeline';
import CommentaryElement from './Commentary/CommentaryElement';
import { View, FlatList, StyleSheet } from 'react-native';
import ErrorComponent from '../global/ErrorComponents';
import React, { useCallback, useMemo } from 'react';
import { getThemeElement } from '@/API/theme';

export default function CommentaryList({ timelineData }: { timelineData: TimelineResponse }) {
  const renderItem = useCallback(
    ({ item }: { item: TimelineResponseCommentary }) => {
      if (!timelineData) {
        return <ErrorComponent message="Couldn't find commentary data" />;
      }

      const index = timelineData.commentary.indexOf(item);
      const previousElement = timelineData.commentary[index - 1];

      if (previousElement !== undefined) {
        const isSwitchFromRightToLeft =
          (previousElement.position === 'left' && item.position === 'right') ||
          (previousElement.position === 'right' && item.position === 'left');

        if (isSwitchFromRightToLeft) {
          return (
            <View key={item.time}>
              <View style={styles.center}>
                <View style={styles.borderLine} />
              </View>
              <CommentaryElement item={item} />
            </View>
          );
        }
      }

      return <CommentaryElement key={item.time} item={item} />;
    },
    [timelineData],
  );

  const memoizedRenderItem = useMemo(() => renderItem, [renderItem]);

  if (!timelineData || !timelineData?.commentary || !timelineData?.commentary?.length) {
    return <ErrorComponent message="Couldn't find commentary data" />;
  }

  return (
    <FlatList
      data={timelineData.commentary}
      keyExtractor={(item) => `${item.time}-${item.message}-${Math.random()}`}
      renderItem={memoizedRenderItem}
      style={styles.container}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    ...(getThemeElement('innerContainerElement') as object),
    marginTop: 12,
    borderRadius: 5,
    marginHorizontal: 6,
    marginBottom: 70,
  },
  borderLine: {
    width: '95%',
    height: 1,
    backgroundColor: getThemeElement('separator') as string,
    marginVertical: 12,
  },
  center: {
    alignItems: 'center',
  },
});
