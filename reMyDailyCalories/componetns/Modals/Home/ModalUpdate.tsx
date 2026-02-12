import {
  ActivityIndicator,
  Dimensions,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform,
  Linking,
} from "react-native";
import React from "react";
import { useAppSelector } from "../../../hooks/storeHook";
import { Btn } from "../../common";

const { width, height } = Dimensions.get("screen");

const ModalUpdate = ({ isOpen, setIsOpen }) => {
  const { themeData } = useAppSelector((state) => state.theme);

  return (
    <Modal visible={isOpen} animationType="fade" transparent={true}>
      <View style={styles.container}>
        <View
          style={[
            styles.body,
            {
              backgroundColor: themeData["background-secondary"],
            },
          ]}
        >
          <View style={styles.bodyTextView}>
            <Text
              style={[
                styles.bodyText,
                {
                  color: themeData["background-primary"],
                  textAlign: "center",
                  padding: 6,
                },
              ]}
            >
              A new update is available.
            </Text>
            <Text
              style={[
                styles.bodyText,
                { color: themeData["text-primary"], textAlign: "center" },
              ]}
            >
              Please update the app for the best experience.{" "}
            </Text>
          </View>

          <Btn
            text="Update"
            bgColor={"background-primary"}
            onPress={() => {
              Linking.openURL(
                "https://play.google.com/store/apps/details?id=com.openai.chatgpt"
              );
            }}
            btnStyle={{ opacity: 0.8 }}
            textColor={"#eee"}
            btnTextStyle={{ color: "#eee" }}
          />
        </View>
      </View>
    </Modal>
  );
};

export default ModalUpdate;

const styles = StyleSheet.create({
  container: {
    width,
    height,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  body: {
    backgroundColor: "rgba(255, 255, 255,0.2)",
    width: width * 0.8,
    height: 200,
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
    borderRadius: 12,
  },
  bodyTextView: {
    marginBottom: 10,
    padding: 10,
  },
  bodyText: {
    fontSize: 16,
    fontWeight: 600,
  },
});
