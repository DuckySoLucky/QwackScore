import { Dimensions, Pressable, StyleSheet, Switch, TextInput, ToastAndroid } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import React, { useEffect, useState } from 'react';
import { Text, View } from '@/components/Themed';
import * as Updates from 'expo-updates';

import ErrorComponent from '@/components/global/ErrorComponents';
import LoadingComponent from '@/components/global/LoadingComponent';

import { fetchSeasons } from '@/API/src/routes/seasons';
import { SeasonsResponse } from '@/API/types/seasons';
import { clearCache } from '@/API/src/handler';
import { CONFIG } from '@/API/storage';
import { useTranslation } from 'react-i18next';
import i18n from '@/API/translation';

export default function TabTwoScreen() {
  const { t: translate } = useTranslation();

  const [selectedLanguage, setSelectedLanguage] = useState<string | undefined>(undefined);
  const [selectedLeague, setSelectedLeague] = useState<string | undefined>(undefined);
  const [selectedTheme, setSelectedTheme] = useState<string | undefined>(undefined);
  const [isDeveloperMode, setIsDeveloperMode] = useState<boolean>(false);
  const [useLocalAPI, setUseLocalAPI] = useState<boolean>(false);
  const [localAPI, setLocalAPI] = useState('');
  const [apiKey, setApiKey] = useState('');

  useEffect(() => {
    const loadConfig = async () => {
      const league = await CONFIG.get('defaultLeague');
      const language = await CONFIG.get('language');
      const theme = await CONFIG.get('theme');
      const developerMode = await CONFIG.get('developerMode');
      const localAPI = await CONFIG.get('localAPI');
      const useLocalAPI = await CONFIG.get('useLocalAPI');
      const apiKey = await CONFIG.get('sportRadarAPIKey');

      setSelectedLanguage(language);
      setSelectedLeague(league);
      setSelectedTheme(theme);
      setIsDeveloperMode(developerMode);
      setUseLocalAPI(useLocalAPI);
      setLocalAPI(localAPI);
      setApiKey(apiKey);
    };

    loadConfig();
  }, []);

  const reloadApp = async () => {
    try {
      await Updates.reloadAsync();
    } catch (e) {
      console.error('Failed to reload app:', e);
    }
  };

  const toggleDeveloperMode = () => {
    setIsDeveloperMode((prev) => !prev);
    CONFIG.set('developerMode', !isDeveloperMode);
    ToastAndroid.show('Developer mode toggled', ToastAndroid.SHORT);
  };

  const switchAPIMode = () => {
    setUseLocalAPI((prev) => !prev);
    CONFIG.set('useLocalAPI', !useLocalAPI);
    ToastAndroid.show('API mode toggled', ToastAndroid.SHORT);
  };

  const changeSelectedLanguage = (language: string) => {
    setSelectedLanguage(language);
    CONFIG.set('language', language);
    ToastAndroid.show('Language changed', ToastAndroid.SHORT);
    i18n.changeLanguage(language);
  };

  const changeSelectedLeague = (league: string) => {
    setSelectedLeague(league);
    CONFIG.set('defaultLeague', league);
    ToastAndroid.show('Default league changed', ToastAndroid.SHORT);
  };

  const changeSelectedTheme = (theme: string) => {
    setSelectedTheme(theme);
    CONFIG.set('theme', theme);
    ToastAndroid.show('Theme changed', ToastAndroid.SHORT);
  };

  const changeLocalAPI = (api: string) => {
    setLocalAPI(api.trim());
    CONFIG.set('localAPI', api.trim());
    ToastAndroid.show('API URL changed', ToastAndroid.SHORT);
  };

  const changeApiKey = (key: string) => {
    setApiKey(key.trim());
    CONFIG.set('sportRadarAPIKey', key.trim());
    ToastAndroid.show('API Key changed', ToastAndroid.SHORT);
  };

  const clearCacheButton = () => {
    console.log('Clearing cache');
    clearCache();
    ToastAndroid.show('Cache cleared', ToastAndroid.SHORT);
  };

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

    loadData();
  }, []);

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
  return (
    <View style={{ backgroundColor: '#161e28', flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.defaultTitle}>{translate('three.settings')}</Text>

        <View style={styles.row}>
          <Text style={styles.title}>{translate('three.language')}:</Text>
          <Picker
            selectedValue={selectedLanguage}
            style={styles.picker}
            onValueChange={(itemValue: string) => changeSelectedLanguage(itemValue)}
          >
            <Picker.Item label={translate('three.languages.en')} value="en" />
            <Picker.Item label={translate('three.languages.hr')} value="hr" />
          </Picker>
        </View>

        <View style={styles.row}>
          <Text style={styles.title}>{translate('three.defaultLeague')}:</Text>
          <Picker
            selectedValue={selectedLeague}
            style={styles.picker}
            onValueChange={(itemValue: string) => changeSelectedLeague(itemValue)}
          >
            {seasons.map((season: { id: string; name: string }) => (
              <Picker.Item key={season.id} label={season.name} value={season.id} />
            ))}
          </Picker>
        </View>

        <View style={styles.row}>
          <Text style={styles.title}>{translate('three.theme')}:</Text>
          <Picker
            selectedValue={selectedTheme}
            style={styles.picker}
            onValueChange={(itemValue: string) => changeSelectedTheme(itemValue)}
          >
            <Picker.Item label={translate('three.themes.dark')} value="dark" />
            <Picker.Item label={translate('three.themes.light')} value="light" />
          </Picker>
        </View>
      </View>

      <View style={styles.container}>
        <Text style={styles.defaultTitle}>{translate('three.developerSettings')}</Text>
        <View style={styles.row}>
          <Text style={styles.title}>{translate('three.developerMode')}e:</Text>
          <Switch
            value={isDeveloperMode}
            onValueChange={toggleDeveloperMode}
            style={styles.switchStyle}
            thumbColor={'#C0C0C0'}
            trackColor={{ true: '#222A36' }}
          />
        </View>
        <View style={styles.row}>
          <Text style={styles.title}>{translate('three.localAPIMode')}:</Text>
          <Switch
            value={useLocalAPI}
            onValueChange={switchAPIMode}
            style={styles.switchStyle}
            thumbColor={'#C0C0C0'}
            trackColor={{ true: '#222A36' }}
          />
        </View>

        <View style={styles.row}>
          <Text style={styles.title}>{translate('three.APIUrl')}:</Text>
          <TextInput value={localAPI} onChangeText={changeLocalAPI} style={styles.input} />
        </View>

        <View style={styles.row}>
          <Text style={styles.title}>{translate('three.APIKey')}:</Text>
          <TextInput value={apiKey} onChangeText={changeApiKey} secureTextEntry={true} style={styles.input} />
        </View>

        <View style={styles.row}>
          <Text style={styles.title}>{translate('three.clearCache')}:</Text>
          <Pressable onPress={clearCacheButton} style={styles.clearCacheButton}>
            <Text style={styles.cacheText}>{translate('three.clearCacheButton')}</Text>
          </Pressable>
        </View>

        <View style={styles.row}>
          <Text style={styles.title}>{translate('three.restartApp')}:</Text>
          <Pressable onPress={() => reloadApp()} style={styles.clearCacheButton}>
            <Text style={styles.cacheText}>{translate('three.restartAppButton')}</Text>
          </Pressable>
        </View>
      </View>

      <View style={styles.container}>
        <Text style={styles.defaultTitle}>{translate('three.about')}</Text>
        <Text style={styles.aboutText}>{translate('three.version')}: 1.0.0</Text>
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
    height: 50,
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
  input: {
    backgroundColor: '#0C1216',
    color: '#C0C0C0',
    width: 250,
    height: 30,
    margin: 6,
    borderRadius: 10,
    borderColor: '#000000',
    borderWidth: 1,
    padding: 6,
  },
});
