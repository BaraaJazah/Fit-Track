import { Dimensions, FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import LottieFile from "../../constants/loffieFile/LottieFile";
import { useAppSelector } from "../../hooks/storeHook";
import Animated, {
  Easing,
  interpolate,
  useAnimatedStyle,
  withDelay,
  withSpring,
  withTiming,
} from "react-native-reanimated";

const { width, height } = Dimensions.get("window");

const OnboardingItems = ({ onboardingData, scrollX }) => {
  const { themeData, themeName } = useAppSelector((state) => state.theme);

  const animatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollX.value, // القيمة الأصلية اللي عم تتغير
      [
        (onboardingData.id - 1) * width,
        onboardingData.id * width,
        (onboardingData.id + 1) * width,
      ],
      [0.2, 1, 0.2], // الترجمة (من شفافية 1 إلى 0)
      {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      }
    );

    return {
      opacity: withTiming(opacity, {
        duration: 500,
        easing: Easing.inOut(Easing.quad),
      }),
    };
  });

  const animatedStyleText2 = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollX.value, // القيمة الأصلية اللي عم تتغير
      [
        (onboardingData.id - 1) * width,
        onboardingData.id * width,
        (onboardingData.id + 1) * width,
      ],
      [0, 1, 0], // الترجمة (من شفافية 1 إلى 0)
      {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      }
    );

    const moveY = interpolate(
      scrollX.value, // القيمة الأصلية اللي عم تتغير
      [
        (onboardingData.id - 1) * width,
        onboardingData.id * width,
        (onboardingData.id + 1) * width,
      ],
      [50, 0, 50], // الترجمة (من شفافية 1 إلى 0)
      {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      }
    );

    return {
      opacity: withDelay(
        300,
        withTiming(opacity, {
          duration: 500,
          easing: Easing.inOut(Easing.quad),
        })
      ),

      transform: [
        {
          translateY: withDelay(
            300,
            withSpring(moveY, {
              mass: 1,
              damping: 50,
              stiffness: 100,
              overshootClamping: true,
            })
          ),
        },
      ],
    };
  });

  return (
    <View
      style={{
        height,
        width,
      }}
    >
      <Animated.View
        style={[styles.topPart, animatedStyle, { justifyContent: "center" }]}
      >
        <LottieFile
          lottieName={onboardingData.lottie}
          lottieWidth={400}
          lottieHeigh={400}
        />
      </Animated.View>
      <View
        style={[
          styles.buttonPart,
          {
            backgroundColor: themeData["background-secondary-2"],
          },
        ]}
      >
        <Animated.Text
          style={[
            styles.buttonPartTitle,
            animatedStyle,
            { color: themeData["background-primary"] },
          ]}
        >
          {onboardingData.title}
        </Animated.Text>
        <Animated.Text
          style={[
            styles.buttonPartText,
            animatedStyleText2,
            { color: themeData["text-primary"] },
          ]}
        >
          {onboardingData.text}
        </Animated.Text>
      </View>
    </View>
  );
};

export default OnboardingItems;

const styles = StyleSheet.create({
  topPart: {},
  buttonPart: {
    flex: 0.6,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    padding: 30,
    borderRadius: 30,
  },

  buttonPartTitle: {
    fontSize: 28,
    fontWeight: 600,
    marginBottom: 40,
    textAlign: "center",
  },

  buttonPartText: {
    fontSize: 16,
    textAlign: "center",
  },
});
