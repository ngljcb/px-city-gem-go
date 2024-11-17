import { View } from 'react-native';
import { useEffect } from 'react';
import TitleCard from '@/components/TitleCard';
import LoginRegisterButton from '@/components/LoginRegisterButton';
import NotificationHandler from '../services/NotificationHandler';

export default function Index() {
  const notificationHandler = new NotificationHandler();

  useEffect(() => {
    notificationHandler.requestPermissions();
  }, []);

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
