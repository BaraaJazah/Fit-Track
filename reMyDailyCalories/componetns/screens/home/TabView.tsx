import { useRef, useState } from "react";
import { StyleSheet, View, Dimensions, ScrollView, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import PagerView from "react-native-pager-view";
import { AddCart, AddFood, OwnDishCart, TabBtn } from "../../common";
import { useAppDispatch, useAppSelector } from "../../../hooks/storeHook";
import { ModalAddNewAIDish, ModalAddNewDish } from "../../Modals/Dish";
import { DishOwnCart } from "../Dish";
import { TMyDish } from "../../../type/myDishExercise.type";
import { actResetMyDish } from "../../../store/myDishExercise/myDishExerciseSlice";

const { width, height } = Dimensions.get("window");

type Props = {
  myDish: TMyDish[];
  SuccessToast: (string) => void;
  ErrorToast: (string) => void;
  type?: "ai" | "normal";
};

const TabView = ({
  myDish,
  SuccessToast,
  ErrorToast,
  type = "normal",
}: Props) => {
  const breakfast = myDish.filter((item) => {
    return item.foodType === "breakfast";
  });
  const lunch = myDish.filter((item) => {
    return item.foodType === "lunch";
  });
  const dinner = myDish.filter((item) => {
    return item.foodType === "dinner";
  });
  const snack = myDish.filter((item) => {
    return item.foodType === "snack";
  });

  const ref = useRef(null);
  const { themeData } = useAppSelector((state) => state.theme);
  const [isSelected, setIsSelected] = useState(0);
  const { lang, words } = useAppSelector((state) => state.lang);
  return (
    <SafeAreaView style={{ height: height * 0.82, width: width * 0.87 }}>
      <ScrollView
        style={{ borderRadius: 20 }}
        contentContainerStyle={{
          gap: width * 0.05,
          margin: "auto",
          alignItems: "center",
          justifyContent: "center",
          minWidth: width * 0.86,
        }}
        fadingEdgeLength={20} // make fade in top and botton
        scrollEnabled={true} // make scroll anable
        horizontal={true} // make scroll in horizantal
        showsHorizontalScrollIndicator={false}
      >
        <View
          style={{
            backgroundColor: themeData["background-secondary"],
            borderRadius: 10,
            flexDirection: "row",
            gap: width * 0.04,
            padding: 6,
            minWidth: width * 0.86,

            // width: width * 0.86,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <TabBtn
            onPress={() => {
              ref.current?.setPage(0);
            }}
            active={isSelected == 0 ? true : false}
            title={words.Breakfast}
            color={themeData["secondary-meal1"]}
          />
          <TabBtn
            onPress={() => {
              ref.current?.setPage(1);
            }}
            active={isSelected == 1 ? true : false}
            title={words.Lunch}
            color={themeData["secondary-meal3"]}
          />
          <TabBtn
            onPress={() => {
              ref.current?.setPage(2);
            }}
            active={isSelected == 2 ? true : false}
            title={words.Dinner}
            color={themeData["background-primary"]}
          />
          <TabBtn
            onPress={() => {
              ref.current?.setPage(3);
            }}
            active={isSelected == 3 ? true : false}
            title={words.Snack}
            color={themeData["secondary-meal4"]}
          />
        </View>
      </ScrollView>
      <PagerView
        style={[styles.pager, { height: height * 0.7 }]}
        ref={ref}
        initialPage={0}
        onPageSelected={(e) => {
          const selectedPage = e.nativeEvent.position;
          setIsSelected(selectedPage);
        }}
      >
        <TabPage
          key={1}
          name={words.Breakfast}
          nameEn={"breakfast"}
          color={themeData["secondary-meal1"]}
          data={breakfast}
          SuccessToast={SuccessToast}
          ErrorToast={ErrorToast}
          type={type}
        />

        <TabPage
          key={2}
          name={words.Lunch}
          nameEn={"lunch"}
          color={themeData["secondary-meal3"]}
          data={lunch}
          SuccessToast={SuccessToast}
          ErrorToast={ErrorToast}
          type={type}
        />

        <TabPage
          key={3}
          name={words.Dinner}
          nameEn={"dinner"}
          color={themeData["background-primary"]}
          data={dinner}
          SuccessToast={SuccessToast}
          ErrorToast={ErrorToast}
          type={type}
        />

        <TabPage
          key={4}
          name={words.Snack}
          nameEn={"snack"}
          color={themeData["secondary-meal4"]}
          data={snack}
          SuccessToast={SuccessToast}
          ErrorToast={ErrorToast}
          type={type}
        />
      </PagerView>
    </SafeAreaView>
  );
};

export default TabView;

const TabPage = ({
  name,
  color,
  data,
  SuccessToast,
  ErrorToast,
  nameEn,
  type = "normal",
}) => {
  const [showAddDish, setShowAddDish] = useState(false);
  const [showAddAIDish, setShowAddAIDish] = useState(false);
  const { lang, words } = useAppSelector((state) => state.lang);
  const dispatch = useAppDispatch();
  const { userData } = useAppSelector((state) => state.goal);
  let recomended = 0;
  if (name === words.Breakfast) {
    recomended = userData.breakfastRecomended;
  } else if (name === words.Lunch) {
    recomended = userData.lunchRecomended;
  } else if (name === words.Dinner) {
    recomended = userData.dinnerRecomended;
  } else if (name === words.Snack) {
    recomended = userData.snackRecomended;
  }

  const setShowAddDishFunc = () => {
    dispatch(actResetMyDish());

    if (type === "ai") {
      setShowAddAIDish(true);
    } else {
      setShowAddDish(true);
    }
  };

  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <View style={{ flex: 0.15 }}>
        <AddCart
          onPress={setShowAddDishFunc}
          type={name}
          name={name}
          Recomended={recomended}
          color={color}
          ai={type === "ai" ? true : false}
        />
      </View>

      <View style={{ flex: 0.8, marginTop: 20, alignItems: "center" }}>
        <ScrollView
          fadingEdgeLength={20} // make fade in top and botton
          scrollEnabled={true} // make scroll anable
          showsVerticalScrollIndicator={false}
        >
          {data?.map((item, index) => {
            return (
              <DishOwnCart
                key={index}
                data={item}
                SuccessToast={SuccessToast}
                ErrorToast={ErrorToast}
              />
            );
          })}
        </ScrollView>
      </View>

      {showAddDish && (
        <ModalAddNewDish
          nameEn={nameEn}
          name={name}
          isOpen={showAddDish}
          setIsOpen={setShowAddDish}
          SuccessToast={SuccessToast}
        />
      )}

      {showAddAIDish && (
        <ModalAddNewAIDish
          nameEn={nameEn}
          name={name}
          isOpen={showAddAIDish}
          setIsOpen={setShowAddAIDish}
          SuccessToast={SuccessToast}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },

  pager: {
    alignSelf: "stretch",
    height: height * 0.6,
  },
  foodText1: {
    fontSize: 16,
  },
  foodText2: {
    fontSize: 10,
  },
});
