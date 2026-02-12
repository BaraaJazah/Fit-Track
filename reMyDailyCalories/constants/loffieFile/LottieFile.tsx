import { Dimensions, StyleSheet, Text, View } from "react-native";
import React from "react";
import LottieView from "lottie-react-native";
import {
  lottie_cooking,
  lottie_foodExplane,
  lottie_foodWhatWeEat,
  lottie_Error,
  lottie_success,
  lottie_EmptyBox,
  lottie_404Error,
  lottie_BookFood,
  lottie_love,
  lottie_exercise,
  loading,
  notFoundBier,
  nodataRobot,
} from ".";

const { width, height } = Dimensions.get("window");
const size = {
  width: width * 0.8,
  height: 350,
};

type Props = {
  lottieName:
    | "lottie_cooking"
    | "lottie_foodExplane"
    | "lottie_foodWhatWeEat"
    | "lottie_Error"
    | "lottie_success"
    | "lottie_EmptyBox"
    | "lottie_404Error"
    | "lottie_BookFood"
    | "lottie_love"
    | "lottie_exercise"
    | "loading"
    | "lottie_nodataRobot"
    | "notFoundBier";

  lottieWidth: number;
  lottieHeigh: number;
  loop?: boolean;
  speed?: number;
};

const LottieFile = ({
  lottieName,
  lottieWidth,
  lottieHeigh,
  loop = true,
  speed = 1,
}: Props) => {
  const getLottieFile = () => {
    if (lottieName === "lottie_cooking") return lottie_cooking;
    if (lottieName === "lottie_foodExplane") return lottie_foodExplane;
    if (lottieName === "lottie_foodWhatWeEat") return lottie_foodWhatWeEat;
    if (lottieName === "lottie_Error") return lottie_EmptyBox;
    if (lottieName === "lottie_success") return lottie_success;
    if (lottieName === "lottie_BookFood") return lottie_BookFood;
    if (lottieName === "lottie_404Error") return lottie_404Error;
    if (lottieName === "lottie_EmptyBox") return lottie_EmptyBox;
    if (lottieName === "lottie_exercise") return lottie_exercise;
    if (lottieName === "lottie_love") return lottie_love;
    if (lottieName === "loading") return loading;
    if (lottieName === "notFoundBier") return notFoundBier;
    if (lottieName === "lottie_nodataRobot") return nodataRobot;
  };

  return (
    <View>
      {/* <Text style={{ color: "#fff", fontSize: 24 }}> lottie_EmptyBox </Text> */}
      <LottieView // For Lottie File
        source={getLottieFile()}
        style={{
          height: lottieHeigh,
          width: lottieWidth,
        }}
        autoPlay
        loop={loop}
        speed={speed} // defualt (-1 => reverse)  (2 => speed * 2  ) (0.5 => speed * 0.5 )
      />
    </View>
  );
};

export default LottieFile;

const styles = StyleSheet.create({});
