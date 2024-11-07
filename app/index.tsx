import { Text, View } from 'react-native';
import TitleCard from '@/components/TitleCard';
import LoginRegisterButton from '@/components/LoginRegisterButton';
import { useNotificationPermissions } from '../services/NotificationService';

export default function Index() {
  useNotificationPermissions();

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
