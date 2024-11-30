import { getThemeElement } from '@/API/theme';
import { SchedulesMatch } from '@/API/types/schedules';
import { InnerContainer } from '@/components/theme/Container';
import { Link } from 'expo-router';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';

export default function UtakmiceColumnElement({ item }: { item: SchedulesMatch }) {
  const { t: translate } = useTranslation();

  const replacePlaceholders = (text: string) => {
    return text.replace(/{(.*?)}/g, (_, key) => translate(`index.timeFormat.${key}`));
  };
  const getClubStyle = (clubName: string) =>
    item.winner === clubName ? { ...styles.clubName, color: '#C0C0C0' } : styles.clubName;

  return (
    <Link href={{ pathname: '/utakmica', params: { item: JSON.stringify(item) } }} asChild>
      <Pressable>
        <InnerContainer style={styles.gameDetailsContainer}>
          <Text style={styles.dateText}>{replacePlaceholders(item.startTimeFormatted)}</Text>
          <View style={styles.separator} />

          <View>
            <Image source={{ uri: item.competitors[0].image }} style={styles.clubImage} resizeMode="contain" />
            <Image source={{ uri: item.competitors[1].image }} style={styles.clubImage} resizeMode="contain" />
          </View>

          <View>
            <Text style={getClubStyle(item.competitors[0].name)}>{item.competitors[0].name}</Text>
            <Text style={getClubStyle(item.competitors[1].name)}>{item.competitors[1].name}</Text>
          </View>

          {item.competitors[0].score !== undefined && item.competitors[1].score !== undefined ? (
            <View style={{ position: 'absolute', right: 64 }}>
              <Text style={getClubStyle(item.competitors[0].name)}>{item.competitors[0].score}</Text>
              <Text style={getClubStyle(item.competitors[1].name)}>{item.competitors[1].score}</Text>
            </View>
          ) : (
            <></>
          )}

          <View style={{ ...styles.separator, position: 'absolute', right: 48 }} />

          <Image
            source={{ uri: 'https://i.imgur.com/NtmU9NV.png' }}
            style={styles.notificationIcon}
            resizeMode="contain"
          />
        </InnerContainer>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  gameDetailsContainer: {
    borderRadius: 5,
    marginHorizontal: 6,
    marginTop: 6,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateText: {
    marginLeft: 6,
    color: getThemeElement('mainText') as string,
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 9,
    width: 40,
  },
  separator: {
    height: '80%',
    width: 1,
    backgroundColor: getThemeElement('separator') as string,
    marginLeft: 10,
  },
  clubImage: {
    marginLeft: 12,
    height: 18,
    width: 18,
  },
  clubName: {
    marginLeft: 10,
    fontSize: 12,
    color: getThemeElement('mainText') as string,
    fontWeight: 'bold',
  },
  notificationIcon: {
    position: 'absolute',
    right: 6,
    height: 32,
    width: 32,
  },
});
