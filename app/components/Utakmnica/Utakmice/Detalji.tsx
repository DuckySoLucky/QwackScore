import { View, FlatList, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { TimelineDataResponse, Timeline } from '@/types/data';
import React, { useState } from 'react';

import AnnouncementElement from './DetaljiElements/AnnouncementElement';
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
import RedCardElement from './DetaljiElements/RedCardElement';
import { useTranslation } from 'react-i18next';
import { Container, InnerContainer } from '@/components/theme/Container';
import { getThemeElement } from '@/API/theme';

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

function formatValue(timelineData: TimelineDataResponse, key: string, translate: (key: string) => string) {
  const value = timelineData.information[key];

  let formattedValue = typeof value === 'string' ? titleCase(value) : value;
  if (typeof value === 'number') {
    formattedValue = value.toLocaleString();
  } else if (typeof value === 'object') {
    formattedValue = (value as { name: string }[]).map((v: { name: string }) => formatName(v.name)).join(', ');
  }

  if (key === 'attendance') {
    formattedValue = `${formattedValue} / ${timelineData.information.capacity.toLocaleString()}`;
  }

  if (key === 'status') {
    formattedValue = translate(`match.details.information.statuses.${value}`);
  }

  return formattedValue;
}

export default function DetaljiList({ timelineData }: { timelineData: TimelineDataResponse }) {
  const { t: translate } = useTranslation();

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

      case 'red_card':
        return <RedCardElement item={item} />;

      case 'score_change':
        return <ScoreChangeElement item={item} />;

      default:
        return null;
    }
  }

  return (
    <View style={styles.outerContainer}>
      {timelineData.timeline.length ? (
        <>
          {
            // ? top buttons
          }
          <View style={styles.buttonContainer}>
            <Pressable
              style={selectedForm === 'default' ? styles.selectedButtonElement : styles.buttonElement}
              onPress={() => setSelectedForm('default')}
            >
              <Text style={selectedForm === 'default' ? styles.selectedButtonText : styles.buttonText}>
                {translate('match.details.summary.default')}
              </Text>
            </Pressable>

            <Pressable
              style={selectedForm === 'all' ? styles.selectedButtonElement : styles.buttonElement}
              onPress={() => setSelectedForm('all')}
            >
              <Text style={selectedForm === 'all' ? styles.selectedButtonText : styles.buttonText}>
                {translate('match.details.summary.all')}
              </Text>
            </Pressable>
          </View>

          {
            // ? timeline
          }
          <View style={styles.flexContainer}>
            <Container style={styles.container}>
              <FlatList
                data={timelineData.timeline}
                keyExtractor={(item) => `${item.type}-${Math.random()}`}
                renderItem={({ item }) => renderItem({ item, selectedForm })}
              />
            </Container>

            <ScrollView contentContainerStyle={styles.scrollViewContent}>
              <Container style={styles.matchStatsContainer}>
                <Text style={styles.matchStatsHeader}>{translate('match.details.information.title')}</Text>
                <View style={styles.matchStatsContainerv2}>
                  {Object.keys(timelineData.information).map((key) => {
                    if (['dateTop', 'timeTop'].includes(key) || key === 'capacity') {
                      return null;
                    }

                    const formattedValue = formatValue(timelineData, key, translate) as string;
                    return (
                      <View style={{ flexDirection: 'row' }} key={key}>
                        <Text
                          style={styles.matchStatsText}
                          key={key}
                        >{`${translate(`match.details.information.${key}`)}`}</Text>
                        <Text style={styles.matchStatsValue}>{formattedValue}</Text>
                      </View>
                    );
                  })}
                </View>
              </Container>
            </ScrollView>
          </View>
        </>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    width: '100%',
    height: '100%',
    paddingBottom: 16,
    marginBottom: 16,
  },
  flexContainer: {
    flexDirection: 'column',
    flex: 1,
  },
  container: {
    marginLeft: 6,
    marginRight: 6,
    marginTop: 6,
    marginBottom: 6,
    borderRadius: 10,
    flex: 3,
  },
  scrollViewContent: {
    flexGrow: 1,
    flexDirection: 'column',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 6,
    marginLeft: 6,
  },
  buttonElement: {
    backgroundColor: getThemeElement('background') as string,
    borderColor: getThemeElement('mainText') as string,
    borderRadius: 10,
    borderWidth: 1,
    textAlign: 'center',
    paddingVertical: 3,
    paddingHorizontal: 6,
    marginRight: 6,
  },
  selectedButtonElement: {
    backgroundColor: getThemeElement('selectedButton') as string,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: getThemeElement('mainText') as string,
    textAlign: 'center',
    paddingVertical: 3,
    paddingHorizontal: 6,
    marginRight: 6,
  },
  buttonText: {
    color: getThemeElement('mainText') as string,
    fontSize: 12,
    fontWeight: 'bold',
  },
  selectedButtonText: {
    color: getThemeElement('mainText') as string,
    fontSize: 12,
    fontWeight: 'bold',
  },
  matchStatsContainer: {
    marginLeft: 6,
    marginRight: 6,
    borderRadius: 10,
    marginTop: 6,
  },
  matchStatsText: {
    color: getThemeElement('text') as string,
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 6,
    flex: 1,
    textAlign: 'left',
  },
  matchStatsHeader: {
    color: getThemeElement('mainText') as string,
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
    borderBottomColor: getThemeElement('separator') as string,
    borderBottomWidth: 1,
    marginHorizontal: 6,
  },
  matchStatsValue: {
    color: getThemeElement('mainText') as string,
    fontSize: 14,
    marginRight: 6,
    flex: 1,
    textAlign: 'right',
  },
  matchStatsContainerv2: {
    paddingBottom: 6,
  },
});
