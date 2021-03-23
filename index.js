/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import PushNotification from 'react-native-push-notification';

PushNotification.configure({
  popInitialNotification: true,
  requestPermissions: false,
});
PushNotification.createChannel({
  channelId: 'com.localnotifications.todo',
  channelName: 'todoLocalNotifications',
  playSound: true,
  soundName: 'default',
  importance: 4,
  vibrate: true,
});

AppRegistry.registerComponent(appName, () => App);
