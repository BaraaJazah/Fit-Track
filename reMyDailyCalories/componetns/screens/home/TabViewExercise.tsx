import { useRef, useState } from "react";
import { StyleSheet, View, Dimensions, ScrollView, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import PagerView from "react-native-pager-view";
import { AddCart, AddFood, OwnDishCart, TabBtn } from "../../common";
import { useAppDispatch, useAppSelector } from "../../../hooks/storeHook";
import { ModalAddNewDish } from "../../Modals/Dish";
import { DishOwnCart } from "../Dish";
import { TMyDish, TMyExercise } from "../../../type/myDishExercise.type";
import {
  actResetMyDish,
  actResetMyExercise,
} from "../../../store/myDishExercise/myDishExerciseSlice";
import ModalAddNewExercise from "../../Modals/Dish/ModalAddNewExercise";

const { width, height } = Dimensions.get("window");

type Props = {
  myExercise: TMyExercise[];
  SuccessToast: (string) => void;
  ErrorToast: (string) => void;
  type: string;
};

const TabView = ({ myExercise, SuccessToast, ErrorToast, type }: Props) => {
  const cardio = myExercise?.filter((item) => {
    return item.type === "cardio";
  });
  const strength = myExercise?.filter((item) => {
    return item.type === "strength";
  });
  const flexibility = myExercise?.filter((item) => {
    return item.type === "flexibility";
  });

  const ref = useRef();
  const { themeData } = useAppSelector((state) => state.theme);
  const [isSelected, setIsSelected] = useState(0);

  return (
    <SafeAreaView style={{ height: height * 0.82, width: width * 0.87 }}>
      <ScrollView
        style={{ borderRadius: 20 }}
        contentContainerStyle={{
          gap: width * 0.05,
          margin: "auto",
          alignItems: "center",
          justifyContent: "center",
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
          }}
        >
          <TabBtn
            onPress={() => {
              ref.current?.setPage(0);
            }}
            active={isSelected == 0 ? true : false}
            title={"Cardio Exercises"}
            color={themeData["secondary-meal1"]}
          />
          <TabBtn
            onPress={() => {
              ref.current?.setPage(1);
            }}
            active={isSelected == 1 ? true : false}
            title={"Strength Exercises"}
            color={themeData["secondary-meal3"]}
          />
          <TabBtn
            onPress={() => {
              ref.current?.setPage(2);
            }}
            active={isSelected == 2 ? true : false}
            title={"Flexibility Exercises"}
            color={themeData["secondary-meal2"]}
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
          name={"cardio"}
          color={themeData["secondary-meal1"]}
          data={cardio}
          SuccessToast={SuccessToast}
          ErrorToast={ErrorToast}
        />

        <TabPage
          key={2}
          name={"strength"}
          color={themeData["secondary-meal3"]}
          data={strength}
          SuccessToast={SuccessToast}
          ErrorToast={ErrorToast}
        />

        <TabPage
          key={3}
          name={"flexibility"}
          color={themeData["secondary-meal2"]}
          data={flexibility}
          SuccessToast={SuccessToast}
          ErrorToast={ErrorToast}
        />
      </PagerView>
    </SafeAreaView>
  );
};

export default TabView;

const TabPage = ({ name, color, data, SuccessToast, ErrorToast }) => {
  const [showAddDish, setShowAddDish] = useState(false);
  const dispatch = useAppDispatch();
  const { userData } = useAppSelector((state) => state.goal);

  const setShowAddDishFunc = () => {
    dispatch(actResetMyExercise());
    setShowAddDish(true);
  };

  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <View style={{ flex: 0.15 }}>
        <AddCart
          onPress={setShowAddDishFunc}
          type={"Exercise"}
          name={`${name} Exercise`}
          color={color}
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
      <ModalAddNewExercise
        name={name}
        isOpen={showAddDish}
        setIsOpen={setShowAddDish}
        SuccessToast={SuccessToast}
      />
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
