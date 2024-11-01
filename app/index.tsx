import { Text, View } from 'react-native';
import TitleCard from '@/components/TitleCard';
import LoginRegisterButton from '@/components/LoginRegisterButton';

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <TitleCard />
      <LoginRegisterButton />
    </View>
  );
}
