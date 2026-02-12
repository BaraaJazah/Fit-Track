import {
  BackHandler,
  Dimensions,
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect } from "react";
import { ExerciseDetails, HeaderBack } from "../../common";

import { useAppSelector } from "../../../hooks/storeHook";
import { API_URL } from "@env";
import { calcBurnForExercise } from "../../../hooks/calcBurnForExercise";
import { loveRed } from "../../../assets/icons/home";
import { AnimatePresence, MotiView } from "moti";

const { width, height } = Dimensions.get("window");

type Props = {
  isOpen: boolean;
  isOpenFunc: any;
  data: any;
  addFavorite: any;
  iconLeft: any;
};

const ModalExersiceDetails = ({
  isOpen,
  isOpenFunc,
  data,
  addFavorite,
  iconLeft,
}: Props) => {
  const { themeData } = useAppSelector((state) => state.theme);
  const { userData } = useAppSelector((state) => state.goal);
  const { favoriteExerciseIds } = useAppSelector((state) => state.favorite);
  const { lang, words } = useAppSelector((state) => state.lang);

  const weight = userData.userData.weight === 0 ? 70 : userData.userData.weight;

  const details = [
    {
      color: themeData["secondary-meal2"],
      title: `${words.Burn} ${calcBurnForExercise(weight, 60, data?.met)} ${
        words.Kcal
      }`,
      type: words.minutes,
      value: 60,
    },
    {
      color: themeData["secondary-meal3"],
      title: `${words.Burn} ${calcBurnForExercise(weight, 30, data?.met)} ${
        words.Kcal
      }`,
      type: words.minutes,
      value: 30,
    },
    {
      color: themeData["secondary-meal1"],
      title: `${words.Burn} ${calcBurnForExercise(weight, 15, data?.met)} ${
        words.Kcal
      }`,
      type: words.minutes,
      value: 15,
    },
    {
      color: themeData["background-primary"],
      title: `${words.Burn} ${calcBurnForExercise(weight, 5, data?.met)} ${
        words.Kcal
      }`,
      type: words.minutes,
      value: 5,
    },
  ];

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isOpen}
      onRequestClose={() => isOpenFunc(false)}
      statusBarTranslucent={true}
      navigationBarTranslucent={true}
    >
      <View style={[styles.body]}>
        <View
          style={{
            height: height * 0.45,
          }}
        >
          <Image
            src={`${API_URL}/build/assets/${data?.image}`}
            style={{ height: height * 0.55, width: width }}
          />
        </View>

        <View style={{ position: "absolute", paddingTop: 26 }}>
          <HeaderBack
            onPress={() => {
              isOpenFunc(false);
            }}
            title={
              lang === "ar"
                ? data.ArName
                : lang === "de"
                ? data.DeName
                : lang === "tr"
                ? data.TrName
                : data.EnName
            }
          />
        </View>

        <View
          style={{
            height: height * 0.55,
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            backgroundColor: themeData["background-secondary-2"],
            width: width,
            alignItems: "center",
            justifyContent: "center",
            paddingBottom: 30,
          }}
        >
          <View
            style={{
              flex: 1,
              width: width * 0.8,
              justifyContent: "space-evenly",
            }}
          >
            <View
              style={{
                justifyContent: "space-between",
                alignItems: "center",
                flexDirection: "row",
                paddingTop: 30,
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: 600,
                  color: themeData["text-primary"],
                  textTransform: "capitalize",
                  width: width * 0.75,
                }}
              >
                {lang === "ar"
                  ? data.ArName
                  : lang === "de"
                  ? data.DeName
                  : lang === "tr"
                  ? data.TrName
                  : data.EnName}
              </Text>

              <TouchableOpacity onPress={addFavorite}>
                <Image
                  style={{ width: 40, height: 40 }}
                  source={
                    favoriteExerciseIds.includes(data?.id) ? loveRed : iconLeft
                  }
                />
              </TouchableOpacity>
            </View>

            <View
              style={{
                justifyContent: "space-between",
                flexDirection: "row",
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                  marginTop: 10,
                  color: themeData["text-secondary"],
                }}
              >
                {words.CaloriesInfo}
              </Text>
            </View>

            <View
              style={{ gap: 20, paddingVertical: 30, alignItems: "center" }}
            >
              {/* <ExerciseDetails
                color={themeData["background-primary"]}
                title="Activity Metrics"
                type="Met"
                value={data?.met as any}
              /> */}

              <AnimatePresence>
                {details.map((item, index) => (
                  <MotiView
                    key={item.title}
                    from={{ opacity: 0, translateY: 20 }} // يبدأ من فوق
                    animate={{ opacity: 1, translateY: 0 }}
                    transition={{
                      type: "timing",
                      duration: 600,
                      delay: index * 300, // كل عنصر يظهر بعد 0.2s عن السابق
                    }}
                  >
                    <ExerciseDetails
                      color={item.color}
                      title={item.title}
                      type={item.type}
                      value={item.value}
                    />
                  </MotiView>
                ))}
              </AnimatePresence>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ModalExersiceDetails;

const styles = StyleSheet.create({
  body: {
    flex: 1,
    // paddingTop: 30,
    width: width,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-between",
  },
  packet: {
    borderWidth: 1,
    borderColor: "#eee",
    marginBottom: 10,
    height: height * 0.5,
    // paddingBottom: 6,
  },
});
