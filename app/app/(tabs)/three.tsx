import { ActivityIndicator, Dimensions, Pressable, StyleSheet, Switch } from 'react-native';
import { Text, View } from '@/components/Themed';
import { Picker } from '@react-native-picker/picker';
import React, { useState } from 'react';
import { QueryClientProvider, useQuery, QueryClient } from '@tanstack/react-query';

const queryClient = new QueryClient();

export default function TabTwoScreen() {
  return (
    <QueryClientProvider client={queryClient}>
      <Output />
    </QueryClientProvider>
  );
}

function Output() {
  const [selectedLanguage, setSelectedLanguage] = useState('english');
  const [selectedLeague, setSelectedLeague] = useState('sr:season:118691');
  const [selectedTheme, setSelectedTheme] = useState('dark');
  const [isDeveloperMode, setIsDeveloperMode] = useState(true);
  const [isLocalAPI, setIsLocalAPI] = useState(true);

  const toggleDeveloperMode = () => (isDeveloperMode ? setIsDeveloperMode(false) : setIsDeveloperMode(true));
  const switchAPIMode = () => (isLocalAPI ? setIsLocalAPI(false) : setIsLocalAPI(true));
  const clearCache = () => queryClient.clear();

  const {
    isPending,
    error,
    data: seasonsData,
  } = useQuery({
    queryKey: ['standingsData'],
    queryFn: () =>
      fetch(`http://192.168.90.105:3000/seasons`)
        .then((res) => res.json())
        .then((data) => data.data),
  });

  if (isPending) {
    return <ActivityIndicator size="large" color="#00ff00" />;
  }

  if (error) {
    return <View>Error: {error.message}</View>;
  }

  return (
    <View style={{ backgroundColor: '#161e28', flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.defaultTitle}>Settings</Text>

        <View style={styles.row}>
          <Text style={styles.title}>Language:</Text>
          <Picker
            selectedValue={selectedLanguage}
            style={styles.picker}
            onValueChange={(itemValue) => setSelectedLanguage(itemValue)}
          >
            <Picker.Item label="English" value="english" />
            <Picker.Item label="Croatian" value="croatian" />
          </Picker>
        </View>

        <View style={styles.row}>
          <Text style={styles.title}>Default League:</Text>
          <Picker
            selectedValue={selectedLeague}
            style={styles.picker}
            onValueChange={(itemValue) => setSelectedLeague(itemValue)}
          >
            {seasonsData.seasons.map((season: { id: string; name: string }) => (
              <Picker.Item key={season.id} label={season.name} value={season.id} />
            ))}
          </Picker>
        </View>

        <View style={styles.row}>
          <Text style={styles.title}>Theme:</Text>
          <Picker
            selectedValue={selectedTheme}
            style={styles.picker}
            onValueChange={(itemValue) => setSelectedTheme(itemValue)}
          >
            <Picker.Item label="Dark" value="dark" />
            <Picker.Item label="Light" value="light" />
          </Picker>
        </View>
      </View>

      <View style={styles.container}>
        <Text style={styles.defaultTitle}>Developer Settings</Text>
        <View style={styles.row}>
          <Text style={styles.title}>Developer Mode:</Text>
          <Switch
            value={isDeveloperMode}
            onValueChange={toggleDeveloperMode}
            style={styles.switchStyle}
            thumbColor={'#C0C0C0'}
            trackColor={{ true: '#222A36' }}
          />
        </View>
        <View style={styles.row}>
          <Text style={styles.title}>Local API Mode:</Text>
          <Switch
            value={isLocalAPI}
            onValueChange={switchAPIMode}
            style={styles.switchStyle}
            thumbColor={'#C0C0C0'}
            trackColor={{ true: '#222A36' }}
          />
        </View>

        <View style={styles.row}>
          <Text style={styles.title}>Clear Cache:</Text>
          <Pressable onPress={clearCache} style={styles.clearCacheButton}>
            <Text style={styles.cacheText}>Clear Cache</Text>
          </Pressable>
        </View>
      </View>

      <View style={styles.container}>
        <Text style={styles.defaultTitle}>About</Text>
        <Text style={styles.aboutText}>Version: 1.0.0</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#161e28',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#686868',
    marginLeft: 12,
    textAlign: 'center',
    alignItems: 'center',
  },
  defaultTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#686868',
    textAlign: 'center',
    alignItems: 'center',
  },
  picker: {
    width: 150,
    backgroundColor: 'transparent',
    color: '#C0C0C0',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#10181E',
    marginHorizontal: 6,
    marginVertical: 3,
    borderColor: '#000000',
    borderRadius: 10,
    borderWidth: 1,
    margin: 6,
    width: Dimensions.get('window').width - 12,
  },
  clearCacheButton: {
    backgroundColor: '#0C1216',
    height: 30,
    margin: 6,
    borderRadius: 10,
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',

    borderColor: '#000000',
    borderWidth: 1,
  },
  cacheText: {
    color: '#C0C0C0',
    fontSize: 12,
    fontWeight: 'bold',
  },
  switchStyle: {
    marginRight: 12,
  },
  aboutText: {
    color: '#C0C0C0',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
