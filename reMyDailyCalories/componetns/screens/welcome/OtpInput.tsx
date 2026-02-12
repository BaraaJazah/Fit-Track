import { Dimensions, StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import { useAppSelector } from "../../../hooks/storeHook";

const { width, height } = Dimensions.get("window");

const OtpInput = () => {
  const { themeData } = useAppSelector((state) => state.theme);

  return (
    <View style={styles.body}>
      <TextInput
        style={[styles.input, { color: themeData["text-primary"] }]}
        textAlign="center"
        autoCapitalize={"none"}
        maxLength={1}
        keyboardType="numeric" // لضمان إدخال أرقام فقط
      />
    </View>
  );
};

export default OtpInput;

const styles = StyleSheet.create({
  body: {
    width: width * 0.18,
    height: width * 0.18,
    // backgroundColor: "red",
    boxShadow: " 2px 4px 6px rgba(0, 0, 0, 0.1)",
    borderColor: "#eee",
    borderWidth: 1,
  },
  input: {
    width: width * 0.18,
    height: width * 0.18,
    fontSize: 24,
    fontWeight: 600,
  },
});
