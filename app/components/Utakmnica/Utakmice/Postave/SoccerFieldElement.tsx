import { LineupsDataResponse, Substitution } from '@/types/data';
import { View, StyleSheet, Image, Text } from 'react-native';
import React, { useState } from 'react';
import PlayerElement from './PlayerElement';
import Modal from 'react-native-modal';
import { getThemeElement } from '@/API/theme';
import { MainText } from '@/components/theme/Text';
import { useTranslation } from 'react-i18next';

export default function SoccerFieldElement({ lineupsData }: { lineupsData: LineupsDataResponse }) {
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState(null) as [Substitution | null, Function];
  const { t: translate } = useTranslation();

  const handlePlayerPress = (player: Substitution) => {
    setSelectedPlayer(player);
    setModalVisible(true);
  };

  return (
    <View style={styles.outerContainer}>
      <Image
        source={{
          uri: 'https://i.imgur.com/C7SWI7G.png',
        }}
        style={styles.fieldIcon}
        resizeMode="contain"
      />

      <View style={styles.lineupContainer}>
        <View style={styles.goalKeeperRow}>
          {lineupsData.home.goalkeeper.map((player) => {
            return (
              <PlayerElement
                name={player.name}
                number={player.jersey_number}
                onPress={() => handlePlayerPress(player)}
                key={`${player.name}-${player.id}-${Math.random()}-${Math.random()}`}
              />
            );
          })}
        </View>

        <View style={styles.defenderRow}>
          {lineupsData.home.defenders.map((player) => {
            return (
              <PlayerElement
                name={player.name}
                number={player.jersey_number}
                onPress={() => handlePlayerPress(player)}
                key={`${player.name}-${player.id}-${Math.random()}`}
              />
            );
          })}
        </View>

        <View style={styles.midfielderRow}>
          {lineupsData.home.midfielders.map((player) => {
            return (
              <PlayerElement
                name={player.name}
                number={player.jersey_number}
                onPress={() => handlePlayerPress(player)}
                key={`${player.name}-${player.id}-${Math.random()}`}
              />
            );
          })}
        </View>

        <View style={styles.forwardRow}>
          {lineupsData.home.forwards.map((player) => {
            return (
              <PlayerElement
                name={player.name}
                number={player.jersey_number}
                onPress={() => handlePlayerPress(player)}
                key={`${player.name}-${player.id}-${Math.random()}`}
              />
            );
          })}
        </View>

        <View style={styles.forwardRow}>
          {lineupsData.away.forwards.map((player) => {
            return (
              <PlayerElement
                name={player.name}
                number={player.jersey_number}
                onPress={() => handlePlayerPress(player)}
                key={`${player.name}-${player.id}-${Math.random()}`}
              />
            );
          })}
        </View>

        <View style={styles.midfielderRow}>
          {lineupsData.away.midfielders.map((player) => {
            return (
              <PlayerElement
                name={player.name}
                number={player.jersey_number}
                onPress={() => handlePlayerPress(player)}
                key={`${player.name}-${player.id}-${Math.random()}`}
              />
            );
          })}
        </View>

        <View style={styles.defenderRow}>
          {lineupsData.away.defenders.map((player) => {
            return (
              <PlayerElement
                name={player.name}
                number={player.jersey_number}
                onPress={() => handlePlayerPress(player)}
                key={`${player.name}-${player.id}-${Math.random()}`}
              />
            );
          })}
        </View>

        <View style={styles.goalKeeperRow}>
          {lineupsData.away.goalkeeper.map((player) => {
            return (
              <PlayerElement
                name={player.name}
                number={player.jersey_number}
                onPress={() => handlePlayerPress(player)}
                key={`${player.name}-${player.id}-${Math.random()}`}
              />
            );
          })}
        </View>
      </View>

      <Modal
        isVisible={isModalVisible}
        onBackdropPress={() => setModalVisible(false)}
        onSwipeComplete={() => setModalVisible(false)}
        swipeDirection={['down']}
        style={styles.modal}
      >
        <View style={styles.modalContent}>
          <View style={styles.modalHandle} />
          {selectedPlayer && (
            <View>
              <View style={styles.playerStatsContainer}>
                <Image source={{ uri: 'https://i.imgur.com/74RFZoj.png' }} style={styles.playerImage} />
                <Text style={styles.playerName}>{selectedPlayer.name}</Text>
              </View>

              {Object.keys(selectedPlayer)
                .filter(
                  (key) =>
                    ['id', 'name', 'country_code', 'order', 'position', 'starter', 'played'].includes(key) === false,
                )
                .map((key) => {
                  let value = selectedPlayer[key as keyof Substitution] as string | number;
                  if (key === 'height') {
                    value += ' cm';
                  }

                  if (key === 'weight') {
                    value += ' kg';
                  }

                  if (key === 'date_of_birth') {
                    value = new Date(value).toLocaleDateString('en-GB', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    });
                  }

                  const newValue = translate(`match.lineup.titles.${value}`);
                  if (!newValue.includes('match.lineup.titles.')) {
                    value = newValue;
                  }

                  return (
                    <View style={styles.palyerInformationContainer} key={key}>
                      <MainText style={styles.mainText}>{translate(`match.lineup.titles.${key}`)}</MainText>
                      <MainText style={styles.text}>{value}</MainText>
                    </View>
                  );
                })}
            </View>
          )}
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    height: 600,
    marginHorizontal: 6,
  },
  fieldIcon: {
    height: 600,
  },
  lineupContainer: {
    height: 572,
    marginTop: -600 + 14,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  goalKeeperRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  defenderRow: {
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'space-around',
    marginHorizontal: 16,
  },
  midfielderRow: {
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'space-around',
    marginHorizontal: 16,
  },
  forwardRow: {
    flexDirection: 'row',
    marginTop: 25,
    justifyContent: 'space-around',
    marginHorizontal: 16,
  },

  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContent: {
    backgroundColor: getThemeElement('innerContainer') as string,
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    minHeight: 300,
  },
  modalHandle: {
    width: 40,
    height: 4,
    backgroundColor: '#00000040',
    borderRadius: 4,
    alignSelf: 'center',
    marginBottom: 20,
  },
  playerStatsContainer: {
    alignItems: 'center',
    paddingBottom: 20,
  },
  playerName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: getThemeElement('text') as string,
  },
  playerImage: {
    width: 80,
    height: 80,
    marginBottom: 10,
  },
  palyerInformationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
  },
  mainText: {
    color: getThemeElement('mainText') as string,
    fontWeight: 'bold',
    fontSize: 16,
  },
  text: {
    color: getThemeElement('text') as string,
    fontSize: 16,
  },
});
