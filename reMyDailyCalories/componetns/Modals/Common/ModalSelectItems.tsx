import {
  Dimensions,
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { useAppSelector } from "../../../hooks/storeHook";

const { width, height } = Dimensions.get("screen");

const ModalSelectItems = ({
  isOpen,
  setIsOpen,
  dataArray = [],
  defualtIndex,
  setIndex,
}) => {
  const { themeData, themeName } = useAppSelector((state) => state.theme);
  const { lang, words } = useAppSelector((state) => state.lang);
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isOpen}
      onRequestClose={() => setIsOpen(false)}
      statusBarTranslucent={true}
      navigationBarTranslucent={true}
    >
      <Pressable style={styles.body} onPress={() => setIsOpen(false)}>
        <View
          style={[
            styles.cart,
            {
              backgroundColor: themeData["background-secondary-2"],
              borderColor: themeData["background-secondary"],
              direction: lang === "ar" ? "rtl" : "ltr",
            },
          ]}
        >
          {dataArray.map((item, index) => {
            return (
              <View key={index}>
                <TouchableOpacity
                  onPress={() => {
                    setIndex(index);
                    setIsOpen(false);
                  }}
                  style={[
                    styles.cartBtn,

                    index === defualtIndex && {
                      backgroundColor: themeData["background-secondary"],
                    },
                  ]}
                >
                  <View style={{ flexDirection: "row", gap: 10 }}>
                    <Image
                      source={item.icon}
                      style={{ width: 24, height: 24, marginLeft: 10 }}
                    />
                    <Text style={{ color: themeData["text-secondary"] }}>
                      {item.text}
                    </Text>
                  </View>
                </TouchableOpacity>
                {index !== dataArray.length - 1 && (
                  <View
                    style={{
                      borderBottomColor: themeData["background-secondary"],
                      borderBottomWidth: 2,
                    }}
                  ></View>
                )}
            </View>
            );
          })}
        </View>
      </Pressable>
    </Modal>
  );
};

export default ModalSelectItems;

const styles = StyleSheet.create({
  body: {
    height: height,
    width: width,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },

  cart: {
    borderRadius: 20,
    borderWidth: 3,
    // paddingVertical: 6,
  },
  cartBtn: {
    flexDirection: "row",
    width: width * 0.85,
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 10,
    marginVertical: 6,
    padding: 10,
    margin: 6,
  },
});
