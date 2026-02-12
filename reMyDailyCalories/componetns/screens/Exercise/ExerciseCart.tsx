import {
  ActivityIndicator,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import React, { memo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/storeHook";
import { loveRed } from "../../../assets/icons/home";
import { calcBurnForExercise } from "../../../hooks/calcBurnForExercise";
import { ModalExersiceDetails } from "../../Modals";
import { API_URL } from "@env";
import { actAddFavoriteExercises } from "../../../store/favorite/favoriteSlice";

const { width, height } = Dimensions.get("window");

type Props = {
  catagoryId: any;
  exerciseId: any;
  iconLeft: any;
  data: {
    id: number;
    catagoryId: string;
    EnName: string;
    ArName: string;
    TrName: string;
    DeName: string;
    image: string;
    met: number;
    haveExplane: number;
  };
};

const ExerciseCart = memo(
  ({ data, catagoryId, exerciseId, iconLeft }: Props) => {
    const { themeData } = useAppSelector((state) => state.theme);
    const { userData } = useAppSelector((state) => state.goal);
    const { lang, words } = useAppSelector((state) => state.lang);

    const { loading, favoriteExerciseIds, favoriteExercise } = useAppSelector(
      (state) => state.favorite
    );

    const dispatch = useAppDispatch();
    const weight =
      userData.userData.weight === 0 ? 70 : userData.userData.weight;
    const [showDetials, setShowDetials] = useState(false);
    const [isClicked, setIsClicked] = useState(null);

    const addFavoriteExercise = () => {
      // setIsClicked(data.id);

      const exerciseData = {
        catagoryId: catagoryId,
        exerciseId: exerciseId,
        EnName: data.EnName,
        ArName: data.ArName,
        TrName: data.TrName,
        DeName: data.DeName,
        image: data.image,
        met: data.met,
        haveExplane: data.haveExplane,
      };

      dispatch(
        actAddFavoriteExercises({ exerciseData, exerciseId: exerciseId })
      );
    };

    return (
      <>
        {(data.catagoryId && data.catagoryId === catagoryId) ||
        !data.catagoryId ? (
          <TouchableWithoutFeedback
            touchSoundDisabled={true}
            onPress={() => {}}
          >
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
                        {
                          color: themeData["text-primary"],
                          fontWeight: 500,
                        },
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
                </TouchableOpacity>

                <View
                  style={{
                    flexDirection: "row",
                    gap: 10,
                  }}
                >
                  <TouchableOpacity
                    onPress={addFavoriteExercise}
                    disabled={loading === "pending" ? true : false}
                    style={{
                      backgroundColor: themeData["background-primary"],
                      borderRadius: 6,
                      padding: 8,
                    }}
                  >
                    {loading == "pending" && isClicked === data.id ? (
                      <></>
                    ) : (
                      <Image
                        style={{ width: 20, height: 20 }}
                        source={
                          favoriteExerciseIds.includes(data.id)
                            ? loveRed
                            : iconLeft
                        }
                      />
                    )}
                  </TouchableOpacity>
                </View>
              </View>

              <ModalExersiceDetails
                isOpen={showDetials}
                isOpenFunc={setShowDetials}
                addFavorite={addFavoriteExercise}
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
  }
);

export default ExerciseCart;

const styles = StyleSheet.create({
  foodText1: {
    fontSize: 12,
    width: width * 0.52,
  },
  foodText2: {
    fontSize: 10,
  },
});
