import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { useAppSelector } from "../../hooks/storeHook";
import { facebook, google } from "../../assets/icons";

const { width } = Dimensions.get("window");
type Props = {
  textColor?: string;
  bgColor?: string;
  btnStyle?: any;
  btnTextStyle?: any;
  text: string;
  onPress: () => void;
  icon: "facebook" | "google";
};
const GoogleBtn = ({
  textColor = "text-secondary",
  bgColor,
  btnStyle,
  btnTextStyle,
  text,
  onPress,
  icon,
}: Props) => {
  const { themeData } = useAppSelector((state) => state.theme);
  const btnIcon = icon === "facebook" ? facebook : google;

  return (
    <TouchableOpacity style={[styles.btn, btnStyle]} onPress={onPress}>
      <Image source={btnIcon} style={styles.btnIcon} />
      <Text
        style={[styles.btnText, { color: themeData[textColor] }, btnTextStyle]}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default GoogleBtn;

const styles = StyleSheet.create({
  btn: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    width: width * 0.35,
    borderRadius: 30,
    borderWidth: 1.5,
    borderColor: "#eee",
  },
  btnText: {
    paddingVertical: 16,
    textAlign: "center",
    fontSize: 15,
  },
  btnIcon: {
    width: 24,
    height: 24,
    position: "absolute",
    left: 24,
  },
});
