import React from 'react';
import { View, Image } from 'react-native';
import { styles } from '../styles/Default';

const TitleCard = () => {
  return (
    <View style={styles.container}>
      <Image source={require('@/assets/images/title-backdrop.gif')} style={styles.img} resizeMode="cover" />
    </View>
  );
};

export default TitleCard;
