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
import { editWhite, explane, trashWight } from "../../../assets/icons/home";
import { ModalShowDetails } from "../../Modals";
import { TMyDish } from "../../../type/myDishExercise.type";
import { getFoodIcon } from "../../../assets/icons/Foods/data";
import {
  actDeleteMyDish,
  actDishById,
} from "../../../store/myDishExercise/myDishExerciseSlice";
import ModalEditNewDish from "../../Modals/Dish/ModalEditNewDish";
import ModalPreviewText from "../../Modals/Common/ModalPreviewText";
import { actGetSubscribeData } from "../../../store/auth/authSlice";

const { width, height } = Dimensions.get("window");

type TProps = {
  SuccessToast: (string) => void;
  ErrorToast: (string) => void;
  color?: any;
  data: {
    id: number;
    name: string;
    foodType: string;
    kcal: number;
    protein: number;
    fats: number;
    carbs: number;
    totalQuantity: number;
    serving: number;
    iconName: string;
    haveExplane: number;
    my_dish_foods: {}[];
    explane: string | null;
  };
};

const DishOwnCart = ({ data, color, SuccessToast, ErrorToast }: TProps) => {
  const { themeData } = useAppSelector((state) => state.theme);
  const [showDetails, setShowDetails] = useState(false);
  const [showEditDish, setShowEditDish] = useState(false);
  const [showDishExplane, setShowDishExplane] = useState(false);
  const { lang, words } = useAppSelector((state) => state.lang);
  const dispatch = useAppDispatch();
  const editBtn = color ? color : themeData["background-primary"];

  const dishData: TMyDish = {
    id: data?.id,
    name: data?.name,
    foodType: data?.foodType,
    kcal: parseInt(data?.kcal.toFixed(0)),
    protein: parseInt(data?.protein.toFixed(0)),
    fats: parseInt(data?.fats.toFixed(0)),
    carbs: parseInt(data?.carbs.toFixed(0)),
    totalQuantity: parseInt(data?.totalQuantity.toFixed(0)),
    serving: parseInt(data?.serving.toFixed(0)),
    iconName: data?.iconName,
    my_dish_foods: data?.my_dish_foods,
    explane: data?.explane,
  };

  const ModalDishData = {
    EnName: data.name,
    explane: data.explane,
    kcal: ((data?.kcal / data?.totalQuantity) * 100).toFixed(0),
    protein: ((data?.protein / data?.totalQuantity) * 100).toFixed(0),
    fats: ((data?.fats / data?.totalQuantity) * 100).toFixed(0),
    carbs: ((data?.carbs / data?.totalQuantity) * 100).toFixed(0),
  };

  const dataOfDish = [
    {
      name: words.protein,
      gram: data?.protein.toFixed(0),
      oran: ((data?.protein / data?.totalQuantity) * 100).toFixed(0),
      color: "secondary-meal1",
    },
    {
      name: words.fats,
      gram: data?.fats.toFixed(0),
      oran: ((data?.fats / data?.totalQuantity) * 100).toFixed(0),
      color: "secondary-meal2",
    },
    {
      name: words.carbs,
      gram: data?.carbs.toFixed(0),
      oran: ((data?.carbs / data?.totalQuantity) * 100).toFixed(0),
      color: "secondary-meal3",
    },
  ];

  const deleteHandler = () => {
    const sendData = {
      id: data.id,
    };

    dispatch(actDeleteMyDish(sendData))
      .unwrap()
      .then(() => {
        dispatch(actGetSubscribeData())
          .unwrap()
          .then(() => {
            SuccessToast(words["Food Deleted Successfully"]);
          });
      });
  };

  const showEditDishFunction = () => {
    dispatch(actDishById(data.id));
    setShowEditDish(true);
  };

  return (
    <TouchableWithoutFeedback
      touchSoundDisabled={true}
      onPress={() => {
        setShowDetails(false);
      }}
    >
      <View
        style={{
          marginBottom: 16,
          backgroundColor: themeData["background-secondary"],
          padding: 14,
          borderRadius: 12,
          width: width * 0.86,
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
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
              width: width * 0.56,
            }}
          >
            <View>
              <Image
                source={getFoodIcon(dishData.iconName)}
                style={{ width: 45, height: 45, borderRadius: 10 }}
              />

              {dishData.explane ? (
                <TouchableOpacity
                  onPress={() => {
                    setShowDishExplane(true);
                  }}
                  style={{
                    width: 25,
                    height: 25,
                    backgroundColor: themeData["background-secondary"],
                    borderRadius: 50,
                    position: "absolute",
                    alignItems: "center",
                    justifyContent: "center",
                    bottom: 25,
                    right: 30,
                  }}
                >
                  <View
                    style={{
                      width: 15,
                      height: 15,
                      backgroundColor: "#FFF",
                      borderRadius: 10,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Image source={explane} style={{ width: 20, height: 20 }} />
                  </View>
                </TouchableOpacity>
              ) : (
                <></>
              )}
            </View>

            {/* show detials btn */}
            <TouchableOpacity
              onPress={() => {
                setShowDetails(true);
              }}
              style={{ gap: 5, flex: 1 }}
            >
              <Text
                style={[
                  styles.foodText1,
                  { color: themeData["text-primary"], fontWeight: 500 },
                ]}
              >
                {dishData.name}
              </Text>
              <Text
                style={[
                  styles.foodText2,
                  { color: themeData["text-secondary"] },
                ]}
              >
                {/* {(dishData?.kcal).toFixed(0)} kcal in{" "}
                {dishData?.totalQuantity.toFixed(0)} g ( {dishData?.serving}{" "} */}
                {lang === "ar"
                  ? `${(dishData?.kcal).toFixed(
                      0
                    )} سعرة حرارية في ${dishData?.totalQuantity.toFixed(
                      0
                    )} غرام (${dishData?.serving}`
                  : lang === "de"
                  ? `${(dishData?.kcal).toFixed(
                      0
                    )} kcal in ${dishData?.totalQuantity.toFixed(0)} g ( ${
                      dishData?.serving
                    }`
                  : lang === "tr"
                  ? `${(dishData?.kcal).toFixed(
                      0
                    )} kcal içinde ${dishData?.totalQuantity.toFixed(0)} g (${
                      dishData?.serving
                    }`
                  : `${(dishData?.kcal).toFixed(
                      0
                    )} kcal in ${dishData?.totalQuantity.toFixed(0)} g (${
                      dishData?.serving
                    }`}{" "}
                {words.serving} )
              </Text>
            </TouchableOpacity>
          </View>

          <View
            style={{
              flexDirection: "row",
              gap: 8,
              padding: 10,
            }}
          >
            {/* edit details */}
            <TouchableOpacity
              onPress={showEditDishFunction}
              style={[
                styles.cartRightIconView,
                {
                  backgroundColor: editBtn,
                },
              ]}
            >
              <Image style={styles.cartRightIcon} source={editWhite} />
            </TouchableOpacity>
            {/* delete */}
            <TouchableOpacity
              onPress={deleteHandler}
              style={[
                styles.cartRightIconView,
                { backgroundColor: themeData["secondary-meal2"] },
              ]}
            >
              <Image style={styles.cartRightIcon} source={trashWight} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Button part food data */}
        <View
          style={{
            marginTop: 20,
            flexDirection: "row",
            justifyContent: "space-around",
            direction: lang === "ar" ? "rtl" : "ltr",
          }}
        >
          {dataOfDish.map((item, index) => {
            return (
              <View
                key={index}
                style={{ flexDirection: "row", alignItems: "center" }}
              >
                <View
                  style={{
                    height: 40,
                    width: 5,
                    backgroundColor: "#ccc",
                    borderRadius: 20,
                    marginHorizontal: 10,
                    justifyContent: "flex-end",
                  }}
                >
                  <View
                    style={{
                      backgroundColor: themeData[item.color],
                      height: (item.oran * 40) / 100,
                      maxHeight: 40,
                      borderRadius: 20,
                    }}
                  ></View>
                </View>
                <View>
                  <Text
                    style={{
                      fontSize: 10,
                      fontWeight: 600,
                      color: themeData["text-secondary"],
                    }}
                  >
                    {item.gram}g
                  </Text>
                  <Text
                    style={{ fontSize: 12, color: themeData["text-primary"] }}
                  >
                    {item.name}
                  </Text>
                </View>
              </View>
            );
          })}
        </View>

        {/* modals */}

        {showDetails && (
          <ModalShowDetails
            isOpen={showDetails}
            isOpenFunc={setShowDetails}
            data={ModalDishData}
          />
        )}

        {showEditDish && (
          <ModalEditNewDish
            isOpen={showEditDish}
            setIsOpen={setShowEditDish}
            SuccessToast={SuccessToast}
            ErrorToast={ErrorToast}
          />
        )}

        {showDishExplane && (
          <ModalPreviewText
            isOpen={showDishExplane}
            setIsOpen={setShowDishExplane}
            text={ModalDishData.explane}
            name={ModalDishData.EnName}
          />
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default DishOwnCart;

const styles = StyleSheet.create({
  foodText1: {
    fontSize: 16,
    textTransform: "capitalize",
  },
  foodText2: {
    fontSize: 10,
  },
  cartRightIcon: {
    width: 20,
    height: 20,
  },

  cartRightIconView: {
    padding: 6,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
});
