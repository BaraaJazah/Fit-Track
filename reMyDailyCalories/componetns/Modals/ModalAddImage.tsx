import {
  Dimensions,
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useCallback, useRef, useState } from "react";
import { plusWhite } from "../../assets/icons/home";
import { useAppSelector } from "../../hooks/storeHook";
import { foodIcon, getFoodIcon } from "../../assets/icons/Foods/data";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const { width, height } = Dimensions.get("screen");

const ModalAddImage = ({ isOpen = false, isOpenFunc, setFoodImage }) => {
  const { themeData } = useAppSelector((state) => state.theme);
  const bottomSheetRef = useRef<BottomSheet>(null);
  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    if (index < 1) {
      isOpenFunc(false);
    }
  }, []);
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isOpen}
      onRequestClose={() => {
        isOpenFunc(false);
      }}
      statusBarTranslucent={true}
      navigationBarTranslucent={true}
    >
      <Pressable
        onPress={isOpenFunc}
        style={{ height, width, backgroundColor: "rgba(0,0,0,0.5)" }}
      ></Pressable>
      <View
        style={{
          height: height * 0.65,
          width,
          position: "absolute",
          bottom: -30,
        }}
      >
        <GestureHandlerRootView>
          <BottomSheet
            ref={bottomSheetRef}
            index={2} // يجب تحديد مؤشر البداية
            snapPoints={[5, height * 0.6]} // يجب تحديد نقاط الالتقاط
            onChange={handleSheetChanges}
            handleIndicatorStyle={{
              backgroundColor: "gray", // لون الخط
              width: 60, // عرض الخط
              height: 4, // ارتفاع الخط
              borderRadius: 10, // تدوير الأطراف
              marginVertical: 2, // المسافة من الأعلى
              marginTop: 4,
            }}
            backgroundStyle={{
              backgroundColor: themeData["background-secondary"], // لون الخلفية
              borderTopLeftRadius: 20, // تدوير الزوايا
              borderTopRightRadius: 20,
              borderColor: themeData["background-secondary-2"],
              borderTopWidth: 2,
            }}
          >
            <BottomSheetScrollView
              style={[
                {
                  backgroundColor: themeData["background-secondary-2"],
                  width,
                  height: height * 0.7,
                },
              ]}
            >
              <ScrollView
                contentContainerStyle={{
                  justifyContent: "center",
                  gap: 10,
                  flexDirection: "row",
                  flexWrap: "wrap",
                  marginVertical: 20,
                  paddingBottom: 30,
                }} // when use it the scroll will don't move
                fadingEdgeLength={20}
                showsVerticalScrollIndicator={false}
              >
                {foodIcon.map((item, index) => {
                  return (
                    <TouchableOpacity
                      onPress={() => {
                        setFoodImage(`${item}`);
                      }}
                      key={index}
                      style={{
                        backgroundColor: themeData["background-secondary"],
                        padding: 16,
                        borderRadius: 12,
                      }}
                    >
                      <Image
                        source={getFoodIcon(item)}
                        style={{ width: 55, height: 55 }}
                      />
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            </BottomSheetScrollView>
          </BottomSheet>
        </GestureHandlerRootView>
      </View>
    </Modal>
  );
};

export default ModalAddImage;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    height,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0,0.4)",
  },
  modalView: {
    minHeight: height * 0.3,
    maxHeight: height * 0.6,
    width: width,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    alignItems: "center",
    paddingBottom: 50,
  },

  closeBtn: {
    backgroundColor: "red",
    borderRadius: 50,
    padding: 10,
    transform: [{ translateY: -18 }],
  },
});
