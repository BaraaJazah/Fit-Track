import {
  Dimensions,
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useCallback, useRef, useState } from "react";
import { useAppSelector } from "../../../hooks/storeHook";
import { ExerciseDetails } from "../../common";
import { calcBurnForExercise } from "../../../hooks/calcBurnForExercise";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { AnimatePresence, MotiView } from "moti";

const { width, height } = Dimensions.get("window");

const ModalExersiceMiniDetails = ({ isOpen = false, isOpenFunc, data }) => {
  const { themeData } = useAppSelector((state) => state.theme);
  const { userData } = useAppSelector((state) => state.goal);
  const { words, lang } = useAppSelector((state) => state.lang);
  const weight = userData.userData.weight === 0 ? 70 : userData.userData.weight;

  const bottomSheetRef = useRef<BottomSheet>(null);
  // callbacks

  const exercises = [
    { color: themeData["secondary-meal2"], minutes: 60 },
    { color: themeData["secondary-meal3"], minutes: 30 },
    { color: themeData["secondary-meal1"], minutes: 15 },
    { color: themeData["background-primary"], minutes: 5 },
  ];

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
              borderTopLeftRadius: 20, // تدوير الزوايا
              borderTopRightRadius: 20,
              borderColor: themeData["background-secondary-2"],
              borderTopWidth: 2,
            }}
          >
            <BottomSheetScrollView
              style={[
                {
                  backgroundColor: themeData["background-secondary"],
                  width,
                },
              ]}
            >
              <View
                style={{
                  height: height * 0.5,
                  backgroundColor: themeData["background-secondary-2"],
                  width: width,
                  alignItems: "center",
                  justifyContent: "center",
                  direction: lang === "ar" ? "rtl" : "ltr",
                }}
              >
                <View
                  style={{
                    flex: 1,
                    width: width * 0.8,
                    justifyContent: "space-evenly",
                  }}
                >
                  <View
                    style={{
                      justifyContent: "space-between",
                      alignItems: "center",
                      flexDirection: "row",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 18,
                        fontWeight: 600,
                        color: themeData["text-primary"],
                        textTransform: "capitalize",
                      }}
                    >
                      {lang === "ar"
                        ? data.ArName
                        : lang === "de"
                        ? data.DeName
                        : lang === "tr"
                        ? data.TrName
                        : data.EnName}
                    </Text>
                  </View>

                  {/* <View
                    style={{
                      gap: 20,
                      paddingVertical: 10,
                      alignItems: "center",
                    }}
                  >
                    <ExerciseDetails
                      color={themeData["secondary-meal2"]}
                      title={`Burn ${calcBurnForExercise(
                        weight,
                        60,
                        data?.met
                      )} Kcal`}
                      type="Minutes"
                      value={60 as any}
                    />

                    <ExerciseDetails
                      color={themeData["secondary-meal3"]}
                      title={`Burn ${calcBurnForExercise(
                        weight,
                        30,
                        data?.met
                      )} Kcal`}
                      type="Minutes"
                      value={30 as any}
                    />
                    <ExerciseDetails
                      color={themeData["secondary-meal1"]}
                      title={`Burn ${calcBurnForExercise(
                        weight,
                        15,
                        data?.met
                      )} Kcal`}
                      type="Minutes"
                      value={15 as any}
                    />

                    <ExerciseDetails
                      color={themeData["background-primary"]}
                      title={`Burn ${calcBurnForExercise(
                        weight,
                        5,
                        data?.met
                      )} Kcal`}
                      type="Minutes"
                      value={5 as any}
                    />
                  </View> */}

                  <View
                    style={{
                      gap: 20,
                      paddingVertical: 10,
                      alignItems: "center",
                    }}
                  >
                    <AnimatePresence>
                      {exercises.map((item, index) => (
                        <MotiView
                          key={item.minutes}
                          from={{ opacity: 0, translateY: 20 }}
                          animate={{ opacity: 1, translateY: 0 }}
                          transition={{
                            type: "timing",
                            duration: 400,
                            delay: index * 200, // كل عنصر يظهر بعد 0.2s عن السابق
                          }}
                        >
                          <ExerciseDetails
                            color={item.color}
                            title={
                              lang === "ar"
                                ? `حرق ${calcBurnForExercise(
                                    weight,
                                    item.minutes,
                                    data.met
                                  )} سعرة حرارية`
                                : lang === "de"
                                ? `Verbrenne ${calcBurnForExercise(
                                    weight,
                                    item.minutes,
                                    data.met
                                  )} kcal `
                                : lang === "tr"
                                ? `${calcBurnForExercise(
                                    weight,
                                    item.minutes,
                                    data.met
                                  )} kcal Yak`
                                : `Burn ${calcBurnForExercise(
                                    weight,
                                    item.minutes,
                                    data.met
                                  )} kcal `
                            }
                            type={words.minutes}
                            value={item.minutes as any}
                          />
                        </MotiView>
                      ))}
                    </AnimatePresence>
                  </View>
                </View>
              </View>
            </BottomSheetScrollView>
          </BottomSheet>
        </GestureHandlerRootView>
      </View>
    </Modal>
  );
};

export default ModalExersiceMiniDetails;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0,0.4)",
  },
  modalView: {
    width: width,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    alignItems: "center",
    paddingBottom: 40,
  },

  closeBtn: {
    backgroundColor: "red",
    borderRadius: 10,
    padding: 6,
    transform: [{ translateY: -18 }],
  },
});
