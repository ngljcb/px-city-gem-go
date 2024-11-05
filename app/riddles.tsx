import { View, StyleSheet } from 'react-native';
import RiddleScreen from '@/components/RiddleManager';

export default function Riddles() {
  return (
    <View style={styles.container}>
      <RiddleScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
