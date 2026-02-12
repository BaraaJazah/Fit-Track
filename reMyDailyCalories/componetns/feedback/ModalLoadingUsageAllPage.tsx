import {
  Dimensions,
  Modal,
  StyleSheet,
  Text,
  View,
  Linking,
} from "react-native";
import React from "react";
import { useAppSelector } from "../../hooks/storeHook";
import LottieFile from "../../constants/loffieFile/LottieFile";
import { SafeAreaView } from "react-native-safe-area-context";

const { width, height } = Dimensions.get("screen");

const ModalLoadingUsageAllPage = ({ isOpen, text }) => {
  const { themeData } = useAppSelector((state) => state.theme);

  //   ModalUpdate
  // الصفحات التي تاخد هي الصفحه

  return (
    <Modal
      visible={isOpen}
      animationType="fade"
      transparent={true}
      statusBarTranslucent={true}
      navigationBarTranslucent={true}
    >
      <View style={styles.container}>
        <LottieFile lottieName="loading" lottieHeigh={150} lottieWidth={150} />
      </View>
    </Modal>
  );
};

export default ModalLoadingUsageAllPage;

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
  },
  bodyText: {
    fontSize: 14,
    fontWeight: 600,
    paddingBottom: 20,
  },
});
