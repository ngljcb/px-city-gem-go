import { StyleSheet } from 'react-native';
import { ColorPalette } from '@/constants/Colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  logo: {
    width: 60,
    height: 60,
    alignSelf: 'center',
    marginVertical: 80,
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  title: {
    fontSize: 30,
    alignSelf: 'center',
    fontWeight: 'bold',
  },
  inputField: {
    marginVertical: 4,
    height: 50,
    borderWidth: 1,
    borderColor: ColorPalette.black,
    borderRadius: 12,
    padding: 10,
    backgroundColor: ColorPalette.white,
  },
  btnPrimary: {
    backgroundColor: ColorPalette.primary,
    marginVertical: 4,
  },
  btnPrimaryText: {
    color: ColorPalette.white,
    fontSize: 16,
  },
  btn: {
    height: 50,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10,
    backgroundColor: ColorPalette.primary,
  },
});
