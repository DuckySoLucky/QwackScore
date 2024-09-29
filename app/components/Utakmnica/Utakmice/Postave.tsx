import { LineupsDataResponse } from '@/types/data';
import { View, Text, StyleSheet, Pressable, Image, ScrollView } from 'react-native';
import React, { useState } from 'react';
import SoccerFieldElement from './Postave/SoccerFieldElement';
import SubstitutionElement from './Postave/SubstitutionElement';

export default function PostaveList({ lineupsData }: { lineupsData: LineupsDataResponse }) {
  const [selectedForm, setSelectedForm] = useState<'default' | 'all'>('default');
  const totalPlayers =
    Object.values(lineupsData.away).reduce((acc, curr) => acc + curr.length, 0) +
    Object.values(lineupsData.home).reduce((acc, curr) => acc + curr.length, 0);

  return (
    <View style={styles.outerContainer}>
      {totalPlayers === 0 ? (
        <Text style={{ color: 'white', textAlign: 'center', margin: 10, fontWeight: 'bold' }}>
          No lineup data available
        </Text>
      ) : (
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
            name={selectedForm === 'default' ? lineupsData.away.coach[0].name : lineupsData.home.coach[0].name}
            type={null}
            number={0}
          />

          <View style={styles.substitutionContainer}>
            <Text style={styles.substitutionText}>Substitutions</Text>

            {(selectedForm === 'default' ? lineupsData.away.substitutions : lineupsData.home.substitutions).map(
              (player) => {
                return (
                  <SubstitutionElement
                    name={player.name}
                    type={player.type}
                    number={player.jersey_number}
                    key={player.id}
                  />
                );
              }
            )}
          </View>
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    backgroundColor: '#161e28',
    height: '100%',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#161e28',
    marginHorizontal: 6,
  },
  buttonElement: {
    backgroundColor: '#10181E',
    height: 32,
    width: 180,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#000000',
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
    backgroundColor: '#10181E',
    marginLeft: 6,
    marginRight: 6,
    marginTop: 6,
    marginBottom: 6,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#00000',
    paddingBottom: 6,
  },
  substitutionText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#686868',
    textAlign: 'center',
    borderBottomColor: '#222A36',
    borderBottomWidth: 1,
    marginHorizontal: 6,
  },
});
