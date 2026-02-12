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
import { useAppDispatch, useAppSelector } from "../../hooks/storeHook";
import { details, loveRed, plusWhite } from "../../assets/icons/home";
import { ModalShowDetails } from "../Modals";
import { addFood } from "../../store/user/userSlice";
import { API_URL } from "@env";
import {
  actAddToMyDish,
  actCalcolateTotal,
} from "../../store/myDishExercise/myDishExerciseSlice";

const { width, height } = Dimensions.get("window");

type Props = {
  name: string;
  work: "" | "AddToMyDishFood";
  foodCataId?: string;
  data: {
    catagoryId: string;
    id: number | string;
    typeId: number;
    EnName: string;
    ArName: string;
    TrName: string;
    DeName: string;
    image: string;
    kcal: number;
    protein: number;
    carbs: number;
    fats: number;
    haveExplane: number;
  };
};

const DishCart = ({ data, name, foodCataId, work }: Props) => {
  const dispatch = useAppDispatch();
  const { themeData } = useAppSelector((state) => state.theme);
  const { lang, words } = useAppSelector((state) => state.lang);

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
  };

  return (
    <>
      {(data.catagoryId && data.catagoryId === foodCataId) ||
      !data.catagoryId ? (
        <TouchableWithoutFeedback touchSoundDisabled={true} onPress={() => {}}>
          <View
            style={{
              marginBottom: 14,
              backgroundColor: themeData["background-secondary"],
              padding: 14,
              borderRadius: 12,
              width: width * 0.85,
            }}
          >
            <View
              style={{
                justifyContent: "space-between",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  setShowDetials(true);
                }}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 10,
                  flex: 0.95,
                }}
              >
                <Image
                  src={`${API_URL}/build/assets/${data?.image}`}
                  resizeMode="cover"
                  style={{ width: 50, height: 50, borderRadius: 12 }}
                />
                <View>
                  <Text
                    style={[
                      styles.foodText1,
                      { color: themeData["text-primary"], fontWeight: 500 },
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
                      { color: themeData["text-secondary"] },
                    ]}
                  >
                    {data?.kcal} {words.Kcal} - 100g
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  addFoodHandler(data);
                }}
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  width: 50,
                  height: 50,
                }}
              >
                <View
                  style={{
                    backgroundColor: themeData["background-primary"],
                    borderRadius: 6,
                    padding: 6,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Image style={{ width: 18, height: 18 }} source={plusWhite} />
                </View>
              </TouchableOpacity>
            </View>

            <ModalShowDetails
              isOpen={showDetials}
              isOpenFunc={setShowDetials}
              data={data}
            />
          </View>
        </TouchableWithoutFeedback>
      ) : (
        ""
      )}
    </>
  );
};

export default DishCart;

const styles = StyleSheet.create({
  foodText1: {
    fontSize: 14,
  },
  foodText2: {
    fontSize: 10,
  },
});
