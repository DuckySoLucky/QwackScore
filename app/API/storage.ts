import AsyncStorage from '@react-native-async-storage/async-storage';
import i18n from '@/API/translation';
import { config } from './config';
import('./translation');

type cacheKey =
  | 'defaultLeague'
  | 'language'
  | 'theme'
  | 'developerMode'
  | 'localAPI'
  | 'useLocalAPI'
  | 'sportRadarAPIKey';

export const cache = new Map<cacheKey, string | boolean>();

const setSetting = async (key: string, value: string | number | boolean | object) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
    console.log('Setting saved:', key, value);

    await bumpCache();
  } catch (e) {
    console.error('Failed to save the setting', e);
  }
};

const getSetting = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);

    return value != null ? JSON.parse(value) : null;
  } catch (e) {
    console.error('Failed to fetch the setting', e);
  }
};

export const bumpCache = async () => {
  const keys = await AsyncStorage.getAllKeys();

  for (const key of keys) {
    const value = await AsyncStorage.getItem(key);
    if (CONFIG.getCached(key as cacheKey) !== JSON.parse(value as string)) {
      console.log('Bumping cache:', key, value?.toString());
    }

    cache.set(key as cacheKey, JSON.parse(value as string));
  }

  i18n.changeLanguage(CONFIG.getCached('language') as string);
};

const getAllSettings = async () => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    const settings = await AsyncStorage.multiGet(keys);

    return settings.map(([key, value]) => ({ key, value: JSON.parse(value as string) }));
  } catch (e) {
    console.error('Failed to fetch the settings', e);
  }
};

export const CONFIG = {
  get: getSetting,
  set: setSetting,
  getAll: getAllSettings,
  getCached: (key: string) => cache.get(key as cacheKey) as string | boolean,
};

const fillStorage = async () => {
  for (const [key, value] of Object.entries(config)) {
    const setting = await getSetting(key);

    if (setting === null) {
      await setSetting(key, value);
    }
  }
};

fillStorage();
bumpCache();
