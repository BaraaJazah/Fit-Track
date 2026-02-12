import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useAppSelector } from "../../hooks/storeHook";

type Props = {
  text1: string;
  text2: string;
  text3?: string;
  styleBtn?: any;
  textsBtn?: any;
  onPress?: () => void;
};
const ColorText = ({
  text1,
  text2,
  styleBtn = {},
  textsBtn = {},
  onPress,
  text3,
}: Props) => {
  const { themeData } = useAppSelector((state) => state.theme);
  return (
    <View
      style={[{ flexDirection: "row", gap: 2, marginHorizontal: 10 }, styleBtn]}
    >
      <Text
        style={[styles.text1, { color: themeData["text-secondary"] }, textsBtn]}
      >
        {text1}
      </Text>

      <TouchableOpacity onPress={onPress}>
        <Text
          style={[
            styles.text2,
            { color: themeData["background-primary"] },
            textsBtn,
          ]}
        >
          {text2}
        </Text>
      </TouchableOpacity>
      {text3 ? (
        <Text style={[styles.text1, { color: themeData["text-secondary"] }]}>
          {text3}
        </Text>
      ) : (
        <></>
      )}
    </View>
  );
};

export default ColorText;

const styles = StyleSheet.create({
  text1: {
    fontSize: 14,
    textTransform: "capitalize",
  },
  text2: {
    fontSize: 14,
    textTransform: "capitalize",
  },
  text3: {
    fontSize: 14,
    textTransform: "capitalize",
  },
});
