import { Text, View } from '@/components/Themed';
import { StyleSheet } from 'react-native';
import React from 'react';
import { useTranslation } from 'react-i18next';

const ErrorComponent = ({ message }: { message: string }) => {
  const { t: translate } = useTranslation();

  return (
    <View style={styles.errorContainer}>
      <Text style={styles.errorText}>{`${translate('global.error')}: ${message}`}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  errorContainer: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#161F29',
  },
  errorText: {
    color: 'white',
    fontSize: 20,
  },
});

export default ErrorComponent;
