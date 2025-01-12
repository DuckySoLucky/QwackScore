import { StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Text, View } from '@/components/Themed';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { getThemeElement } from '@/API/theme';
import { Container, InnerContainer } from '@/components/theme/Container';

export default function SubstitutionElement({
  number,
  name,
  type,
  onPress,
}: {
  number: number;
  name: string;
  type: string | null;
  onPress: () => void;
}) {
  const { t: translate } = useTranslation();
  if (!type) {
    return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.5}>
        <Container style={styles.coachContainer}>
          <Image source={{ uri: 'https://i.imgur.com/74RFZoj.png' }} style={styles.coachIcon} resizeMode="contain" />

          <View style={styles.column}>
            <Text style={styles.coachName}>{name}</Text>
            <Text style={styles.coachProfession}>{translate(`match.lineup.titles.coach`)}</Text>
          </View>
        </Container>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.5}>
      <InnerContainer style={styles.substitutionPlayerContainer}>
        <Image source={{ uri: 'https://i.imgur.com/74RFZoj.png' }} style={styles.coachIcon} resizeMode="contain" />

        <View style={styles.column}>
          <Text style={styles.coachName}>{`${number} ${name}`}</Text>
          <Text style={styles.coachProfession}>{translate(`match.lineup.titles.${type.toLowerCase()}`)}</Text>
        </View>
      </InnerContainer>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  coachContainer: {
    marginTop: 12,
    marginLeft: 6,
    marginRight: 6,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 3,
  },
  coachIcon: {
    marginLeft: 12,
    height: 32,
    width: 32,
    marginTop: 3,
  },
  column: {
    backgroundColor: 'transparent',
    flexDirection: 'column',
    marginLeft: 12,
  },
  coachName: {
    color: getThemeElement('text') as string,
    fontWeight: 'bold',
    fontSize: 16,
  },
  coachProfession: {
    color: getThemeElement('mainText') as string,
    fontSize: 14,
  },
  substitutionPlayerContainer: {
    flexDirection: 'row',
    marginLeft: 6,
    marginRight: 6,
    borderRadius: 8,
    marginTop: 6,
    paddingBottom: 3,
  },
});
