import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Modal,
  Pressable,
  KeyboardAvoidingView,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { CycleDisplayData, HeaderWithoutTitle } from "../../screens/home";
import { Btn, Packet } from "../../common";
import { useAppDispatch, useAppSelector } from "../../../hooks/storeHook";
import Toast from "react-native-toast-message";
import { calcNeedKcal } from "../../../hooks";
import { actSetGoals } from "../../../store/goal/goalSlice";
import { balance, working } from "../../../assets/icons";
import PagerView from "react-native-pager-view";
import { dropDown } from "../../../assets/icons/home";
import ModalSelectItemsNoIcon from "../Common/ModalSelectItemsNoIcon";
const { width, height } = Dimensions.get("screen");

const ModalCalcNeeds = ({ isOpen = false, setIsOpen }) => {
  const { themeData } = useAppSelector((state) => state.theme);
  const dispatch = useAppDispatch();
  const { lang, words } = useAppSelector((state) => state.lang);
  const [goalData, setGoalData] = useState(false);
  const [activeData, setActiveData] = useState(false);
  const [genderData, setGenderData] = useState(false);

  const [activeIndex, setActiveIndex] = useState(0);
  const [goalIndex, setGoalIndex] = useState(0);
  const [genderIndex, setGenderIndex] = useState(0);

  const ref = useRef(null);

  // const gender = [{ text: words.man }, { text: words.woman }];
  const gender = [
    { text: words.man, type: "man" },
    { text: words.woman, type: "woman" },
  ];

  const setDataForGender = (index) => {
    setGenderIndex(index);
    claculatorGetData("gender", gender[index].type);
  };

  const activity = [
    {
      label: words.sedentary,
      text: words.neverActiveDay,
      value: 1.2,
    },
    {
      label: words.lightlyActive,
      text: words.lightActiveDay,
      value: 1.375,
    },
    {
      label: words.moderatelyActive,
      text: words.moderateActiveDay,
      value: 1.55,
    },
    {
      label: words.veryActive,
      text: words.heavyActiveDay,
      value: 1.725,
    },
  ];

  const setDataForActive = (index) => {
    setActiveIndex(index);
    setPersonData({
      ...personData,
      active: activity[index].value,
    });
  };

  const changeLangPhrase = (num, type) => {
    if (type === "loss") {
      if (lang === "ar") {
        return `خسارة ${num} كغ أسبوعياً`;
      } else if (lang === "tr") {
        return `Haftada ${num} kg kayıp`;
      } else if (lang === "de") {
        return `Verlust von ${num} kg pro Woche`;
      } else {
        return `Losing ${num} KG Per Week`;
      }
    } else {
      if (lang === "ar") {
        return `زيادة ${num} كغ أسبوعياً`;
      } else if (lang === "tr") {
        return `Haftada ${num} kg artış`;
      } else if (lang === "de") {
        return `Zunahme von ${num} kg pro Woche`;
      } else {
        return `Gaining ${num} KG Per Week`;
      }
    }
  };

  const data = [
    { text: words.maintainWeight, goal: 0, type: "normal" },
    { text: changeLangPhrase(0.25, "loss"), goal: 251, type: "loss" },
    { text: changeLangPhrase(0.5, "loss"), goal: 501, type: "loss" },
    { text: changeLangPhrase(0.75, "loss"), goal: 751, type: "loss" },
    { text: changeLangPhrase(1, "loss"), goal: 1001, type: "loss" },
    { text: changeLangPhrase(0.25, "won"), goal: 250, type: "won" },
    { text: changeLangPhrase(0.5, "won"), goal: 500, type: "won" },
    { text: changeLangPhrase(0.75, "won"), goal: 750, type: "won" },
    { text: changeLangPhrase(1, "won"), goal: 1000, type: "won" },
  ];

  const setDataForGoal = (index) => {
    setGoalIndex(index);
    setPersonData({
      ...personData,
      goal: data[index].goal,
      type: data[index].type,
    });
  };

  const [isloading, setIsLoading] = useState(false);
  const [delayToast, setDelayToast] = useState(false);
  const [isFocusPage, setIsFocusPage] = useState(0);

  const [personData, setPersonData] = useState({
    age: "",
    gender: gender[0].type,
    weight: "",
    pound: "",
    height: "",
    feet: "",
    inch: "",
    type: "normal",
    goal: 0,
    active: activity[0].value,
  });

  const [personNeeds, setPersonNeeds] = useState({
    kcal: 0,
    Protein: 0,
    fats: 0,
    carbs: 0,
  });
  const resetData = () => {
    setPersonData({
      age: "",
      gender: gender[0].type,
      weight: "",
      pound: "",
      height: "",
      feet: "",
      inch: "",
      type: "normal",
      goal: 0,
      active: activity[0].value,
    });
    setPersonNeeds({
      kcal: 0,
      Protein: 0,
      fats: 0,
      carbs: 0,
    });
  };
  const claculatorGetData = (field, value) => {
    if (field === "pound") {
      const thisWeight = (parseInt(value) * 0.4536).toFixed(0);
      setPersonData({
        ...personData,
        [field]: value,
        weight: thisWeight,
      });
    } else if (field === "feet") {
      const thisHeight = (
        parseInt(personData.inch) * 2.54 +
        parseInt(value) * 30.48
      ).toFixed(0);

      setPersonData({
        ...personData,
        [field]: value,
        height: thisHeight,
      });
    } else if (field === "inch") {
      const thisHeight = (
        parseInt(personData.feet) * 30.48 +
        parseInt(value) * 2.54
      ).toFixed(0);

      setPersonData({
        ...personData,
        [field]: value,
        height: thisHeight,
      });
    } else {
      setPersonData({
        ...personData,
        [field]: value,
      });
    }
  };

  const showToast = (item) => {
    Toast.show({
      type: "error",
      text1: "Error",
      text2: `${item} `,
      position: "bottom",
    });
  };
  const showToastSuccess = (item) => {
    Toast.show({
      type: "success",
      text1: "Success",
      text2: `${item} `,
      position: "bottom",
    });
  };

  const claculatorBtnHandler = () => {
    setDelayToast(true);

    setTimeout(() => {
      if (
        isNaN(parseInt(personData.age)) ||
        parseInt(personData.age) < 15 ||
        parseInt(personData.age) > 80
      ) {
        showToast("Age must be between 15-80 years");
      } else if (
        isFocusPage === 0 &&
        (isNaN(parseInt(personData.height)) ||
          parseInt(personData.height) < 120 ||
          parseInt(personData.height) > 250)
      ) {
        showToast("Height must be between 120-250 cm");
      } else if (
        isFocusPage === 0 &&
        (isNaN(parseInt(personData.weight)) ||
          parseInt(personData.weight) < 30 ||
          parseInt(personData.weight) > 400)
      ) {
        showToast("Weight must be between 30-400 kg");
      } else if (
        isFocusPage === 1 &&
        (isNaN(parseInt(personData.pound)) ||
          parseInt(personData.pound) < 66 ||
          parseInt(personData.pound) > 880)
      ) {
        showToast("Weight must be between 66-880 lbs");
      } else if (
        isFocusPage === 1 &&
        (isNaN(parseInt(personData.feet)) ||
          parseInt(personData.feet) < 4 ||
          parseInt(personData.feet) > 8)
      ) {
        showToast("Height must be between 4-8 feet");
      } else if (
        isFocusPage === 1 &&
        (!personData.inch.trim() || isNaN(parseInt(personData.inch)))
      ) {
        showToast("Inches measurement is required");
      }

      //
      else {
        setIsLoading(true);
        setPersonNeeds(
          calcNeedKcal(
            personData.gender as "man" | "woman",
            personData.type as "normal" | "loss" | "won",
            personData.goal as 0 | 250 | 500 | 500 | 750 | 1000,
            parseInt(personData.height),
            parseInt(personData.weight),
            parseInt(personData.age),
            personData.active
          )
        );

        const timerId = setInterval(() => {
          setIsLoading(false);
        }, 100);

        return () => clearInterval(timerId);
      }
    }, 100);
  };

  const saveGoal = () => {
    setDelayToast(true);
    setTimeout(() => {
      const mergeData = {
        ...personNeeds,
        userData: personData,
      };

      if (
        personNeeds?.Protein === 0 ||
        isNaN(personNeeds?.Protein) ||
        personNeeds.carbs === 0 ||
        isNaN(personNeeds.carbs) ||
        personNeeds.fats === 0 ||
        isNaN(personNeeds.fats) ||
        personNeeds.kcal === 0 ||
        isNaN(personNeeds.kcal)
      ) {
        showToast("Your must add your data to calculate your goal ");
      } else {
        dispatch(actSetGoals(mergeData));
        showToastSuccess("Goal Saved Successfully");
      }
    }, 200);
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isOpen}
      onRequestClose={() => {
        resetData();
        setDelayToast(false);
        setIsOpen(false);
      }}
      statusBarTranslucent={true}
      navigationBarTranslucent={true}
    >
      <KeyboardAvoidingView style={{ flex: 1 }}>
        <View
          style={[
            styles.body,
            {
              backgroundColor: themeData["background-secondary-2"],
            },
          ]}
        >
          <View style={[styles.body2]}>
            <HeaderWithoutTitle
              onpress={() => {
                resetData();
                setDelayToast(false);
                setIsOpen(false);
              }}
              header={words.dailyCalorieGoal}
            />

            <View
              style={{
                width: width * 0.95,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <TouchableOpacity
                onPress={() => ref.current?.setPage(0)}
                style={[
                  styles.pagerBtn,
                  {
                    borderColor: themeData["background-secondary"],
                  },
                ]}
              >
                <Text
                  style={[
                    styles.pagerBtnText,
                    {
                      color: themeData["text-secondary"],
                    },
                    isFocusPage === 0
                      ? {
                          color: themeData["background-primary"],
                        }
                      : {},
                  ]}
                >
                  {words.metricUnits}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => ref.current?.setPage(1)}
                style={[
                  styles.pagerBtn,
                  {
                    borderColor: themeData["background-secondary"],
                  },
                ]}
              >
                <Text
                  style={[
                    styles.pagerBtnText,
                    {
                      color: themeData["text-secondary"],
                    },
                    isFocusPage === 1
                      ? {
                          color: themeData["background-primary"],
                        }
                      : {},
                  ]}
                >
                  {words.usUnits}
                </Text>
              </TouchableOpacity>
            </View>

            <PagerView
              style={{
                flex: 5,
                width,
                alignSelf: "stretch",
              }}
              ref={ref}
              initialPage={0}
              onPageSelected={(e) => {
                resetData();
                setIsFocusPage(e.nativeEvent.position);
              }}
            >
              <Packet
                key={1}
                packetStyle={[
                  styles.packet,
                  {
                    borderColor: themeData["background-secondary"],
                    margin: "auto",
                    paddingVertical: 10,
                    direction: lang === "ar" ? "rtl" : "ltr",
                  },
                ]}
              >
                <View style={styles.inputBox}>
                  <Text
                    style={{ color: themeData["text-secondary"], fontSize: 12 }}
                  >
                    {words.enterAge}
                  </Text>
                  <TextInput
                    style={[
                      styles.input,
                      {
                        borderColor: themeData["background-secondary"],
                        color: themeData["text-secondary"],
                      },
                    ]}
                    onChangeText={(text) => {
                      claculatorGetData("age", text);
                    }}
                    value={personData?.age.toString()}
                    placeholder="0"
                    placeholderTextColor={themeData["text-secondary"]}
                    textAlign="center"
                    autoCapitalize={"none"}
                    keyboardType="number-pad"
                    maxLength={2}
                  />
                </View>

                <View style={styles.inputBox}>
                  <Text
                    style={{ color: themeData["text-secondary"], fontSize: 12 }}
                  >
                    {words.enterGender}
                  </Text>

                  <Pressable
                    onPress={() => {
                      setGenderData(true);
                    }}
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      backgroundColor: themeData["background-secondary-2"],
                      borderRadius: 12,
                      borderWidth: 3,
                      borderColor: themeData["background-secondary"],
                      // width: width * 0.9,
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        width: width * 0.23,
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginVertical: 10,
                        paddingHorizontal: 10,
                      }}
                    >
                      <View style={{ flexDirection: "row", gap: 10 }}>
                        <Text
                          style={{
                            color: themeData["text-secondary"],
                            textTransform: "capitalize",
                            fontSize: 12,
                          }}
                        >
                          {gender[genderIndex].text}
                        </Text>
                      </View>
                      <Image
                        source={dropDown}
                        style={{
                          width: 10,
                          height: 10,
                        }}
                      />
                    </View>
                  </Pressable>
                </View>

                <View style={styles.inputBox}>
                  <Text
                    style={{ color: themeData["text-secondary"], fontSize: 12 }}
                  >
                    {words.enterWeight} ( kg )
                  </Text>
                  <TextInput
                    style={[
                      styles.input,
                      {
                        borderColor: themeData["background-secondary"],
                        color: themeData["text-secondary"],
                      },
                    ]}
                    onChangeText={(text) => {
                      claculatorGetData("weight", text);
                    }}
                    value={personData?.weight.toString()}
                    placeholder="0"
                    textAlign="center"
                    placeholderTextColor={themeData["text-secondary"]}
                    autoCapitalize={"none"}
                    keyboardType="number-pad"
                    maxLength={3}
                  />
                </View>

                <View style={styles.inputBox}>
                  <Text
                    style={{ color: themeData["text-secondary"], fontSize: 12 }}
                  >
                    {words.enterHeight} ( cm )
                  </Text>
                  <TextInput
                    style={[
                      styles.input,
                      {
                        borderColor: themeData["background-secondary"],
                        color: themeData["text-secondary"],
                      },
                    ]}
                    onChangeText={(text) => {
                      claculatorGetData("height", text);
                    }}
                    value={personData?.height.toString()}
                    placeholder="0"
                    placeholderTextColor={themeData["text-secondary"]}
                    textAlign="center"
                    autoCapitalize={"none"}
                    keyboardType="number-pad"
                    maxLength={3}
                  />
                </View>

                <View
                  style={{
                    width: width * 0.84,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <View style={{ width: width * 0.84, marginVertical: 10 }}>
                    <Pressable
                      onPress={() => {
                        setGoalData(true);
                      }}
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        backgroundColor: themeData["background-secondary-2"],
                        borderRadius: 12,
                        borderWidth: 3,
                        borderColor: themeData["background-secondary"],
                        // width: width * 0.9,
                      }}
                    >
                      <View
                        style={{
                          flexDirection: "row",
                          width: width * 0.83,
                          justifyContent: "space-between",
                          alignItems: "center",
                          marginVertical: 10,
                        }}
                      >
                        <View style={{ flexDirection: "row", gap: 10 }}>
                          <Image
                            source={balance} // workingPrimary
                            style={{
                              width: 24,
                              height: 24,
                              marginHorizontal: 10,
                            }}
                          />
                          <Text style={{ color: themeData["text-secondary"] }}>
                            {data[goalIndex].text}
                          </Text>
                        </View>
                        <Image
                          source={dropDown}
                          style={{
                            width: 10,
                            height: 10,
                            transform: [
                              { translateX: lang === "ar" ? 20 : -20 },
                            ],
                          }}
                        />
                      </View>
                    </Pressable>
                  </View>

                  <View style={{ width: width * 0.84, marginVertical: 10 }}>
                    <Pressable
                      onPress={() => {
                        setActiveData(true);
                      }}
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        backgroundColor: themeData["background-secondary-2"],
                        borderRadius: 12,
                        borderWidth: 3,
                        borderColor: themeData["background-secondary"],
                        // width: width * 0.9,
                      }}
                    >
                      <View
                        style={{
                          flexDirection: "row",
                          width: width * 0.83,
                          justifyContent: "space-between",
                          alignItems: "center",
                          marginVertical: 10,
                        }}
                      >
                        <View style={{ flexDirection: "row", gap: 10 }}>
                          <Image
                            source={working} // workingPrimary
                            style={{
                              width: 24,
                              height: 24,
                              marginHorizontal: 10,
                            }}
                          />
                          <Text style={{ color: themeData["text-secondary"] }}>
                            {activity[activeIndex].label}
                          </Text>
                        </View>
                        <Image
                          source={dropDown}
                          style={{
                            width: 10,
                            height: 10,
                            transform: [
                              { translateX: lang === "ar" ? 20 : -20 },
                            ],
                          }}
                        />
                      </View>
                    </Pressable>
                  </View>
                </View>

                <Btn
                  disabled={isloading}
                  onPress={claculatorBtnHandler}
                  text={words.calculate}
                  textColor={"background-secondary-2"}
                  bgColor={"background-primary"}
                  btnStyle={{ width: width * 0.8, margin: 10 }}
                  btnTextStyle={{ color: "#fff" }}
                />
              </Packet>
              <Packet
                key={2}
                packetStyle={[
                  styles.packet,
                  {
                    borderColor: themeData["background-secondary"],
                    margin: "auto",
                    paddingVertical: 10,
                    direction: lang === "ar" ? "rtl" : "ltr",
                  },
                ]}
              >
                <View style={styles.inputBox}>
                  <Text
                    style={{ color: themeData["text-secondary"], fontSize: 12 }}
                  >
                    {words.enterAge}
                  </Text>
                  <TextInput
                    style={[
                      styles.input,
                      {
                        borderColor: themeData["background-secondary"],
                        color: themeData["text-secondary"],
                      },
                    ]}
                    onChangeText={(text) => {
                      claculatorGetData("age", text);
                    }}
                    value={personData?.age.toString()}
                    placeholder="0"
                    placeholderTextColor={themeData["text-secondary"]}
                    textAlign="center"
                    autoCapitalize={"none"}
                    keyboardType="number-pad"
                    maxLength={2}
                  />
                </View>

                <View style={styles.inputBox}>
                  <Text
                    style={{ color: themeData["text-secondary"], fontSize: 12 }}
                  >
                    {words.enterGender}
                  </Text>

                  <Pressable
                    onPress={() => {
                      setGenderData(true);
                    }}
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      backgroundColor: themeData["background-secondary-2"],
                      borderRadius: 12,
                      borderWidth: 3,
                      borderColor: themeData["background-secondary"],
                      // width: width * 0.9,
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        width: width * 0.23,
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginVertical: 10,
                        paddingHorizontal: 10,
                      }}
                    >
                      <View style={{ flexDirection: "row", gap: 10 }}>
                        <Text
                          style={{
                            color: themeData["text-secondary"],
                            textTransform: "capitalize",
                            fontSize: 12,
                          }}
                        >
                          {gender[genderIndex].text}
                        </Text>
                      </View>
                      <Image
                        source={dropDown}
                        style={{
                          width: 10,
                          height: 10,
                        }}
                      />
                    </View>
                  </Pressable>
                </View>

                <View style={styles.inputBox}>
                  <Text
                    style={{ color: themeData["text-secondary"], fontSize: 12 }}
                  >
                    {words.enterWeight} ( lbs )
                  </Text>
                  <TextInput
                    style={[
                      styles.input,
                      {
                        borderColor: themeData["background-secondary"],
                        color: themeData["text-secondary"],
                      },
                    ]}
                    onChangeText={(text) => {
                      claculatorGetData("pound", text);
                    }}
                    value={personData?.pound.toString()}
                    textAlign="center"
                    placeholder="0"
                    placeholderTextColor={themeData["text-secondary"]}
                    autoCapitalize={"none"}
                    keyboardType="number-pad"
                    maxLength={3}
                  />
                </View>

                <View style={styles.inputBox}>
                  <Text
                    style={{ color: themeData["text-secondary"], fontSize: 12 }}
                  >
                    {words.enterHeight} ( ft - in )
                  </Text>
                  <View style={{ flexDirection: "row", gap: 4 }}>
                    <TextInput
                      style={[
                        styles.input,
                        {
                          width: 60,
                          borderColor: themeData["background-secondary"],
                          color: themeData["text-secondary"],
                        },
                      ]}
                      onChangeText={(text) => {
                        claculatorGetData("feet", text);
                      }}
                      value={personData?.feet.toString()}
                      placeholder="0"
                      placeholderTextColor={themeData["text-secondary"]}
                      textAlign="center"
                      autoCapitalize={"none"}
                      keyboardType="number-pad"
                      maxLength={1}
                    />

                    <TextInput
                      style={[
                        styles.input,
                        {
                          width: 60,
                          borderColor: themeData["background-secondary"],
                          color: themeData["text-secondary"],
                        },
                      ]}
                      onChangeText={(text) => {
                        claculatorGetData("inch", text);
                      }}
                      value={personData?.inch.toString()}
                      placeholder="0"
                      placeholderTextColor={themeData["text-secondary"]}
                      textAlign="center"
                      autoCapitalize={"none"}
                      keyboardType="number-pad"
                      maxLength={2}
                    />
                  </View>
                </View>

                <View
                  style={{
                    width: width * 0.84,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <View style={{ width: width * 0.84, marginVertical: 10 }}>
                    <Pressable
                      onPress={() => {
                        setGoalData(true);
                      }}
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        backgroundColor: themeData["background-secondary-2"],
                        borderRadius: 12,
                        borderWidth: 3,
                        borderColor: themeData["background-secondary"],
                        // width: width * 0.9,
                      }}
                    >
                      <View
                        style={{
                          flexDirection: "row",
                          width: width * 0.83,
                          justifyContent: "space-between",
                          alignItems: "center",
                          marginVertical: 10,
                        }}
                      >
                        <View style={{ flexDirection: "row", gap: 10 }}>
                          <Image
                            source={balance} // workingPrimary
                            style={{
                              width: 24,
                              height: 24,
                              marginHorizontal: 10,
                            }}
                          />
                          <Text style={{ color: themeData["text-secondary"] }}>
                            {data[goalIndex].text}
                          </Text>
                        </View>
                        <Image
                          source={dropDown}
                          style={{
                            width: 10,
                            height: 10,
                            transform: [
                              { translateX: lang === "ar" ? 20 : -20 },
                            ],
                          }}
                        />
                      </View>
                    </Pressable>
                  </View>

                  <View style={{ width: width * 0.84, marginVertical: 10 }}>
                    <Pressable
                      onPress={() => {
                        setActiveData(true);
                      }}
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        backgroundColor: themeData["background-secondary-2"],
                        borderRadius: 12,
                        borderWidth: 3,
                        borderColor: themeData["background-secondary"],
                        // width: width * 0.9,
                      }}
                    >
                      <View
                        style={{
                          flexDirection: "row",
                          width: width * 0.83,
                          justifyContent: "space-between",
                          alignItems: "center",
                          marginVertical: 10,
                        }}
                      >
                        <View style={{ flexDirection: "row", gap: 10 }}>
                          <Image
                            source={working} // workingPrimary
                            style={{
                              width: 24,
                              height: 24,
                              marginHorizontal: 10,
                            }}
                          />
                          <Text style={{ color: themeData["text-secondary"] }}>
                            {activity[activeIndex].label}
                          </Text>
                        </View>
                        <Image
                          source={dropDown}
                          style={{
                            width: 10,
                            height: 10,
                            transform: [
                              { translateX: lang === "ar" ? 20 : -20 },
                            ],
                          }}
                        />
                      </View>
                    </Pressable>
                  </View>
                </View>

                <Btn
                  disabled={isloading}
                  onPress={claculatorBtnHandler}
                  text={words.calculate}
                  textColor={"background-secondary-2"}
                  bgColor={"background-primary"}
                  btnStyle={{ width: width * 0.8, margin: 10 }}
                  btnTextStyle={{ color: "#fff" }}
                />
              </Packet>
            </PagerView>

            <Packet
              packetStyle={[
                styles.packetTow,
                {
                  justifyContent: "center",
                  gap: 5,
                  borderColor: themeData["background-secondary"],
                },
              ]}
            >
              <CycleDisplayData
                color={themeData["background-primary"]}
                text1={`${personNeeds.kcal}`}
                text2={words.kcal}
              />
              <CycleDisplayData
                color={themeData["secondary-meal1"]}
                text1={`${personNeeds.Protein}g`}
                text2={words.protein}
              />
              <CycleDisplayData
                color={themeData["secondary-meal2"]}
                text1={`${personNeeds.fats}g`}
                text2={words.fats}
              />
              <CycleDisplayData
                color={themeData["secondary-meal3"]}
                text1={`${personNeeds.carbs}g`}
                text2={words.carbs}
              />
            </Packet>

            <View style={[styles.saveView, { flex: 1, alignItems: "center" }]}>
              <TouchableOpacity
                onPress={saveGoal}
                style={[
                  styles.saveBtn,
                  { backgroundColor: themeData["background-primary"] },
                ]}
              >
                <Text
                  style={[
                    styles.saveBtnText,
                    { color: "#fff", fontWeight: 600 },
                  ]}
                >
                  {words.saveAsGoal}
                </Text>
              </TouchableOpacity>
            </View>

            <View style={{ position: "absolute", bottom: 0, zIndex: 400 }}>
              {delayToast ? <Toast /> : <></>}
            </View>
          </View>
          {activeData && (
            <ModalSelectItemsNoIcon
              dataArray={activity}
              isOpen={activeData}
              setIsOpen={setActiveData}
              defualtIndex={activeIndex}
              setIndex={setDataForActive}
            />
          )}
          {goalData && (
            <ModalSelectItemsNoIcon
              dataArray={data}
              isOpen={goalData}
              setIsOpen={setGoalData}
              defualtIndex={goalIndex}
              setIndex={setDataForGoal}
            />
          )}

          {genderData && (
            <ModalSelectItemsNoIcon
              dataArray={gender}
              isOpen={genderData}
              setIsOpen={setGenderData}
              defualtIndex={genderIndex}
              setIndex={setDataForGender}
            />
          )}
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default ModalCalcNeeds;

