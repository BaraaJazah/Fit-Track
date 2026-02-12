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
import { SafeAreaView } from 'react-native-safe-area-context';

import React, { useEffect, useRef, useState } from "react";
import { CycleDisplayData, HeaderPages } from "../../screens/home";
import { useAppDispatch, useAppSelector } from "../../../hooks/storeHook";
import { MyDishAddWater, Packet } from "../../common";
import {
  explane,
  foodTable,
  image,
  note,
  noteOk,
  noteWrite,
} from "../../../assets/icons/home";
import { ModalAddImage } from "..";
import ModalMyDishAddFood from "./ModalMyDishAddFood";
import DishCartAddMyDish from "../../screens/Dish/DishCartAddMyDish";
import {
  actResetMyDish,
  actUpdateDish,
  addCalcolateTotal,
} from "../../../store/myDishExercise/myDishExerciseSlice";
import Toast from "react-native-toast-message";
import { getFoodIcon } from "../../../assets/icons/Foods/data";
import ModalGeneralSelectGram from "../Common/ModalGeneralSelectGram";
import ModalTextEditor from "../Common/ModalTextEditor";
import PagerView from "react-native-pager-view";
import { homeFood, readyFood } from "../../../assets/icons";
import { ModalLoading, ModalLoadingUsageAllPage } from "../../feedback";
import LottieFile from "../../../constants/loffieFile/LottieFile";

const { width, height } = Dimensions.get("window");

