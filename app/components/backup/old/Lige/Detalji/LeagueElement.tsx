import { StyleSheet, FlatList, ActivityIndicator, Image, Pressable } from 'react-native';
import React, { useEffect, useState, useCallback, memo } from 'react';
import { Link, Tabs } from 'expo-router';

import { Text, View } from '@/components/Themed';
import LeagueElementColumn from '@/components/old/Lige/Detalji/LeagueElementColumn';
import { useNavigation } from 'expo-router';

const LeagueElement = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<SchedulesDataResponse | null>(null);
  const navigation = useNavigation();

  useEffect(() => {
    fetch('http://192.168.90.103:3000/seasons')
      .then((response) => response.json())
      .then((data) => {
        setData(data.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error:', error);
        setIsLoading(false);
      });
  }, []);

  const renderItem = useCallback(
    ({ item: season }) => (
      <View key={season.id} style={styles.background}>
        <Pressable onPress={() => navigation.navigate('lige/detalji', { season: season })}>
          <LeagueElementColumn season={season} key={season.id} />
        </Pressable>
      </View>
    ),
    [navigation]
  );

  if (isLoading || data === null) {
    return <ActivityIndicator size="large" color="#00ff00" />;
  }

  return (
    <FlatList
      data={data.seasons}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
      ListHeaderComponent={
        <View style={styles.container}>
          <View style={styles.header}>
            <View style={styles.headerRow}>
              <Image
                source={{
                  uri: 'https://media.discordapp.net/attachments/970319574048333865/1222970428042117260/image.png?ex=661826f7&is=6605b1f7&hm=a5b98ac4c69e94125b0983f36ad034919f1b372536d9fc2728d5aba233cb71dd&=&format=webp&quality=lossless',
                }}
                style={styles.logoImage}
                resizeMode="contain"
              />

              <Text style={styles.mainText}>Hrvatska</Text>

              <Image
                source={{
                  uri: 'https://media.discordapp.net/attachments/970319574048333865/1222971089131540605/image.png?ex=66182795&is=6605b295&hm=a5a1a18bb7326a7b9c7adefe7c1ccec8b9b3f1a50e0aa401d3759194dca487e0&=&format=webp&quality=lossless',
                }}
                style={styles.dropdownIcon}
                resizeMode="contain"
              />
            </View>
          </View>
        </View>
      }
    />
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0C1216', //
    borderWidth: 1,
    borderColor: '#000000',
    borderRadius: 6,
    marginLeft: 6,
    marginTop: 6,
    flex: 1,
  },
  background: {
    backgroundColor: 'transparent',
    marginLeft: 6,
  },
  logoImage: {
    height: 32,
    width: 32,
    marginLeft: -6,
  },
  dropdownIcon: {
    marginLeft: 196,
    height: 32,
    width: 32,
  },
  mainText: {
    color: '#C0C0C0',
    fontWeight: 'bold',
    marginLeft: 12,
  },
  header: {
    marginTop: 6,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'transparent',
    alignContent: 'center',

    margin: 6,
  },
  headerRow: {
    marginTop: 6,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
    alignContent: 'center',
    marginBottom: 12,
  },
});
export default memo(LeagueElement);
