import {
  StyleSheet,
  View,
  Dimensions,
  Image,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Modal,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from 'react-native-safe-area-context';

import { Btn, HeaderBack } from "../../common";
import { useAppDispatch, useAppSelector } from "../../../hooks/storeHook";
import { eye, eyeOff } from "../../../assets/icons";
import Toast from "react-native-toast-message";
import { actChangePassword } from "../../../store/auth/authSlice";
const { width, height } = Dimensions.get("window");

const ModalChangePass = ({ isOpen, setIsOpen }) => {
  const { themeData } = useAppSelector((state) => state.theme);
  const { lang, words } = useAppSelector((state) => state.lang);
  const dispatch = useAppDispatch();
  const [openNameEditor, setOpenNameEditor] = useState(false);
  const [newPassword, setnewPassword] = useState({
    currentPasswd: "",
    password: "",
    confirm_password: "",
  });

  const [delayToast, setDelayToast] = useState(false);
  const [eyeState, setEyeState] = useState({
    currentPasswd: false,
    password: false,
    confirm_password: false,
  });

  const setUserEyeState = (field, value) => {
    setEyeState({
      ...eyeState,
      [field]: value,
    });
  };

  const setUserPassword = (field, value) => {
    setnewPassword({
      ...newPassword,
      [field]: value,
    });
  };

  const changePasswordHandler = () => {
    setDelayToast(true);
    if (newPassword.currentPasswd.length > 20) {
      ErrorToast(
        "Current Password Is Required & Must Be Less Than 20 Characters"
      );
    } else if (newPassword.password.length > 20) {
      ErrorToast("Password Is Required & Must Be Less Than 20 Characters");
    } else if (newPassword.confirm_password !== newPassword.password) {
      ErrorToast("Password and Confirm Password Must Be Same");
    } else {
      dispatch(actChangePassword(newPassword))
        .unwrap()
        .then(() => {
          setnewPassword({
            currentPasswd: "",
            password: "",
            confirm_password: "",
          });
          //   TODO make loading modal and funny
        })
        .catch((e) => {
          ErrorToast(e);
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

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isOpen}
      onRequestClose={() => setIsOpen(false)}
      statusBarTranslucent={true}
      navigationBarTranslucent={true}
    >
      <KeyboardAvoidingView style={{ flex: 1 }}>
        <SafeAreaView
          style={[
            styles.container,
            { backgroundColor: themeData["background-secondary-2"] },
          ]}
        >
          <View>
            <HeaderBack
              onPress={() => {
                setIsOpen(false);
              }}
              title={words["change password"]}
            />
          </View>

          <View style={{ marginVertical: 10 }}>
            <View
              style={[
                styles.input,
                {
                  borderColor: themeData["background-secondary"],
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                },
              ]}
            >
              <TextInput
                style={{ width: "90%", color: "#999" }}
                onChangeText={(text) => {
                  setUserPassword("currentPasswd", text);
                }}
                value={newPassword.currentPasswd}
                placeholder={words.CurrentPassword}
                placeholderTextColor={"#999"}
                secureTextEntry={!eyeState.currentPasswd}
              />
              <TouchableOpacity
                onPress={() => {
                  setUserEyeState("currentPasswd", !eyeState.currentPasswd);
                }}
              >
                <Image
                  style={styles.eyeIcon}
                  source={eyeState.currentPasswd === false ? eyeOff : eye}
                />
              </TouchableOpacity>
            </View>

            <View
              style={[
                styles.input,
                {
                  borderColor: themeData["background-secondary"],
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                },
              ]}
            >
              <TextInput
                style={{ width: "90%", color: "#ccc" }}
                onChangeText={(text) => {
                  setUserPassword("password", text);
                }}
                value={newPassword.password}
                placeholder={words.NewPassword}
                placeholderTextColor={"#999"}
                secureTextEntry={!eyeState.password}
              />
              <TouchableOpacity
                onPress={() => {
                  setUserEyeState("password", !eyeState.password);
                }}
              >
                <Image
                  style={styles.eyeIcon}
                  source={eyeState.password === false ? eyeOff : eye}
                />
              </TouchableOpacity>
            </View>

            <View
              style={[
                styles.input,
                {
                  borderColor: themeData["background-secondary"],
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                },
              ]}
            >
              <TextInput
                style={{ width: "90%", color: "#ccc" }}
                onChangeText={(text) => {
                  setUserPassword("confirm_password", text);
                }}
                value={newPassword.confirm_password}
                placeholderTextColor={"#999"}
                placeholder={words.ConfirmNewPassword}
                secureTextEntry={!eyeState.confirm_password}
              />
              <TouchableOpacity
                onPress={() => {
                  setUserEyeState(
                    "confirm_password",
                    !eyeState.confirm_password
                  );
                }}
              >
                <Image
                  style={styles.eyeIcon}
                  source={eyeState.confirm_password === false ? eyeOff : eye}
                />
              </TouchableOpacity>
            </View>

            <Btn
              onPress={changePasswordHandler}
              bgColor="background-primary"
              text={words.Save}
              textColor="#ccc"
              btnStyle={{ width: width * 0.84, marginTop: 20 }}
              btnTextStyle={{ color: "#fff" }}
            />
          </View>

          <View style={{ position: "absolute", bottom: 0, width, zIndex: 400 }}>
            {delayToast ? <Toast /> : <></>}
          </View>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default ModalChangePass;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width,
    height,
    alignItems: "center",
    marginTop: 40,
  },

  image: {
    width: 140,
    height: 140,
    borderRadius: 70,
  },
  titleText1: {
    fontSize: 22,
    fontWeight: 600,
  },
  titleText2: {
    fontSize: 14,
  },
  input: {
    width: width * 0.84,
    borderRadius: 12,
    borderWidth: 2,
    padding: 4,
    paddingHorizontal: 16,
    marginVertical: 10,
  },
  eyeIcon: {
    width: 22,
    height: 22,
  },
});
