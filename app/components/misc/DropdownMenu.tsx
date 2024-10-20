import { TouchableOpacity, StyleSheet, Image } from 'react-native';
import React, { useState } from 'react';
import { Text, View } from '@/components/Themed';
import { Link } from 'expo-router';

const DropdownMenu = ({
  title,
  imageUri,
  items,
}: {
  title: string;
  imageUri: string;
  items: { name: string; id: string }[];
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const toggleDropdown = () => {
    setIsVisible(!isVisible);
  };

  return (
    <View style={styles.outerContainer}>
      <TouchableOpacity style={styles.dropdownBar} onPress={toggleDropdown}>
        <Image source={{ uri: imageUri }} style={styles.image} />
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.arrow}>{isVisible ? '▲' : '▼'}</Text>
      </TouchableOpacity>
      {isVisible && (
        <View style={styles.dropdownMenu}>
          {items.map((item, index) => (
            <Link
              style={styles.dropdownMenuItemRow}
              key={index}
              href={{ pathname: '/lige', params: { id: item.id, title: item.name } }}
            >
              <Image source={{ uri: imageUri }} style={styles.menuImage} />
              <Text style={styles.menuItem}>{item.name}</Text>
            </Link>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    marginHorizontal: 6,
    marginTop: 6,
    backgroundColor: '#0C1216', // #
    flexDirection: 'column',
    borderWidth: 1,
    borderColor: '#000000',
    borderRadius: 10,
  },
  dropdownBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent', // #10181E
    padding: 10,
  },
  image: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  title: {
    flex: 1,
    color: '#FFFFFF',
  },
  arrow: {
    color: '#FFFFFF',
    marginRight: 10,
  },
  dropdownMenu: {
    backgroundColor: 'transparent', // #10181E
    marginLeft: 10,
    paddingBottom: 10,
  },
  menuItem: {
    // color: '#686868',
    paddingVertical: 5,
    paddingRight: 10,
    marginLeft: 10,
    paddingLeft: 10,
  },
  menuImage: {
    width: 24,
    height: 24,
    marginRight: 10,
    paddingRight: 10,
  },
  dropdownMenuItemRow: {
    marginVertical: 3,
  },
});

export default DropdownMenu;
