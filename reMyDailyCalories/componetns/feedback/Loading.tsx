import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useAppSelector } from "../../hooks/storeHook";
import LottieFile from "../../constants/loffieFile/LottieFile";

type Props = {
  text: string;
};
const Loading = ({ text }: Props) => {
  const { themeData } = useAppSelector((state) => state.theme);
  return (
    <View
      style={[
        styles.body,
        { backgroundColor: themeData["background-secondary"] },
      ]}
    >
      <Text style={[styles.bodyText, { color: themeData["text-primary"] }]}>
        {text}
      </Text>

      <LottieFile lottieName="loading" lottieHeigh={150} lottieWidth={150} />
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({
  body: {
    backgroundColor: "rgba(255, 255, 255,0.8)",
    width: 200,
    height: 200,
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
    borderRadius: 12,
  },
  bodyText: {
    fontSize: 20,
    fontWeight: 600,
    transform: [{ translateY: 16 }],
  },
});
