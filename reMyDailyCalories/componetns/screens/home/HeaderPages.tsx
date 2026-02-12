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
  title?: string;
  text: string;
  right?: boolean;
  onPressRight?: () => void;
};
const HeaderPages = ({
  onpress,
  header,
  title,
  text,
  right,
  onPressRight,
}: Props) => {
  const { themeData } = useAppSelector((state) => state.theme);
  const { lang, words } = useAppSelector((state) => state.lang);
  return (
    <View
      style={[
        styles.body,
        {
          backgroundColor: themeData["background-secondary-2"],
        },
      ]}
    >
      <HeaderBack
        onPress={onpress}
        title={header}
        right={right}
        onPressRight={onPressRight}
      />
      <Packet
        packetStyle={{
          paddingVertical: 10,
        }}
      >
        <Text
          style={[
            styles.titleText2,
            {
              color: themeData["text-secondary"],
              direction: lang === "ar" ? "rtl" : "ltr",
            },
          ]}
        >
          {text}
        </Text>
      </Packet>
    </View>
  );
};

export default HeaderPages;

const styles = StyleSheet.create({
  body: {
    height: height * 0.14,
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
