import { TouchableOpacity, StyleSheet, Image } from 'react-native';
import React, { useState } from 'react';
import { Text, View } from '@/components/Themed';
import { Link } from 'expo-router';
import { InnerContainer } from '../theme/Container';
import { getThemeElement } from '@/API/theme';

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
  const toggleDropdown = () => setIsVisible(!isVisible);

  return (
    <InnerContainer style={styles.outerContainer}>
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
    </InnerContainer>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    marginHorizontal: 6,
    marginTop: 6,
    flexDirection: 'column',
    borderRadius: 10,
  },
  dropdownBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
    padding: 10,
  },
  image: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  title: {
    flex: 1,
    color: getThemeElement('mainText') as string,
  },
  arrow: {
    color: getThemeElement('mainText') as string,
    marginRight: 10,
  },
  dropdownMenu: {
    backgroundColor: 'transparent',
    marginLeft: 10,
    paddingBottom: 10,
  },
  menuItem: {
    color: getThemeElement('mainText') as string,
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
