import { StyleSheet } from 'react-native';
import { ColorPalette } from '@/constants/Colors';

export const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    justifyContent: 'center',
  },
  map: {
    width: '100%',
    height: 300,
    marginBottom: 20,
    borderColor: ColorPalette.black,
    borderWidth: 1,
  },
});
