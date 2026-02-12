import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  StatusBar,
  View,
  SafeAreaViewBase,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import React, { useEffect, useState } from "react";
import { Chart1, Chart2, Header } from "../../componetns/screens/home";
import { image, Maskgroup } from "../../assets/images";
import { restaurant, fire, calculatorColor } from "../../assets/icons/home";
import { useAppDispatch, useAppSelector } from "../../hooks/storeHook";
import { ModalCalcNeeds } from "../../componetns/Modals";
import { actDailyActions } from "../../store/goal/goalSlice";
import { calcBurnForExercise } from "../../hooks/calcBurnForExercise";
import actCheckUpdate from "../../store/update/act/actCheckUpdate";
import { ModalUpdate } from "../../componetns/Modals/Home";
import { setNewDay } from "../../store/user/userSlice";
import { MotiSafeAreaView, MotiView } from "moti";
import {
  SafeAreaFrameContext,
  SafeAreaInsetsContext,
} from "react-native-safe-area-context";

const { width, height } = Dimensions.get("window");

const index = () => {
  const { themeData, themeName } = useAppSelector((state) => state.theme);

  const dispatch = useAppDispatch();
  const { userData } = useAppSelector((state) => state.goal);
  const { userDaily } = useAppSelector((state) => state.user);
  const { update } = useAppSelector((state) => state.update);
  const { lang, words } = useAppSelector((state) => state.lang);
  const [showCalcNeeds, setShowCalcNeeds] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [loadPage, setLoadPage] = useState(false);

  let total = {
    kcal: 0,
    protein: 0,
    fats: 0,
    carbs: 0,
    burn: 0,
  };

  // update user data
  useEffect(() => {
    userDaily.breakfast.map((item) => {
      total.kcal += item.kcal * (item.quan / 100);
      total.protein += item.protein * (item.quan / 100);
      total.fats += item.fats * (item.quan / 100);
      total.carbs += item.carbs * (item.quan / 100);
    });
    userDaily.lunch.map((item) => {
      total.kcal += item.kcal * (item.quan / 100);
      total.protein += item.protein * (item.quan / 100);
      total.fats += item.fats * (item.quan / 100);
      total.carbs += item.carbs * (item.quan / 100);
    });

    userDaily.dinner.map((item) => {
      total.kcal += item.kcal * (item.quan / 100);
      total.protein += item.protein * (item.quan / 100);
      total.fats += item.fats * (item.quan / 100);
      total.carbs += item.carbs * (item.quan / 100);
    });

    userDaily.snack.map((item) => {
      total.kcal += item.kcal * (item.quan / 100);
      total.protein += item.protein * (item.quan / 100);
      total.fats += item.fats * (item.quan / 100);
      total.carbs += item.carbs * (item.quan / 100);
    });

    userDaily.exercise.map((item) => {
      // total.kcal += item.kcal * (item.quan / 100)
      total.burn += Number(
        calcBurnForExercise(
          userData.userData.weight === 0 ? 70 : userData.userData.weight,
          60 * (item.quan / 60),
          item.met
        )
      );
    });

    dispatch(actDailyActions(total));
  }, [userDaily]);

  // Check any Update
  useEffect(() => {
    dispatch(actCheckUpdate()).then(() => {});
  }, []);

  // if need force update
  useEffect(() => {
    if (update?.app === 1) setShowUpdate(true);
    else setShowUpdate(false);
  }, [update]);

  // set New Day and reset user data if we in new day
  useEffect(() => {
    if (userDaily.day !== getFormattedDate()) {
      dispatch(setNewDay(getFormattedDate()));
    }
  }, []);

  // get date
  const getFormattedDate = () => {
    const today = new Date();
    return today.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      weekday: "long",
    });
  };
  // react-native-safe-area-context
  return (
    <SafeAreaView
      style={[
        styles.body,
        { backgroundColor: themeData["background-secondary-2"] },
      ]}
    >
      <StatusBar
        backgroundColor={themeData["background-secondary-2"]} // لون الخلفية في أندرويد
        barStyle={themeName === "dark" ? "light-content" : "dark-content"} // نوع الأيقونات: light-content أو dark-content
        translucent={false} // إذا كنت تريد أن يكون فوق المحتوى
      />
      <View>
        {/* <AdMobBanner
          bannerSize="fullBanner"
          adUnitID="ca-app-pub-5095904759977102/9223277803"
          servePersonalizedAds // optional
          onDidFailToReceiveAdWithError={(error) => console.log(error)}
        /> */}
      </View>
      <View style={{ gap: 14, justifyContent: "center", alignItems: "center" }}>
        <View
          style={{
            backgroundColor: themeData["background-secondary-2"],
            width: width,
            alignItems: "center",
            zIndex: 2,
            marginTop: 20,
          }}
        >
          <Header />
        </View>

        <View
          style={[
            styles.main,
            { backgroundColor: themeData["background-secondary-2"] },
          ]}
        >
          <View style={styles.topPart}>
            <Image
              source={Maskgroup}
              style={[styles.topPartImage, { height: 420, transform: [] }]}
            />
            <View style={styles.leftPart}>
              <Image source={restaurant} style={{ width: 24, height: 24 }} />
              <Text
                style={[
                  styles.imageText1,
                  { color: themeData["text-primary"] },
                ]}
              >
                {userData?.kcal?.toFixed(0)}
              </Text>
              <Text
                style={[
                  styles.imageText2,
                  { color: themeData["text-secondary"] },
                ]}
              >
                {words.kcal}
              </Text>
            </View>
            <View style={styles.rightPart}>
              <Image source={fire} style={{ width: 24, height: 24 }} />
              <Text
                style={[
                  styles.imageText1,
                  { color: themeData["text-primary"] },
                ]}
              >
                {userData?.burn?.toFixed(0)}
              </Text>
              <Text
                style={[
                  styles.imageText2,
                  { color: themeData["text-secondary"] },
                ]}
              >
                {words.burn}
              </Text>
            </View>
            <View style={styles.bottomPart}>
              <TouchableOpacity
                onPress={() => {
                  setShowCalcNeeds(true);
                }}
              >
                {userData?.kcalGoal ? (
                  <Image
                    source={calculatorColor}
                    style={{ width: 19, height: 25 }}
                  />
                ) : (
                  <MotiView
                    from={{ rotate: "0deg" }}
                    animate={{
                      rotate: [
                        "0deg",
                        "90deg",
                        "180deg",
                        "270deg",
                        "360deg",
                        "0deg",
                      ],
                    }}
                    transition={{
                      type: "timing",
                      duration: 500,
                      loop: true, // لتكرار الحركة
                      repeatReverse: true, // عكس الحركة بعد كل دورة
                    }}
                  >
                    <Image
                      source={calculatorColor}
                      style={{ width: 19, height: 25 }}
                    />
                  </MotiView>
                )}
              </TouchableOpacity>
              <Text
                style={[
                  styles.imageText1,
                  { color: themeData["text-primary"] },
                ]}
              >
                {userData?.kcalGoal}
              </Text>
              <Text
                style={[
                  styles.imageText2,
                  { color: themeData["text-secondary"] },
                ]}
              >
                {words["kcal goal"]}
              </Text>
            </View>
            <View style={styles.middlePart}>
              <Chart1 userData={userData} />
            </View>
          </View>

          <View style={styles.middle}>
            <View style={styles.middleLeft}>
              <Text
                style={[
                  styles.middleText1,
                  { color: themeData["text-primary"] },
                ]}
              >
                {words.protein}
              </Text>
              <View style={styles.middleView}>
                <View
                  style={{
                    height: 3,
                    width:
                      (60 / 100) *
                      ((100 * userData?.protein) / userData?.proteinGoal === 0
                        ? 1
                        : (100 * userData?.protein) / userData?.proteinGoal),
                    maxWidth: 60,
                    backgroundColor: themeData["secondary-meal1"],
                    borderRadius: 10,
                  }}
                ></View>
              </View>
              <Text style={styles.middleText2}>
                {userData?.protein?.toFixed(0)}/{userData?.proteinGoal}g
              </Text>
            </View>
            <View style={styles.middleMiddle}>
              <Text
                style={[
                  styles.middleText1,
                  { color: themeData["text-primary"] },
                ]}
              >
                {words.fats}
              </Text>
              <View style={styles.middleView}>
                <View
                  style={{
                    height: 3,

                    width:
                      (60 / 100) *
                      ((100 * userData?.fats) / userData?.fatsGoal === 0
                        ? 1
                        : (100 * userData?.fats) / userData?.fatsGoal),

                    maxWidth: 60,
                    backgroundColor: themeData["secondary-meal2"],
                    borderRadius: 10,
                  }}
                ></View>
              </View>
              <Text style={styles.middleText2}>
                {userData?.fats?.toFixed(0)}/{userData?.fatsGoal}g
              </Text>
            </View>
            <View style={styles.middleRight}>
              <Text
                style={[
                  styles.middleText1,
                  { color: themeData["text-primary"] },
                ]}
              >
                {words.carbs}
              </Text>
              <View style={styles.middleView}>
                <View
                  style={{
                    height: 3,

                    width:
                      (60 / 100) *
                      ((100 * userData?.carbs) / userData?.carbsGoal === 0
                        ? 1
                        : (100 * userData?.carbs) / userData?.carbsGoal),

                    maxWidth: 60,
                    backgroundColor: themeData["secondary-meal3"],
                    borderRadius: 10,
                  }}
                ></View>
              </View>
              <Text style={styles.middleText2}>
                {userData?.carbs?.toFixed(0)}/{userData?.carbsGoal}g
              </Text>
            </View>
          </View>

          <View
            style={{
              position: "absolute",
              bottom: 0,
              height: height * 0.44,
              backgroundColor: themeData["background-secondary-2"],
              zIndex: 200,
            }}
          >
            <Chart2 />
          </View>
        </View>
      </View>
      {showCalcNeeds && (
        <ModalCalcNeeds isOpen={showCalcNeeds} setIsOpen={setShowCalcNeeds} />
      )}
      {showUpdate && (
        <ModalUpdate isOpen={showUpdate} setIsOpen={setShowUpdate} />
      )}
    </SafeAreaView>
  );
};

