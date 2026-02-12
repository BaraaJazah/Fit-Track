import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { HeaderBack, Packet } from "../../common";
import { useAppSelector } from "../../../hooks/storeHook";

const { width, height } = Dimensions.get("window");

type Props = {
  onpress: () => void;
  header: string;
  right?: boolean;
  onPressRight?: () => void;
};
const HeaderWithoutTitle = ({
  onpress,
  header,
  right,
  onPressRight,
}: Props) => {
  const { themeData } = useAppSelector((state) => state.theme);

  return (
    <View
      style={[
        styles.body,
        { backgroundColor: themeData["background-secondary-2"] },
      ]}
    >
      <HeaderBack
        onPress={onpress}
        title={header}
        right={right}
        onPressRight={onPressRight}
      />
    </View>
  );
};

export default HeaderWithoutTitle;

const styles = StyleSheet.create({
  body: {
    height: height * 0.09,
    backgroundColor: "#fff",
    alignItems: "center",
    textTransform: "capitalize",
  },
  titleText1: {
    fontSize: 24,
    fontWeight: 600,
    marginBottom: 20,
    textTransform: "capitalize",
  },
  titleText2: {
    fontSize: 16,
  },
});
