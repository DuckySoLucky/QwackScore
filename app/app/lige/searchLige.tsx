import {
  Platform,
  StyleSheet,
  ActivityIndicator,
  TextInput,
  FlatList,
  TouchableOpacity,
  Pressable,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import EditScreenInfo from "@/components/EditScreenInfo";
import React, { useEffect, useState, useRef } from "react";
import { Text, View } from "@/components/Themed";
import { StatusBar } from "expo-status-bar";

const SearchBar = ({ setSearch }) => {
  const inputRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      inputRef.current?.focus();
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <TextInput
      ref={inputRef}
      style={styles.input}
      onChangeText={setSearch}
      placeholder="Search..."
      selectionColor={"white"}
      placeholderTextColor={"white"}
      autoCapitalize="none"
      autoCorrect={false}
      underlineColorAndroid={"transparent"}
    />
  );
};

export default function ModalScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<Response | null>(null);
  const [search, setSearch] = useState("");
  const navigation = useNavigation();

  useEffect(() => {
    fetch("http://192.168.0.111:3000/seasons")
      .then((response) => response.json())
      .then((data) => {
        setData(data.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => {
        return (
          <View style={styles.searchBar}>
            <SearchBar setSearch={setSearch} />
          </View>
        );
      },
    });
  }, [navigation]);

  if (isLoading || data === null) {
    return <ActivityIndicator size="large" color="#00ff00" />;
  }

  const filteredSeasons = data.seasons.filter((season) => season.name.toLowerCase().includes(search.toLowerCase()));
  return (
    <View style={styles.container}>
      <FlatList
        data={filteredSeasons}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View key={item.id} style={{ backgroundColor: "transparent" }}>
            <Pressable onPress={() => navigation.navigate("lige/detalji", { season: item })}>
              <View style={styles.container2}>
                <Image
                  source={{
                    uri: "https://media.discordapp.net/attachments/970319574048333865/1222971718830788828/image.png?ex=6618282b&is=6605b32b&hm=25805bbc9dd4c95bbe8da48c9c8668b096be65f88f8af693598877594f940ca6&=&format=webp&quality=lossless",
                  }}
                  style={styles.logoImage}
                  resizeMode="contain"
                />

                <Text style={styles.teamName}>{item.name}</Text>
                <Image
                  source={{
                    uri: "https://media.discordapp.net/attachments/970319574048333865/1222974383438561391/image.png?ex=66182aa6&is=6605b5a6&hm=8a41fcfe01f5b17609647e57c8946225d59ffe47dad0cd51c1313a3238519734&=&format=webp&quality=lossless",
                  }}
                  style={styles.dropdownIcon}
                  resizeMode="contain"
                />
              </View>
            </Pressable>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#161e28",
  },
  searchBar: {
    backgroundColor: "transparent",
    width: "100%",
    marginLeft: -40,
    paddingRight: 100,
  },
  input: {
    backgroundColor: "transparent",
    fontSize: 18,
    marginLeft: 10,
    color: "white",
  },

  container2: {
    flexDirection: "row",
    alignItems: "center",

    marginTop: 3,
    padding: 6,
    borderRadius: 12,
    backgroundColor: "#0C1216",
    marginLeft: 6,
    marginRight: 6,
  },
  logoImage: {
    height: 32,
    width: 32,
    marginLeft: 6,
  },
  dropdownIcon: {
    position: "absolute",
    right: 12,

    height: 32,
    width: 32,
  },

  teamName: {
    marginLeft: 10,
  },
});
