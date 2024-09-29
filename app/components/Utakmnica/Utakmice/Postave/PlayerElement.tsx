import { StyleSheet, Image } from 'react-native';
import { Text, View } from '@/components/Themed';

function formatPlayerName(name: string) {
  return name
    .split(' ')
    .map((element, index) => (index === name.split(' ').length - 1 ? element : element[0] + '.'))
    .join(' ');
}

export default function PlayerElement({ name, number }: { name: string; number: number }) {
  return (
    <View style={styles.outerContainer}>
      <Image source={{ uri: 'https://i.imgur.com/LKVoKcy.png' }} style={styles.playerImage} resizeMode="contain" />

      <Text style={styles.playerNumber}>{number}</Text>

      <Text style={styles.playerName}>{formatPlayerName(name)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  playerNumber: {
    fontSize: 12,
    color: 'black',
    fontWeight: 'bold',
    marginTop: -28,
  },
  playerImage: {
    width: 32,
    height: 32,
  },
  playerName: {
    marginTop: 12,
    fontSize: 12,
    color: 'white',
    maxWidth: 80,
    textAlign: 'center',
  },
});
