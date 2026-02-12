import {
  Button,
  Dimensions,
  FlatList,
  Pressable,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";
import onboardingData from "../../constants/data/onboardingData";
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "expo-router";
import { useAppSelector } from "../../hooks/storeHook";
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";

import * as SystemUI from "expo-system-ui";
import OnboardingItems from "../../componetns/onboarding/OnboardingItems";
import OnboardingDots from "../../componetns/onboarding/OnboardingDots";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

const { width, height } = Dimensions.get("screen");

const index = () => {
  const router = useRouter();
  const { themeData, themeName } = useAppSelector((state) => state.theme);
  useEffect(() => {
    SystemUI.setBackgroundColorAsync(themeData["background-secondary-2"]); // غيّر اللون حسب التصميم
  }, [themeData]);

  const scrollViewRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = 3; // عدد الصفحات

  const goNext = () => {
    if (currentPage < totalPages - 1) {
      const nextPage = currentPage + 1;
      scrollViewRef.current.scrollToIndex({ index: nextPage });
      setCurrentPage(nextPage);
    }
  };

  const goBack = () => {
    if (currentPage > 0) {
      const prevPage = currentPage - 1;
      scrollViewRef.current.scrollToIndex({ index: prevPage });
      // scrollViewRef.current?.scrollTo({ x: prevPage * width, animated: true });
      setCurrentPage(prevPage);
    }
  };

  // animation part
  const scrollX = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler((event) => {
    scrollX.value = event.contentOffset.x;
  });

  return (
    <>
      <View style={{ flex: 1, width: width, height: height }}>
        <View
          style={{
            width: width,
            height: height,
            backgroundColor: themeData["background-secondary"],
            alignItems: "center",
          }}
        >
          <StatusBar
            backgroundColor={themeData["background-secondary-2"]} // لون الخلفية في أندرويد
            barStyle={themeName === "dark" ? "light-content" : "dark-content"} // نوع الأيقونات: light-content أو dark-content
            translucent={false} // إذا كنت تريد أن يكون فوق المحتوى
          />
          <Animated.FlatList
            data={onboardingData}
            ref={scrollViewRef}
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            renderItem={({ item }) => (
              <OnboardingItems onboardingData={item} scrollX={scrollX} />
            )}
            pagingEnabled
            scrollEnabled={false}
            scrollEventThrottle={16}
            onScroll={scrollHandler}
          />
          <View
            style={{
              height: height * 0.2,
              width,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              padding: 40,
              backgroundColor: themeData["background-secondary-2"],
            }}
          >
            {currentPage !== 0 ? (
              <Pressable
                style={[
                  styles.btnBackNext,
                  { backgroundColor: themeData["background-secondary"] },
                ]}
                onPress={goBack}
              >
                <MaterialIcons
                  name="arrow-left"
                  size={40}
                  color={themeData["background-primary"]}
                />
              </Pressable>
            ) : (
              <View style={styles.btnBackNext}></View>
            )}

            <OnboardingDots onboardingData={onboardingData} scrollX={scrollX} />

            <Pressable
              style={[
                styles.btnBackNext,
                { backgroundColor: themeData["background-secondary"] },
              ]}
              onPress={
                currentPage !== 2
                  ? goNext
                  : () => {
                      router.replace("/SelectLogin");
                    }
              }
            >
              <MaterialIcons
                name="arrow-right"
                size={40}
                color={themeData["background-primary"]}
              />
            </Pressable>
          </View>
        </View>
      </View>
    </>
  );
};

export default index;

const styles = StyleSheet.create({
  slider: {
    margin: height * 0.05,
  },
  buttonPartBtn: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: width * 0.8,
  },

  btnBackNext: {
    width: 45,
    height: 45,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 40,
  },
});
