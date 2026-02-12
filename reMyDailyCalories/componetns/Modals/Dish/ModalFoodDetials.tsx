import {
  Dimensions,
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { FoodDetails, HeaderBack } from "../../common";
import { AnimatePresence, MotiView } from "moti";

import { useAppSelector } from "../../../hooks/storeHook";
import { API_URL } from "@env";
import { loveRed } from "../../../assets/icons/home";

const { width, height } = Dimensions.get("window");

type Props = {
  isOpen: boolean;
  isOpenFunc: any;
  data: any;
  addFavorite: any;
  iconLeft: any;
};

const ModalFoodDetials = ({
  isOpen,
  isOpenFunc,
  data,
  addFavorite,
  iconLeft,
}: Props) => {
  const { themeData } = useAppSelector((state) => state.theme);
  const { lang, words } = useAppSelector((state) => state.lang);
  const { favoriteFood, favoriteFoodIds, loading } = useAppSelector(
    (state) => state.favorite
  );

  const details = [
    {
      color: themeData["background-primary"],
      title: words.kcal,
      type: " kcal",
      value: Number(data.kcal),
    },
    {
      color: themeData["secondary-meal1"],
      title: words.protein,
      type: " g",
      value: Number(data.protein),
    },
    {
      color: themeData["secondary-meal3"],
      title: words.carbs,
      type: " g",
      value: Number(data.carbs),
    },
    {
      color: themeData["secondary-meal2"],
      title: words.fats,
      type: " g",
      value: Number(data.fats),
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
            src={`${API_URL}/build/assets/` + data?.image}
            style={{ height: height * 0.55, width: width }}
          />
        </View>

        <View
          style={{
            height: height * 0.1,
            paddingTop: 30,
            position: "absolute",
          }}
        >
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
          }}
        >
          <View style={{ width: width * 0.8 }}>
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
                    favoriteFoodIds.includes(data?.id) ? loveRed : iconLeft
                  }
                />
              </TouchableOpacity>
            </View>

            <View
              style={{
                justifyContent: "space-between",
                flexDirection: "row",
                paddingTop: 10,
              }}
            ></View>

            <View
              style={{ gap: 20, paddingVertical: 30, alignItems: "center" }}
            >
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
                    <FoodDetails
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

export default ModalFoodDetials;

const styles = StyleSheet.create({
  body: {
    flex: 1,
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
    paddingBottom: 6,
  },
});
