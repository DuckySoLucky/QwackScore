import { View, Text, StyleSheet, Pressable, Image, ScrollView } from 'react-native';
import ErrorComponent from '@/components/global/ErrorComponents';
import SubstitutionElement from './Postave/SubstitutionElement';
import SoccerFieldElement from './Postave/SoccerFieldElement';
import { LineupsDataResponse, Substitution } from '@/types/data';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getThemeElement } from '@/API/theme';
import { Container } from '@/components/theme/Container';
import Modal from 'react-native-modal';
import { MainText } from '@/components/theme/Text';

export default function PostaveList({ lineupsData }: { lineupsData: LineupsDataResponse }) {
  const [selectedForm, setSelectedForm] = useState<'default' | 'all'>('default');
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState(null) as [Substitution | null, Function];
  const handlePlayerPress = (player: Substitution) => {
    setSelectedPlayer(player);
    setModalVisible(true);
  };

  const { t: translate } = useTranslation();
  if (!lineupsData) {
    return <ErrorComponent message="Couldn't find lineup data" />;
  }

  const totalPlayers =
    Object.values(lineupsData.away).reduce((acc, curr) => acc + curr.length, 0) +
    Object.values(lineupsData.home).reduce((acc, curr) => acc + curr.length, 0);

  if (totalPlayers === 0) {
    return <ErrorComponent message="Couldn't find lineup data" />;
  }

  return (
    <ScrollView>
      <SoccerFieldElement lineupsData={lineupsData} />

      <View style={styles.buttonContainer}>
        <Pressable
          style={selectedForm === 'default' ? styles.selectedButtonElement : styles.buttonElement}
          onPress={() => setSelectedForm('default')}
        >
          <Image
            source={{ uri: 'https://i.imgur.com/nDDfr5c.png' }}
            style={styles.clubSelectImage}
            resizeMode="contain"
          />
        </Pressable>

        <Pressable
          style={selectedForm === 'all' ? styles.selectedButtonElement : styles.buttonElement}
          onPress={() => setSelectedForm('all')}
        >
          <Image
            source={{ uri: 'https://i.imgur.com/nDDfr5c.png' }}
            style={styles.clubSelectImage}
            resizeMode="contain"
          />
        </Pressable>
      </View>

      <SubstitutionElement
        name={
          selectedForm === 'default'
            ? (lineupsData.away.coach[0]?.name ?? 'Unknown')
            : (lineupsData.home.coach[0]?.name ?? 'Unknown')
        }
        type={null}
        number={0}
        onPress={() => handlePlayerPress(lineupsData.away.coach[0])}
      />

      <Container style={styles.substitutionContainer}>
        <Text style={styles.substitutionText}>{translate(`match.lineup.substitutions`)}</Text>

        {(selectedForm === 'default' ? lineupsData.away.substitutions : lineupsData.home.substitutions).map(
          (player) => {
            return (
              <SubstitutionElement
                name={player.name}
                type={player.type}
                number={player.jersey_number}
                key={player.id}
                onPress={() => handlePlayerPress(player)}
              />
            );
          },
        )}
      </Container>

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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
    marginHorizontal: 6,
  },
  buttonElement: {
    ...(getThemeElement('containerElement') as object),
    height: 32,
    width: 180,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  selectedButtonElement: {
    backgroundColor: 'rgba(85, 85, 255, 0.15)',
    height: 32,
    width: 180,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#5555FF',
    borderRadius: 8,
  },
  clubSelectImage: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  substitutionContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    marginLeft: 6,
    marginRight: 6,
    marginTop: 6,
    marginBottom: 6,
    borderRadius: 10,
    paddingBottom: 6,
  },
  substitutionText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    borderBottomColor: getThemeElement('separator') as string,
    borderBottomWidth: 1,
    marginHorizontal: 6,
    color: getThemeElement('mainText') as string,
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
