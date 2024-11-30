import { Text, View } from '@/components/Themed';
import { ActivityIndicator, StyleSheet } from 'react-native';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { getThemeElement } from '@/API/theme';

const LoadingComponent = () => {
  const { t: translate } = useTranslation();

  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color="#CA5509" />
      <Text style={styles.loadingMessage}>{translate('global.loading')}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  loadingMessage: {
    color: getThemeElement('mainText') as string,
    fontSize: 20,
  },
});

export default LoadingComponent;