const styles = StyleSheet.create({
  body: {
    flex: 1,
    paddingTop: 30,
    width: width,
    alignItems: "center",
    justifyContent: "space-between",
  },
  body2: {
    alignItems: "center",
    justifyContent: "space-between",
  },
  packet: {
    borderWidth: 4,
    borderColor: "#eee",
    marginBottom: 20,
  },
  inputBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 5,
  },
  input: {
    borderWidth: 2.5,
    width: 100,
    height: 45,
    borderRadius: 12,
    fontSize: 12,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 14,
    borderColor: "#999",
  },

  dropdownMenuStyle: {
    backgroundColor: "#E9ECEF",
    borderRadius: 8,
  },
  dropdownItemStyle: {
    width: "100%",
    flexDirection: "row",
    paddingHorizontal: 12,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 8,
  },

  // packet Tow
  packetTow: {
    borderWidth: 4,
    borderColor: "#eee",
    // marginBottom: 20,
    flexDirection: "row",
    justifyContent: "space-around",
    flexWrap: "wrap",
    rowGap: 20,
    paddingTop: 15,
  },
  packetTowpart: {
    flexDirection: "row",
    width: width * 0.4,
    alignItems: "center",
    justifyContent: "center",
  },

  packetTowpartView1: {
    width: 30,
    height: 30,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 4,
    marginRight: 16,
  },

  packetTowResult: {
    width: width * 0.24,
    height: 70,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },

  // botton Btn and Input

  saveView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    height: 60,
  },

  saveBtn: {
    width: width * 0.8,
    borderRadius: 12,
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    zIndex: 2,
    // marginBottom: 50,
  },
  saveBtnText: {
    // padding: 10,
  },

  saveInput: {
    borderRadius: 12,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  },
  saveInputInput: {
    borderWidth: 2,
    width: 100,
    height: 50,
    borderRadius: 12,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    transform: [{ translateX: -2 }],
  },

  container: {
    backgroundColor: "white",
    padding: 16,
  },
  dropdown: {
    height: 50,
    borderColor: "#999",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },

  label: {
    position: "absolute",
    backgroundColor: "white",
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  pagerBtn: {
    borderWidth: 4,
    borderColor: "red",
    borderRadius: 10,
    paddingVertical: 10,
    width: width * 0.46,
    justifyContent: "center",
    alignItems: "center",
  },
  pagerBtnText: {
    fontSize: 14,
    fontWeight: 600,
  },
});
