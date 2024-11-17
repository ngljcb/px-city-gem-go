import React from 'react';
import { View, Text, FlatList, TouchableOpacity, ImageBackground, Image } from 'react-native';
import { useRouter } from 'expo-router';

import useRoutesViewModel from '../viewmodels/RoutesViewModel';

import FloatingButton from '@/components/FloatingButton';
import { styles } from '../styles/Default';

export default function Routes() {
  const { routes, loading } = useRoutesViewModel();
  const router = useRouter();

  const handleRouteSelect = (routeId: string) => {
    router.push({
      pathname: '/riddles',
      params: { routeId },
    });
  };

  return (
    <ImageBackground source={require('@/assets/images/riddles-backdrop.gif')} style={styles.container} resizeMode="cover">
      {loading ? (
        <Image source={require('@/assets/images/loading.gif')} style={styles.img} resizeMode="cover" />
      ) : (
        <View style={styles.content}>
          <Text style={styles.text}>Seleziona la tua avventura!</Text>
          <FlatList
            data={routes}
            keyExtractor={(item) => item.routeId}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.button} onPress={() => handleRouteSelect(item.routeId)}>
                <Text style={styles.buttonText}>{item.routeName}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
      <FloatingButton />
    </ImageBackground>
  );
}
