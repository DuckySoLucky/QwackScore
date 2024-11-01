import { StandignsResponse } from '@/API/types/standings';
import ErrorComponent from '@/components/global/ErrorComponents';
import { Schedule, SchedulesDataResponse, StandingsData, StatsDataReponse } from '@/types/data';
import React from 'react';
import { View, FlatList, Text, StyleSheet, Image } from 'react-native';

export default function FormPoredakColumnElement({ standingsData }: { standingsData: StandignsResponse }) {
  if (!standingsData) {
    return <ErrorComponent message="Error: Couldn't find standings data" />;
  }

  return (
    <View>
      <View style={styles.row}>
        <View style={styles.leftContainer}>
          <Text style={styles.topText}>#</Text>
          <Text style={styles.teamNameText}>Tim</Text>
        </View>
        <View style={styles.rightContainer}>
          <Text style={styles.topText}>FORM</Text>
        </View>
      </View>

      {standingsData.map((item) => (
        <View
          style={
            standingsData.indexOf(item) === standingsData.length - 1
              ? [styles.row, { borderBottomWidth: 0 }]
              : styles.row
          }
          key={item.id}
        >
          <View style={styles.leftContainer}>
            <Text style={styles.positionText}>{item.position}</Text>
            <Image source={{ uri: item.image }} style={styles.clubImage} resizeMode="contain" />
            <Text style={styles.clubName}>{item.name}</Text>
          </View>
          <View style={styles.rightContainer}>
            {item.form.split('').map((str, index) => {
              return (
                <View
                  style={{
                    ...styles.formElement,
                    backgroundColor: str === 'W' ? '#21E08C' : str === 'D' ? '#D9D9D9' : '#D82458',
                  }}
                  key={index}
                >
                  <Text style={styles.formText}>{str}</Text>
                </View>
              );
            })}
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    marginTop: 6,
    paddingBottom: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#000000',
  },
  leftContainer: {
    flexDirection: 'row',
    flex: 1,
  },
  rightContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    flex: 1,
    alignItems: 'center',
  },
  topText: {
    color: '#686868',
    fontWeight: 'bold',
    fontSize: 16,
    marginHorizontal: 8,
  },
  positionText: {
    color: '#686868',
    fontSize: 16,
    marginHorizontal: 8,
    fontWeight: 'bold',
  },
  clubName: {
    color: '#686868',
    fontSize: 16,
    marginLeft: 6,
    position: 'absolute',
    left: 70,
  },
  clubImage: {
    height: 24,
    width: 24,
    position: 'absolute',
    left: 40,
  },
  formElement: {
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 24,
    marginRight: 4,
  },
  formText: {
    color: '#000000',
    fontWeight: 'bold',
    fontSize: 12,
  },
  teamNameText: {
    color: '#686868',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 12,
  },
});
