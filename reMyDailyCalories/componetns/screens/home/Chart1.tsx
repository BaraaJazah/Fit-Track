import { Dimensions, StyleSheet, Text, View } from "react-native";
import React, { useCallback, useRef, useState } from "react";
import { PieChart } from "react-native-gifted-charts";
import Toast from "react-native-toast-message";
import { useAppSelector } from "../../../hooks/storeHook";
import { LinearGradient } from "react-native-svg";

const { width, height } = Dimensions.get("window");

const Chart1 = ({ userData }) => {
  const { themeData } = useAppSelector((state) => state.theme);
  const { lang, words } = useAppSelector((state) => state.lang);

  let pieData = [
    {
      value:
        userData?.kcalGoal - userData?.kcal + userData?.burn < 0
          ? 0
          : userData?.kcalGoal - userData?.kcal + userData?.burn,
      color: themeData["background-secondary-3"],
      label: "avaliable",
      // gradientCenterColor: themeData["background-secondary-3"],
      focused: true,
    },
    {
      value: userData?.burn,
      color: themeData["secondary-meal3"],

      label: "burn",
    },
    {
      value: userData?.kcal,
      color: themeData["background-primary"],
      label: "kcal",
    },
  ];

  if (
    userData?.kcalGoal === 0 &&
    userData?.burn === 0 &&
    userData?.kcal === 0
  ) {
    pieData = [
      {
        value: 1,
        color: themeData["background-secondary-3"],
        label: "avaliable",
        focused: true,
      },
      { value: 1, color: themeData["secondary-meal3"], label: "burn" },
      { value: 1, color: themeData["background-primary"], label: "kcal" },
    ];
  }

  const showToast = (item) => {
    let type = "success";
    let text1;
    let text2;

    if (item.label === "avaliable") {
      type = "info";
      text1 = `Kcal Avaliable`;
      text2 = `You Have ${item.value?.toFixed(0)} Kcal Avaliable`;
    } else if (item.label === "burn") {
      type = "error";
      text1 = `Kcal Burn`;
      text2 = `You Burned ${item.value?.toFixed(0)} Kcal Today`;
    } else if (item.label === "kcal") {
      type = "success";
      text1 = `Kcal Earn`;
      text2 = `You Earn ${item.value?.toFixed(0)} Kcal Today`;
    }
    Toast.show({
      type: type,
      text1: text1,
      text2: text2,
      position: "bottom",
    });
  };

  return (
    <View style={{ alignItems: "center" }}>
      <PieChart
        data={pieData}
        donut
        focusOnPress
        sectionAutoFocus
        radius={80}
        innerRadius={40}
        innerCircleColor={themeData["background-secondary-2"]}
        onPress={(item) => {
          showToast(item);
        }}
        centerLabelComponent={({ index }) => {
          return (
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <Text
                style={{ fontSize: 16, color: "white", fontWeight: "bold" }}
              >
                {userData?.kcalGoal - userData?.kcal + userData?.burn < 0
                  ? 0
                  : (
                      userData?.kcalGoal -
                      userData?.kcal +
                      userData?.burn
                    ).toFixed(0)}
              </Text>
              <Text style={{ fontSize: 10, color: "white" }}>
                {words.available}
              </Text>
            </View>
          );
        }}
      />

      <View
        style={{
          position: "absolute",
          top: height - 155,
          zIndex: 400,
          transform: [{ translateX: 10 }],
        }}
      >
        <Toast />
      </View>
    </View>
  );
};

export default Chart1;

const styles = StyleSheet.create({});
