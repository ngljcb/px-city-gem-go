import { ColorPalette } from '@/constants/Colors';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  button: {
    padding: 15,
    backgroundColor: ColorPalette.primary,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: ColorPalette.white,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    width: '100%',
    maxWidth: 400,
    paddingHorizontal: 40,
  },
  title: {
    fontSize: 34,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: ColorPalette.green,
  },
  text: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: ColorPalette.black,
  },
  img: {
    width: '100%',
    height: '100%',
  },
  input: {
    borderWidth: 1,
    borderColor: ColorPalette.black,
    backgroundColor: ColorPalette.input,
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
  timerText: {
    fontSize: 16,
    marginTop: 20,
    textAlign: 'center',
  },
});
