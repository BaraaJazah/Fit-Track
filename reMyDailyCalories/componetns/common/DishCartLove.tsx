import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { memo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/storeHook";
import { love, loveRed } from "../../assets/icons/home";
import { ModalFoodDetials } from "../Modals";
import { API_URL } from "@env";
import { actAddFavoriteFoods } from "../../store/favorite/favoriteSlice";
import LottieFile from "../../constants/loffieFile/LottieFile";

const { width, height } = Dimensions.get("window");

type Props = {
  iconLeft: any;
  foodCataId: string;
  foodId: number;
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
const DishCartLove = memo(({ iconLeft, data, foodCataId, foodId }: Props) => {
  const { themeData } = useAppSelector((state) => state.theme);
  const { lang } = useAppSelector((state) => state.lang);

  const { favoriteFood, favoriteFoodIds, loading } = useAppSelector(
    (state) => state.favorite
  );
  const dispatch = useAppDispatch();
  const [isClicked, setIsClicked] = useState(null);

  const [showDetials, setShowDetials] = useState(false);

  const addFavoriteFoodHandler = () => {
    const favoriteData = {
      catagoryId: foodCataId,
      foodId: foodId,
      EnName: data.EnName,
      ArName: data.ArName,
      TrName: data.TrName,
      DeName: data.DeName,
      image: data.image,
      kcal: data.kcal,
      protein: data.protein,
      fats: data.fats,
      carbs: data.carbs,
      haveExplane: data.haveExplane,
    };

    dispatch(actAddFavoriteFoods({ favoriteData, foodId: foodId }));
  };

  // const startTimer = () => {
  //   setIsLottie(true); // بعد ثانية تصبح false

  //   const timer = setTimeout(() => {
  //     setIsLottie(false); // بعد ثانية تصبح false
  //   }, 2000);

  //   // تنظيف المؤقت عند unmount أو إعادة التشغيل
  //   return () => clearTimeout(timer);
  // };

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
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 16,
                  flex: 0.95,
                }}
                onPress={() => {
                  setShowDetials(true);
                }}
              >
                <Image
                  src={`${API_URL}/build/assets/${data.image}`}
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
                    {data.kcal} kcal -100g
                  </Text>
                </View>
              </TouchableOpacity>

              <View style={{ flexDirection: "row", gap: 10 }}>
                <TouchableOpacity
                  disabled={loading === "pending" ? true : false}
                  onPress={addFavoriteFoodHandler}
                  style={{
                    backgroundColor: themeData["background-primary"],
                    borderRadius: 6,
                    padding: 8,
                  }}
                >
                  {loading == "pending" && isClicked === data.id ? (
                    <>
                      <View style={{ width: 20, height: 20 }}></View>
                    </>
                  ) : (
                    <Image
                      style={{ width: 20, height: 20 }}
                      source={
                        favoriteFoodIds.includes(data.id) ? loveRed : iconLeft
                      }
                    />
                  )}
                </TouchableOpacity>
              </View>
            </View>

            <ModalFoodDetials
              isOpen={showDetials}
              isOpenFunc={setShowDetials}
              addFavorite={addFavoriteFoodHandler}
              iconLeft={iconLeft}
              data={data}
            />
          </View>
        </TouchableWithoutFeedback>
      ) : (
        ""
      )}
    </>
  );
});

export default DishCartLove;

const styles = StyleSheet.create({
  foodText1: {
    fontSize: 12,
  },
  foodText2: {
    fontSize: 10,
  },
});
