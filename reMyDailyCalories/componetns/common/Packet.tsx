import { Dimensions, StyleProp, StyleSheet, ViewStyle } from "react-native";
import React from "react";
import { useAppSelector } from "../../hooks/storeHook";
import { MotiView } from "moti";

const { width, height } = Dimensions.get("window");

type Props = {
  children: React.ReactNode;
  packetStyle?: StyleProp<ViewStyle>;
  backgroundCustomColor?: string;
};
const Packet = ({ children, packetStyle, backgroundCustomColor }: Props) => {
  const { themeData } = useAppSelector((state) => state.theme);

  return (
    <MotiView
      animate={{
        backgroundColor: backgroundCustomColor
          ? backgroundCustomColor
          : "transparent",
      }}
      transition={{
        type: "timing",
        duration: 500,
      }}
      style={[
        styles.body,
        {
          backgroundColor: backgroundCustomColor
            ? backgroundCustomColor
            : "transparent",
        },
        packetStyle,
      ]}
    >
      {children}
    </MotiView>
  );
};

export default Packet;

const styles = StyleSheet.create({
  body: {
    width: width * 0.95,
    borderRadius: 12,
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
});
