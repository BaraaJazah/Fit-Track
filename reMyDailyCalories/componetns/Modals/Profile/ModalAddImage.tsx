import {
  Dimensions,
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useCallback, useRef, useState } from "react";
import { plusWhite } from "../../../assets/icons/home";
import { useAppDispatch, useAppSelector } from "../../../hooks/storeHook";
import { foodIcon, getFoodIcon } from "../../../assets/icons/Foods/data";
import { getUsersIcon, usersIcon } from "../../../assets/icons/users/data";
import { actChangeImage, actSetUserImage } from "../../../store/auth/authSlice";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
const { width, height } = Dimensions.get("screen");

const ModalAddImage = ({ isOpen = false, isOpenFunc }) => {
  const { themeData } = useAppSelector((state) => state.theme);

  const dispatch = useAppDispatch();

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
      <View style={{ height }}>
        <Pressable
          onPress={isOpenFunc}
          style={{
            flex: 1,
            height: height * 0.3,
            width,
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
        ></Pressable>

        <GestureHandlerRootView
          style={{
            position: "absolute",
            bottom: 0,
            width,
            height: height * 0.8,
          }}
        >
          <BottomSheet
            ref={bottomSheetRef}
            index={2} // يجب تحديد مؤشر البداية
            snapPoints={[5, height * 0.7]} // يجب تحديد نقاط الالتقاط
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
              borderColor: themeData["background-secondary-2"],
              borderTopWidth: 2,
            }}
          >
            <BottomSheetScrollView
              style={[
                {
                  backgroundColor: themeData["background-secondary-2"],
                  width,
                },
              ]}
            >
              <View
                style={{
                  justifyContent: "center",
                  gap: 10,
                  flexDirection: "row",
                  flexWrap: "wrap",
                  marginVertical: 20,
                  paddingBottom: 30,
                }}
              >
                {usersIcon.map((item, index) => {
                  return (
                    <TouchableOpacity
                      onPress={() => {
                        dispatch(actSetUserImage(`${item}`));
                      }}
                      key={index}
                      style={{
                        backgroundColor: themeData["background-secondary"],
                        padding: 10,
                        borderRadius: 12,
                      }}
                    >
                      <Image
                        source={getUsersIcon(item)}
                        style={{ width: 100, height: 100, borderRadius: 5 }}
                      />
                    </TouchableOpacity>
                  );
                })}
              </View>
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
    paddingBottom: 40,
  },

  closeBtn: {
    backgroundColor: "red",
    borderRadius: 50,
    padding: 10,
    transform: [{ translateY: -18 }],
  },
});