export default index;

const styles = StyleSheet.create({
  body: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  main: {
    width: width,
    height: height * 0.9,
  },
  // Top Part
  topPart: {
    width: width,
    top: -100,
    height: height * 0.37,
  },
  topPartImage: {
    width: width,
    position: "absolute",
    height: 300,
    // transform: [{ rotateZ: "-2deg" }],
    transform: [{ translateY: 125 }],

    // display: "none",
  },
  leftPart: {
    width: 100,
    height: 100,
    top: 140,
    justifyContent: "center",
    alignItems: "center",
    gap: 4,
  },
  rightPart: {
    width: 100,
    height: 100,
    position: "absolute",
    right: 0,
    top: 140,
    justifyContent: "center",
    alignItems: "center",
    gap: 4,
  },
  middlePart: {
    width: 100,
    height: 100,
    position: "absolute",
    left: 150,
    top: 110,
  },
  bottomPart: {
    width: 100,
    height: 100,
    position: "absolute",
    left: width / 2 - 50,
    top: 290,
    justifyContent: "center",
    alignItems: "center",
    gap: 4,
  },
  imageText1: {
    fontSize: 20,
    fontWeight: 600,
  },
  imageText2: {
    fontSize: 12,
  },

  // middle Part
  middle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    height: height * 0.1,
  },
  middleLeft: {
    alignItems: "center",
  },
  middleText1: {
    fontSize: 16,
    fontWeight: 600,
  },
  middleView: {
    height: 3,
    width: 60,
    marginVertical: 10,
    backgroundColor: "#E9E9E9",
    borderRadius: 10,
  },
  middleText2: {
    fontSize: 12,
    color: "#878488",
    fontWeight: 500,
  },

  middleMiddle: {
    alignItems: "center",
  },
  middleRight: {
    alignItems: "center",
  },
});
