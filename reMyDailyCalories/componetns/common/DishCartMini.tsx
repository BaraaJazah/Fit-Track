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
import { love, loveRed } from "../../assets/icons/home";
import { ModalExersiceDetails, ModalFoodDetials } from "../Modals";
import { API_URL } from "@env";
import {
  actAddFavoriteExercises,
  actAddFavoriteFoods,
} from "../../store/favorite/favoriteSlice";
import { calcBurnForExercise } from "../../hooks/calcBurnForExercise";

const { width, height } = Dimensions.get("window");

type Props = {
  iconOne: any;
  iconTwo: any;
  data: any;
  activeType: "exercise" | "food";
};

const DishCartMini = ({ iconOne, iconTwo, data, activeType }: Props) => {
  const { themeData } = useAppSelector((state) => state.theme);
  const { favoriteFoodIds, favoriteExerciseIds, loading } = useAppSelector(
    (state) => state.favorite
  );

  const { userData } = useAppSelector((state) => state.goal);
  const { lang, words } = useAppSelector((state) => state.lang);
  const weight = userData.userData.weight === 0 ? 70 : userData.userData.weight;
  const dispatch = useAppDispatch();

  const [showList, setShowList] = useState(false);
  const [showDetials, setShowDetials] = useState(false);
  const [isClicked, setIsClicked] = useState(null);

  const addFavoriteHandler = () => {
    setIsClicked(data?.id);

    const favoriteData = {
      catagoryId: data.catagoryId,
      foodId: data.id,
      EnName: data.EnName,
      ArName: data.ArName,
      image: data.image,
      kcal: data.kcal,
      protein: data.protein,
      fats: data.fats,
      carbs: data.carbs,
      haveExplane: data.haveExplane,
    };

    dispatch(actAddFavoriteFoods({ favoriteData, foodId: data.id }));
  };

  const addFavoriteExercise = () => {
    setIsClicked(data.id);

    const exerciseData = {
      catagoryId: data.catagoryId,
      exerciseId: data.id,
      EnName: data.EnName,
      ArName: data.ArName,
      image: data.image,
      met: data.met,
      haveExplane: data.haveExplane,
    };

    dispatch(actAddFavoriteExercises({ exerciseData, exerciseId: data.id }));
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
            direction: lang === "ar" ? "rtl" : "ltr",
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

              <View style={{ gap: 3 }}>
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
                  {activeType === "food"
                    ? `${data?.kcal} ${words.Kcal} - 100g`
                    : `Burn ${calcBurnForExercise(
                        weight,
                        30,
                        data?.met
                      )} kcal in 30 Minutes`}

                  {/* {data?.kcal} kcal -100g */}
                </Text>
              </View>
            </TouchableOpacity>

            <View style={{ flexDirection: "row", gap: 10 }}>
              <TouchableOpacity
                onPress={
                  activeType === "food"
                    ? addFavoriteHandler
                    : addFavoriteExercise
                }
                style={{
                  backgroundColor: themeData["background-primary"],
                  borderRadius: 8,
                  padding: 8,
                }}
              >
                {loading === "pending" && isClicked === data?.id ? (
                  ""
                ) : (
                  <Image
                    style={{ width: 16, height: 16 }}
                    source={
                      activeType === "food"
                        ? favoriteFoodIds.includes(data?.id)
                          ? loveRed
                          : iconOne
                        : favoriteExerciseIds.includes(data?.id)
                        ? loveRed
                        : iconOne
                    }
                  />
                )}
              </TouchableOpacity>
            </View>

            {activeType === "food" ? (
              <ModalFoodDetials
                isOpen={showDetials}
                isOpenFunc={setShowDetials}
                addFavorite={addFavoriteHandler}
                iconLeft={love}
                data={data}
              />
            ) : (
              <ModalExersiceDetails
                isOpen={showDetials}
                isOpenFunc={setShowDetials}
                addFavorite={addFavoriteExercise}
                iconLeft={iconOne}
                data={data}
              />
            )}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </>
  );
};

export default DishCartMini;

const styles = StyleSheet.create({
  foodText1: {
    fontSize: 10,
    width: width * 0.44,
  },
  foodText2: {
    fontSize: 8,
  },
});
