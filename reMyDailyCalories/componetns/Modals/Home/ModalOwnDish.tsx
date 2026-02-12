import { Modal, Dimensions, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { HeaderPages } from "../../screens/home";
import { Packet } from "../../common";
import { TabView } from "../../screens/home";
import { useAppDispatch, useAppSelector } from "../../../hooks/storeHook";
import { actGetMyDishs } from "../../../store/myDishExercise/myDishExerciseSlice";
import Toast from "react-native-toast-message";

const { width, height } = Dimensions.get("window");

const ModalOwnDish = ({ isOpen = false, setIsOpen, type }) => {
  const dispatch = useAppDispatch();
  const { themeData } = useAppSelector((state) => state.theme);
  const { lang, words } = useAppSelector((state) => state.lang);
  const [delayToast, setDelayToast] = useState(false);
  const { myDish } = useAppSelector((state) => state.myDishExercise);

  useEffect(() => {
    dispatch(actGetMyDishs())
      .unwrap()
      .then((res) => {})
      .catch((e) => {
        ErrorToast("There is a problem on the server");
      })
      .finally(() => {});
  }, [dispatch]);

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
        <View style={{ height: lang === "de" ? height * 0.2 : height * 0.18 }}>
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
            type={type ? type : "normal"}
          />
          <View style={{ position: "absolute", bottom: 0, zIndex: 400 }}>
            {delayToast ? <Toast /> : <></>}
          </View>
        </Packet>
      </View>
    </Modal>
  );
};

export default ModalOwnDish;

const styles = StyleSheet.create({
  body: {
    flex: 1,
    paddingTop: 30,
    // height: height,
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
