import { Schedule, SchedulesDataResponse, StatsDataReponse } from '@/types/data';
import PlayerStatisticColumnElement from '../misc/PlayerStatisticColumnElement';
import TeamStatisticColumnElement from '../misc/TeamStatisticColumnElement';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import UtakmiceColumnElement from '../Utakmice/UtakmiceColumnElement';

export default function DetaljiList({
  schedulesData,
  statsData,
}: {
  schedulesData: SchedulesDataResponse;
  statsData: StatsDataReponse;
}) {
  const combinedData = [
    { type: 'header', title: 'Utakmice' },
    ...schedulesData.firstThreeMatchs.map((match: Schedule) => ({ type: 'match', item: match })),

    { type: 'header', title: 'Broj bodova' },
    ...statsData.teams['points'].slice(0, 5).map((club) => ({ type: 'team', item: club })),

    { type: 'header', title: 'Points / Goals' },
    ...statsData.teams['PTS/G'].slice(0, 3).map((club) => ({ type: 'team', item: club })),

    { type: 'header', title: 'Najbolji strijelci' },
    ...statsData.players['goals'].slice(0, 3).map((club) => ({ type: 'player', item: club })),
  ];

  const groupedData = [];
  let currentGroup = [] as any[];

  combinedData.forEach((item) => {
    if (item.type === 'header') {
      if (currentGroup.length > 0) {
        groupedData.push(currentGroup);
      }
      currentGroup = [item];
    } else {
      currentGroup.push(item);
    }
  });

  if (currentGroup.length > 0) {
    groupedData.push(currentGroup);
  }

  const renderGroup = ({ item }: { item: { type: string; title?: string; item: any }[] }) => (
    <View style={styles.container}>
      {item.map((subItem, index) => {
        switch (subItem.type) {
          case 'header':
            return (
              <Text key={index} style={styles.roundText}>
                {subItem.title}
              </Text>
            );
          case 'match':
            return <UtakmiceColumnElement key={index} item={subItem.item} />;
          case 'team':
            return <TeamStatisticColumnElement key={index} item={subItem.item} />;
          case 'player':
            return <PlayerStatisticColumnElement key={index} item={subItem.item} />;
          default:
            return null;
        }
      })}
    </View>
  );

  return (
    <View style={styles.outerContainer}>
      <FlatList data={groupedData} renderItem={renderGroup} keyExtractor={(item, index) => `group-${index}`} />
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    width: '100%',
    height: '100%',
    paddingBottom: 90,
  },
  container: {
    backgroundColor: '#10181E',
    borderColor: '#000000',
    borderRadius: 5,
    borderWidth: 1,
    marginHorizontal: 6,
    marginBottom: 6,
    paddingBottom: 6,
  },
  roundText: {
    fontSize: 18,
    color: '#686868',
    marginLeft: 6,
    fontWeight: 'bold',
  },
});
