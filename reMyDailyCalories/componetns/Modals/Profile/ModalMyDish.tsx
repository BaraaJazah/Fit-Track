import {
  Button,
  Dimensions,
  StyleSheet,
  Text,
  View,
  Modal,
} from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';

import React, { useRef, useState } from "react";
import { HeaderPages } from "../../../componetns/screens/home";
import { useRouter } from "expo-router";
import { Packet } from "../../../componetns/common";
import { TabView } from "../../../componetns/screens/home";
import { useAppSelector } from "../../../hooks/storeHook";
import Toast from "react-native-toast-message";

const { width, height } = Dimensions.get("screen");

const ModalMyDish = ({ isOpen = false, setIsOpen }) => {
  const router = useRouter();
  const ref = useRef(0);
  const { themeData } = useAppSelector((state) => state.theme);
  const { myDish } = useAppSelector((state) => state.myDishExercise);
  const { lang, words } = useAppSelector((state) => state.lang);
  const [delayToast, setDelayToast] = useState(false);

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
      statusBarTranslucent={true}
      navigationBarTranslucent={true}
    >
      <View
        style={[
          styles.body,
          { backgroundColor: themeData["background-secondary-2"] },
        ]}
      >
      <View style={{ height: height * 0.18 }}>
          <HeaderPages
            onpress={() => {
              setIsOpen(false);
            }}
            header={words.MyOwnDishesTitle}
            title="My Own Dishes"
            text={words.MyOwnDishesDesc}
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
          <TabView
            myDish={myDish}
            SuccessToast={SuccessToast}
            ErrorToast={ErrorToast}
          />
          <View style={{ position: "absolute", bottom: 0, zIndex: 400 }}>
            {delayToast ? <Toast /> : <></>}
          </View>
        </Packet>
      </View>
    </Modal>
  );
};

export default ModalMyDish;

const styles = StyleSheet.create({
  body: {
    paddingTop: 30,
    height: height,
    width: width,
    alignItems: "center",
  },
  packet: {
    borderWidth: 4,
    height: height * 0.76,
    padding: 8,
    alignItems: "center",
  },
});
