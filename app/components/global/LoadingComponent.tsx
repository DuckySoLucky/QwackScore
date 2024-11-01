import { Text, View } from '@/components/Themed';
import { ActivityIndicator, StyleSheet } from 'react-native';
import React from 'react';

const LoadingComponent = () => {
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color="#CA5509" />
      <Text style={styles.loadingMessage}>{`Loading...`}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingMessage: {
    color: 'white',
    fontSize: 20,
  },
});

export default LoadingComponent;
