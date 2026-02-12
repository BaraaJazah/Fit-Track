import {
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';

import React, { useState } from "react";
import { Btn, HeaderBack, Packet } from "../../common";
import Toast from "react-native-toast-message";
import { useAppDispatch, useAppSelector } from "../../../hooks/storeHook";
import { eyeOff } from "../../../assets/icons";
import { actSendSupportMsg } from "../../../store/userSetting/userSettingSlice";
import { VELOCITY_EPS } from "react-native-reanimated/lib/typescript/animation/decay/utils";

const { width, height } = Dimensions.get("window");

const ModalCustomerSupport = ({ isOpen, setIsOpen }) => {
  const { themeData } = useAppSelector((state) => state.theme);
  const { lang, words } = useAppSelector((state) => state.lang);
  const dispatch = useAppDispatch();
  const [supportMsg, setSupportMsg] = useState({
    subject: "",
    message: "",
  });

  const [delayToast, setDelayToast] = useState(false);

  const setUserPassword = (field, value) => {
    setSupportMsg({
      ...supportMsg,
      [field]: value,
    });
  };

  const sendMessage = () => {
    setDelayToast(true);
    if (supportMsg.subject.length > 40) {
      ErrorToast("Subject Field Must Be Less Than 40 Characters");
    } else if (
      supportMsg.subject.length === 0 ||
      supportMsg.message.length === 0
    ) {
      ErrorToast("Subject and Message Fields Are Required ");
    } else {
      dispatch(actSendSupportMsg(supportMsg))
        .unwrap()
        .then(() => {
          setSupportMsg({
            subject: "",
            message: "",
          });
          SuccessToast("Your message was sent successfully");
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
            {
              backgroundColor: themeData["background-secondary-2"],
              direction: lang === "ar" ? "rtl" : "ltr",
            },
          ]}
        >
          <View>
            <HeaderBack
              onPress={() => {
                setIsOpen(false);
              }}
              title={words.CustomerSupport}
            />
            <Packet
              packetStyle={{
                margin: "auto",
                marginVertical: 10,
                width: width * 0.94,
              }}
            >
              <View>
                <Text
                  style={[
                    styles.explaneMsg1,
                    { color: themeData["text-primary"] },
                  ]}
                >
                  {words.SupportMsg}
                </Text>
              </View>
            </Packet>
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
                style={{
                  width: width * 0.75,
                  color: "#999",
                }}
                onChangeText={(text) => {
                  setUserPassword("subject", text);
                }}
                value={supportMsg.subject}
                placeholder={words.Subject}
                placeholderTextColor={"#999"}
              />
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
                style={{
                  width: width * 0.75,
                  color: "#ccc",
                  minHeight: 240,
                  textAlignVertical: "top",
                }}
                onChangeText={(text) => {
                  setUserPassword("message", text);
                }}
                value={supportMsg.message}
                placeholderTextColor={"#999"}
                placeholder={words.Message}
                multiline
                numberOfLines={10} // just appear lines
              />
            </View>

            <Btn
              onPress={sendMessage}
              bgColor="background-primary"
              text={words.send}
              textColor="#ccc"
              btnStyle={{ width: width * 0.84, marginTop: 20 }}
              btnTextStyle={{ color: "#fff" }}
            />
          </View>

          <View
            style={{ position: "absolute", bottom: -20, width, zIndex: 400 }}
          >
            {delayToast ? <Toast /> : <></>}
          </View>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default ModalCustomerSupport;

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
  explaneMsg1: {
    fontSize: 14,
  },
});
