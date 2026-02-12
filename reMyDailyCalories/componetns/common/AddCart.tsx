import {
  Button,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect } from "react";
import { plusWhite } from "../../assets/icons/home";
import { useAppSelector } from "../../hooks/storeHook";
import { AISmile } from "../../assets/icons";
import Animated, { withRepeat, withTiming } from "react-native-reanimated";
// import {
//   translateX,
//   handlePressRight,
//   handlePressLeft,
//   animatedStyles,
// } from "../../componetns/Anime/AnimeRobotMove";

import {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

const { width, height } = Dimensions.get("window");

type Props = {
  color: any;
  Recomended?: number;
  type: string | "Exercise";
  onPress: () => void;
  typeText?: string;
  name: string;
  ai?: boolean;
};

const AddCart = ({
  name,
  color,
  Recomended,
  type,
  onPress,
  typeText,
  ai = false,
}: Props) => {
  const { themeData } = useAppSelector((state) => state.theme);
  const { lang, words } = useAppSelector((state) => state.lang);
  // anime Create

  const translateY = useSharedValue<number>(-5);

  useEffect(() => {
    setTimeout(() => {
      translateY.value = withRepeat(
        withTiming(10, { duration: 800 }),
        -1,
        true
      );
    }, 0);
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  let aiIcon = AISmile;
  return (
    <View
      style={[
        styles.body,
        // { flexDirection: lang === "ar" ? "row-reverse" : "row" },
      ]}
    >
      <View style={[styles.left, { backgroundColor: color }]}></View>
      <View
        style={[
          {
            backgroundColor: themeData["background-secondary"],
            borderTopRightRadius: 12,
            borderBottomRightRadius: 12,
          },
        ]}
      >
        <View
          style={[
            styles.right,
            {
              direction: lang === "ar" ? "rtl" : "ltr",
            },
          ]}
        >
          <View style={styles.rightCard}>
            <View
              style={{ flexDirection: "row", gap: 6, alignItems: "center" }}
            >
              {ai === true ? (
                <Animated.Image
                  source={aiIcon}
                  style={[
                    {
                      width: 20,
                      height: 20,
                    },
                    // animatedStyle,
                  ]}
                />
              ) : (
                ""
              )}
              <Text style={[styles.rightCardText1, { color: color }]}>
                {name ? name : type}
              </Text>
            </View>

            {type == "Exercise" ? (
              ""
            ) : (
              <Text
                style={[
                  styles.rightCardText2,
                  { color: themeData["text-secondary"] },
                ]}
              >
                {words["Recommended Kcal"]} {Recomended}
              </Text>
            )}
          </View>
          <TouchableOpacity
            onPress={onPress}
            style={[styles.iconCart, { backgroundColor: color }]}
          >
            <Image style={styles.iconCartImage} source={plusWhite} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default AddCart;

const styles = StyleSheet.create({
  body: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: width,
  },
  left: {
    width: width * 0.04,
    height: 80,
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
  },
  right: {
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
    flexDirection: "row",
    height: 80,
    width: width * 0.82,
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  rightCard: {
    gap: 2,
  },
  rightCardText1: {
    fontSize: 18,
    fontWeight: 500,
    textTransform: "capitalize",
    justifyContent: "center",
    alignItems: "center",
  },
  rightCardText2: {
    fontSize: 12,
    textTransform: "capitalize",
  },

  iconCart: {
    borderRadius: 8,
    padding: 5,
  },
  iconCartImage: {
    width: 24,
    height: 24,
  },
});
