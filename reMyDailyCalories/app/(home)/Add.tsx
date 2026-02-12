import {
  BackHandler,
  Dimensions,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Header } from "../../componetns/screens/home";
import { useAppSelector } from "../../hooks/storeHook";
import { AddFood, AddWater, EditFood, Packet } from "../../componetns/common";
import { ModalAddMeal } from "../../componetns/Modals";
import { MotiSafeAreaView } from "moti";
import { SafeAreaView } from "react-native-safe-area-context";

const { width, height } = Dimensions.get("screen");

type TMealName = "breakfast" | "lunch" | "dinner" | "snack" | "exercise";
const Add = () => {
  const { themeData, themeName } = useAppSelector((state) => state.theme);
  const { userData } = useAppSelector((state) => state.goal);
  const { userDaily } = useAppSelector((state) => state.user);
  const { lang, words } = useAppSelector((state) => state.lang);
  const [showAddDish, setShowAddDish] = useState(false);
  const [mealName, setMealName] = useState<TMealName>("breakfast");

  const handleBackButton = () => {
    if (showAddDish) {
      setShowAddDish(false);
      return true;
    }
    return false;
  };

  useEffect(() => {
    const subscription = BackHandler.addEventListener(
      "hardwareBackPress",
      handleBackButton
    );
    return () => subscription.remove();
  }, [showAddDish]);

  return (
    <SafeAreaView
      style={[
        styles.centeredView,
        { backgroundColor: themeData["background-secondary-2"] },
      ]}
    >
      <View style={{ gap: 10, justifyContent: "center", alignItems: "center" }}>
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
        <ScrollView
          style={{}}
          contentContainerStyle={{
            paddingTop: 20,
          }}
          fadingEdgeLength={20}
          scrollEnabled={true}
          showsHorizontalScrollIndicator={true}
          showsVerticalScrollIndicator={false}
        >
          <View style={{ gap: 16 }}>
            <AddWater
              Recomended={userData.waterRecomended}
              color={themeData["secondary-meal5"]}
              type={words.Water}
            />
          </View>

          <View style={{ gap: 16 }}>
            <Text
              style={{
                marginHorizontal: 40,
                fontWeight: 500,
                marginTop: 20,
                color: themeData["text-primary"],
                direction: lang === "ar" ? "rtl" : "ltr",
              }}
            >
              {words["Daily Meals"]}
            </Text>
            {userDaily.breakfast.length === 0 ? (
              <AddFood
                name={words.Breakfast}
                Recomended={userData.breakfastRecomended}
                color={themeData["secondary-meal1"]}
                onPress={() => {
                  setMealName("breakfast");
                  setShowAddDish(true);
                }}
                type={"Breakfast"}
              />
            ) : (
              <EditFood
                name={words.Breakfast}
                foodData={userDaily.breakfast}
                Recomended={userData.breakfastRecomended}
                color={themeData["secondary-meal1"]}
                onPress={() => {
                  setMealName("breakfast");
                  setShowAddDish(true);
                }}
                type={"Breakfast"}
              />
            )}

            {userDaily.lunch.length === 0 ? (
              <AddFood
                name={words.Lunch}
                Recomended={userData.lunchRecomended}
                color={themeData["secondary-meal3"]}
                onPress={() => {
                  setMealName("lunch");
                  setShowAddDish(true);
                }}
                type={"Lunch"}
              />
            ) : (
              <EditFood
                name={words.Lunch}
                foodData={userDaily.lunch}
                Recomended={userData.lunchRecomended}
                color={themeData["secondary-meal3"]}
                onPress={() => {
                  setMealName("lunch");
                  setShowAddDish(true);
                }}
                type={"Lunch"}
              />
            )}

            {userDaily.dinner.length === 0 ? (
              <AddFood
                name={words.Dinner}
                Recomended={userData.dinnerRecomended}
                color={themeData["background-primary"]}
                onPress={() => {
                  setMealName("dinner");
                  setShowAddDish(true);
                }}
                type={"Dinner"}
              />
            ) : (
              <EditFood
                name={words.Dinner}
                foodData={userDaily.dinner}
                Recomended={userData.dinnerRecomended}
                color={themeData["background-primary"]}
                onPress={() => {
                  setMealName("dinner");
                  setShowAddDish(true);
                }}
                type={"Dinner"}
              />
            )}

            {userDaily.snack.length === 0 ? (
              <AddFood
                name={words.Snack}
                Recomended={userData.snackRecomended}
                color={themeData["secondary-meal4"]}
                onPress={() => {
                  setMealName("snack");
                  setShowAddDish(true);
                }}
                type={"Snack"}
              />
            ) : (
              <EditFood
                name={words.Snack}
                foodData={userDaily.snack}
                Recomended={userData.snackRecomended}
                color={themeData["secondary-meal4"]}
                onPress={() => {
                  setMealName("snack");
                  setShowAddDish(true);
                }}
                type={"Snack"}
              />
            )}
          </View>

          <View
            style={{
              gap: 16,
              marginBottom: 20,
            }}
          >
            <Text
              style={{
                marginTop: 20,
                marginHorizontal: 40,
                fontWeight: 500,
                color: themeData["text-primary"],
                direction: lang === "ar" ? "rtl" : "ltr",
              }}
            >
              {words["Daily Exercises"]}
            </Text>

            {userDaily.exercise.length === 0 ? (
              <AddFood
                name={words.Exercise}
                color={themeData["secondary-meal2"]}
                onPress={() => {
                  setMealName("exercise");
                  setShowAddDish(true);
                }}
                type={"Exercise"}
                typeText="Exercise"
              />
            ) : (
              <EditFood
                name={words.Exercise}
                foodData={userDaily.exercise}
                color={themeData["secondary-meal2"]}
                onPress={() => {
                  setMealName("exercise");
                  setShowAddDish(true);
                }}
                type={"Exercise"}
                typeText={""}
              />
            )}
          </View>
        </ScrollView>
      </View>

      <ModalAddMeal
        isOpen={showAddDish}
        setIsOpen={setShowAddDish}
        name={mealName}
      />
    </SafeAreaView>
  );
};

export default Add;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
});
