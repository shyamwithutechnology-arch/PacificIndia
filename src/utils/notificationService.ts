import messaging from '@react-native-firebase/messaging';
import notifee, { AndroidImportance, EventType } from '@notifee/react-native';
import { PermissionsAndroid, Platform } from 'react-native';
import { localStorage, storageKeys } from '../storage/storage';

// 🔔 Request Permission
export async function requestUserPermission() {
  if (Platform.OS === 'android' && Platform.Version >= 33) {
    await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
    );
  }

  const authStatus = await messaging().requestPermission();

  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    const token = await messaging().getToken();
    if (token) {
      await localStorage.setItem(storageKeys.fcm_token, token);
      console.log('tokerapp', token);
    }
  } else {
    console.log('Notification permission denied');
  }
}

export async function displayNotification(remoteMessage: any) {
  console.log('displayNotification called', remoteMessage);

  const channelId = await notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
    importance: AndroidImportance.HIGH,
    sound: 'default',
  });

  const title =
    remoteMessage.notification?.title ||
    remoteMessage.data?.title ||
    'Notification';
  const body =
    remoteMessage.notification?.body ||
    remoteMessage.data?.body ||
    'New message received';

  await notifee.displayNotification({
    title: title,
    body: body,
    android: {
      channelId,
      pressAction: { id: 'default' },
    },
  });
}

// ==============================
//  FOREGROUND STATE
// ==============================
export function onForegroundNotification() {
  return messaging().onMessage(async (remoteMessage) => {
    console.log('🔥 FOREGROUND:', remoteMessage);

    await displayNotification(remoteMessage); // always call
  });
}
// ==============================
// 🔥 CLICK EVENTS
// ==============================
export function onNotificationOpened() {
  messaging().onNotificationOpenedApp((remoteMessage) => {
    console.log('Notification opened from background:', remoteMessage);
  });

  messaging()
    .getInitialNotification()
    .then((remoteMessage) => {
      if (remoteMessage) {
        console.log('Opened from quit state:', remoteMessage);
      }
    });
}

// ==============================
// 🔥 NOTIFEE CLICK EVENTS
// ==============================
export function handleNotifeeEvents() {
  return notifee.onForegroundEvent(({ type, detail }) => {
    if (type === EventType.PRESS) {
      console.log('User pressed notification', detail.notification);
    }
  });
}

// export function onForegroundNotification() {
//   return messaging().onMessage(async (remoteMessage) => {
//     console.log('🔥 FOREGROUND:', remoteMessage);

//     await displayNotification(remoteMessage); // always call
//   });
// }
