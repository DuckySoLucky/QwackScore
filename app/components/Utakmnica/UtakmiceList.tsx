import { View, FlatList, Text, ActivityIndicator, StyleSheet } from 'react-native';
import UtakmiceColumnElement from './Utakmice/UtakmiceColumnElement';
import { SchedulesResponse } from '@/API/types/schedules';
import ErrorComponent from '../global/ErrorComponents';
import React, { useCallback } from 'react';
import { Schedule } from '@/types/data';

export default function UtakmiceList({ schedulesData }: { schedulesData: SchedulesResponse }) {
  const renderItem = useCallback((item: Schedule) => {
    return <UtakmiceColumnElement item={item} key={`${item.id}-${Math.random()}`} />;
  }, []);

  if (!schedulesData) {
    return <ErrorComponent message="Error: Couldn't find schedules data" />;
  }

  const renderFooter = () => {
    return <ActivityIndicator style={{ marginVertical: 20 }} />;
  };

  return (
    <View style={styles.outerContainer}>
      <FlatList
        data={Object.keys(schedulesData.schedules)}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <View>
            <Text style={styles.roundText}>Runda {item}</Text>
            {Object.values(schedulesData.schedules[item]).map((value) => renderItem(value))}
          </View>
        )}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
        style={styles.container}
      />
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
  },
});
