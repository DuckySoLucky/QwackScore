import DefaultPoredakColumnElement from './Poredak/DefaultPoredakColumnElement';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import FormPoredakColumnElement from './Poredak/FormPoredakColumnElement';
import { StandignsResponse } from '@/API/types/standings';
import ErrorComponent from '../global/ErrorComponents';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Container } from '../theme/Container';
import { getThemeElement } from '@/API/theme';

export default function PoredakList({ standingsData }: { standingsData: StandignsResponse }) {
  const [selectedForm, setSelectedForm] = useState('default');
  const { t: translate } = useTranslation();
  if (!standingsData) {
    return <ErrorComponent message="Couldn't find standings data" />;
  }

  return (
    <ScrollView>
      <View style={styles.buttonContainer}>
        <Pressable
          style={selectedForm === 'default' ? styles.selectedButtonElement : styles.buttonElement}
          onPress={() => setSelectedForm('default')}
        >
          <Text style={selectedForm === 'default' ? styles.selectedButtonText : styles.buttonText}>
            {translate(`match.standings.forms.default`)}
          </Text>
        </Pressable>

        <Pressable
          style={selectedForm === 'forma' ? styles.selectedButtonElement : styles.buttonElement}
          onPress={() => setSelectedForm('forma')}
        >
          <Text style={selectedForm === 'forma' ? styles.selectedButtonText : styles.buttonText}>
            {translate(`match.standings.forms.form`)}
          </Text>
        </Pressable>
      </View>

      <Container style={styles.container}>
        <ScrollView>
          {selectedForm === 'default' ? (
            <DefaultPoredakColumnElement standingsData={standingsData} />
          ) : (
            <FormPoredakColumnElement standingsData={standingsData} />
          )}
        </ScrollView>
      </Container>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 5,
    marginHorizontal: 6,
    marginTop: 12,
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
    borderColor: getThemeElement('mainText') as string,
    borderRadius: 10,
    borderWidth: 1,
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
    color: '#161F29',
    fontSize: 12,
    fontWeight: 'bold',
  },
});
