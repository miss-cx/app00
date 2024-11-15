import { NativeModules, Platform, PermissionsAndroid } from 'react-native';
import messaging from '@react-native-firebase/messaging';

// This file was generated by Mendix Studio Pro.
// BEGIN EXTRA CODE
// END EXTRA CODE
/**
 * Notification permissions are required to send a user push messages. Calling this action displays the permission dialog to the user.
 * Returns true if permission is granted, otherwise it returns false.
 * @returns {Promise.<boolean>}
 */
async function RequestNotificationPermission() {
    // BEGIN USER CODE
    // Documentation https://rnfirebase.io/messaging/usage
    if (NativeModules && !NativeModules.RNFBMessagingModule) {
        return Promise.reject(new Error("Firebase module is not available in your app"));
    }
    if (Platform.OS === "android") {
        try {
            const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
            return granted === PermissionsAndroid.RESULTS.GRANTED;
        }
        catch (error) {
            console.error("Failed to request permission on Android", error);
            return false;
        }
    }
    try {
        const authStatus = await messaging().requestPermission();
        const enabled = authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
            authStatus === messaging.AuthorizationStatus.PROVISIONAL;
        if (!enabled) {
            return false;
        }
        if (!messaging().isDeviceRegisteredForRemoteMessages) {
            await messaging().registerDeviceForRemoteMessages();
            return true;
        }
        return true;
    }
    catch (error) {
        console.error("Failed to request permission on iOS", error);
        return false;
    }
    // END USER CODE
}

export { RequestNotificationPermission };
