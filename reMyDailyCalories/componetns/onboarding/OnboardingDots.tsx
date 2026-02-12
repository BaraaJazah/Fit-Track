import { Dimensions, FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useAppSelector } from "../../hooks/storeHook";
import Animated, {
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";
const { width, height } = Dimensions.get("window");

const OnboardingDots = ({ onboardingData, scrollX }) => {
  const { themeData, themeName } = useAppSelector((state) => state.theme);
  return (
    <View style={{ flexDirection: "row", gap: 10 }}>
      {onboardingData.map((_, index) => {
        const animatedStyle = useAnimatedStyle(() => {
          const dotsWidth = interpolate(
            scrollX.value,
            [(index - 1) * width, index * width, (index + 1) * width],
            [10, 20, 10],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }
          );

          const opacity = interpolate(
            scrollX.value, // القيمة الأصلية اللي عم تتغير
            [(index - 1) * width, index * width, (index + 1) * width],
            [0.3, 1, 0.3], // الترجمة (من شفافية 1 إلى 0)
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }
          );

          return {
            opacity: opacity,
            width: dotsWidth,
          };
        });

        return (
          <Animated.View
            key={index}
            style={[
              styles.dots,
              animatedStyle,
              { backgroundColor: themeData["background-primary"] },
            ]}
          ></Animated.View>
        );
      })}
    </View>
  );
};

export default OnboardingDots;

const styles = StyleSheet.create({
  dots: {
    width: 10,
    height: 10,
    borderRadius: 10,
    backgroundColor: "red",
  },
});
