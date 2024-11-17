import React from 'react';
import { TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { styles } from '../styles/FloatingButton';

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

export default FloatingButton;
