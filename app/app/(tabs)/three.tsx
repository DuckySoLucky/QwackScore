import {
  Alert,
  Dimensions,
  Pressable,
  StyleSheet,
  Switch,
  TextInput,
  ToastAndroid,
  useColorScheme,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import React, { useEffect, useState } from 'react';
import { Text, View } from '@/components/Themed';
import * as Updates from 'expo-updates';
import AsyncStorage from '@react-native-async-storage/async-storage';

import LoadingComponent from '@/components/global/LoadingComponent';

import { fetchSeasons } from '@/API/src/routes/seasons';
import { SeasonsResponse } from '@/API/types/seasons';
import { clearCache } from '@/API/src/handler';
import { CONFIG, bumpCache } from '@/API/storage';
import { useTranslation } from 'react-i18next';
import i18n from '@/API/translation';
import { Container } from '@/components/theme/Container';
import { MainText } from '@/components/theme/Text';
import { getTheme, getThemeElement } from '@/API/theme';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';
import { ThemeProvider } from '@react-navigation/native';

export default function TabTwoScreen() {
  const { t: translate } = useTranslation();

  const [selectedLanguage, setSelectedLanguage] = useState<string | undefined>(undefined);
  const [selectedLeague, setSelectedLeague] = useState<string | undefined>(undefined);
  const [selectedTheme, setSelectedTheme] = useState<string | undefined>(undefined);
  const [isDeveloperMode, setIsDeveloperMode] = useState<boolean>(false);
  const [useLocalAPI, setUseLocalAPI] = useState<boolean>(false);
  const [isEditingApiKey, setIsEditingApiKey] = useState(false);
  const [localAPI, setLocalAPI] = useState('');
  const [apiKey, setApiKey] = useState('');
  const systemTheme = useColorScheme();

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
    if (league === translate('three.invalidAPIKey')) {
      return;
    }

    setSelectedLeague(league);
    CONFIG.set('defaultLeague', league);
    ToastAndroid.show('Default league changed', ToastAndroid.SHORT);
  };

  const changeSelectedTheme = async (theme: string) => {
    console.log('changeSelectedTheme', theme === 'system' ? (systemTheme ?? 'dark') : theme);
    await AsyncStorage.setItem('theme', JSON.stringify(theme === 'system' ? (systemTheme ?? 'dark') : theme));
    await CONFIG.set('theme', theme === 'system' ? (systemTheme ?? 'dark') : theme);
    await bumpCache();
    setSelectedTheme(theme);
    clearCache();
    ToastAndroid.show('Theme changed', ToastAndroid.SHORT);
    await Updates.reloadAsync(); // Force reload the app to apply the new theme
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

  const handleApiKeyFocus = () => {
    setIsEditingApiKey(true);
  };

  const handleApiKeyBlur = () => {
    setIsEditingApiKey(false);
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

        if (!result) {
          setError(new Error('No data'));
        }
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

  if (error && isEditingApiKey === false) {
    Alert.alert(translate('three.invalidAPIKeyHeaderMessage'), translate('three.invalidAPIKeyMessage'), [
      { text: 'OK' },
    ]);
  }

  return (
    <View style={{ flex: 1, backgroundColor: 'transparent' }}>
      {/* Settings */}
      <MainText style={styles.defaultTitle}>{translate('three.settings')}</MainText>
      <Container style={styles.row}>
        <MainText style={styles.title}>{translate('three.language')}:</MainText>
        <Picker
          selectedValue={selectedLanguage}
          style={styles.picker}
          onValueChange={(itemValue: string) => changeSelectedLanguage(itemValue)}
        >
          <Picker.Item label={translate('three.languages.en')} value="en" />
          <Picker.Item label={translate('three.languages.hr')} value="hr" />
        </Picker>
      </Container>
      <Container style={styles.row}>
        <MainText style={styles.title}>{translate('three.defaultLeague')}:</MainText>
        <Picker
          selectedValue={error ? translate('three.invalidAPIKey') : selectedLeague}
          style={styles.picker}
          onValueChange={(itemValue: string) => changeSelectedLeague(itemValue)}
        >
          {(data && data.seasons
            ? data.seasons
            : [{ id: translate('three.invalidAPIKey'), name: translate('three.invalidAPIKey') }]
          ).map((season: { id: string; name: string }) => (
            <Picker.Item key={season.id} label={season.name} value={season.id} />
          ))}
        </Picker>
      </Container>
      <Container style={styles.row}>
        <MainText style={styles.title}>{translate('three.theme')}:</MainText>
        <Picker
          selectedValue={selectedTheme}
          style={styles.picker}
          onValueChange={(itemValue: string) => changeSelectedTheme(itemValue)}
        >
          <Picker.Item label={translate('three.themes.system')} value="system" />
          <Picker.Item label={translate('three.themes.dark')} value="dark" />
          <Picker.Item label={translate('three.themes.light')} value="light" />
        </Picker>
      </Container>

      {/* Developer Settings */}

      <MainText style={styles.defaultTitle}>{translate('three.developerSettings')}</MainText>
      <Container style={styles.row}>
        <MainText style={styles.title}>{translate('three.developerMode')}:</MainText>
        <Switch
          value={isDeveloperMode}
          onValueChange={toggleDeveloperMode}
          style={styles.switchStyle}
          thumbColor={'#C0C0C0'}
          trackColor={{ true: '#222A36' }}
        />
      </Container>
      <Container style={styles.row}>
        <MainText style={styles.title}>{translate('three.localAPIMode')}:</MainText>
        <Switch
          value={useLocalAPI}
          onValueChange={switchAPIMode}
          style={styles.switchStyle}
          thumbColor={'#C0C0C0'}
          trackColor={{ true: '#222A36' }}
        />
      </Container>

      <Container style={styles.row}>
        <MainText style={styles.title}>{translate('three.APIUrl')}:</MainText>
        <TextInput
          value={localAPI}
          onChangeText={changeLocalAPI}
          style={{
            ...(styles.input as object),
            ...(getThemeElement('innerContainer') as object),
          }}
        />
      </Container>

      <Container style={styles.row}>
        <MainText style={styles.title}>{translate('three.APIKey')}:</MainText>
        <TextInput
          value={apiKey}
          onChangeText={changeApiKey}
          onFocus={handleApiKeyFocus}
          onBlur={handleApiKeyBlur}
          secureTextEntry={true}
          style={{
            ...(styles.input as object),
            ...(getThemeElement('innerContainer') as object),
          }}
        />
      </Container>

      <Container style={styles.row}>
        <MainText style={styles.title}>{translate('three.clearCache')}:</MainText>
        <Pressable
          onPress={clearCacheButton}
          style={{ ...styles.clearCacheButton, backgroundColor: getThemeElement('innerContainer') as string }}
        >
          <MainText style={styles.cacheText}>{translate('three.clearCacheButton')}</MainText>
        </Pressable>
      </Container>

      <Container style={styles.row}>
        <MainText style={styles.title}>{translate('three.restartApp')}:</MainText>
        <Pressable
          onPress={() => reloadApp()}
          style={{ ...styles.clearCacheButton, backgroundColor: getThemeElement('innerContainer') as string }}
        >
          <MainText style={styles.cacheText}>{translate('three.restartAppButton')}</MainText>
        </Pressable>
      </Container>

      {/* About */}
      <MainText style={styles.defaultTitle}>{translate('three.about')}</MainText>
      <MainText style={styles.cacheText}>{translate('three.version')}: 1.0.0</MainText>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    marginLeft: 12,
  },
  defaultTitle: {
    textAlign: 'center',
  },
  picker: {
    width: 150,
    backgroundColor: 'transparent',
    color: getThemeElement('text') as string,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 6,
    marginVertical: 3,
    borderRadius: 10,
    margin: 6,
    width: Dimensions.get('window').width - 12,
    height: 50,
  },
  clearCacheButton: {
    backgroundColor: getThemeElement('innerContainer') as string,
    height: 30,
    margin: 6,
    borderRadius: 10,
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: getThemeElement('borderColor') as string,
    borderWidth: 1,
  },
  cacheText: {
    color: getThemeElement('text') as string,
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  switchStyle: {
    marginRight: 12,
  },
  input: {
    backgroundColor: getThemeElement('innerContainer') as string,
    color: getThemeElement('text') as string,
    width: 250,
    height: 30,
    margin: 6,
    borderRadius: 10,
    borderColor: getThemeElement('borderColor') as string,
    borderWidth: 1,
    padding: 6,
  },
});
