import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { useAppSelector } from "../../hooks/storeHook";
import { LinearGradient } from "expo-linear-gradient";
import { API_URL } from "@env";
import { food14, food16 } from "../../assets/icons/Foods";
import { chef } from "../../assets/icons";

type Props = {
  title: string;
  onPress: () => void;
  active: boolean;
  image?: string;
};

const { width } = Dimensions.get("window");

const AddFoodTabBtn = ({ image, title, onPress, active }: Props) => {
  const { themeData } = useAppSelector((state) => state.theme);

  return (
    <TouchableOpacity onPress={onPress} style={[styles.btn]}>
      <LinearGradient
        start={{ x: 1, y: 0.5 }}
        end={{ x: 0.5, y: 1.0 }}
        colors={
          active
            ? [
                themeData["background-secondary"] || "#242E3C",
                themeData["background-secondary"] || "#242E3C",
                themeData["background-primary"] || "#31D6D6",
              ]
            : [
                themeData["background-secondary"] || "#242E3C",
                themeData["background-secondary"] || "#242E3C",
              ]
        }
        style={[
          {
            backgroundColor: themeData["background-secondary"] || "#242E3C",
            padding: 10,
            borderRadius: 10,
          },
        ]}
      >
        {image ? (
          <Image
            src={`${API_URL}/build/assets/${image}`}
            resizeMode="cover"
            style={{ width: 50, height: 50, borderRadius: 10 }}
          />
        ) : (
          <Image
            source={chef}
            resizeMode="cover"
            style={{ width: 50, height: 50, borderRadius: 10 }}
          />
        )}
      </LinearGradient>

      <Text
        style={[
          active
            ? {
                color: themeData["background-primary"],
              }
            : {
                color: themeData["text-secondary"],
              },

          styles.text,
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default AddFoodTabBtn;

const styles = StyleSheet.create({
  btn: {
    marginHorizontal: 0,
    paddingHorizontal: 4,
    // justifyContent: "center",
    alignItems: "center",
    width: width * 0.3,
    height: 190,
  },
  text: {
    fontSize: 11,
    textTransform: "capitalize",
    padding: 8,
    borderRadius: 12,
    fontWeight: 600,
    textAlign: "center",
  },
});
