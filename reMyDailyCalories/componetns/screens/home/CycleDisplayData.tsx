import { Dimensions, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useAppSelector } from "../../../hooks/storeHook";

const { width, height } = Dimensions.get("window");

type Props = {
  text1: string;
  text2: string;
  color: any;
};
const CycleDisplayData = ({ text1, text2, color }: Props) => {
  const { themeData } = useAppSelector((state) => state.theme);

  return (
    <View style={styles.packetTowpart}>
      <View style={{ width: width * 0.06, alignItems: "center" }}>
        <View
          style={[styles.packetTowpartView1, { borderColor: color }]}
        ></View>
      </View>
      <View style={{ width: width * 0.18, alignItems: "center" }}>
        <Text
          style={{
            color: themeData["text-primary"],
            fontSize: 12,
            fontWeight: 500,
          }}
        >
          {text1}{" "}
        </Text>
        <Text style={{ color: themeData["text-secondary"], fontSize: 10 }}>
          {text2}
        </Text>
      </View>
    </View>
  );
};

export default CycleDisplayData;

const styles = StyleSheet.create({
  packetTowpart: {
    flexDirection: "row",
    width: width * 0.4,
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    transform: [{ translateX: 12 }],

    // backgroundColor: "red"
  },

  packetTowpartView1: {
    width: width * 0.1,
    height: width * 0.1,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 4,
  },
});
