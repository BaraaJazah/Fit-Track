import {
  Dimensions,
  FlatList,
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/storeHook";
import { plusWhite, search } from "../../../assets/icons/home";
import PagerView from "react-native-pager-view";
import AddFoodTabBtn from "../../../componetns/common/AddFoodTabBtn";
import { AddDailyExerciseTabView } from "../../screens/Add";
import {
  actGetExercise,
  actSearchExercise,
} from "../../../store/exercise/exerciseSlice";
import DishCartMiniAdd from "../../screens/Dish/DishCartMiniAdd";
import { HeaderPages } from "../../screens/home";
import LottieFile from "../../../constants/loffieFile/LottieFile";
import { I18nManager } from "react-native";
import { MotiView } from "moti";

// تغيرر الاتجاه
I18nManager.allowRTL(false); // يمنع الاتجاه من اليمين لليسار
I18nManager.forceRTL(false); // يفرض الاتجاه من اليسار لليمين

const { width, height } = Dimensions.get("screen");

const ModalSelectExercise = ({ name, isOpen = false, isOpenFunc }) => {
  const { themeData } = useAppSelector((state) => state.theme);
  const { userDaily } = useAppSelector((state) => state.user);
  const { userData } = useAppSelector((state) => state.goal);
  const { words, lang } = useAppSelector((state) => state.lang);

  const weight = userData.userData.weight === 0 ? 70 : userData.userData.weight;

  const { exercises, searchExercise, error, loading } = useAppSelector(
    (state) => state.exercise
  );

  const [searchInput, setSearchInput] = useState("");
  const [showSearchView, setShowSearchView] = useState(false);
  const [showViewPager, setShowViewPager] = useState(false);

  const [isSelected, setIsSelected] = useState(0);

  const dispatch = useAppDispatch();
  const ref = useRef(null);

  // for display sreact items when search
  const onSearchHandler = (text) => {
    setSearchInput(text);
    dispatch(actSearchExercise(text));

    if (text.length === 0) {
      setShowSearchView(false);
    } else {
      setShowSearchView(true);
    }
  };

  // get exercise if not found
  useEffect(() => {
    if (exercises && exercises.length < 1) {
      dispatch(actGetExercise())
        .unwrap()
        .then((res) => {})
        .catch((e) => {
          ErrorToast(
            "Error fetching exercises data. There is a problem on the server"
          );
        })
        .finally(() => {});
    }
  }, [dispatch]);

  // for making delay view pager
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setShowViewPager(true), 100); // تأخير ظهور الـ ViewPager
    } else {
      setShowViewPager(false);
    }
  }, [isOpen]);

  const [exerciseData1, setExerciseData1] = useState([]);
  let exerciseData = [];

  // we used for get length of exercise
  useEffect(() => {
    exerciseData = userDaily?.exercise;
    setExerciseData1(exerciseData);
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
            header={`${words.add} ${words.exercises}`}
            title=""
            text=""
          />
        </View>

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
              placeholder={words.exerciseName}
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
                key={exerciseData1.length}
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
                <Text
                  style={{
                    color: "#fff",
                    fontSize: 14,
                  }}
                >
                  {exerciseData1?.length}
                </Text>
              </MotiView>
            </View>
          </View>

          {/* Results For Search */}

          <View style={{ display: showSearchView ? "flex" : "none", width }}>
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
                  data={searchExercise}
                  showsVerticalScrollIndicator={false}
                  // horizontal={true}
                  fadingEdgeLength={20}
                  keyExtractor={(item) => item.id}
                  renderItem={({ item, index }) => {
                    return (
                      <>
                        <DishCartMiniAdd
                          key={index}
                          data={item}
                          activeType={"exercise"}
                          name={name}
                        />
                      </>
                    );
                  }}
                />
              </Pressable>
            </Pressable>
          </View>
        </View>

        {showViewPager ? (
          <SafeAreaView style={styles.container}>
            <FlatList
              data={exercises}
              style={{
                maxHeight: height * 0.13,
                borderRadius: 12,
                width: width * 0.9,
              }}
              showsHorizontalScrollIndicator={false}
              horizontal={true}
              fadingEdgeLength={20}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item, index }) => {
                return (
                  <>
                    <AddFoodTabBtn
                      key={index}
                      onPress={() => {
                        ref.current?.setPage(index);
                      }}
                      active={isSelected == index ? true : false}
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
                  </>
                );
              }}
            />

            <PagerView
              style={[styles.pager, {}]}
              ref={ref}
              initialPage={0}
              onPageSelected={(e) => {
                const selectedPage = e.nativeEvent.position;
                setIsSelected(selectedPage);
              }}
            >
              {exercises.map((item, index) => (
                <View key={index} style={{ width: width, height: "100%" }}>
                  <AddDailyExerciseTabView
                    data={item.exercise_types}
                    cartWithLove={true}
                  />
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
      </View>
    </Modal>
  );
};

export default ModalSelectExercise;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    width: width,
    height: height,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0,0.5)",
  },
  modalView: {
    height: height * 0.96,
    width: width,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    alignItems: "center",
    paddingBottom: 50,
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
    alignItems: "center",
    marginBottom: 40,

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
