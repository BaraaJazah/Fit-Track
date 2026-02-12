import { Modal, Dimensions, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { HeaderPages } from "../../screens/home";
import { useRouter } from "expo-router";
import { Packet } from "../../common";
import { TabView } from "../../screens/home";
import { useAppDispatch, useAppSelector } from "../../../hooks/storeHook";
import { actGetMyDishs } from "../../../store/myDishExercise/myDishExerciseSlice";
import Toast from "react-native-toast-message";
import TabViewExercise from "../../screens/home/TabViewExercise";

const { width, height } = Dimensions.get("window");

const ModalOwnExercise = ({ isOpen = false, setIsOpen }) => {
  const { themeData } = useAppSelector((state) => state.theme);
  const [delayToast, setDelayToast] = useState(false);
  const dispatch = useAppDispatch();
  const { myDish, myExercise } = useAppSelector(
    (state) => state.myDishExercise
  );

  const SuccessToast = (item) => {
    setDelayToast(true);
    setTimeout(() => {
      let text = item.charAt(0).toUpperCase() + item.slice(1).toLowerCase();
      Toast.show({
        type: "success",
        text1: "Success",
        text2: `${text}`,
        position: "bottom",
      });
    }, 100);
  };

  const ErrorToast = (item) => {
    setDelayToast(true);
    setTimeout(() => {
      let text = item.charAt(0).toUpperCase() + item.slice(1).toLowerCase();
      Toast.show({
        type: "error",
        text1: "Error",
        text2: `${text}`,
        position: "bottom",
      });
    }, 100);
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isOpen}
      onRequestClose={() => setIsOpen(false)}
    >
      <View
        style={[
          styles.body,
          { backgroundColor: themeData["background-secondary-2"] },
        ]}
      >
        <View style={{ height: height * 0.16 }}>
          <HeaderPages
            onpress={() => {
              setIsOpen(false);
            }}
            header="My Own Exercises"
            title=""
            text="Embark on a journey of mindfulness with our Mindful Moments Meditation."
          />
        </View>

        <Packet
          packetStyle={[
            styles.packet,
            {
              borderColor: themeData["background-secondary"],
              paddingVertical: 0,
            },
          ]}
        >
          <TabViewExercise
            myExercise={myExercise}
            SuccessToast={SuccessToast}
            ErrorToast={ErrorToast}
            type={"Exercise"}
          />
          <View style={{ position: "absolute", bottom: 0, zIndex: 400 }}>
            {delayToast ? <Toast /> : <></>}
          </View>
        </Packet>
      </View>
    </Modal>
  );
};

export default ModalOwnExercise;

const styles = StyleSheet.create({
  body: {
    height: height,
    width: width,
    alignItems: "center",
  },
  packet: {
    borderWidth: 4,
    height: height * 0.8,
    alignItems: "center",
    padding: 8,
  },
});
