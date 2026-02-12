import {
  Dimensions,
  FlatList,
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import { useAppDispatch, useAppSelector } from "../../../hooks/storeHook";
import { plusWhite, search } from "../../../assets/icons/home";
import PagerView from "react-native-pager-view";
import AddFoodTabBtn from "../../../componetns/common/AddFoodTabBtn";
import { actGetFoods, actSearchFood } from "../../../store/food/foodSlice";
import { AddDailyFoodTabView } from "../../screens/Add";
import DishCartMiniAdd from "../../screens/Dish/DishCartMiniAdd";
import MyDishTabView from "../../screens/home/MyDishTabView";
import { HeaderPages } from "../../screens/home";
import LottieFile from "../../../constants/loffieFile/LottieFile";
import { I18nManager } from "react-native";
import Toast from "react-native-toast-message";
import { MotiView, MotiText, MotiSafeAreaView } from "moti";

// تغيرر الاتجاه
I18nManager.allowRTL(false); // يمنع الاتجاه من اليمين لليسار
I18nManager.forceRTL(false); // يفرض الاتجاه من اليسار لليمين

const { width, height } = Dimensions.get("screen");

const ModalAddFoodToMeal = ({ name, isOpen = false, isOpenFunc }) => {
  const { themeData } = useAppSelector((state) => state.theme);
  const { userDaily } = useAppSelector((state) => state.user);
  const { lang, words } = useAppSelector((state) => state.lang);

  const { foods, searchFood, error, loading } = useAppSelector(
    (state) => state.foods
  );

  const { myDish } = useAppSelector((state) => state.myDishExercise);
  const [searchInput, setSearchInput] = useState("");
  const [showSearchView, setShowSearchView] = useState(false);
  const [showViewPager, setShowViewPager] = useState(false);

  const [isSelected, setIsSelected] = useState(0);

  const dispatch = useAppDispatch();
  const ref = useRef(null);

  const onSearchHandler = (text) => {
    setSearchInput(text);
    dispatch(actSearchFood(text));

    if (text.length === 0) {
      setShowSearchView(false);
    } else {
      setShowSearchView(true);
    }
  };

  useEffect(() => {
    if (foods.length < 1) {
      dispatch(actGetFoods())
        .unwrap()
        .then((res) => {})
        .catch((e) => {
          ErrorToast(
            "Error fetching foods data. There is a problem on the server"
          );
        })
        .finally(() => {});
    }
  }, [dispatch]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setShowViewPager(true), 100); // تأخير ظهور الـ ViewPager
    } else {
      setShowViewPager(false);
    }
  }, [isOpen]);

  const [foodsData1, setfoodsData1] = useState([]);
  let foodData = [];

  useEffect(() => {
    if (name === "breakfast") {
      foodData = userDaily?.breakfast;
    } else if (name === "dinner") {
      foodData = userDaily?.dinner;
    } else if (name === "lunch") {
      foodData = userDaily?.lunch;
    } else if (name === "snack") {
      foodData = userDaily?.snack;
    }
    setfoodsData1(foodData);
  }, [userDaily, name]);

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
      onRequestClose={isOpenFunc}
      statusBarTranslucent={true}
      navigationBarTranslucent={true}
    >
      <View
        style={{
          backgroundColor: themeData["background-secondary-2"],
          width,
          height,
          alignItems: "center",
        }}
      >
        <View style={{ height: height * 0.12, padding: 30 }}>
          <HeaderPages
            onpress={() => {
              isOpenFunc(false);
            }}
            header={words.chooseFoodsYouAte}
            title=""
            text=""
          />
        </View>

        <>
          {/* Results Part */}

          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <View
              style={[
                styles.searchView,
                { borderColor: themeData["background-secondary"] },
              ]}
            >
              <Image style={{ width: 20, height: 20 }} source={search} />

              <TextInput
                style={[styles.input, { color: themeData["text-primary"] }]}
                onChangeText={(text) => {
                  onSearchHandler(text);
                }}
                value={searchInput}
                placeholder={words["foodName"]}
                placeholderTextColor={themeData["text-secondary"]}
              />
              <View
                style={{
                  backgroundColor: themeData["background-primary"],
                  width: 28,
                  height: 28,
                  borderRadius: 50,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <MotiView
                  key={foodsData1.length}
                  from={{
                    scale: 1,
                    rotateZ: "0deg",
                  }}
                  animate={{
                    scale: [1.5, 1], // يكبر ثم يرجع
                    rotateZ: ["360deg", "0deg"],
                  }}
                  transition={{
                    type: "timing",
                    duration: 400,
                    repeatReverse: true,
                  }}
                >
                  <Text style={{ color: "#fff", fontSize: 14 }}>
                    {foodsData1.length}
                  </Text>
                </MotiView>
              </View>
            </View>

            {/* Results For Search */}

            <View
              style={{
                display: showSearchView ? "flex" : "none",
                width,
              }}
            >
              <Pressable
                onPress={() => {
                  setSearchInput("");
                  setShowSearchView(false);
                }}
                style={{
                  width: width,
                  alignItems: "center",
                  position: "absolute",
                  height,
                  zIndex: 200,
                  backgroundColor: "rgba(0,0,0,0.4)",
                  marginTop: -5,
                }}
              >
                <Pressable
                  onPress={() => {}}
                  style={{
                    width: width * 0.8,
                    maxHeight: 300,
                    backgroundColor: themeData["background-secondary"],
                    top: 2,
                    zIndex: 600,
                    borderRadius: 12,
                    borderWidth: 2,
                    borderColor: themeData["background-secondary-2"],
                    paddingVertical: 8,
                    marginTop: 2,
                  }}
                >
                  <FlatList
                    data={searchFood}
                    showsVerticalScrollIndicator={false}
                    // horizontal={true}
                    fadingEdgeLength={20}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item, index }) => {
                      return (
                        <DishCartMiniAdd
                          data={item}
                          activeType={"food"}
                          name={name}
                        />
                      );
                    }}
                  />
                </Pressable>
              </Pressable>
            </View>
          </View>

          {showViewPager ? (
            <SafeAreaView style={[styles.container, {}]}>
              <ScrollView
                style={{
                  maxHeight: height * 0.13,
                  borderRadius: 12,
                  width: width * 0.9,
                }}
                showsHorizontalScrollIndicator={false}
                horizontal={true}
                fadingEdgeLength={20}
              >
                <AddFoodTabBtn
                  onPress={() => {
                    ref.current?.setPage(0);
                  }}
                  active={isSelected == 0 ? true : false}
                  title={words.myMeals}
                />

                {foods.map((item, index) => {
                  return (
                    <AddFoodTabBtn
                      key={index}
                      onPress={() => {
                        ref.current?.setPage(index + 1);
                      }}
                      active={isSelected == index + 1 ? true : false}
                      image={item.image}
                      title={
                        lang === "ar"
                          ? item.ArName
                          : lang === "de"
                          ? item.DeName
                          : lang === "tr"
                          ? item.TrName
                          : item.EnName
                      }
                    />
                  );
                })}
              </ScrollView>

              <PagerView
                style={[styles.pager]}
                // layoutDirection="rtl"
                ref={ref}
                initialPage={0}
                onPageSelected={(e) => {
                  const selectedPage = e.nativeEvent.position;
                  setIsSelected(selectedPage);
                }}
              >
                <View key={0} style={{ width: width, height: "100%" }}>
                  <MyDishTabView
                    data={myDish}
                    cartWithLove={true}
                    active={"add"}
                    name={name}
                  />
                </View>
                {foods.map((item, index) => (
                  <View
                    key={index + 1}
                    style={{ width: width, height: "100%" }}
                  >
                    <AddDailyFoodTabView name={name} data={item.food_types} />
                  </View>
                ))}
              </PagerView>
            </SafeAreaView>
          ) : (
            <SafeAreaView style={styles.container2}>
              <LottieFile
                lottieName="loading"
                lottieHeigh={150}
                lottieWidth={150}
              />
            </SafeAreaView>
          )}
        </>
      </View>
    </Modal>
  );
};

export default ModalAddFoodToMeal;

const styles = StyleSheet.create({
  centeredView: {
    width: width,
    height: height,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0,0.5)",
  },
  modalView: {
    height: height * 0.9,
    width: width,

    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    alignItems: "center",
  },
  searchView: {
    height: 50,
    width: width * 0.8,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 14,
    borderWidth: 2,
    marginBottom: 20,
  },
  input: {
    borderRadius: 12,
    flex: 1,
    padding: 12,
  },

  closeBtn: {
    width: 80,
    height: 5,
    borderRadius: 50,
  },

  container: {
    flex: 1,
    marginBottom: 40,
    alignItems: "center",
    // justifyContent: 'center',
  },
  container2: {
    flex: 1,
    width,
    height: height * 1.2,
    backgroundColor: "rgba(0, 0, 0,0.5)",
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    transform: [{ translateY: -50 }],
  },

  pager: {
    flex: 1,
    alignSelf: "stretch",
    width: width,
  },
});
