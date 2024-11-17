import { StyleSheet } from 'react-native';
import { ColorPalette } from '@/constants/Colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    marginHorizontal: 30,
    paddingHorizontal: 20,
    marginTop: '50%',
    maxHeight: '70%',
    backgroundColor: 'rgba(258, 258, 258, 0.5)',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    marginTop: 20,
    color: ColorPalette.dark,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 5,
    color: ColorPalette.green,
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
  },
  footer: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  button: {
    backgroundColor: ColorPalette.primary,
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  buttonText: {
    color: ColorPalette.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
});
