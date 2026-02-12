import {
  Dimensions,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { CycleDisplayData, HeaderPages } from "../../screens/home";
import { useAppDispatch, useAppSelector } from "../../../hooks/storeHook";
import { Btn, Packet } from "../../common";
import {
  explane,
  foodTable,
  image,
  noteOk,
  noteWrite,
} from "../../../assets/icons/home";
import { ModalAddImage } from "..";
import ModalMyDishAddFood from "./ModalMyDishAddFood";
import {
  actResetMyDish,
  actSetMyDishs,
  addCalcolateTotal,
} from "../../../store/myDishExercise/myDishExerciseSlice";
import Toast from "react-native-toast-message";
import { getFoodIcon } from "../../../assets/icons/Foods/data";
import ModalGeneralSelectGram from "../Common/ModalGeneralSelectGram";
import PagerView from "react-native-pager-view";
import ModalTextEditor from "../Common/ModalTextEditor";
import { AIFood, homeFood, readyFood } from "../../../assets/icons";
import {
  actAIFood,
  actAIFoodIngredients,
  actAIFoodSuggestion,
} from "../../../store/food/foodSlice";
import { ModalLoadingUsageAllPage } from "../../feedback";
import { jsonToStrForFoodIA } from "../../../hooks";
import { actGetSubscribeData } from "../../../store/auth/authSlice";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import { MotiSafeAreaView } from "moti";

const { width, height } = Dimensions.get("window");

const ModalAddNewAIDish = ({
  isOpen = false,
  setIsOpen,
  name,
  nameEn,
  SuccessToast,
}) => {
  const { themeData } = useAppSelector((state) => state.theme);
  const { foodAI } = useAppSelector((state) => state.foods);
  const { lang, words } = useAppSelector((state) => state.lang);
  const dispatch = useAppDispatch();
  const { myAddDish, myAddTotalDish } = useAppSelector(
    (state) => state.myDishExercise
  );

  const ref = useRef(null);
  const [foodImage, setFoodImage] = useState("");

  const [addFoodVisible, setAddFoodVisible] = useState(false);
  const [addImageVisible, setAddImageVisible] = useState(false);
  const [sevingVisible, setSevingVisible] = useState(false);

  const [showAIFoodDetails, setShowAIFoodDetails] = useState(false);
  const [showAIFoodDetails2, setShowAIFoodDetails2] = useState(false);
  const [showAIFoodDetails3, setShowAIFoodDetails3] = useState(false);
  const [dishSave, setDishSave] = useState(false);

  const [textEditorVisible, setTextEditorVisible] = useState(false);

  const [delayToast, setDelayToast] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [sendData, setSendData] = useState({
    iconName: "",
    name: "",
    explane: "",
    serving: 0,
  });

  const pagesArray = [
    {
      name: words.searchByName,
      icon: AIFood,
      onPress: () => {
        ref.current?.setPage(0);
      },
      page: 0,
    },
    {
      name: words.aiSuggestion,
      icon: AIFood,
      onPress: () => {
        ref.current?.setPage(1);
      },
      page: 1,
    },

    {
      name: words.searchByIngredients,
      icon: AIFood,
      onPress: () => {
        ref.current?.setPage(2);
      },
      page: 2,
    },

    //
  ];

  const saveDishHandler = () => {
    const dishInputData = {
      iconName: sendData.iconName,
      serving: sendData.serving,
      foodType: nameEn,
      name: sendData.name,
      explane: sendData.explane,
    };
    setDelayToast(true);
    setDishSave(true);

    setTimeout(() => {
      if (!sendData.iconName) {
        showToast(words["PleaseSelectIcon"]);
        setDishSave(false);
        return;
      } else if (!sendData.name.trim()) {
        showToast(words["Please add dish name"]);
        setDishSave(false);
        return;
      } else if (sendData.name.trim().length > 20) {
        showToast(words["The name must be less than 20 characters"]);
        setDishSave(false);
        return;
      } else if (sendData.serving === 0) {
        showToast(words["Please enter number of serving"]);
        setDishSave(false);
        return;
      } else if (myAddTotalDish.totalQuantity === 0) {
        showToast("Please enter the number of grams Of the food");
        setDishSave(false);
        return;
      } else {
        const timerId = setTimeout(() => {
          const mergedDish = {
            name: dishInputData.name,
            foodType: dishInputData.foodType,
            kcal: myAddTotalDish.kcal,
            protein: myAddTotalDish.protein,
            fats: myAddTotalDish.fats,
            carbs: myAddTotalDish.carbs,
            totalQuantity: myAddTotalDish.totalQuantity,
            serving: dishInputData.serving,
            iconName: dishInputData.iconName,
            explane: dishInputData.explane || null,
            my_dish_foods: myAddDish.map((item) => ({
              foodId: item.foodId,
              EnName: item.EnName,
              ArName: item.ArName,
              image: item.image,
              kcal: item.kcal,
              protein: item.protein,
              fats: item.fats,
              carbs: item.carbs,
              quantity: item.quantity,
              haveExplane: item.haveExplane,
            })),
          };

          dispatch(actSetMyDishs(mergedDish))
            .unwrap()
            .then(() => {
              // reset and send success message
              dispatch(actGetSubscribeData())
                .unwrap()
                .then(() => {
                  dispatch(actResetMyDish());
                  setSendData({
                    iconName: "",
                    name: "",
                    explane: "",
                    serving: 0,
                  });
                  setFoodImage("");
                  SuccessToast(
                    lang === "en"
                      ? `${name} Saved Successfully`
                      : lang === "ar"
                      ? `تم الحفظ ${name} بنجاح`
                      : lang === "tr"
                      ? `${name} başarıyla kaydedildi`
                      : `${name} wurde erfolgreich gespeichert`
                  );
                  setIsOpen(false);
                })
                .catch((e) => {
                  showToast("Error : " + e);
                })
                .catch((e) => {
                  showToast("Error : " + e);
                })
                .catch((e) => {
                  showToast("Error : " + e);
                });
            })
            .catch((e) => {
              showToast("Error : " + e);
            })
            .finally(() => {
              setDishSave(false);
            });
        }, 100);

        return () => clearTimeout(timerId);
      }
    }, 100);
  };

  const setDataHandler = (field, value) => {
    setSendData({
      ...sendData,
      [field]: value,
    });
  };

  const servingSelectHandler = (value) => {
    setSendData({
      ...sendData,
      serving: value,
    });
  };

  const iconSelectHandler = (value) => {
    setSendData({
      ...sendData,
      iconName: value,
    });
  };

  const showToast = (item) => {
    let text = item.charAt(0).toUpperCase() + item.slice(1).toLowerCase();
    Toast.show({
      type: "error",
      text1: "Error",
      text2: `${text}`,
      position: "bottom",
    });
  };

  const totalData = [
    {
      title: words.Kcal,
      color: themeData["background-primary"],
      value: myAddTotalDish?.kcal != null ? Math.ceil(myAddTotalDish.kcal) : 0,
    },
    {
      title: words.protein,
      color: themeData["secondary-meal1"],
      value:
        myAddTotalDish?.protein != null ? Math.ceil(myAddTotalDish.protein) : 0,
    },
    {
      title: words.fats,
      color: themeData["secondary-meal2"],
      value: myAddTotalDish?.fats != null ? Math.ceil(myAddTotalDish.fats) : 0,
    },
    {
      title: words.carbs,
      color: themeData["secondary-meal3"],
      value:
        myAddTotalDish?.carbs != null ? Math.ceil(myAddTotalDish.carbs) : 0,
    },
  ];
  const [isFocusPage, setIsFocusPage] = useState(0);

  // //////////////////////////////

  // page 2

  const [focusState, setFocusState] = useState(0);

  const generateFoodAi = () => {
    let goal = focusState === 0 ? "normal" : focusState === 1 ? "less" : "more";
    const data = {
      serving: sendData.serving,
      name: sendData.name,
      goal: goal,
    };
    setDelayToast(true);
    setTimeout(() => {
      if (!sendData.name.trim()) {
        showToast("Please add dish name");
        return;
      } else if (sendData.name.trim().length > 20) {
        showToast("The name must be less than 20 characters");
        return;
      } else if (sendData.serving === 0) {
        showToast("Please enter number of serving");
        return;
      } else {
        const timerId = setTimeout(() => {
          setIsLoading(true);
          dispatch(actAIFood(data))
            .unwrap()
            .then((res) => {
              setReadyDishData({
                kcal: res.data.kcal,
                protein: res.data.protein,
                fats: res.data.fats,
                carbs: res.data.carbs,
                totalQuantity: res.data.total,
              });
              setDataHandler(
                "explane",
                jsonToStrForFoodIA(
                  res.data,
                  words.ingredients,
                  words.preparation
                )
              );
              setShowAIFoodDetails(true);
              setShowAIFoodDetails2(false);
              setShowAIFoodDetails3(false);
            })
            .catch((e) => {
              ErrorToast("There is a problem on the server");
            })
            .finally(() => {
              setIsLoading(false);
            });
        }, 100);

        return () => clearTimeout(timerId);
      }
    }, 100);
  };

  const [AITextFoodName, setAITextFoodName] = useState("");

  const generateSuggestionFoodAi = () => {
    let goal = focusState === 0 ? "normal" : focusState === 1 ? "less" : "more";
    const data = {
      foodType: name,
      serving: sendData.serving,
      goal: goal,
    };

    setDelayToast(true);
    setTimeout(() => {
      if (sendData.serving === 0) {
        showToast("Please enter number of serving");
        return;
      } else {
        setIsLoading(true);
        const timerId = setTimeout(() => {
          dispatch(actAIFoodSuggestion(data))
            .unwrap()
            .then((res) => {
              setReadyDishData({
                kcal: res.data.kcal,
                protein: res.data.protein,
                fats: res.data.fats,
                carbs: res.data.carbs,
                totalQuantity: res.data.total,
              });
              setDataHandler(
                "explane",
                jsonToStrForFoodIA(
                  res.data,
                  words.ingredients,
                  words.preparation
                )
              );
              setAITextFoodName(res.data.name);
              setShowAIFoodDetails(false);
              setShowAIFoodDetails2(true);
              setShowAIFoodDetails3(false);
            })
            .catch((e) => {
              ErrorToast("There is a problem on the server");
            })
            .finally(() => {
              setIsLoading(false);
            });
        }, 100);

        return () => clearTimeout(timerId);
      }
    }, 100);
  };

  const [AITextFoodName2, setAITextFoodName2] = useState("");

  const generateFoodAiByIngredients = () => {
    let goal = focusState === 0 ? "normal" : focusState === 1 ? "less" : "more";
    const data = {
      foodIngredients: AITextFoodName2,
      foodType: name,
      serving: sendData.serving,
      goal: goal,
    };

    setDelayToast(true);
    setTimeout(() => {
      if (sendData.serving === 0) {
        showToast("Please enter number of serving");
        return;
      } else {
        setIsLoading(true);
        const timerId = setTimeout(() => {
          dispatch(actAIFoodIngredients(data))
            .unwrap()
            .then((res) => {
              setReadyDishData({
                kcal: res.data.kcal,
                protein: res.data.protein,
                fats: res.data.fats,
                carbs: res.data.carbs,
                totalQuantity: res.data.total,
              });
              setDataHandler(
                "explane",
                jsonToStrForFoodIA(
                  res.data,
                  words.ingredients,
                  words.preparation
                )
              );
              setAITextFoodName2(res.data.name);
              setShowAIFoodDetails(false);
              setShowAIFoodDetails2(false);
              setShowAIFoodDetails3(true);
            })
            .catch((e) => {
              ErrorToast("There is a problem on the server");
            })
            .finally(() => {
              setIsLoading(false);
            });
        }, 100);

        return () => clearTimeout(timerId);
      }
    }, 100);
  };

  const stateBtnsArray = [
    {
      name: words.normalCalories,
      icon: homeFood,
      onPress: () => {
        setFocusState(0);
      },
      page: 0,
    },
    {
      name: words.lowCalories,
      icon: AIFood,
      onPress: () => {
        setFocusState(1);
      },
      page: 1,
    },
    {
      name: words.highCalories,
      icon: readyFood,
      onPress: () => {
        setFocusState(2);
      },
      page: 2,
    },
  ];

  // //////////////////////////////

  // page 3
  const [isOpenReadyDishSelect, setIsOpenReadyDishSelect] = useState(false);

  const [readyDishData, setReadyDishData] = useState({
    kcal: 0,
    protein: 0,
    fats: 0,
    carbs: 0,
    totalQuantity: 0,
  });
  const [readyDishDataOne, setReadyDishDataOne] = useState({
    field: "",
    value: 0,
  });

  const selectDishOneHandler = (
    field: "kcal" | "protein" | "fats" | "carbs" | "totalQuantity"
  ) => {
    setReadyDishDataOne({
      field: field,
      value: readyDishData[field],
    });
    setIsOpenReadyDishSelect(true);
  };

  const setReadyDishDataHandler = (value) => {
    setReadyDishData({
      ...readyDishData,
      [readyDishDataOne.field]: value,
    });
  };

  useEffect(() => {
    if (readyDishData.totalQuantity !== 0) {
      dispatch(addCalcolateTotal(readyDishData));
    }
  }, [readyDishData]);

  useEffect(() => {
    if (AITextFoodName.length !== 0) {
      setDataHandler("name", AITextFoodName);
    }
  }, [AITextFoodName]);

  useEffect(() => {
    if (AITextFoodName2.length !== 0) {
      setDataHandler("name", AITextFoodName2);
    }
  }, [AITextFoodName2]);

  // anime

  const translateY = useSharedValue<number>(-5);

  useEffect(() => {
    const shouldAnimate =
      !sevingVisible &&
      !textEditorVisible &&
      !addImageVisible &&
      !isOpenReadyDishSelect;

    if (shouldAnimate) {
      translateY.value = withRepeat(
        withTiming(10, { duration: 800 }), // يصعد
        -1, // لا نهائي
        true // يرجع (ينزل ويرجع)
      );
    } else {
      translateY.value = withTiming(-5);
    }
  }, [
    sevingVisible,
    textEditorVisible,
    addImageVisible,
    isOpenReadyDishSelect,
  ]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  const ErrorToast = (item) => {
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

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isOpen}
      onRequestClose={() => {
        setIsOpen(false);
      }}
      statusBarTranslucent={true}
      navigationBarTranslucent={true}
    >
      <MotiSafeAreaView
        style={[
          styles.body,
          {
            backgroundColor: themeData["background-secondary-2"],
            alignItems: "center",
            justifyContent: "space-between",
          },
        ]}
      >
        <View style={{ height: height * 0.08 }}>
          <HeaderPages
            right={
              isFocusPage === 0 || isFocusPage === 1 || isFocusPage === 2
                ? false
                : true
            }
            onPressRight={() => {
              setAddFoodVisible(true);
            }}
            onpress={() => {
              setIsOpen(false);
            }}
            header={words.addAiMeal}
            title={""}
            text=""
          />
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            style={{
              alignItems: "center",
            }}
          >
            <View
              style={{
                width,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-evenly",
                paddingBottom: 10,
                height: height * 0.08,
              }}
            >
              {pagesArray.map((item, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    style={{
                      backgroundColor: themeData["background-secondary"],
                      borderRadius: 10,
                      padding: 14,
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-around",
                      gap: 8,
                    }}
                    onPress={item.onPress}
                  >
                    <Text
                      style={[
                        styles.pagerBtnText,
                        {
                          color: themeData["text-secondary"],
                        },
                        isFocusPage === item.page
                          ? {
                              color: themeData["background-primary"],
                            }
                          : {},
                      ]}
                    >
                      {item?.name}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            <Packet
              packetStyle={[
                styles.packet,
                {
                  borderColor: themeData["background-secondary"],
                  paddingTop: 10,
                  alignItems: "center",
                  height: height * 0.58,
                },
              ]}
            >
              <PagerView
                style={{
                  flex: 1,
                  width: width * 0.9,
                  alignItems: "center",
                  justifyContent: "center",
                }}
                ref={ref}
                initialPage={0}
                onPageSelected={(e) => {
                  const selectedPage = e.nativeEvent.position;
                  setIsFocusPage(selectedPage);
                }}
              >
                {/* Page 1 */}

                <View key="1" style={{ flex: 1, alignItems: "center" }}>
                  {/* message */}
                  <View
                    style={{
                      width: width * 0.89,
                      backgroundColor: themeData["background-secondary"],
                      borderRadius: 10,
                      paddingVertical: 14,
                      paddingHorizontal: 20,
                      marginBottom: 10,
                      flexDirection: "row",
                      justifyContent: "space-evenly",
                      alignItems: "center",
                      gap: 16,
                      // marginHorizontal: 5,
                    }}
                  >
                    <View>
                      {!sevingVisible &&
                      !textEditorVisible &&
                      !isOpenReadyDishSelect &&
                      !addImageVisible ? (
                        <Animated.Image
                          source={AIFood}
                          style={[{ width: 32, height: 32 }, animatedStyle]}
                        />
                      ) : (
                        <Image
                          source={AIFood}
                          style={[{ width: 32, height: 32 }]}
                        />
                      )}
                    </View>
                    <Text
                      style={{
                        color: themeData["text-primary"],
                        fontSize: 12,
                        width: width * 0.7,
                        direction: lang === "ar" ? "rtl" : "ltr",
                      }}
                    >
                      {words.msgCraving}
                    </Text>
                  </View>
                  <ScrollView>
                    {/* food data */}
                    <View
                      style={[
                        styles.middlePartHead,
                        {
                          width: width * 0.9,
                          gap: 10,
                        },
                      ]}
                    >
                      {/* image */}

                      <TouchableOpacity
                        onPress={() => {
                          setAddImageVisible(true);
                        }}
                      >
                        <Image
                          source={
                            sendData.iconName
                              ? getFoodIcon(sendData.iconName)
                              : image
                          }
                          style={styles.middlePartIcon}
                        />
                      </TouchableOpacity>

                      {/* name */}
                      <TextInput
                        onChangeText={(text) => {
                          setDataHandler("name", text);
                        }}
                        value={sendData.name}
                        style={[
                          styles.input,
                          {
                            borderColor: themeData["background-secondary"],
                            color: themeData["text-secondary"],
                          },
                        ]}
                        placeholder={words["meal name"]}
                        placeholderTextColor={themeData["text-secondary"]}
                      />

                      {/* serving */}
                      <TouchableOpacity
                        onPress={() => {
                          setSevingVisible(true);
                        }}
                        style={{ alignItems: "center" }}
                      >
                        <View
                          style={{
                            position: "absolute",
                            transform: [{ translateY: -20 }],
                            width: 25,
                            height: 25,
                            borderRadius: 20,
                            justifyContent: "center",
                            alignItems: "center",
                            backgroundColor: themeData["background-secondary"],
                            // zIndex: 900,
                          }}
                        >
                          <Text
                            style={{
                              color: themeData["text-primary"],
                              fontSize: 12,
                            }}
                          >
                            {sendData.serving}
                          </Text>
                        </View>
                        <Image
                          source={foodTable}
                          style={styles.middlePartIcon}
                        />
                      </TouchableOpacity>

                      {/* explane */}

                      <TouchableOpacity
                        onPress={() => {
                          setTextEditorVisible(true);
                        }}
                      >
                        {!sendData.explane && (
                          <View
                            style={{
                              width: 15,
                              height: 15,
                              backgroundColor: "#FFF",
                              borderRadius: 10,
                              alignItems: "center",
                              justifyContent: "center",
                              position: "absolute",
                              transform: [
                                { translateY: -15 },
                                { translateX: 9 },
                              ],
                            }}
                          >
                            <Image
                              source={explane}
                              style={{ width: 20, height: 20 }}
                            />
                          </View>
                        )}
                        {!sendData.explane && (
                          <Image
                            source={noteWrite}
                            style={[
                              styles.middlePartIcon,
                              {
                                width: 35,
                                height: 35,
                              },
                            ]}
                          />
                        )}
                        {sendData.explane && (
                          <Image
                            source={noteOk}
                            style={[
                              styles.middlePartIcon,
                              {
                                width: 35,
                                height: 35,
                              },
                            ]}
                          />
                        )}
                      </TouchableOpacity>
                    </View>

                    {/* select food state */}
                    <View
                      style={{
                        gap: 15,
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                        marginVertical: 6,
                      }}
                    >
                      {stateBtnsArray.map((item, index) => {
                        return (
                          <TouchableOpacity
                            onPress={item.onPress}
                            key={index}
                            style={{
                              backgroundColor:
                                themeData["background-secondary"],
                              borderWidth: 1,
                              borderColor:
                                item.page == focusState
                                  ? themeData["background-primary"]
                                  : themeData["background-secondary"],
                              width: width * 0.25,
                              alignItems: "center",
                              justifyContent: "center",
                              paddingVertical: 10,
                              borderRadius: 7,
                            }}
                          >
                            <Text
                              style={{
                                color:
                                  item.page == focusState
                                    ? themeData["background-primary"]
                                    : themeData["text-primary"],
                                fontSize: 10,
                              }}
                            >
                              {item.name}
                            </Text>
                          </TouchableOpacity>
                        );
                      })}
                    </View>
                    {/* generate btn */}
                    <View
                      style={{
                        gap: 15,
                        alignItems: "center",
                      }}
                    >
                      <Btn
                        bgColor="background-primary"
                        text={words.generate}
                        onPress={generateFoodAi}
                        textColor="#fff"
                        btnTextStyle={{ color: "#fff" }}
                        btnStyle={{
                          width: width * 0.8,
                          marginVertical: 10,
                        }}
                      />
                    </View>
                    {/* edit food data */}
                    <View
                      style={{
                        gap: 10,
                        display:
                          showAIFoodDetails && isFocusPage === 0
                            ? "flex"
                            : "none",
                      }}
                    >
                      <View style={styles.prepredDishView}>
                        <TouchableOpacity
                          onPress={() => {
                            selectDishOneHandler("kcal");
                          }}
                          style={[
                            styles.prepredDishBtn,
                            {
                              borderColor: themeData["background-secondary"],
                            },
                          ]}
                        >
                          <Text
                            style={{ color: themeData["background-primary"] }}
                          >
                            {myAddTotalDish.kcal} Kcal
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => {
                            selectDishOneHandler("protein");
                          }}
                          style={[
                            styles.prepredDishBtn,
                            {
                              borderColor: themeData["background-secondary"],
                            },
                          ]}
                        >
                          <Text style={{ color: themeData["secondary-meal1"] }}>
                            {" "}
                            {myAddTotalDish.protein} Protein
                          </Text>
                        </TouchableOpacity>
                      </View>
                      <View style={styles.prepredDishView}>
                        <TouchableOpacity
                          onPress={() => {
                            selectDishOneHandler("fats");
                          }}
                          style={[
                            styles.prepredDishBtn,
                            {
                              borderColor: themeData["background-secondary"],
                            },
                          ]}
                        >
                          <Text style={{ color: themeData["secondary-meal2"] }}>
                            {" "}
                            {myAddTotalDish.fats} Fats
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => {
                            selectDishOneHandler("carbs");
                          }}
                          style={[
                            styles.prepredDishBtn,
                            {
                              borderColor: themeData["background-secondary"],
                            },
                          ]}
                        >
                          <Text style={{ color: themeData["secondary-meal3"] }}>
                            {" "}
                            {myAddTotalDish.carbs} Carbs
                          </Text>
                        </TouchableOpacity>
                      </View>
                      <View style={styles.prepredDishView}>
                        <TouchableOpacity
                          onPress={() => {
                            selectDishOneHandler("totalQuantity");
                          }}
                          style={[
                            styles.prepredDishBtn,
                            {
                              borderColor: themeData["background-secondary"],
                              width: width * 0.8 + 10,
                            },
                          ]}
                        >
                          <Text
                            style={{
                              color: themeData["text-primary"],
                              textAlign: "center",
                            }}
                          >
                            {myAddTotalDish.totalQuantity} Gram
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </ScrollView>
                </View>

                {/* page 2 */}

                <View key="2" style={{ flex: 1, alignItems: "center" }}>
                  <View
                    style={{
                      width: width * 0.89,
                      backgroundColor: themeData["background-secondary"],
                      borderRadius: 10,
                      paddingVertical: 20,
                      paddingHorizontal: 20,
                      marginBottom: 10,
                      flexDirection: "row",
                      justifyContent: "space-evenly",
                      alignItems: "center",
                      gap: 16,
                    }}
                  >
                    <View>
                      {!sevingVisible &&
                      !textEditorVisible &&
                      !isOpenReadyDishSelect &&
                      !addImageVisible ? (
                        <Animated.Image
                          source={AIFood}
                          style={[{ width: 32, height: 32 }, animatedStyle]}
                        />
                      ) : (
                        <Image
                          source={AIFood}
                          style={[{ width: 32, height: 32 }]}
                        />
                      )}
                    </View>
                    <Text
                      style={{
                        color: themeData["text-primary"],
                        fontSize: 12,
                        width: width * 0.7,
                        direction: lang === "ar" ? "rtl" : "ltr",
                      }}
                    >
                      {words.msgNotSure}
                    </Text>
                  </View>

                  <View
                    style={[
                      styles.middlePartHead,
                      {
                        width: width * 0.9,
                        gap: 10,
                        alignItems: "center",
                      },
                    ]}
                  >
                    {/* image */}

                    <TouchableOpacity
                      onPress={() => {
                        setAddImageVisible(true);
                      }}
                    >
                      <Image
                        source={
                          sendData.iconName
                            ? getFoodIcon(sendData.iconName)
                            : image
                        }
                        style={styles.middlePartIcon}
                      />
                    </TouchableOpacity>

                    {/* name */}
                    <TextInput
                      onChangeText={(text) => {
                        setAITextFoodName(text);
                      }}
                      editable={AITextFoodName.length === 0 ? false : true}
                      value={AITextFoodName}
                      style={[
                        styles.input,
                        {
                          borderColor: themeData["background-secondary"],
                          color: themeData["text-secondary"],
                        },
                      ]}
                      placeholder=""
                      placeholderTextColor={themeData["text-secondary"]}
                    />

                    {/* serving */}
                    <TouchableOpacity
                      onPress={() => {
                        setSevingVisible(true);
                      }}
                      style={{ alignItems: "center" }}
                    >
                      <View
                        style={{
                          position: "absolute",
                          transform: [{ translateY: -20 }],
                          width: 25,
                          height: 25,
                          borderRadius: 20,
                          justifyContent: "center",
                          alignItems: "center",
                          backgroundColor: themeData["background-secondary"],
                          // zIndex: 900,
                        }}
                      >
                        <Text
                          style={{
                            color: themeData["text-primary"],
                            fontSize: 12,
                          }}
                        >
                          {sendData.serving}
                        </Text>
                      </View>
                      <Image source={foodTable} style={styles.middlePartIcon} />
                    </TouchableOpacity>

                    {/* explane */}

                    <TouchableOpacity
                      onPress={() => {
                        setTextEditorVisible(true);
                      }}
                    >
                      {!sendData.explane && (
                        <View
                          style={{
                            width: 15,
                            height: 15,
                            backgroundColor: "#FFF",
                            borderRadius: 10,
                            alignItems: "center",
                            justifyContent: "center",
                            position: "absolute",
                            transform: [{ translateY: -15 }, { translateX: 9 }],
                          }}
                        >
                          <Image
                            source={explane}
                            style={{ width: 20, height: 20 }}
                          />
                        </View>
                      )}
                      {!sendData.explane && (
                        <Image
                          source={noteWrite}
                          style={[
                            styles.middlePartIcon,
                            {
                              width: 35,
                              height: 35,
                            },
                          ]}
                        />
                      )}
                      {sendData.explane && (
                        <Image
                          source={noteOk}
                          style={[
                            styles.middlePartIcon,
                            {
                              width: 35,
                              height: 35,
                            },
                          ]}
                        />
                      )}
                    </TouchableOpacity>
                  </View>

                  {/* select food state */}
                  <View
                    style={{
                      gap: 15,
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center",
                      marginVertical: 6,
                    }}
                  >
                    {stateBtnsArray.map((item, index) => {
                      return (
                        <TouchableOpacity
                          onPress={item.onPress}
                          key={index}
                          style={{
                            backgroundColor: themeData["background-secondary"],
                            borderWidth: 1,
                            borderColor:
                              item.page == focusState
                                ? themeData["background-primary"]
                                : themeData["background-secondary"],
                            width: width * 0.25,
                            alignItems: "center",
                            justifyContent: "center",
                            paddingVertical: 10,
                            borderRadius: 7,
                          }}
                        >
                          <Text
                            style={{
                              color:
                                item.page == focusState
                                  ? themeData["background-primary"]
                                  : themeData["text-primary"],
                              fontSize: 10,
                            }}
                          >
                            {item.name}
                          </Text>
                        </TouchableOpacity>
                      );
                    })}
                  </View>

                  {/* generate btn */}
                  <View
                    style={{
                      gap: 15,
                      alignItems: "center",
                    }}
                  >
                    <Btn
                      bgColor="background-primary"
                      text={words.generate}
                      onPress={generateSuggestionFoodAi}
                      textColor="#fff"
                      btnTextStyle={{ color: "#fff" }}
                      btnStyle={{
                        width: width * 0.8,
                        marginVertical: 10,
                      }}
                    />
                  </View>

                  {/* edit food data */}
                  {showAIFoodDetails2 && isFocusPage === 1 ? (
                    <View style={{ gap: 10, marginVertical: 10 }}>
                      <View style={styles.prepredDishView}>
                        <TouchableOpacity
                          onPress={() => {
                            selectDishOneHandler("kcal");
                          }}
                          style={[
                            styles.prepredDishBtn,
                            {
                              borderColor: themeData["background-secondary"],
                            },
                          ]}
                        >
                          <Text
                            style={{ color: themeData["background-primary"] }}
                          >
                            {myAddTotalDish.kcal} Kcal
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => {
                            selectDishOneHandler("protein");
                          }}
                          style={[
                            styles.prepredDishBtn,
                            {
                              borderColor: themeData["background-secondary"],
                            },
                          ]}
                        >
                          <Text style={{ color: themeData["secondary-meal1"] }}>
                            {" "}
                            {myAddTotalDish.protein} Protein
                          </Text>
                        </TouchableOpacity>
                      </View>
                      <View style={styles.prepredDishView}>
                        <TouchableOpacity
                          onPress={() => {
                            selectDishOneHandler("fats");
                          }}
                          style={[
                            styles.prepredDishBtn,
                            {
                              borderColor: themeData["background-secondary"],
                            },
                          ]}
                        >
                          <Text style={{ color: themeData["secondary-meal2"] }}>
                            {" "}
                            {myAddTotalDish.fats} Fats
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => {
                            selectDishOneHandler("carbs");
                          }}
                          style={[
                            styles.prepredDishBtn,
                            {
                              borderColor: themeData["background-secondary"],
                            },
                          ]}
                        >
                          <Text style={{ color: themeData["secondary-meal3"] }}>
                            {" "}
                            {myAddTotalDish.carbs} Carbs
                          </Text>
                        </TouchableOpacity>
                      </View>
                      <View style={styles.prepredDishView}>
                        <TouchableOpacity
                          onPress={() => {
                            selectDishOneHandler("totalQuantity");
                          }}
                          style={[
                            styles.prepredDishBtn,
                            {
                              borderColor: themeData["background-secondary"],
                              width: width * 0.8 + 10,
                            },
                          ]}
                        >
                          <Text
                            style={{
                              color: themeData["text-primary"],
                              textAlign: "center",
                            }}
                          >
                            {myAddTotalDish.totalQuantity} Gram
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  ) : (
                    ""
                  )}
                </View>

                {/* page 3 */}

                <View key="3" style={{ flex: 1, alignItems: "center" }}>
                  <View
                    style={{
                      width: width * 0.89,
                      backgroundColor: themeData["background-secondary"],
                      borderRadius: 10,
                      paddingVertical: 20,
                      paddingHorizontal: 20,
                      marginBottom: 10,
                      flexDirection: "row",
                      justifyContent: "space-evenly",
                      alignItems: "center",
                      gap: 16,
                    }}
                  >
                    <View>
                      {!sevingVisible &&
                      !textEditorVisible &&
                      !isOpenReadyDishSelect &&
                      !addImageVisible ? (
                        <Animated.Image
                          source={AIFood}
                          style={[{ width: 32, height: 32 }, animatedStyle]}
                        />
                      ) : (
                        <Image
                          source={AIFood}
                          style={[{ width: 32, height: 32 }]}
                        />
                      )}
                    </View>
                    <Text
                      style={{
                        color: themeData["text-primary"],
                        fontSize: 12,
                        width: width * 0.7,
                        direction: lang === "ar" ? "rtl" : "ltr",
                      }}
                    >
                      {words.msgFridge}
                    </Text>
                  </View>

                  <View
                    style={[
                      styles.middlePartHead,
                      {
                        width: width * 0.9,
                        gap: 10,
                        alignItems: "center",
                      },
                    ]}
                  >
                    {/* image */}

                    <TouchableOpacity
                      onPress={() => {
                        setAddImageVisible(true);
                      }}
                    >
                      <Image
                        source={
                          sendData.iconName
                            ? getFoodIcon(sendData.iconName)
                            : image
                        }
                        style={styles.middlePartIcon}
                      />
                    </TouchableOpacity>

                    {/* name */}
                    <TextInput
                      onChangeText={(text) => {
                        setAITextFoodName2(text);
                      }}
                      value={AITextFoodName2}
                      style={[
                        styles.input,
                        {
                          borderColor: themeData["background-secondary"],
                          color: themeData["text-secondary"],
                        },
                      ]}
                      placeholder={words.listItems}
                      placeholderTextColor={themeData["text-secondary"]}
                    />

                    {/* serving */}
                    <TouchableOpacity
                      onPress={() => {
                        setSevingVisible(true);
                      }}
                      style={{ alignItems: "center" }}
                    >
                      <View
                        style={{
                          position: "absolute",
                          transform: [{ translateY: -20 }],
                          width: 25,
                          height: 25,
                          borderRadius: 20,
                          justifyContent: "center",
                          alignItems: "center",
                          backgroundColor: themeData["background-secondary"],
                          // zIndex: 900,
                        }}
                      >
                        <Text
                          style={{
                            color: themeData["text-primary"],
                            fontSize: 12,
                          }}
                        >
                          {sendData.serving}
                        </Text>
                      </View>
                      <Image source={foodTable} style={styles.middlePartIcon} />
                    </TouchableOpacity>

                    {/* explane */}

                    <TouchableOpacity
                      onPress={() => {
                        setTextEditorVisible(true);
                      }}
                    >
                      {!sendData.explane && (
                        <View
                          style={{
                            width: 15,
                            height: 15,
                            backgroundColor: "#FFF",
                            borderRadius: 10,
                            alignItems: "center",
                            justifyContent: "center",
                            position: "absolute",
                            transform: [{ translateY: -15 }, { translateX: 9 }],
                          }}
                        >
                          <Image
                            source={explane}
                            style={{ width: 20, height: 20 }}
                          />
                        </View>
                      )}
                      {!sendData.explane && (
                        <Image
                          source={noteWrite}
                          style={[
                            styles.middlePartIcon,
                            {
                              width: 35,
                              height: 35,
                            },
                          ]}
                        />
                      )}
                      {sendData.explane && (
                        <Image
                          source={noteOk}
                          style={[
                            styles.middlePartIcon,
                            {
                              width: 35,
                              height: 35,
                            },
                          ]}
                        />
                      )}
                    </TouchableOpacity>
                  </View>

                  {/* select food state */}
                  <View
                    style={{
                      gap: 15,
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center",
                      marginVertical: 6,
                    }}
                  >
                    {stateBtnsArray.map((item, index) => {
                      return (
                        <TouchableOpacity
                          onPress={item.onPress}
                          key={index}
                          style={{
                            backgroundColor: themeData["background-secondary"],
                            borderWidth: 1,
                            borderColor:
                              item.page == focusState
                                ? themeData["background-primary"]
                                : themeData["background-secondary"],
                            width: width * 0.25,
                            alignItems: "center",
                            justifyContent: "center",
                            paddingVertical: 10,
                            borderRadius: 7,
                          }}
                        >
                          <Text
                            style={{
                              color:
                                item.page == focusState
                                  ? themeData["background-primary"]
                                  : themeData["text-primary"],
                              fontSize: 10,
                            }}
                          >
                            {item.name}
                          </Text>
                        </TouchableOpacity>
                      );
                    })}
                  </View>

                  {/* generate btn */}
                  <View
                    style={{
                      gap: 15,
                      alignItems: "center",
                    }}
                  >
                    <Btn
                      bgColor="background-primary"
                      text={words.generate}
                      onPress={generateFoodAiByIngredients}
                      textColor="#fff"
                      btnTextStyle={{ color: "#fff" }}
                      btnStyle={{
                        width: width * 0.8,
                        marginVertical: 10,
                      }}
                    />
                  </View>

                  {/* edit food data */}
                  {showAIFoodDetails3 && isFocusPage === 2 ? (
                    <View style={{ gap: 10, marginVertical: 10 }}>
                      <View style={styles.prepredDishView}>
                        <TouchableOpacity
                          onPress={() => {
                            selectDishOneHandler("kcal");
                          }}
                          style={[
                            styles.prepredDishBtn,
                            {
                              borderColor: themeData["background-secondary"],
                            },
                          ]}
                        >
                          <Text
                            style={{ color: themeData["background-primary"] }}
                          >
                            {myAddTotalDish.kcal} Kcal
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => {
                            selectDishOneHandler("protein");
                          }}
                          style={[
                            styles.prepredDishBtn,
                            {
                              borderColor: themeData["background-secondary"],
                            },
                          ]}
                        >
                          <Text style={{ color: themeData["secondary-meal1"] }}>
                            {" "}
                            {myAddTotalDish.protein} Protein
                          </Text>
                        </TouchableOpacity>
                      </View>
                      <View style={styles.prepredDishView}>
                        <TouchableOpacity
                          onPress={() => {
                            selectDishOneHandler("fats");
                          }}
                          style={[
                            styles.prepredDishBtn,
                            {
                              borderColor: themeData["background-secondary"],
                            },
                          ]}
                        >
                          <Text style={{ color: themeData["secondary-meal2"] }}>
                            {" "}
                            {myAddTotalDish.fats} Fats
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => {
                            selectDishOneHandler("carbs");
                          }}
                          style={[
                            styles.prepredDishBtn,
                            {
                              borderColor: themeData["background-secondary"],
                            },
                          ]}
                        >
                          <Text style={{ color: themeData["secondary-meal3"] }}>
                            {" "}
                            {myAddTotalDish.carbs} Carbs
                          </Text>
                        </TouchableOpacity>
                      </View>
                      <View style={styles.prepredDishView}>
                        <TouchableOpacity
                          onPress={() => {
                            selectDishOneHandler("totalQuantity");
                          }}
                          style={[
                            styles.prepredDishBtn,
                            {
                              borderColor: themeData["background-secondary"],
                              width: width * 0.8 + 10,
                            },
                          ]}
                        >
                          <Text
                            style={{
                              color: themeData["text-primary"],
                              textAlign: "center",
                            }}
                          >
                            {myAddTotalDish.totalQuantity} Gram
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  ) : (
                    ""
                  )}
                </View>
              </PagerView>
            </Packet>
            <Packet
              packetStyle={[
                styles.packet2,
                {
                  borderColor: themeData["background-secondary"],
                  height: height * 0.16,
                },
              ]}
            >
              <View
                style={{
                  marginBottom: 10,
                  flexDirection: "row",
                  justifyContent: "space-around",
                  flexWrap: "wrap",
                  rowGap: 15,
                  paddingTop: 10,
                }}
              >
                {totalData.map((item, index) => {
                  return (
                    <CycleDisplayData
                      key={index}
                      color={item.color}
                      text1={item.value.toString()}
                      text2={item.title}
                    />
                  );
                })}
              </View>
            </Packet>

            <View
              style={{
                alignItems: "center",
                height: height * 0.08,
                transform: [{ translateY: -5 }],
              }}
            >
              <TouchableOpacity
                onPress={saveDishHandler}
                style={[
                  styles.saveBtn,
                  {
                    backgroundColor: themeData["background-primary"],
                    marginTop: 10,
                  },
                ]}
              >
                <Text style={[{ color: "#fff" }]}>{words.Save}</Text>
              </TouchableOpacity>
            </View>

            {/* error/success message */}
            <View style={{ position: "absolute", bottom: 0, zIndex: 400 }}>
              {delayToast ? <Toast /> : <></>}
            </View>

            {addFoodVisible && (
              <ModalMyDishAddFood
                isOpen={addFoodVisible}
                name={name}
                isOpenFunc={() => {
                  setAddFoodVisible(false);
                }}
              />
            )}

            {addImageVisible && (
              <ModalAddImage
                isOpen={addImageVisible}
                isOpenFunc={() => {
                  setAddImageVisible(false);
                }}
                setFoodImage={iconSelectHandler}
              />
            )}

            {sevingVisible && (
              <ModalGeneralSelectGram
                isOpen={sevingVisible}
                setIsOpen={setSevingVisible}
                quantity={sendData.serving}
                unit={""}
                updateHandler={servingSelectHandler}
                message={words.chooseServings}
                typeOfSelect="selectServing"
              />
            )}
            {/* page2 */}

            {isOpenReadyDishSelect && (
              <ModalGeneralSelectGram
                isOpen={isOpenReadyDishSelect}
                setIsOpen={setIsOpenReadyDishSelect}
                quantity={readyDishDataOne.value}
                unit={""}
                updateHandler={setReadyDishDataHandler}
                message={`${words.chooseNumberOf} ${readyDishDataOne.field}`}
                typeOfSelect={readyDishDataOne.field}
              />
            )}

            {textEditorVisible && (
              <ModalTextEditor
                isOpen={textEditorVisible}
                setIsOpen={setTextEditorVisible}
                setExplaneText={setDataHandler}
                explane={sendData.explane}
              />
            )}
            {isLoading && (
              <ModalLoadingUsageAllPage isOpen={isLoading} text={"Loading"} />
            )}
            {dishSave && (
              <ModalLoadingUsageAllPage
                isOpen={dishSave}
                text={"Loading ... "}
              />
            )}
          </View>
        </ScrollView>
      </MotiSafeAreaView>
    </Modal>
  );
};

