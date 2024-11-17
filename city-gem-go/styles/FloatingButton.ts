import { ColorPalette } from '@/constants/Colors';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    bottom: 50,
    right: 50,
    backgroundColor: ColorPalette.white,
    width: 30,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: ColorPalette.black,
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
