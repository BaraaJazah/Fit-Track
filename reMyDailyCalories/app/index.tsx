import {
  Button,
  Image,
  StyleSheet,
  Text,
  View,
  StatusBar,
  Dimensions,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { useRouter, usePathname, useFocusEffect } from "expo-router";
import { useAppSelector } from "../hooks/storeHook";
import { logo } from "../assets/images";
import * as Font from "expo-font";
import * as SystemUI from "expo-system-ui";
import { I18nManager } from "react-native";
import * as ScreenOrientation from "expo-screen-orientation";
// تغيرر الاتجاه
I18nManager.allowRTL(false); // يمنع الاتجاه من اليمين لليسار
I18nManager.forceRTL(false); // يفرض الاتجاه من اليسار لليمين

const { width, height } = Dimensions.get("screen");
const index = () => {
  const router = useRouter();
  const { themeData, themeName } = useAppSelector((state) => state.theme);
  const { accessToken } = useAppSelector((state) => state.auth);

  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    const lockOrientation = async () => {
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.PORTRAIT
      );
    };
    lockOrientation();
  }, []);

  useFocusEffect(
    useCallback(() => {
      const timerId = setTimeout(() => {
        if (accessToken === null) {
          router.push("/(welcome)");
        } else {
          router.replace("/(home)");
        }
      }, 1000);

      return () => clearTimeout(timerId);
    }, [])
  );

  useEffect(() => {
    Font.loadAsync({
      "Cairo-Regular": require("../assets/fonts/FreshSpring.otf"), // عدّل المسار حسب مكان الخط
    }).then(() => setFontLoaded(true));
  }, []);

  useEffect(() => {
    SystemUI.setBackgroundColorAsync(themeData["background-secondary-2"]); // غيّر اللون حسب التصميم
  }, [themeData]);

  if (!fontLoaded) return null; // ممكن تحط Spinner بدلًا من null

  return (
    <View
      style={[
        styles.containder,
        { backgroundColor: themeData["background-secondary-2"] },
      ]}
    >
      <StatusBar
        backgroundColor={themeData["background-secondary-2"]} // لون الخلفية في أندرويد
        barStyle={themeName === "dark" ? "light-content" : "dark-content"} // نوع الأيقونات: light-content أو dark-content
        translucent={false} // إذا كنت تريد أن يكون فوق المحتوى
      />
      <Text
        style={[
          styles.text,
          {
            color: themeData["background-primary"],
            fontFamily: "Cairo-Regular",
          },
        ]}
      >
        Daily Calories
      </Text>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          position: "absolute",
          bottom: 40,
        }}
      >
        <Image source={logo} style={styles.logo} />
        <Text
          style={{
            color: "#999",
            fontSize: 14,
            fontWeight: 500,
          }}
        >
          Powered by AI
        </Text>
      </View>
    </View>
  );
};
export default index;

const styles = StyleSheet.create({
  containder: {
    flex: 1,
    height,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 110,
    height: 110,
  },
  text: {
    fontSize: 62,
    fontWeight: 600,
    transform: [{ translateY: -100 }],
    opacity: 0.8,
  },
});
