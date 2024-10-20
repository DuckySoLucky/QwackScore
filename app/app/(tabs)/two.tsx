import DropdownMenu from '@/components/misc/DropdownMenu';
import React from 'react';
import { StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import { View } from '@/components/Themed';

const queryClient = new QueryClient();

export default function TabTwoScreen() {
  return (
    <QueryClientProvider client={queryClient}>
      <Output />
    </QueryClientProvider>
  );
}

function Output() {
  const {
    isPending,
    error,
    data: schedulesData,
  } = useQuery({
    queryKey: ['standingsData'],
    queryFn: () =>
      fetch(`http://192.168.90.105:3000/competitions`)
        .then((res) => res.json())
        .then((data) => data.data),
  }) as { isPending: boolean; error: Error; data: Record<string, { id: string; name: string; image: string }[]> };

  if (isPending) {
    return <ActivityIndicator size="large" color="#00ff00" />;
  }

  if (error) {
    return <View>Error: {error.message}</View>;
  }

  const dropdownData = Object.entries(schedulesData).map(([key, value]) => ({
    title: key,
    imageUri: value[0].image,
    items: value.map((item) => ({ name: item.name, id: item.id })),
  }));

  const renderItem = ({
    item,
  }: {
    item: { title: string; imageUri: string; items: { name: string; id: string }[] };
  }) => <DropdownMenu title={item.title} imageUri={item.imageUri} items={item.items} />;

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
    backgroundColor: '#161e28', // 10181E
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
