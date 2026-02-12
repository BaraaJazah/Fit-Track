import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { CycleDisplayData, HeaderPages } from "../../screens/home";
import { useAppDispatch, useAppSelector } from "../../../hooks/storeHook";
import { OwnDishCart, Packet } from "../../common";
import { ModalAddFoodToMeal, ModalSelectExercise, ModalShowDetails } from "..";
import { deleteFood } from "../../../store/user/userSlice";
import { calcBurnForExercise } from "../../../hooks/calcBurnForExercise";
import OwnExerciseCart from "../../screens/Exercise/OwnExerciseCart";
import LottieFile from "../../../constants/loffieFile/LottieFile";
import {
  actSetMyCalender,
  checkIfDefferent,
} from "../../../store/calender/calenderSlice";
import Toast from "react-native-toast-message";

const { width, height } = Dimensions.get("window");

type Props = {
  isOpen: boolean;
  setIsOpen: (boolean) => void;
  name: "breakfast" | "lunch" | "dinner" | "snack" | "exercise";
};

const ModalAddMeal = ({ isOpen = false, setIsOpen, name }: Props) => {
  const dispatch = useAppDispatch();
  const { themeData, themeName } = useAppSelector((state) => state.theme);
  const { userDaily } = useAppSelector((state) => state.user);
  const { userData } = useAppSelector((state) => state.goal);
  const { lang, words } = useAppSelector((state) => state.lang);

  const [addFoodVisible, setAddFoodVisible] = useState(false);
  const [detailsVisible, setdetailsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [delyaModal, setDelyaModal] = useState(false);
  const [delayToast, setDelayToast] = useState(false);

  const [foodsData1, setfoodsData1] = useState([]);
  const [exerciseData, setExerciseData] = useState([]);

  const [foodDetails, setFoodDetails] = useState({});

  const foodName = name;
  let foodData = [];
  let exerciseDatas = [];

  useEffect(() => {
    setIsLoading(false);
    if (name === "breakfast") {
      foodData = userDaily?.breakfast;
    } else if (name === "dinner") {
      foodData = userDaily?.dinner;
    } else if (name === "lunch") {
      foodData = userDaily?.lunch;
    } else if (name === "snack") {
      foodData = userDaily?.snack;
    } else if (name === "exercise") {
      exerciseDatas = userDaily?.exercise;
      setExerciseData(exerciseDatas);
    }

    setfoodsData1(foodData);
    setIsLoading(true);
  }, [userDaily, name]);

  const addFoodHandler = (item) => {
    const data = {
      meal: name,
      mealData: item,
    };
    dispatch(deleteFood(data));
  };

  let totalBurn = 0;
  const total = {
    kcal: 0,
    protein: 0,
    fats: 0,
    carbs: 0,
  };
  if (foodsData1.length > 0) {
    foodsData1.map((item) => {
      total.kcal += item.kcal * (item.quan / 100);
      total.protein += item.protein * (item.quan / 100);
      total.fats += item.fats * (item.quan / 100);
      total.carbs += item.carbs * (item.quan / 100);
    });
  }

  if (exerciseData && exerciseData.length > 0) {
    exerciseData.map((item) => {
      totalBurn += Number(
        calcBurnForExercise(
          userData.userData.weight === 0 ? 70 : userData.userData.weight,
          item.quan,
          item.met
        )
      );
    });
  }
  const [showGramSelect, setShowGramSelect] = useState(false);

  const getFormattedDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0"); // الشهر يبدأ من 0
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const saveDishHandler = () => {
    setDelayToast(true);

    let totalData = {
      kcal: 0,
      protein: 0,
      fats: 0,
      carbs: 0,
      burn: 0,
    };
    userDaily.breakfast.map((item) => {
      totalData.kcal += item.kcal * (item.quan / 100);
      totalData.protein += item.protein * (item.quan / 100);
      totalData.fats += item.fats * (item.quan / 100);
      totalData.carbs += item.carbs * (item.quan / 100);
    });
    userDaily.lunch.map((item) => {
      totalData.kcal += item.kcal * (item.quan / 100);
      totalData.protein += item.protein * (item.quan / 100);
      totalData.fats += item.fats * (item.quan / 100);
      totalData.carbs += item.carbs * (item.quan / 100);
    });

    userDaily.dinner.map((item) => {
      totalData.kcal += item.kcal * (item.quan / 100);
      totalData.protein += item.protein * (item.quan / 100);
      totalData.fats += item.fats * (item.quan / 100);
      totalData.carbs += item.carbs * (item.quan / 100);
    });

    userDaily.snack.map((item) => {
      totalData.kcal += item.kcal * (item.quan / 100);
      totalData.protein += item.protein * (item.quan / 100);
      totalData.fats += item.fats * (item.quan / 100);
      totalData.carbs += item.carbs * (item.quan / 100);
    });

    userDaily.exercise.map((item) => {
      totalData.burn += Number(
        calcBurnForExercise(
          userData.userData.weight === 0 ? 70 : userData.userData.weight,
          60 * (item.quan / 60),
          item.met
        )
      );
    });

    const data = {
      day: getFormattedDate(),
      kcal: totalData.kcal.toFixed(0),
      protein: totalData.protein.toFixed(0),
      fats: totalData.fats.toFixed(0),
      carbs: totalData.carbs.toFixed(0),
      burn: totalData.burn.toFixed(0),
    };

    const checkIfChnaged = dispatch(checkIfDefferent(data));
    if (checkIfChnaged.payload !== 0) {
      dispatch(actSetMyCalender(data))
        .unwrap()
        .then(() => {
          SuccessToast("Meal saved successfully");
        })
        .catch((e) => {
          ErrorToast("There is an error on the server");
        });
    } else {
      ErrorToast("There is no change in your data");
    }
  };

  const ErrorToast = (item) => {
    setDelayToast(true);
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

  const SuccessToast = (item) => {
    setDelayToast(true);
    setTimeout(() => {
      let text = item.charAt(0).toUpperCase() + item.slice(1).toLowerCase();
      Toast.show({
        type: "success",
        text1: "Success",
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
      onRequestClose={() => setIsOpen(false)} // للاغلاف بزر الرجوع
      statusBarTranslucent={true}
      navigationBarTranslucent={true}
    >
      <View
        style={[
          styles.body,
          {
            backgroundColor: themeData["background-secondary-2"],
          },
        ]}
      >
        <View style={{}}>
          <View style={{ height: height * 0.09 }}>
            <HeaderPages
              right={true}
              onPressRight={() => {
                setDelyaModal(true);
                setAddFoodVisible(true);
              }}
              onpress={() => {
                setIsOpen(false);
              }}
              // header={`${words.add} ${words.foods}`}
              //  name === "exercise"
              header={
                name === "exercise"
                  ? `${words.add} ${words.exercises}`
                  : `${words.add} ${words.foods}`
              }
              title={`Add Your ${foodName}`}
              text=""
            />
          </View>

          <Packet
            packetStyle={[
              styles.packet,
              {
                borderColor: themeData["background-secondary"],
                paddingHorizontal: 10,
                alignItems: "center",
                direction: lang === "ar" ? "rtl" : "ltr",
              },
            ]}
          >
            <ScrollView
              contentContainerStyle={{}} // when use it the scroll will don't move
              fadingEdgeLength={10} // make fade in top and botton
              scrollEnabled={true} // make scroll anable
              showsVerticalScrollIndicator={false}
            >
              {isLoading && name !== "exercise" && foodsData1.length === 0 && (
                <LottieFile
                  lottieName="lottie_BookFood"
                  lottieWidth={width * 0.9}
                  lottieHeigh={height * 0.55}
                />
              )}

              {isLoading &&
                name !== "exercise" &&
                foodsData1.map((item, index) => {
                  return (
                    <View key={index}>
                      <OwnDishCart
                        onPressQuantity={() => {
                          setShowGramSelect(true);
                        }}
                        onPressDelete={() => {
                          addFoodHandler(item);
                        }}
                        onPressShowDetials={() => {
                          setFoodDetails(item);
                          // setdetailsVisible(true);
                        }}
                        data={item}
                        name={name}
                      />
                    </View>
                  );
                })}

              {isLoading && name == "exercise" && exerciseData.length === 0 && (
                <LottieFile
                  lottieName="lottie_exercise"
                  lottieWidth={width * 0.8}
                  lottieHeigh={width * 0.9}
                />
              )}

              {isLoading &&
                name === "exercise" &&
                exerciseData.map((item, index) => {
                  const burn = calcBurnForExercise(
                    userData.userData.weight === 0
                      ? 70
                      : userData.userData.weight,
                    60,
                    item.met
                  );
                  return (
                    <View key={index}>
                      <OwnExerciseCart
                        onPressQuantity={() => {
                          setShowGramSelect(true);
                        }}
                        onPressDelete={() => {
                          addFoodHandler(item);
                        }}
                        onPressShowDetials={() => {
                          setFoodDetails(item);
                          setdetailsVisible(true);
                        }}
                        data={item}
                        name={name}
                      />
                    </View>
                  );
                })}
            </ScrollView>
          </Packet>

          <Packet
            packetStyle={[
              styles.packet2,
              { borderColor: themeData["background-secondary"] },
            ]}
          >
            <View
              style={{
                marginBottom: 10,
                flexDirection: "row",
                justifyContent: "space-around",
                flexWrap: "wrap",
                rowGap: 30,
                paddingTop: 15,
              }}
            >
              {name === "exercise" ? (
                <View style={styles.packetTowpart}>
                  <View style={{ width: width * 0.06, alignItems: "center" }}>
                    <View
                      style={[
                        styles.packetTowpartView1,
                        { borderColor: themeData["secondary-meal2"] },
                      ]}
                    ></View>
                  </View>
                  <View
                    style={{
                      width: width * 0.15,
                      alignItems: "center",
                      position: "absolute",
                    }}
                  >
                    <Text
                      style={{
                        color: themeData["text-primary"],
                        fontSize: 12,
                        fontWeight: 500,
                      }}
                    >
                      {words.burn}
                    </Text>
                    <Text
                      style={{
                        color: themeData["text-secondary"],
                        fontSize: 10,
                        textAlign: "center",
                      }}
                    >
                      {totalBurn} {words.Kcal}
                    </Text>
                  </View>
                </View>
              ) : (
                <>
                  <CycleDisplayData
                    color={themeData["background-primary"]}
                    text1={`${total.kcal.toFixed(0)}g`}
                    text2={words.Kcal}
                  />
                  <CycleDisplayData
                    color={themeData["secondary-meal1"]}
                    text1={`${total.protein.toFixed(0)}g`}
                    text2={words.protein}
                  />
                  <CycleDisplayData
                    color={themeData["secondary-meal2"]}
                    text1={`${total.fats.toFixed(0)}g`}
                    text2={words.fats}
                  />
                  <CycleDisplayData
                    color={themeData["secondary-meal3"]}
                    text1={`${total.carbs.toFixed(0)}g`}
                    text2={words.carbs}
                  />
                </>
              )}
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

          <View
            style={{
              width: width * 0.96,
              position: "absolute",
              bottom: 0,
              zIndex: 400,
            }}
          >
            {delayToast ? <Toast /> : <></>}
          </View>

          {delyaModal && foodName !== "exercise" ? (
            <ModalAddFoodToMeal
              name={foodName}
              isOpen={addFoodVisible}
              isOpenFunc={() => {
                setDelyaModal(false);
                setAddFoodVisible(false);
              }}
            />
          ) : (
            ""
          )}
          {delyaModal && foodName === "exercise" ? (
            <ModalSelectExercise
              name={foodName}
              isOpen={addFoodVisible}
              isOpenFunc={() => {
                setDelyaModal(false);
                setAddFoodVisible(false);
              }}
            />
          ) : (
            ""
          )}
        </View>
      </View>
    </Modal>
  );
};

export default ModalAddMeal;

const styles = StyleSheet.create({
  body: {
    flex: 1,
    paddingTop: 30,
    width: width,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-between",
  },
  packet: {
    borderWidth: 4,
    marginBottom: 10,
    height: height * 0.64,
    paddingBottom: 6,
  },

  packet2: {
    borderWidth: 4,
    marginBottom: 10,
    height: height * 0.17,
    justifyContent: "center",
  },

  inputBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 5,
  },

  middlePartIcon: {
    height: 40,
    width: 40,
  },
  input: {
    borderWidth: 1,
    borderRadius: 12,
    width: width * 0.7,
    padding: 16,
  },
  cart: {
    borderRadius: 12,
    paddingVertical: 12,
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

  // for kcal exercise

  packetTowpart: {
    width: width * 0.4,
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },

  packetTowpartView1: {
    width: width * 0.2,
    height: width * 0.2,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 5,
  },
});
