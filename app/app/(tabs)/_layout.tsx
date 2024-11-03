import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import { Pressable, View } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';

import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: { name: React.ComponentProps<typeof FontAwesome>['name']; color: string }) {
  return <FontAwesome size={24} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme() ?? 'light';
  const { t: translate } = useTranslation();

  const router = useRouter();
  const handleNavigation = () => {
    router.push('/modal');
  };

  return (
    <Tabs
      screenOptions={{
        // Color of the active window at the bottom
        tabBarActiveTintColor: Colors[colorScheme].taskbarIcons,
        tabBarStyle: {
          paddingBottom: 5,
        },

        // navbar background color
        headerStyle: {
          backgroundColor: Colors[colorScheme].navbarBackground,
        },

        headerShown: useClientOnlyValue(false, true),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: translate('index.title'),
          tabBarIcon: ({ color }) => <TabBarIcon name="soccer-ball-o" color={color} />,
          headerRight: () => (
            <View style={{ flexDirection: 'row', marginRight: 15 }}>
              <Pressable onPress={handleNavigation}>
                {({ pressed }) => (
                  <AntDesign
                    name="search1"
                    size={24}
                    color={Colors[colorScheme].navbarIcons}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>

              <View style={{ width: 15 }} />
              <Pressable onPress={() => router.push('/three')}>
                {({ pressed }) => (
                  <FontAwesome
                    name="bars"
                    size={25}
                    color={Colors[colorScheme].navbarIcons}
                    style={{ opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="two"
        options={{
          title: translate('two.title'),
          tabBarIcon: ({ color }) => <AntDesign name="search1" size={24} color={color} />,
          headerRight: () => (
            <View style={{ flexDirection: 'row', marginRight: 15 }}>
              <Pressable onPress={handleNavigation}>
                {({ pressed }) => (
                  <AntDesign
                    name="search1"
                    size={24}
                    color={Colors[colorScheme].navbarIcons}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
              <View style={{ width: 15 }} />
              <Pressable onPress={() => router.push('/three')}>
                {({ pressed }) => (
                  <FontAwesome
                    name="bars"
                    size={25}
                    color={Colors[colorScheme].navbarIcons}
                    style={{ opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="three"
        options={{
          title: translate('three.title'),
          tabBarIcon: ({ color }) => <AntDesign name="setting" size={24} color={color} />,
          headerRight: () => (
            <View style={{ flexDirection: 'row', marginRight: 15 }}>
              <Pressable onPress={handleNavigation}>
                {({ pressed }) => (
                  <AntDesign
                    name="search1"
                    size={24}
                    color={Colors[colorScheme].navbarIcons}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
              <View style={{ width: 15 }} />
              <Pressable onPress={() => router.push('/three')}>
                {({ pressed }) => (
                  <FontAwesome
                    name="bars"
                    size={25}
                    color={Colors[colorScheme].navbarIcons}
                    style={{ opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </View>
          ),
        }}
      />
    </Tabs>
  );
}
