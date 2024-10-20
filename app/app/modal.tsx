import { QueryClientProvider, useQuery, QueryClient } from '@tanstack/react-query';
import { ActivityIndicator, StyleSheet, TextInput, FlatList, Text, TouchableOpacity } from 'react-native';
import { View } from '@/components/Themed';
import React, { useState } from 'react';
import { Link, useNavigation } from 'expo-router';

const queryClient = new QueryClient();

export default function ModalScreen() {
  return (
    <QueryClientProvider client={queryClient}>
      <Output />
    </QueryClientProvider>
  );
}

function Output() {
  const navigation = useNavigation();
  navigation.setOptions({ title: 'Leagues' });

  const [searchQuery, setSearchQuery] = useState('');
  const {
    isLoading,
    error,
    data: seasonsData,
  } = useQuery({
    queryKey: ['standingsData'],
    queryFn: () =>
      fetch(`http://192.168.90.105:3000/seasons`)
        .then((res) => res.json())
        .then((data) => data.data),
  });

  if (isLoading) {
    return <ActivityIndicator size="large" color="#00ff00" />;
  }

  if (error) {
    return <View>Error: {error.message}</View>;
  }

  const filteredLeagues = seasonsData.seasons.filter((league: { name: string; competition_id: string }) =>
    league.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.outerContainer}>
      <View style={styles.container}>
        <TextInput
          style={styles.searchBar}
          placeholder="Search leagues..."
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
