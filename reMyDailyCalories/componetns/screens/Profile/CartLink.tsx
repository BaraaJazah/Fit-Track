import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { useAppSelector } from "../../../hooks/storeHook";
import * as Animatable from "react-native-animatable";
import { MotiView, MotiText } from "moti";

const CartLink = ({ text, leftIcon, rightIcons, onPress }) => {
  const { themeData } = useAppSelector((state) => state.theme);
  const { lang, words } = useAppSelector((state) => state.lang);
  return (
    <MotiView
      animate={{
        borderColor: themeData["background-secondary"],
        backgroundColor: themeData["background-secondary-2"],
      }}
      transition={{
        type: "timing",
        duration: 500,
      }}
      style={[
        {
          borderColor: themeData["background-secondary"],
          backgroundColor: themeData["background-secondary-2"],
          paddingHorizontal: 15,
          borderRadius: 14,
          margin: 3,
          borderWidth: 3,
        },
      ]}
    >
      <TouchableOpacity style={styles.cart} onPress={onPress}>
        <View style={styles.cartLeft}>
          <Image source={leftIcon} style={styles.cartLeftIcon} />
          <Text
            style={[styles.cartLeftText, { color: themeData["text-primary"] }]}
          >
            {text}
          </Text>
        </View>
        <Image
          source={rightIcons}
          style={[
            styles.cartIcon,
            {
              transform: [{ rotate: lang === "ar" ? "90deg" : "270deg" }],
            },
          ]}
        />
      </TouchableOpacity>
    </MotiView>
  );
};

export default CartLink;

const styles = StyleSheet.create({
  cart: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 6,
    borderWidth: 3,
    borderColor: "transparent",
  },
  cartLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  cartRight: {},
  cartLeftIcon: {
    width: 20,
    height: 20,
  },
  cartIcon: {
    width: 16,
    height: 16,
  },
  cartLeftText: {
    padding: 10,
    fontWeight: 500,
    opacity: 0.6,
    fontSize: 14,
  },
});
