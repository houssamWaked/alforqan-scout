import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import { Platform } from 'react-native';
import supabase from '../src/services/supabaseClient';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export async function registerDeviceForPush(userId) {
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== 'granted') {
    const permission = await Notifications.requestPermissionsAsync();
    finalStatus = permission.status;
  }

  if (finalStatus !== 'granted') {
    return null;
  }

  const token = (
    await Notifications.getExpoPushTokenAsync({
      projectId:
        Constants.expoConfig?.extra?.eas?.projectId || Constants.easConfig?.projectId,
    })
  ).data;

  await supabase.from('device_tokens').upsert({
    token,
    platform: Platform.OS,
    user_id: userId || null,
    last_used_at: new Date().toISOString(),
  });

  return token;
}

export default registerDeviceForPush;
