import { TimelineDataResponse, Timeline } from '@/types/data';
import { View, FlatList, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { AnnouncementElement } from './DetaljiElements/AnnouncementElement';
import ThrowInElement from './DetaljiElements/ThrowInElement';
import FreeKickElement from './DetaljiElements/FreeKickElement';
import OffsideElement from './DetaljiElements/OffsideElement';
import GoalKickElement from './DetaljiElements/GoalKickElement';
import InjuryElement from './DetaljiElements/InjuryElement';
import ShotSavedElement from './DetaljiElements/ShotSavedElement';
import ShotOffTargetElement from './DetaljiElements/ShotOffTarget';
import CornerKickElement from './DetaljiElements/CornerKickElement';
import SubstitutionElement from './DetaljiElements/SubstitutionElement';
import ShotOnTargetElement from './DetaljiElements/ShotOnTargetElement';
import YellowCardElement from './DetaljiElements/YellowCardElement';
import ScoreChangeElement from './DetaljiElements/ScoreChangeElement';

function titleCase(str: string) {
  return str
    .toLowerCase()
    .replaceAll('_', ' ')
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function formatName(name: string) {
  return name
    .split(' ')
    .map((element, index) => (index === name.split(' ').length - 1 ? element : element[0] + '.'))
    .join(' ');
}

export default function DetaljiList({ timelineData }: { timelineData: TimelineDataResponse }) {
  const [selectedForm, setSelectedForm] = useState('default');
  function renderItem({ item, selectedForm }: { item: Timeline; selectedForm: string }) {
    switch (item.type) {
      case 'announcement':
        return <AnnouncementElement item={item} />;

      case 'throw_in':
        return selectedForm === 'default' ? null : <ThrowInElement item={item} />;

      case 'free_kick':
        return selectedForm === 'default' ? null : <FreeKickElement item={item} />;

      case 'offside':
        return selectedForm === 'default' ? null : <OffsideElement item={item} />;

      case 'goal_kick':
        return selectedForm === 'default' ? null : <GoalKickElement item={item} />;

      case 'injury':
        return <InjuryElement item={item} />;

      case 'shot_saved':
        return <ShotSavedElement item={item} />;

      case 'shot_off_target':
        return <ShotOffTargetElement item={item} />;

      case 'corner_kick':
        return selectedForm === 'default' ? null : <CornerKickElement item={item} />;

      case 'substitution':
        return <SubstitutionElement item={item} />;

      case 'shot_on_target':
        return <ShotOnTargetElement item={item} />;

      case 'yellow_card':
        return <YellowCardElement item={item} />;

      case 'score_change':
        return <ScoreChangeElement item={item} />;

      default:
        console.log(item.type);
        return null;
    }
  }

  return (
    <View style={styles.outerContainer}>
      {timelineData.timeline.length ? (
        <>
          <View style={styles.buttonContainer}>
            <Pressable
              style={selectedForm === 'default' ? styles.selectedButtonElement : styles.buttonElement}
              onPress={() => setSelectedForm('default')}
            >
              <Text style={selectedForm === 'default' ? styles.selectedButtonText : styles.buttonText}>Default</Text>
            </Pressable>

            <Pressable
              style={selectedForm === 'all' ? styles.selectedButtonElement : styles.buttonElement}
              onPress={() => setSelectedForm('all')}
            >
              <Text style={selectedForm === 'all' ? styles.selectedButtonText : styles.buttonText}>All</Text>
            </Pressable>
          </View>
          <View style={styles.container}>
            <FlatList
              data={timelineData.timeline}
              keyExtractor={(item) => `${item.type}-${Math.random()}`}
              renderItem={({ item }) => renderItem({ item, selectedForm })}
              style={styles.flatList}
            />
          </View>
        </>
      ) : null}

      <View style={styles.matchStatsContainer}>
        <Text style={styles.matchStatsHeader}>Match Information</Text>

        <View style={styles.matchStatsContainerv2}>
          <ScrollView>
            {Object.keys(timelineData.information).map((key) => {
              if (['dateTop', 'timeTop'].includes(key) || key === 'capacity') {
                return null;
              }

              const value = timelineData.information[key];

              let formattedValue = typeof value === 'string' ? titleCase(value) : value;
              if (typeof value === 'number') {
                formattedValue = value.toLocaleString();
              } else if (typeof value === 'object') {
                formattedValue = value.map((v: { name: string }) => formatName(v.name)).join(', ');
              }

              if (key === 'attendance') {
                formattedValue = `${formattedValue} / ${timelineData.information.capacity.toLocaleString()}`;
              }

              return (
                <View style={{ flexDirection: 'row' }} key={key}>
                  <Text style={styles.matchStatsText} key={key}>{`${titleCase(key)}`}</Text>
                  <Text style={styles.matchStatsValue}>{formattedValue}</Text>
                </View>
              );
            })}
          </ScrollView>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: '#161e28',
    paddingBottom: 16,
    marginBottom: 16,
  },
  container: {
    backgroundColor: '#10181E',
    marginLeft: 6,
    marginRight: 6,
    marginTop: 6,
    marginBottom: 6,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#00000',
  },
  flatList: {
    height: 400,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 6,
    marginLeft: 6,
  },
  buttonElement: {
    backgroundColor: '#161F29',
    borderColor: '#686868',
    borderRadius: 10,
    borderWidth: 1,
    textAlign: 'center',
    paddingVertical: 3,
    paddingHorizontal: 6,
    marginRight: 6,
  },
  selectedButtonElement: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#686868',
    textAlign: 'center',
    paddingVertical: 3,
    paddingHorizontal: 6,
    marginRight: 6,
  },
  buttonText: {
    color: '#686868',
    fontSize: 12,
    fontWeight: 'bold',
  },
  selectedButtonText: {
    color: '#161F29',
    fontSize: 12,
    fontWeight: 'bold',
  },
  matchStatsContainer: {
    backgroundColor: '#10181E',
    marginLeft: 6,
    marginRight: 6,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#00000',
    marginTop: 6,
  },
  matchStatsText: {
    color: '#C0C0C0',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 6,
    flex: 1,
    textAlign: 'left',
  },
  matchStatsHeader: {
    color: '#686868',
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
    borderBottomColor: '#222A36',
    borderBottomWidth: 1,
    marginHorizontal: 6,
  },
  matchStatsValue: {
    color: '#686868',
    fontSize: 14,
    marginRight: 6,
    marginBottom: 6,
    flex: 1,
    textAlign: 'right',
  },
  matchStatsContainerv2: {
    height: 160,
  },
});
