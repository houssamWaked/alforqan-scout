import AsyncStorage from '@react-native-async-storage/async-storage';

export async function setOnboardingSeen() {
  return AsyncStorage.setItem('hasSeenWelcome', 'true');
}