const ModalEditNewDish = ({
  isOpen = false,
  setIsOpen,
  SuccessToast,
  ErrorToast,
}) => {
  const { themeData } = useAppSelector((state) => state.theme);
  const { lang, words } = useAppSelector((state) => state.lang);
  const dispatch = useAppDispatch();
  const { myAddDish, myAddTotalDish } = useAppSelector(
    (state) => state.myDishExercise
  );

  const name =
    myAddTotalDish.foodType === "breakfast"
      ? words.Breakfast
      : myAddTotalDish.foodType === "lunch"
      ? words.Lunch
      : myAddTotalDish.foodType === "dinner"
      ? words.Dinner
      : words.Snack;

  const [foodImage, setFoodImage] = useState(myAddTotalDish.iconName);
  const ref = useRef(null);

  const [addFoodVisible, setAddFoodVisible] = useState(false);
  const [addImageVisible, setAddImageVisible] = useState(false);
  const [sevingVisible, setSevingVisible] = useState(false);
  const [textEditorVisible, setTextEditorVisible] = useState(false);
  const [delayToast, setDelayToast] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [modalIsLoading, setModalIsLoading] = useState(true); // منشان يعمل مودال التحميل.  منشان نخليه بحمل الصفحه اسرع
  const [dishSave, setDishSave] = useState(false);

  const [isFocusPage, setIsFocusPage] = useState(0);

  const [sendData, setSendData] = useState({
    name: myAddTotalDish.name,
    explane: myAddTotalDish.explane,
    serving: myAddTotalDish.serving,
    iconName: myAddTotalDish.iconName,
  });

  const pagesArray = [
    {
      name: words.HomeFood,
      icon: homeFood,
      onPress: () => {
        ref.current?.setPage(0);
      },
      page: 0,
    },

    {
      name: words.PreparedFood,
      icon: readyFood,
      onPress: () => {
        ref.current?.setPage(1);
      },
      page: 1,
    },
  ];

  useEffect(() => {
    // setSendData({
    //   name: myAddTotalDish.name,
    //   explane: myAddTotalDish.explane,
    //   serving: myAddTotalDish.serving,
    //   iconName: myAddTotalDish.iconName,
    // });

    setReadyDishData({
      kcal: myAddTotalDish.kcal,
      protein: myAddTotalDish.protein,
      fats: myAddTotalDish.fats,
      carbs: myAddTotalDish.carbs,
      totalQuantity: myAddTotalDish.totalQuantity,
    });
  }, [myAddTotalDish.id]);

  useEffect(() => {
    setModalIsLoading(true);
    if (isOpen) {
      setTimeout(() => setModalIsLoading(false), 100); // تأخير ظهور الـ ViewPager
    } else {
      setModalIsLoading(false);
    }
  }, [isOpen]);

  const saveDishHandler = () => {
    const dishInputData = {
      iconName: sendData.iconName,
      serving: sendData.serving,
      foodType: myAddTotalDish.foodType,
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
        showToast(words["Please enter the number of grams Of the food"]);
        setDishSave(false);
        return;
      } else {
        const timerId = setTimeout(() => {
          const mergedDish = {
            id: myAddTotalDish.id,
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

          dispatch(actUpdateDish(mergedDish))
            .unwrap()
            .then(() => {
              // reset and send success message
              dispatch(actResetMyDish());
              setSendData({
                name: "",
                explane: "",
                serving: 0,
                iconName: "",
              });
              setFoodImage("");
              SuccessToast(words["The Food Updated Successfully"]);
              setIsOpen(false);
            })
            .catch((e) => {
              showToast(words["There is a problem on the server"]);
            })
            .finally(() => {
              setDishSave(false);
              setIsOpen(false);
            });
        }, 100);
        return () => clearInterval(timerId);
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
      text2: `${text} `,
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

  // page 2
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
      <View
        style={[
          styles.body,
          {
            backgroundColor: themeData["background-secondary-2"],
            alignItems: "center",
            justifyContent: "space-between",
          },
        ]}
      >
        <View style={{ alignItems: "center" }}>
          <View style={{ height: height * 0.08 }}>
            <HeaderPages
              right={true}
              onPressRight={() => {
                setAddFoodVisible(true);
              }}
              onpress={() => {
                setIsOpen(false);
              }}
              header={`${words.edit} ${name}`}
              title={`Edit ${name}`}
              text=""
            />
          </View>

          {!modalIsLoading ? (
            <>
              <View
                style={{
                  width,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-evenly",
                  margin: 5,
                  marginBottom: 10,
                }}
              >
                {pagesArray.map((item, index) => {
                  return (
                    <TouchableOpacity
                      key={index}
                      style={{
                        backgroundColor: themeData["background-secondary"],
                        borderRadius: 10,
                        padding: 10,
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 14,
                        width: width * 0.46,
                      }}
                      onPress={item.onPress}
                    >
                      <Image
                        source={item.icon}
                        style={{ width: 20, height: 20 }}
                      />
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
                        {item.name}
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
                    height: height * 0.59,
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
                  <View key="1" style={{ flex: 1 }}>
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
                        placeholder="Dish Name"
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
                        style={{
                          alignItems: "center",
                        }}
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
                              transform: [{ translateY: -15 }],
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
                    <View
                      style={{
                        flex: 1,
                      }}
                    >
                      <ScrollView
                        style={{
                          width: width * 0.9,
                        }}
                        contentContainerStyle={[
                          {
                            marginVertical: 4,
                            marginHorizontal: "auto",
                          },
                        ]} // when use it the scroll will don't move
                        fadingEdgeLength={10} // make fade in top and botton
                        scrollEnabled={true} // make scroll anable
                        showsVerticalScrollIndicator={false}
                      >
                        <MyDishAddWater
                          Recomended={50}
                          color={themeData["secondary-meal5"]}
                          type={words.Water}
                        />

                        {myAddDish &&
                          myAddDish.map((item, index) => {
                            return (
                              <DishCartAddMyDish key={index} data={item} />
                            );
                          })}
                      </ScrollView>
                    </View>
                  </View>
                  <View key="2" style={{ flex: 1 }}>
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
                        placeholder="Dish Name"
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
                    <View style={{ gap: 15, marginVertical: 20 }}>
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
                            {myAddTotalDish.kcal} {words.Kcal}
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
                            {myAddTotalDish.protein} {words.protein}
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
                            {myAddTotalDish.fats} {words.fats}
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
                            {myAddTotalDish.carbs} {words.carbs}
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
                            {myAddTotalDish.totalQuantity} {words.gram}
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </PagerView>
              </Packet>

              <Packet
                packetStyle={[
                  styles.packet2,
                  {
                    borderColor: themeData["background-secondary"],
                    height: height * 0.24,
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
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
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
              </Packet>

              <View style={{ position: "absolute", bottom: 0, zIndex: 400 }}>
                {delayToast ? <Toast /> : <></>}
              </View>

              {addFoodVisible && (
                <ModalMyDishAddFood
                  name={name}
                  isOpen={addFoodVisible}
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

              <ModalGeneralSelectGram
                setIsOpen={setSevingVisible}
                isOpen={sevingVisible}
                quantity={sendData.serving}
                unit={""}
                updateHandler={servingSelectHandler}
                message={words.chooseServings}
                typeOfSelect="selectServing"
              />

              {textEditorVisible && (
                <ModalTextEditor
                  isOpen={textEditorVisible}
                  setIsOpen={setTextEditorVisible}
                  setExplaneText={setDataHandler}
                  explane={myAddTotalDish.explane}
                />
              )}

              {/* page2 */}

              {isOpenReadyDishSelect && (
                <ModalGeneralSelectGram
                  setIsOpen={setIsOpenReadyDishSelect}
                  isOpen={isOpenReadyDishSelect}
                  quantity={readyDishDataOne.value}
                  unit={""}
                  updateHandler={setReadyDishDataHandler}
                  message={`${words.chooseNumberOf} ${
                    readyDishDataOne.field === "totalQuantity"
                      ? "total grams"
                      : readyDishDataOne.field
                  }`}
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
            </>
          ) : (
            <>
              <SafeAreaView style={styles.container2}>
                <LottieFile
                  lottieName="loading"
                  lottieHeigh={150}
                  lottieWidth={150}
                />
              </SafeAreaView>
            </>
          )}
        </View>
      </View>

      {dishSave && (
        <ModalLoadingUsageAllPage isOpen={dishSave} text={"Loading ... "} />
      )}
    </Modal>
  );
};

export default ModalEditNewDish;

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
    marginVertical: 12,
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

  pagerBtnText: {
    fontSize: 12,
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
    padding: 16,
    borderRadius: 16,
  },

  container2: {
    flex: 1,
    width,
    height: height * 1.2,
    backgroundColor: "rgba(0, 0, 0,0.5)",
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    transform: [{ translateY: -100 }],
  },
});
