import { Commentary, TimelineDataResponse } from '@/types/data';
import React, { useCallback, useMemo } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import CommentaryElement from './Commentary/CommentaryElement';
import { Text } from '@/components/Themed';

export default function CommentaryList({ timelineData }: { timelineData: TimelineDataResponse }) {
  const renderItem = useCallback(
    ({ item }: { item: Commentary }) => {
      const index = timelineData.commentary.indexOf(item);
      const previousElement = timelineData.commentary[index - 1];

      if (previousElement !== undefined) {
        const isSwitchFromRightToLeft =
          (previousElement.position === 'left' && item.position === 'right') ||
          (previousElement.position === 'right' && item.position === 'left');

        if (isSwitchFromRightToLeft) {
          return (
            <View key={item.time}>
              <View
                style={{
                  alignItems: 'center',
                }}
              >
                <View style={styles.borderLine} />
              </View>
              <CommentaryElement item={item} />
            </View>
          );
        }
      }

      return <CommentaryElement key={item.time} item={item} />;
    },
    [timelineData.commentary]
  );

  const memoizedRenderItem = useMemo(() => renderItem, [renderItem]);

  const commentaryItems = timelineData.commentary.length;

  return (
    <View style={styles.outerContainer}>
      {commentaryItems === 0 ? (
        <>
          <Text style={{ color: 'white', textAlign: 'center', margin: 10, fontWeight: 'bold' }}>
            No commentary data available
          </Text>
        </>
      ) : (
        <>
          <FlatList
            data={timelineData.commentary}
            keyExtractor={(item) => `${item.time}-${item.message}-${Math.random()}`}
            renderItem={memoizedRenderItem}
            style={styles.container}
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: '#161e28',
    paddingTop: 6,
  },
  roundText: {
    fontSize: 18,
    color: '#686868',
    marginLeft: 6,
    fontWeight: 'bold',
  },
  container: {
    backgroundColor: '#10181E',
    borderColor: '#000000',
    borderRadius: 5,
    borderWidth: 1,
    marginHorizontal: 6,
    marginBottom: 70,
  },
  statContainer: {
    alignItems: 'center',
  },
  statValue: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    alignItems: 'center',
  },

  borderLine: {
    width: '95%',
    height: 1,
    backgroundColor: '#222A36',
    marginVertical: 12,
  },
});
