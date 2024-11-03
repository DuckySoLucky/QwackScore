import { StyleSheet, TextInput, FlatList, Text } from 'react-native';
import { View } from '@/components/Themed';
import React, { useEffect, useState } from 'react';
import { Link, useNavigation } from 'expo-router';
import { fetchSeasons } from '@/API/src/routes/seasons';
import { SeasonsResponse } from '@/API/types/seasons';
import LoadingComponent from '@/components/global/LoadingComponent';
import ErrorComponent from '@/components/global/ErrorComponents';
import { CONFIG } from '@/API/storage';
import { useTranslation } from 'react-i18next';

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
      headerStyle: { display: 'none', height: 0, backgroundColor: '#10181E' },
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
    <View style={styles.outerContainer}>
      <View style={styles.container}>
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
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    padding: 6,
    backgroundColor: '#161e28',
  },
  container: {
    backgroundColor: '#10181E',
    borderColor: '#000000',
    borderRadius: 5,
    borderWidth: 1,
  },
  searchBar: {
    backgroundColor: '#161F29',
    borderColor: '#000000',
    borderRadius: 5,
    borderWidth: 1,
    marginHorizontal: 6,
    marginTop: 6,
    height: 40,
    color: 'white',
    paddingLeft: 10,
  },
  leagueItem: {
    color: '#686868',
    fontSize: 16,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#000000',
  },
});
