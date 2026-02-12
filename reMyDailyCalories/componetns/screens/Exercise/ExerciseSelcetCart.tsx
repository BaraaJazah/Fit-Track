import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/storeHook";
import { details, plusWhite } from "../../../assets/icons/home";
import { addFood } from "../../../store/user/userSlice";
import { calcBurnForExercise } from "../../../hooks/calcBurnForExercise";
import { API_URL } from "@env";
import ModalExersiceMiniDetails from "../../Modals/Exercise/ModalExersiceMiniDetails";

const { width, height } = Dimensions.get("window");

type Props = {
  name: string;
  catagoryId: number;
  data: {
    id: number;
    name: string;
    image: string;
    met: number;
  }[];
};

const ExerciseSelcetCart = ({ data, catagoryId }) => {
  const dispatch = useAppDispatch();
  const { themeData } = useAppSelector((state) => state.theme);
  const { userData } = useAppSelector((state) => state.goal);
  const { words, lang } = useAppSelector((state) => state.lang);

  const [showDetials, setShowDetials] = useState(false);
  const [exerciseData, setExerciseData] = useState(null);
  const weight = userData.userData.weight;
  const addFoodHandler = (item) => {
    const data = {
      meal: "exercise",
      mealData: item,
    };
    dispatch(addFood(data));
  };

  return (
    <>
      {(data.catagoryId && data.catagoryId === catagoryId) ||
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
                direction: lang === "ar" ? "rtl" : "ltr",
              }}
            >
              <Pressable
                onPress={() => {
                  setShowDetials(true);
                }}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 10,
                  flex: 1,
                }}
              >
                <Image
                  src={`${API_URL}/build/assets/${data?.image}`}
                  resizeMode="cover"
                  style={{ width: 50, height: 50, borderRadius: 12 }}
                />
                <View style={{ gap: 5 }}>
                  <Text
                    style={[
                      styles.foodText1,
                      { color: themeData["text-primary"], fontWeight: 500 },
                    ]}
                  >
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
                    {lang === "ar"
                      ? `حرق ${calcBurnForExercise(
                          weight,
                          30,
                          data.met
                        )} سعرة حرارية في 30 دقيقة`
                      : lang === "de"
                      ? `Verbrenne ${calcBurnForExercise(
                          weight,
                          30,
                          data.met
                        )} kcal in 30 Minuten`
                      : lang === "tr"
                      ? `30 Dakikada ${calcBurnForExercise(
                          weight,
                          30,
                          data.met
                        )} kcal Yak`
                      : `Burn ${calcBurnForExercise(
                          weight,
                          30,
                          data.met
                        )} kcal in 30 Minutes`}
                  </Text>
                </View>
              </Pressable>

              <View
                style={{
                  flexDirection: "row",
                  gap: 8,
                  flex: 0.2,
                  justifyContent: "center",
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    addFoodHandler(data);
                  }}
                  style={{
                    backgroundColor: themeData["background-primary"],
                    borderRadius: 6,
                    width: 32,
                    height: 32,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Image style={{ width: 20, height: 20 }} source={plusWhite} />
                </TouchableOpacity>
              </View>
            </View>

            <ModalExersiceMiniDetails
              isOpen={showDetials}
              isOpenFunc={setShowDetials}
              data={data}
            />
          </View>
        </TouchableWithoutFeedback>
      ) : (
        <></>
      )}
    </>
  );
};

export default ExerciseSelcetCart;

const styles = StyleSheet.create({
  foodText1: {
    fontSize: 12,
    width: width * 0.52,
  },
  foodText2: {
    fontSize: 10,
  },
});
