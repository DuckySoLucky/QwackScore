import { CONFIG, bumpCache } from './storage';

const THEMES = {
  dark: {
    headerText: '#FFFFFF',
    navigationBar: '#121212',
    background: '#161E28',
    text: '#C0C0C0',
    mainText: '#686868',
    container: '#10181E',
    innerContainer: '#0C1216',
    borderColor: '#000000',
    separator: '#222A36',
    teamName: '#FFFFFF',
    selectedUtakmicaElement: '#CA5509',
    selectedButton: '#E0E0E0',

    mainTextElement: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#686868',
    },
    containerElement: {
      backgroundColor: '#10181E',
      borderColor: '#000000',
      borderRadius: 10,
      borderWidth: 1,
    },
    innerContainerElement: {
      backgroundColor: '#0C1216',
      borderColor: '#000000',
      borderRadius: 10,
      borderWidth: 1,
    },
  },
  light: {
    headerText: '#000000',
    navigationBar: '#FFFFFF',
    background: '#F5F5F5',
    text: '#000000',
    mainText: '#333333',
    container: '#FFFFFF',
    innerContainer: '#E0E0E0',
    borderColor: '#CCCCCC',
    separator: '#CCCCCC',
    teamName: '#000000',
    selectedUtakmicaElement: '#CA5509',
    selectedButton: '#E0E0E0',

    mainTextElement: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#333333',
    },
    containerElement: {
      backgroundColor: '#FFFFFF',
      borderColor: '#CCCCCC',
      borderRadius: 10,
      borderWidth: 1,
    },
    innerContainerElement: {
      backgroundColor: '#E0E0E0',
      borderColor: '#CCCCCC',
      borderRadius: 10,
      borderWidth: 1,
    },
  },
} as Record<string, { [key: string]: string | { [key: string]: string | number } }>;

let selectedTheme = (CONFIG.getCached('theme') || 'dark') as string;
setTimeout(async () => {
  await bumpCache();
  selectedTheme = (CONFIG.getCached('theme') as string) || 'dark';
  console.log('Selected theme:', selectedTheme);
}, 250);

export function getTheme(): { [key: string]: string | { [key: string]: string | number } } {
  selectedTheme = (CONFIG.getCached('theme') as string) || 'dark';
  return THEMES[selectedTheme];
}

export function getThemeElement(name: string): string | { [key: string]: string | number } {
  selectedTheme = (CONFIG.getCached('theme') as string) || 'dark';
  console.log('Selected theme:', selectedTheme);
  return THEMES[selectedTheme][name];
}

export function getThemeName(): string {
  selectedTheme = (CONFIG.getCached('theme') as string) || 'dark';
  return selectedTheme;
}
