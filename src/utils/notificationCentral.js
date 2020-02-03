import { AsyncStorage } from 'react-native';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';

const NOTIFICATION_KEY = 'MobileFlashcards:notifications';

const clearLocalNotification = async () => {
  await AsyncStorage.removeItem(NOTIFICATION_KEY);
  await Notifications.cancelAllScheduledNotificationsAsync();
};

const createNotification = () => {
  return {
    title: 'Stay sharp!',
    body: 'Dont forget to answer at least one quiz today :)',
    ios: {
      sound: true,
    },
    android: {
      sound: true,
      priority: 'high',
      sticky: false,
      vibrate: true,
    },
  }
};

const setLocalNotification = async () => {
  const notificationStringItem = await AsyncStorage.getItem(NOTIFICATION_KEY);

  const notificationItem = JSON.parse(notificationStringItem);

  if (notificationItem === null) {
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);

    if (status === 'granted') {
      await Notifications.cancelAllScheduledNotificationsAsync();

      let tomorrow = new Date();

      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(12);
      tomorrow.setMinutes(0);

      // I am letting this here to easly test notifications :)
      // tomorrow.setMinutes(tomorrow.getMinutes() + 1);

      await Notifications.scheduleLocalNotificationAsync(
        createNotification(),
        {
          time: tomorrow,
          repeat: 'day',
        }
      );

      await AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify({ notification: 'set' }));
    }
  }
};

export {
  clearLocalNotification,
  createNotification,
  setLocalNotification,
};