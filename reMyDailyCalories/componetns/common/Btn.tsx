import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { useAppSelector } from "../../hooks/storeHook";

const { width } = Dimensions.get("window");
type Props = {
  textColor: string;
  bgColor: string;
  btnStyle?: any;
  btnTextStyle?: any;
  text: string;
  disabled?: boolean;
  onPress: () => void;
};
const Btn = ({
  textColor,
  bgColor,
  btnStyle,
  btnTextStyle,
  text,
  onPress,
  disabled = false,
}: Props) => {
  const { themeData } = useAppSelector((state) => state.theme);

  return (
    <TouchableOpacity
      disabled={disabled}
      style={[styles.btn, { backgroundColor: themeData[bgColor] }, btnStyle]}
      onPress={onPress}
    >
      <Text
        style={[styles.btnText, { color: themeData[textColor] }, btnTextStyle]}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default Btn;

const styles = StyleSheet.create({
  btn: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    width: width * 0.35,
    borderRadius: 10,
  },
  btnText: {
    paddingVertical: 14,
    textAlign: "center",
    fontSize: 15,
    fontWeight: 600,
  },
});
