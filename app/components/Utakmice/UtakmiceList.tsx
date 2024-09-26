import { Schedule, SchedulesDataResponse, Schedules } from '@/types/data';
import React, { useState, useEffect, useCallback } from 'react';
import { View, FlatList, Text, ActivityIndicator, StyleSheet, Image } from 'react-native';
import UtakmiceColumnElement from './UtakmiceColumnElement';

export default function UtakmiceList({ schedulesData }: { schedulesData: SchedulesDataResponse }) {
  const renderItem = useCallback((item: Schedule) => {
    const getClubStyle = (clubName: string) =>
      item.winner === clubName ? { ...styles.clubName, color: '#C0C0C0' } : styles.clubName;

    return <UtakmiceColumnElement item={item} />;
  }, []);

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
            <FlatList
              data={schedulesData.schedules[item]}
              keyExtractor={(subItem) => subItem.id}
              renderItem={({ item: subItem }) => renderItem(subItem)}
            />
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

  //
  //
  //
  gameDetailsContainer: {
    backgroundColor: '#0C1216',
    borderColor: '#000000',
    borderRadius: 5,
    borderWidth: 1,
    marginHorizontal: 6,
    marginTop: 6,

    height: 50,

    flexDirection: 'row',
    alignItems: 'center',
  },
  dateText: {
    marginLeft: 6,
    color: '#686868',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 9,
    width: 40,
  },
  seperator: {
    height: '80%',
    width: 1,
    backgroundColor: '#222A36',
    marginLeft: 10,
  },
  clubImage: {
    marginLeft: 12,
    height: 18,
    width: 18,
  },
  clubName: {
    marginLeft: 10,
    fontSize: 12,
    color: '#686868',
    fontWeight: 'bold',
  },
  notificationIcon: {
    position: 'absolute',
    right: 6,
    height: 32,
    width: 32,
  },
});
