import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/storeHook";
import { plusWhite } from "../../../assets/icons/home";
import { ModalShowDetails } from "../../Modals";
import { API_URL } from "@env";

import { addFood } from "../../../store/user/userSlice";
import ModalExersiceMiniDetails from "../../Modals/Exercise/ModalExersiceMiniDetails";
import { calcBurnForExercise } from "../../../hooks/calcBurnForExercise";
import {
  actAddToMyDish,
  actCalcolateTotal,
} from "../../../store/myDishExercise/myDishExerciseSlice";

const { width, height } = Dimensions.get("window");

type Props = {
  data: any;
  work?: string;
  activeType: "exercise" | "food";
  name: string;
};

const DishCartMiniAdd = ({ data, activeType, name, work = "" }: Props) => {
  const { themeData } = useAppSelector((state) => state.theme);
  const { userData } = useAppSelector((state) => state.goal);
  const { lang, words } = useAppSelector((state) => state.lang);
  const weight = userData.userData.weight === 0 ? 70 : userData.userData.weight;
  const dispatch = useAppDispatch();
  const [showList, setShowList] = useState(false);
  const [showDetials, setShowDetials] = useState(false);
  const addFoodHandler = (item) => {
    if (work === "AddToMyDishFood") {
      const data = {
        meal: name,
        mealData: item,
      };
      dispatch(actAddToMyDish(data));
      dispatch(actCalcolateTotal());
    } else {
      const data = {
        meal: name,
        mealData: item,
      };
      dispatch(addFood(data));
    }

    if (work === "AddToMyDishFood") {
    } else {
      const data = {
        meal: name,
        mealData: item,
      };
      dispatch(addFood(data));
    }
  };

  return (
    <>
      <TouchableWithoutFeedback
        touchSoundDisabled={true}
        onPress={() => {
          setShowList(false);
        }}
      >
        <View
          style={{
            marginVertical: 6,
            backgroundColor: themeData["background-secondary-2"],
            padding: 14,
            borderRadius: 12,
            width: width * 0.7,
            margin: "auto",
          }}
        >
          <View
            style={{
              justifyContent: "space-between",
              flexDirection: "row",
              alignItems: "center",
              direction: lang === "ar" ? "rtl" : "ltr",
            }}
          >
            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
                flex: 0.95,
              }}
              onPress={() => {
                setShowDetials(true);
              }}
            >
              <Image
                src={`${API_URL}/build/assets/${data?.image}`}
                style={{ width: 35, height: 35, borderRadius: 6 }}
              />

              <View style={{ gap: 3, flex: 1 }}>
                <Text
                  style={[
                    styles.foodText1,
                    {
                      color: themeData["text-primary"],
                      fontWeight: 500,
                    },
                  ]}
                >
                  {/* {data?.EnName} */}

                  {lang === "ar"
                    ? data.ArName
                    : lang === "de"
                    ? data.DeName
                    : lang === "tr"
                    ? data.TrName
                    : data.EnName}
                </Text>
                <Text
                  style={[
                    styles.foodText2,
                    {
                      color: themeData["text-secondary"],
                    },
                  ]}
                >
                  {activeType === "food"
                    ? `${data?.kcal} ${words.Kcal} - 100g`
                    : `Burn ${calcBurnForExercise(
                        weight,
                        30,
                        data?.met
                      )} kcal in 30 Minutes`}
                </Text>
              </View>
            </TouchableOpacity>

            <View style={{ flexDirection: "row", gap: 10 }}>
              <TouchableOpacity
                onPress={() => {
                  addFoodHandler(data);
                }}
                style={{
                  backgroundColor: themeData["background-primary"],
                  borderRadius: 6,
                  padding: 6,
                }}
              >
                <Image style={{ width: 16, height: 16 }} source={plusWhite} />
              </TouchableOpacity>
            </View>

            {activeType === "food" ? (
              <ModalShowDetails
                isOpen={showDetials}
                isOpenFunc={setShowDetials}
                data={data}
              />
            ) : (
              <ModalExersiceMiniDetails
                isOpen={showDetials}
                isOpenFunc={setShowDetials}
                data={data}
              />
            )}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </>
  );
};

export default DishCartMiniAdd;

const styles = StyleSheet.create({
  foodText1: {
    fontSize: 12,
  },
  foodText2: {
    fontSize: 8,
  },
});
