import { StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { View } from '@/components/Themed';

import DropdownMenu from '@/components/misc/DropdownMenu';
import LoadingComponent from '@/components/global/LoadingComponent';
import ErrorComponent from '@/components/global/ErrorComponents';

import { fetchCompetitions } from '@/API/src/routes/competitions';
import { CompetitionsResponse } from '@/API/types/competitions';
import { CONFIG } from '@/API/storage';

export default function TabTwoScreen() {
  const [data, setData] = useState<null | CompetitionsResponse>(null);
  const [error, setError] = useState<null | Error>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const result = await fetchCompetitions({ useLocalAPI: CONFIG.getCached('useLocalAPI') as boolean });
        setData(result);
      } catch (err) {
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  if (isLoading) {
    return <LoadingComponent />;
  }

  if (error) {
    return <ErrorComponent message={`Error: ${error.message}`} />;
  }

  if (!data) {
    return <ErrorComponent message={`Error: Couldn't find data`} />;
  }

  const dropdownData = Object.entries(data).map(([key, value]) => ({
    title: key,
    imageUri: value[0].image,
    items: value.map((item) => ({ name: item.name, id: item.id })),
  }));

  type DropDownItem = { title: string; imageUri: string; items: { name: string; id: string }[] };
  const renderItem = ({ item }: { item: DropDownItem }) => (
    <DropdownMenu title={item.title} imageUri={item.imageUri} items={item.items} />
  );

  const renderFooter = () => {
    return <ActivityIndicator style={{ marginVertical: 20 }} />;
  };

  return (
    <View style={styles.outerContainer}>
      <FlatList
        data={dropdownData}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.container}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    backgroundColor: '#161e28',
    flex: 1,
  },
  container: {
    backgroundColor: '#10181E',
    marginHorizontal: 6,
    marginVertical: 3,
    borderColor: '#000000',
    borderRadius: 10,
    borderWidth: 1,
    paddingBottom: 6,
  },
});
