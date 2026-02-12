import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useAppSelector } from "../../hooks/storeHook";

type Props = {
  title: string;
  onPress: () => void;
  active: boolean;
  color?: any;
};
const TabBtn = ({ title, onPress, active, color }: Props) => {
  const { themeData } = useAppSelector((state) => state.theme);

  return (
    <TouchableOpacity onPress={onPress}>
      <Text
        style={[
          active
            ? color
              ? { color: color }
              : { color: themeData["background-primary"] }
            : { color: themeData["text-secondary"] },
          { backgroundColor: themeData["background-secondary"] },
          styles.text,
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default TabBtn;

const styles = StyleSheet.create({
  text: {
    fontSize: 12,
    textTransform: "capitalize",
    padding: 10,
    margin: 4,
    borderRadius: 12,
  },
});
