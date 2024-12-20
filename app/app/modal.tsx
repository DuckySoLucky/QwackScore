import { StyleSheet, TextInput, FlatList, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Link, useNavigation } from 'expo-router';
import { fetchSeasons } from '@/API/src/routes/seasons';
import { SeasonsResponse } from '@/API/types/seasons';
import LoadingComponent from '@/components/global/LoadingComponent';
import ErrorComponent from '@/components/global/ErrorComponents';
import { CONFIG } from '@/API/storage';
import { useTranslation } from 'react-i18next';
import { getThemeElement } from '@/API/theme';
import { Container } from '@/components/theme/Container';

export default function ModalScreen() {
  const { t: translate } = useTranslation();
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [data, setData] = useState<null | SeasonsResponse>(null);
  const [error, setError] = useState<null | Error>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const result = await fetchSeasons({ useLocalAPI: CONFIG.getCached('useLocalAPI') as boolean });
        setData(result);
      } catch (err) {
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    };

    navigation.setOptions({
      headerTitle: translate('modal.title'),
      headerStyle: {
        display: 'none',
        height: 0,
        backgroundColor: getThemeElement('background') as string,
        color: getThemeElement('text') as string,
      },
    });

    loadData();
  }, [navigation, translate]);

  if (isLoading) {
    return <LoadingComponent />;
  }

  if (error) {
    return <ErrorComponent message={`${error.message}`} />;
  }

  if (!data) {
    return <ErrorComponent message={`Couldn't find data`} />;
  }

  const seasons = data.seasons;
  const filteredLeagues = seasons.filter((league: { name: string; competition_id: string }) =>
    league.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <Container style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder={translate('modal.search')}
        placeholderTextColor={'#ccc'}
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <FlatList
        data={filteredLeagues}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Link
            href={{ pathname: '/lige', params: { id: item.competition_id, title: item.name } }}
            style={styles.leagueItem}
          >
            <Text style={styles.leagueItem}>{item.name}</Text>
          </Link>
        )}
      />
    </Container>
  );
}
const styles = StyleSheet.create({
  container: {
    margin: 6,
    borderRadius: 5,
    paddingBottom: 6,
  },
  searchBar: {
    ...(getThemeElement('innerContainerElement') as object),
    borderRadius: 5,
    marginHorizontal: 6,
    marginTop: 6,
    height: 40,
    color: getThemeElement('mainText') as string,
    paddingLeft: 10,
  },
  leagueItem: {
    color: getThemeElement('text') as string,
    fontSize: 16,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: getThemeElement('separator') as string,
  },
});