export default ModalAddNewAIDish;

const styles = StyleSheet.create({
  body: {
    flex: 1,
    paddingTop: 30,
    width: width,
    alignItems: "center",
    justifyContent: "space-between",
  },
  packet: {
    borderWidth: 4,
    marginBottom: 10,
    height: height * 0.5,
    paddingBottom: 6,
  },

  packet2: {
    borderWidth: 4,
    borderColor: "#eee",
    marginBottom: 10,
    height: height * 0.23,
    justifyContent: "center",
  },

  inputBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 5,
  },
  middlePartHeadBody: {
    gap: 10,
  },
  middlePartHead: {
    flexDirection: "row",
    marginVertical: 10,
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },
  middlePartIcon: {
    height: 30,
    width: 30,
  },
  input: {
    borderWidth: 3,
    borderRadius: 12,
    width: width * 0.57,
    padding: 12,
  },
  cart: {
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 20,
  },
  cartTop: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cartBotton: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    alignItems: "center",
  },

  cartRightIcon: {
    width: 16,
    height: 16,
  },

  cartRightIconView: {
    padding: 8,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  kcalInput: {
    fontSize: 10,
  },
  saveBtn: {
    width: width * 0.66,
    borderRadius: 12,
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    zIndex: 2,
  },

  pagerBtn: {
    borderWidth: 4,
    borderColor: "red",
    borderRadius: 10,
    padding: 10,
    width: width * 0.4,
    justifyContent: "center",
    alignItems: "center",
  },
  pagerBtnText: {
    fontSize: 11,
    fontWeight: 600,
  },

  // page 2

  prepredDishView: {
    width: width * 0.9,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  prepredDishBtn: {
    width: width * 0.4,
    borderWidth: 3,
    padding: 15,
    borderRadius: 16,
  },
});
