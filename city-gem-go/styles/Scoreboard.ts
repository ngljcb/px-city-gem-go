import { StyleSheet } from 'react-native';
import { ColorPalette } from '@/constants/Colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    marginTop: '60%',
    marginHorizontal: 20,
    flex: 1,
    padding: 20,
  },
  button: {
    padding: 15,
    backgroundColor: ColorPalette.primary,
    borderRadius: 5,
    marginBottom: '30%',
  },
  buttonText: {
    color: ColorPalette.white,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: ColorPalette.blue,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: 'rgba(258, 258, 258, 0.5)',
  },
  rank: {
    fontWeight: 'bold',
  },
  userId: {
    flex: 1,
    textAlign: 'center',
  },
  time: {
    fontWeight: 'bold',
  },
  noData: {
    textAlign: 'center',
    marginTop: 20,
    color: '#888',
  },
  img: {
    width: '100%',
    height: '100%',
  },
});
