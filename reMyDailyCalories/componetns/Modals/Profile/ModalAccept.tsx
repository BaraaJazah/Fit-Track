import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Pressable,
  Modal,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/storeHook";
import * as SystemUI from "expo-system-ui";

import { actChangeName } from "../../../store/auth/authSlice";
import Toast from "react-native-toast-message";

const { width, height } = Dimensions.get("screen");

const ModalAccept = ({ isOpen, setIsOpen, active, text }) => {
  const { themeData, themeName } = useAppSelector((state) => state.theme);
  const { words } = useAppSelector((state) => state.lang);

  const dispatch = useAppDispatch();

  const [openNameEditor, setOpenNameEditor] = useState(false);
  const [newName, setNewName] = useState("");
  const [delayToast, setDelayToast] = useState(false);

  const changeNameHandler = () => {
    setDelayToast(true);
    if (newName === "") {
      ErrorToast("Please Enter Invite Code");
    } else if (newName.length > 20) {
      ErrorToast("Your Name Must Be Less Than 20 Characters");
    } else {
      dispatch(actChangeName({ name: newName }))
        .unwrap()
        .then(() => {
          setOpenNameEditor(false);
          setNewName("");
          //   TODO make loading modal
        })
        .catch((e) => {
          ErrorToast("Invite Code Is Wrong");
        });
    }
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

  useEffect(() => {
    SystemUI.setBackgroundColorAsync(themeData["background-secondary-2"]); // غيّر اللون حسب التصميم
  }, [themeData]);

  return (
    <Modal
      visible={isOpen}
      transparent={true}
      animationType="fade"
      onRequestClose={() => {
        setIsOpen(false);
      }}
      statusBarTranslucent={true}
      navigationBarTranslucent={true}
    >
      <Pressable
        onPress={() => {
          setIsOpen(false);
        }}
        style={{
          height: height,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(0,0,0,0.5)",
        }}
      >
        <Pressable
          style={[
            styles.accountBox,
            {
              backgroundColor: themeData["background-secondary"],
              padding: 20,
            },
          ]}
        >
          <View style={[styles.accountBoxTexts, { flexDirection: "column" }]}>
            <Text style={{ fontSize: 30, paddingBottom: 20 }}> ⚠️ </Text>
            <Text
              style={{
                fontSize: 14,
                fontWeight: 600,
                color: themeData["text-primary"],
                textAlign: "center",
              }}
            >
              {text}
            </Text>
            <View style={{ width: width * 0.65, marginVertical: 16 }}></View>
            <View style={{ flexDirection: "row", gap: 10 }}>
              <TouchableOpacity
                onPress={() => {
                  setIsOpen(false);
                }}
                style={{
                  padding: 12,
                  paddingHorizontal: 10,
                  backgroundColor: themeData["background-primary"],
                  borderRadius: 10,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 90,
                }}
              >
                <Text style={{ color: "#fff", fontSize: 12 }}>
                  {words.cancel}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  active();
                  setIsOpen(false);
                }}
                style={{
                  padding: 12,
                  paddingHorizontal: 10,
                  backgroundColor: themeData["background-primary"],
                  borderRadius: 10,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 90,
                }}
              >
                <Text style={{ color: "#fff", fontSize: 12 }}>{words.ok}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Pressable>
      </Pressable>
      <View style={{ position: "absolute", bottom: 0, width, zIndex: 400 }}>
        {delayToast ? <Toast /> : <></>}
      </View>
    </Modal>
  );
};

export default ModalAccept;

const styles = StyleSheet.create({
  accountBox: {
    padding: 16,
    width: width * 0.9,
    flexDirection: "row",
    paddingHorizontal: 20,
    gap: 10,
    borderRadius: 14,
    alignItems: "center",
  },
  accountBoxTexts: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
