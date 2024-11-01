import DefaultPoredakColumnElement from './Poredak/DefaultPoredakColumnElement';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import FormPoredakColumnElement from './Poredak/FormPoredakColumnElement';
import { StandignsResponse } from '@/API/types/standings';
import ErrorComponent from '../global/ErrorComponents';
import React, { useState } from 'react';

export default function PoredakList({ standingsData }: { standingsData: StandignsResponse }) {
  const [selectedForm, setSelectedForm] = useState('default');
  if (!standingsData) {
    return <ErrorComponent message="Error: Couldn't find standings data" />;
  }

  return (
    <View style={styles.outerContainer}>
      <View style={styles.buttonContainer}>
        <Pressable
          style={selectedForm === 'default' ? styles.selectedButtonElement : styles.buttonElement}
          onPress={() => setSelectedForm('default')}
        >
          <Text style={selectedForm === 'default' ? styles.selectedButtonText : styles.buttonText}>Default</Text>
        </Pressable>

        <Pressable
          style={selectedForm === 'forma' ? styles.selectedButtonElement : styles.buttonElement}
          onPress={() => setSelectedForm('forma')}
        >
          <Text style={selectedForm === 'forma' ? styles.selectedButtonText : styles.buttonText}>Forma</Text>
        </Pressable>
      </View>

      <View style={styles.container}>
        <ScrollView>
          {selectedForm === 'default' ? (
            <DefaultPoredakColumnElement standingsData={standingsData} />
          ) : (
            <FormPoredakColumnElement standingsData={standingsData} />
          )}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: '#161e28',
    paddingBottom: 100,
  },
  container: {
    backgroundColor: '#10181E',
    borderColor: '#000000',
    borderRadius: 5,
    borderWidth: 1,
    marginHorizontal: 6,
    marginTop: 12,
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
});
