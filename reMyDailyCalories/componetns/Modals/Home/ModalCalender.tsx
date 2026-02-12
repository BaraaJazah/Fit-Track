import {
  Modal,
  Dimensions,
  StyleSheet,
  Text,
  View,
  ScrollView,
  RefreshControl,
} from "react-native";
import React, { useEffect, useRef, useState, useMemo } from "react";
import { CycleDisplayData, HeaderPages } from "../../screens/home";
import { Packet } from "../../common";
import { useAppDispatch, useAppSelector } from "../../../hooks/storeHook";
import Toast from "react-native-toast-message";
import { Calendar } from "react-native-calendars";
import { actGetMyCalender } from "../../../store/calender/calenderSlice";
import LottieFile from "../../../constants/loffieFile/LottieFile";
import { MotiSafeAreaView } from "moti";

const { width, height } = Dimensions.get("window");

const ModalCalender = ({ isOpen = false, setIsOpen }) => {
  const { themeData, themeName } = useAppSelector((state) => state.theme);
  const { calender } = useAppSelector((state) => state.calender);
  const { lang, words } = useAppSelector((state) => state.lang);

  const dispatch = useAppDispatch();
  const [delayToast, setDelayToast] = useState(false);
  const [selected, setSelected] = useState("");

  useEffect(() => {
    if (calender.length === 0) dispatch(actGetMyCalender());
  }, [dispatch]);

  useEffect(() => {
    const today = new Date();
    const todayString = today.toLocaleDateString("en-CA"); // تنسيق التاريخ "YYYY-MM-DD"
    setSelected(todayString); // نحدد اليوم الحالي
  }, []);

  // تحويل بيانات calender إلى شكل يستخدمه Calendar و عرض البيانات
  const { eventsByDate, markedDates } = useMemo(() => {
    const events = {};
    const marks = {};

    calender.forEach((item) => {
      if (item.day) {
        events[item.day] = {
          kcal: item.kcal?.toString() ?? "0",
          protein: item.protein?.toString() ?? "0",
          fats: item.fats?.toString() ?? "0",
          carbs: item.carbs?.toString() ?? "0",
          burn: item.burn?.toString() ?? "0",
        };

        marks[item.day] = {
          marked: true,
          dotColor: themeData["background-primary"],
          activeOpacity: 0,
        };
      }
    });

    if (selected) {
      marks[selected] = {
        ...(marks[selected] || {}),
        selected: true,
        disableTouchEvent: true,
        selectedColor: themeData["background-primary"],
      };
    }

    return { eventsByDate: events, markedDates: marks };
  }, [calender, selected, themeData]);

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    dispatch(actGetMyCalender())
      .unwrap()
      .then(() => {
        setRefreshing(false);
      });
  }, []);
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isOpen}
      onRequestClose={() => setIsOpen(false)}
      statusBarTranslucent={true}
      navigationBarTranslucent={true}
    >
      <MotiSafeAreaView
        style={[
          styles.body,
          { backgroundColor: themeData["background-secondary-2"] },
        ]}
      >
        <View style={{ height: height * 0.16 }}>
          <HeaderPages
            onpress={() => {
              setIsOpen(false);
            }}
            header={words.calender}
            title=""
            text={words["msg of calender"]}
          />
        </View>

        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <Packet
            packetStyle={[
              styles.packet,
              {
                borderColor: themeData["background-secondary"],
                paddingVertical: 0,
              },
            ]}
          >
            <View
              style={{
                marginVertical: 10,
                width: width * 0.86,
                borderRadius: 20,
              }}
            >
              <Calendar
                onDayPress={(day) => {
                  setSelected(day.dateString);
                }}
                style={{
                  height: 350,
                  backgroundColor: themeData["background-secondary-2"],
                }}
                theme={{
                  calendarBackground: themeData["background-secondary-2"],
                  textSectionTitleColor: themeData["text-primary"],
                  selectedDayBackgroundColor: "#00adf5",
                  selectedDayTextColor: "#ffffff",
                  todayTextColor: themeData["background-primary"],
                  dayTextColor: themeData["text-primary"],
                  textDisabledColor: themeData["background-secondary"],
                  monthTextColor: themeData["text-primary"],
                }}
                markedDates={markedDates}
              />
            </View>

            <Packet
              packetStyle={{
                borderColor: themeData["background-secondary"],
                borderTopWidth: 10,
                borderBottomWidth: 10,
                width: width * 0.85,
                justifyContent: "center",
                alignItems: "center",
                height: 250,
              }}
            >
              {eventsByDate[selected] ? (
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    flexWrap: "wrap",
                    rowGap: 20,
                    width: width * 0.85,
                  }}
                >
                  <CycleDisplayData
                    color={themeData["background-primary"]}
                    text1={`${
                      eventsByDate[selected].kcal - eventsByDate[selected].burn
                    }  g`}
                    text2={words["total kcal"]}
                  />

                  <CycleDisplayData
                    color={themeData["secondary-meal1"]}
                    text1={`${eventsByDate[selected].protein} g`}
                    text2={words.protein}
                  />
                  <CycleDisplayData
                    color={themeData["secondary-meal2"]}
                    text1={`${eventsByDate[selected].fats} g`}
                    text2={words.fats}
                  />
                  <CycleDisplayData
                    color={themeData["secondary-meal3"]}
                    text1={`${eventsByDate[selected].carbs} g`}
                    text2={words.carbs}
                  />
                  <View
                    style={{
                      height: 4,
                      width: width * 0.65,
                      borderRadius: 50,
                      backgroundColor: themeData["background-secondary"],
                    }}
                  ></View>
                  <CycleDisplayData
                    color={themeData["background-primary"]}
                    text1={`${eventsByDate[selected].kcal} g`}
                    text2={words.kcal}
                  />
                  <CycleDisplayData
                    color={themeData["secondary-meal2"]}
                    text1={`${eventsByDate[selected].burn} g`}
                    text2={words.burn}
                  />
                </View>
              ) : (
                <LottieFile
                  lottieName="lottie_nodataRobot"
                  lottieHeigh={220}
                  lottieWidth={220}
                />
              )}
            </Packet>

            <View style={{ position: "absolute", bottom: 0, zIndex: 400 }}>
              {delayToast ? <Toast /> : <></>}
            </View>
          </Packet>
        </ScrollView>
      </MotiSafeAreaView>
    </Modal>
  );
};

export default ModalCalender;

const styles = StyleSheet.create({
  body: {
    flex: 1,
    paddingTop: 30,
    width: width,
    height,
    alignItems: "center",
  },

  packet: {
    borderWidth: 4,
    height: height * 0.82,
    alignItems: "center",
    padding: 8,
  },
});
