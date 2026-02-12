import {
  Button,
  Dimensions,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { useAppSelector } from "../../hooks/storeHook";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { FoodDetails } from "../common";
import { AnimatePresence, MotiView } from "moti";

const { width, height } = Dimensions.get("window");

const ModalShowDetails = ({ isOpen = false, isOpenFunc, data }) => {
  const { themeData } = useAppSelector((state) => state.theme);
  const { lang, words } = useAppSelector((state) => state.lang);
  const cameData = {
    name:
      lang === "ar"
        ? data.ArName || data.name
        : lang === "de"
        ? data.DeName || data.name
        : lang === "tr"
        ? data.TrName || data.name
        : data.EnName || data.name,

    kcal: parseFloat(data?.kcal).toFixed(0),
    protein: parseFloat(data?.protein).toFixed(0),
    carbs: parseFloat(data.carbs).toFixed(0),
    fats: parseFloat(data.fats).toFixed(0),
  };

  const bottomSheetRef = useRef<BottomSheet>(null);
  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    if (index < 1) {
      isOpenFunc(false);
    }
  }, []);

  const details = [
    {
      color: themeData["background-primary"],
      title: words.kcal,
      type: " kcal",
      value: Number(cameData.kcal),
    },
    {
      color: themeData["secondary-meal1"],
      title: words.protein,
      type: " g",
      value: Number(cameData.protein),
    },
    {
      color: themeData["secondary-meal3"],
      title: words.carbs,
      type: " g",
      value: Number(cameData.carbs),
    },
    {
      color: themeData["secondary-meal2"],
      title: words.fats,
      type: " g",
      value: Number(cameData.fats),
    },
  ];
  return (
    <>
      <Modal
        animationType="fade"
        transparent={true}
        visible={isOpen}
        onRequestClose={isOpenFunc}
        statusBarTranslucent={true}
        navigationBarTranslucent={true}
      >
        <Pressable
          onPress={isOpenFunc}
          style={{ flex: 1, width, backgroundColor: "rgba(0,0,0,0.5)" }}
        ></Pressable>
        <View
          style={{
            height: height * 0.6,
            width,
            position: "absolute",
            bottom: 0,
            direction: lang === "ar" ? "rtl" : "ltr",
          }}
        >
          <GestureHandlerRootView>
            <BottomSheet
              ref={bottomSheetRef}
              index={2} // يجب تحديد مؤشر البداية
              snapPoints={[5, height * 0.5]} // يجب تحديد نقاط الالتقاط
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
                  <View
                    style={{
                      gap: 20,
                      justifyContent: "center",
                      paddingBottom: 45,
                    }}
                  >
                    <View>
                      <Text
                        style={{
                          fontSize: 22,
                          color: themeData["text-primary"],
                          textTransform: "capitalize",
                        }}
                      >
                        {cameData.name}
                      </Text>
                    </View>

                    <AnimatePresence>
                      {details.map((item, index) => (
                        <MotiView
                          key={item.title}
                          from={{ opacity: 0, translateY: 20 }} // يبدأ من فوق
                          animate={{ opacity: 1, translateY: 0 }}
                          transition={{
                            type: "timing",
                            duration: 600,
                            delay: index * 300, // كل عنصر يظهر بعد 0.2s عن السابق
                          }}
                        >
                          <FoodDetails
                            color={item.color}
                            title={item.title}
                            type={item.type}
                            value={item.value}
                          />
                        </MotiView>
                      ))}
                    </AnimatePresence>
                  </View>
                </View>
              </BottomSheetScrollView>
            </BottomSheet>
          </GestureHandlerRootView>
        </View>
      </Modal>
    </>
  );
};

export default ModalShowDetails;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0,0.4)",
  },
  modalView: {
    width: width,
    alignItems: "center",
    paddingBottom: 20,
  },

  closeBtn: {
    backgroundColor: "red",
    borderRadius: 10,
    padding: 6,
    transform: [{ translateY: -18 }],
  },

  container: {
    flex: 1,
    backgroundColor: "grey",
  },
  contentContainer: {
    flex: 1,
    padding: 36,
    alignItems: "center",
  },
});
