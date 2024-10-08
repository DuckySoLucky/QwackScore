import { StyleSheet, Image, ScrollView, ActivityIndicator, Pressable, Dimensions } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Text, View } from '@/components/Themed';

export default function SubstitutionElement({
  number,
  name,
  type,
}: {
  number: number;
  name: string;
  type: string | null;
}) {
  if (!type) {
    return (
      <View style={styles.coachContainer}>
        <Image source={{ uri: 'https://i.imgur.com/74RFZoj.png' }} style={styles.coachIcon} resizeMode="contain" />

        <View style={styles.column}>
          <Text style={styles.coachName}>{name}</Text>
          <Text style={styles.coachProfession}>Coach</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.substitutionPlayerContainer}>
      <Image source={{ uri: 'https://i.imgur.com/74RFZoj.png' }} style={styles.coachIcon} resizeMode="contain" />

      <View style={styles.column}>
        <Text style={styles.coachName}>{`${number} ${name}`}</Text>
        <Text style={styles.coachProfession}>{type}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  coachContainer: {
    backgroundColor: '#10181E',
    marginTop: 12,
    marginLeft: 6,
    marginRight: 6,
    borderRadius: 8,
    borderColor: '#000000',
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 3,
  },
  coachIcon: {
    marginLeft: 12,
    height: 32,
    width: 32,
    marginTop: 3,
  },
  column: {
    backgroundColor: 'transparent',
    flexDirection: 'column',
    marginLeft: 12,
  },
  coachName: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  coachProfession: {
    color: '#686868',
    fontSize: 14,
  },
  substitutionPlayerContainer: {
    flexDirection: 'row',
    backgroundColor: '#0C1216',
    marginLeft: 6,
    marginRight: 6,
    borderWidth: 1,
    borderColor: '#00000',
    borderRadius: 8,
    marginTop: 6,
  },
});
