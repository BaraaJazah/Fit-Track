import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { back } from "../../assets/icons";
import { plusHeader } from "../../assets/icons";
import { useAppSelector } from "../../hooks/storeHook";
import { MotiView, MotiText, MotiSafeAreaView } from "moti";

const { width, height } = Dimensions.get("window");

type Props = {
  title: string;
  right?: boolean;
  onPress: () => void;
  onPressRight?: () => void;
};
const HeaderBack = ({
  title,
  right = false,
  onPress,
  onPressRight = () => {},
}) => {
  const { themeData } = useAppSelector((state) => state.theme);
  return (
    <MotiSafeAreaView
      animate={{
        backgroundColor: themeData["background-secondary-2"], // اللون الجديد
      }}
      transition={{
        type: "timing",
        duration: 500,
      }}
      style={[
        styles.body,
        { backgroundColor: themeData["background-secondary-2"] },
      ]}
    >
      <MotiView
        animate={{
          backgroundColor: themeData["background-secondary"], // اللون الجديد
        }}
        transition={{
          type: "timing",
          duration: 500,
        }}
        style={[
          styles.left,
          { backgroundColor: themeData["background-secondary"] },
        ]}
      >
        <TouchableOpacity onPress={onPress} style={{ padding: 6 }}>
          <Image source={back} style={styles.leftIcon} />
        </TouchableOpacity>
      </MotiView>
      <View>
        <Text
          style={[
            styles.title,
            { color: themeData["text-primary"], width: width * 0.75 },
          ]}
        >
          {title}
        </Text>
      </View>
      {right ? (
        <TouchableOpacity
          onPress={onPressRight}
          style={[
            styles.right,
            { backgroundColor: themeData["background-secondary"] },
          ]}
        >
          <Image source={plusHeader} style={styles.leftIcon} />
        </TouchableOpacity>
      ) : (
        ""
      )}
    </MotiSafeAreaView>
  );
};

export default HeaderBack;

const styles = StyleSheet.create({
  body: {
    flexDirection: "row",
    width: width * 0.94,
    height: height * 0.06,
    borderRadius: 12,
    opacity: 0.7,
    justifyContent: "center",
    alignItems: "center",
    marginTop: height * 0.01,
  },
  left: {
    position: "absolute",
    left: 0,
    marginLeft: 10,
    padding: 6,
    borderRadius: 14,
  },
  leftIcon: {
    width: 14,
    height: 14,
  },
  title: {
    fontWeight: 800,
    fontSize: 16,
    textTransform: "capitalize",
    textAlign: "center",
  },
  right: {
    position: "absolute",
    right: 0,
    marginRight: 10,
    padding: 12,
    borderRadius: 14,
  },
});
