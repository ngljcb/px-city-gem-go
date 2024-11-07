import React from 'react';
import { TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useRouter } from 'expo-router';

const FloatingButton = () => {
  const router = useRouter();

  const handlePress = () => {
    router.push('/help'); // Naviga alla pagina di help
  };

  return (
    <TouchableOpacity style={styles.button} onPress={handlePress}>
      <Image source={require('@/assets/images/help.gif')} style={styles.icon} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    bottom: 50,
    right: 50,
    backgroundColor: '#fff',
    width: 30,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  icon: {
    width: 100,
    height: 100,
    marginTop: 18,
  },
});

export default FloatingButton;
