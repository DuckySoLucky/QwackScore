import { View, Text, StyleSheet, Image } from 'react-native';
import { StandingsData } from '@/types/data';
import { useTranslation } from 'react-i18next';

export default function DefaultPoredakColumnElement({ standingsData }: { standingsData: StandingsData[] }) {
  const { t: translate } = useTranslation();

  return (
    <View>
      <View style={styles.row}>
        <View style={styles.leftContainer}>
          <Text style={styles.topText}>#</Text>
          <Text style={styles.teamNameText}>{translate(`match.standings.formKeys.team`)}</Text>
        </View>
        <View style={styles.rightContainer}>
          <Text style={styles.topText}>P</Text>
          <Text style={styles.topText}>GD</Text>
          <Text style={styles.topText}>PTS</Text>
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
            <Text style={styles.playedText}>{item.played}</Text>
            <Text style={styles.goalDiffsText}>{item.goals_diff}</Text>
            <Text style={styles.scoreText}>{item.points}</Text>
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
  clubImage: {
    height: 24,
    width: 24,
    position: 'absolute',
    left: 40,
  },
  clubName: {
    color: '#686868',
    fontSize: 16,
    marginLeft: 6,
    position: 'absolute',
    left: 70,
  },
  scoreText: {
    color: '#686868',
    fontSize: 16,
    marginHorizontal: 11,
  },
  teamNameText: {
    color: '#686868',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 12,
  },
  playedText: {
    color: '#686868',
    fontSize: 16,
    position: 'absolute',
    right: 90,
  },
  goalDiffsText: {
    color: '#686868',
    fontSize: 16,
    position: 'absolute',
    right: 55,
  },
});
