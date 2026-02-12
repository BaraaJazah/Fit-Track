import {
  BackHandler,
  Dimensions,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  TextInput,
  View,
  ScrollView,
  Text,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/storeHook";
import {
  backWhite,
  love,
  loveRed,
  plus,
  search,
} from "../../assets/icons/home";
import PagerView from "react-native-pager-view";
import { AddFoodTabView, Header } from "../../componetns/screens/home";
import AddFoodTabBtn from "../../componetns/common/AddFoodTabBtn";
import { actGetFoods, actSearchFood } from "../../store/food/foodSlice";
import { DishCartMini } from "../../componetns/common";
import { useFocusEffect } from "expo-router";
import MyDishTabView from "../../componetns/screens/home/MyDishTabView";
import { I18nManager } from "react-native";
import Toast from "react-native-toast-message";
import { MotiSafeAreaView } from "moti";
import { SafeAreaView } from "react-native-safe-area-context";

// تغيرر الاتجاه
I18nManager.allowRTL(false); // يمنع الاتجاه من اليمين لليسار
I18nManager.forceRTL(false); // يفرض الاتجاه من اليسار لليمين

const { width, height } = Dimensions.get("screen");

const Dish = () => {
  const { themeData, themeName } = useAppSelector((state) => state.theme);
  const { foods, searchFood, error, loading } = useAppSelector(
    (state) => state.foods
  );

  const { myDish } = useAppSelector((state) => state.myDishExercise);
  const { lang, words } = useAppSelector((state) => state.lang);

  const [searchInput, setSearchInput] = useState("");
  const [showSearchView, setShowSearchView] = useState(false);

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
            "Error fetching food data. There is a problem on the server"
          );
        })
        .finally(() => {});
    }
  }, [dispatch]);

  useFocusEffect(
    React.useCallback(() => {
      const backAction = () => {
        return true; // إلغاء السلوك الافتراضي
      };

      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        backAction
      );

      return () => {
        backHandler.remove(); // تنظيف المعالج عند مغادرة الصفحة
      };
    }, [])
  );

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
    <SafeAreaView
      style={[
        styles.centeredView,
        { backgroundColor: themeData["background-secondary-2"] },
      ]}
    >
      <View style={{ gap: 14, justifyContent: "center", alignItems: "center" }}>
        <View
          style={{
            backgroundColor: themeData["background-secondary-2"],
            width: width,
            alignItems: "center",
            zIndex: 2,
          }}
        >
          <Header />
        </View>
        {/*  search */}

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
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                width: width * 0.65,
              }}
            >
              <Image style={{ width: 20, height: 20 }} source={search} />

              <TextInput
                style={[styles.input, { color: themeData["text-primary"] }]}
                onChangeText={(text) => {
                  onSearchHandler(text);
                }}
                value={searchInput}
                placeholder={words["meal name"]}
                placeholderTextColor={themeData["text-secondary"]}
              />
            </View>
            <Pressable
              style={{ padding: 6 }}
              onPress={() => {
                setShowSearchView(false);
                setSearchInput("");
              }}
            >
              <Image
                style={{
                  width: 24,
                  height: 24,
                  transform: [{ rotateZ: "45deg" }],
                }}
                source={plus}
              />
            </Pressable>
          </View>

          {/* Results For Search */}

          <View
            style={{
              display: showSearchView ? "flex" : "none",
              width: width,
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
                marginTop: 10,
              }}
            >
              <Pressable
                onPress={() => {}}
                style={{
                  width: width * 0.8,
                  maxHeight: 400,
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
                  contentContainerStyle={{}}
                  style={{}}
                  showsVerticalScrollIndicator={false}
                  // horizontal={true}
                  fadingEdgeLength={20}
                  keyExtractor={(item) => item?.id}
                  renderItem={({ item, index }) => {
                    return (
                      <DishCartMini
                        key={index}
                        iconOne={love}
                        iconTwo={loveRed}
                        data={item}
                        activeType="food"
                      />
                    );
                  }}
                />
              </Pressable>
            </Pressable>
          </View>
        </View>

        <SafeAreaView style={styles.container}>
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
            {myDish.length > 0 ? (
              <AddFoodTabBtn
                onPress={() => {
                  ref.current?.setPage(0);
                }}
                active={isSelected === 0 ? true : false}
                title={words["My Meals"]}
              />
            ) : (
              <></>
            )}

            {foods.map((item, index) => {
              return (
                <AddFoodTabBtn
                  key={index + 1}
                  onPress={() => {
                    ref.current?.setPage(index + 1);
                  }}
                  active={isSelected === index + 1 ? true : false}
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
            ref={ref}
            initialPage={myDish.length > 0 ? 0 : 1}
            onPageSelected={(e) => {
              const selectedPage = e.nativeEvent.position;
              setIsSelected(selectedPage);
            }}
          >
            {myDish.length > 0 ? (
              <View style={{ width: width, height: height }}>
                <MyDishTabView data={myDish} cartWithLove={true} />
              </View>
            ) : (
              <View style={{ width: width, height: height }}></View>
            )}

            {foods.map((item, index) => (
              <View key={index + 1} style={{ width: width, height: "100%" }}>
                <AddFoodTabView data={item.food_types} cartWithLove={true} />
              </View>
            ))}
          </PagerView>
        </SafeAreaView>
      </View>
    </SafeAreaView>
  );
};

export default Dish;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  modalView: {
    height: height,
    width: width,
    backgroundColor: "white",
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
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
  },
  input: {
    borderRadius: 12,
    flex: 1,
    padding: 12,
  },

  closeBtn: {
    backgroundColor: "red",
    borderRadius: 50,
    padding: 10,
    transform: [{ translateY: -18 }],
  },

  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  pager: {
    flex: 1,
    alignSelf: "stretch",
    width: width,
  },
});
