import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { useRef } from "react";
import { useEffect } from "react";
import { Platform } from "react-native";
import useNotificationStore from "@/store/notificationStore";
import { PROJECT_ID } from "../store/vars";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function useNotification() {
  const notificationListener = useRef();
  const responseListener = useRef();

  const { setExpoToken, setIsGranted } = useNotificationStore();

  
  useEffect(() => {
    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        console.log("foregrounded notification", notification);
      });

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log("NotificationReceivedListener", response);

        // When the user taps on the notification, this line checks if they //are suppose to be taken to a particular screen
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  async function requestForPermissions() {
    const { status } = await Notifications.requestPermissionsAsync();

    if (status !== "granted") {
      setIsGranted(false);
      alert("Push notifications are necessary to use EthnoEats!");
      return;
    }
    setIsGranted(true);
    return status;
  }

  async function getNotificationPermission() {
    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();

      let finalStatus = existingStatus;

      if (finalStatus !== "granted") {
        alert("Notification permission is denied");
        setIsGranted(false);;
        return;
      }

      setIsGranted(true);;
    } else {
      alert("Kindly use a PHYSICAL DEVICE to continue using EthnoEats!");
    }
  }

  async function getExpoPushtoken() {
    try {
      if (Platform.OS === "android") {
        Notifications.setNotificationChannelAsync("default", {
          name: "default",
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: "#FF231F7C",
        });
      }
      let token = (
        await Notifications.getExpoPushTokenAsync({
          projectId: PROJECT_ID,
        })
      ).data;

      if (token && token.includes("ExponentPushToken[")) {
       setExpoToken(token);
       console.log("Expo token", token);
        return;
      }

      alert(
        "Could not get notification token, kindly relaod the app and ensure you enable notifications and have a statble internet connection"
      );
    } catch (error) {
      console.log("getExpoPushtoken error", error);
    }
  }

  return { getNotificationPermission, requestForPermissions, getExpoPushtoken };
}