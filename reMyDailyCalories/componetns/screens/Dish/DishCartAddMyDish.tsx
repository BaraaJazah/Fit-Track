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
import { balance, trashWight } from "../../../assets/icons/home";
import { TMyDishFoods } from "../../../type/myDishExercise.type";
import { API_URL } from "@env";
import { ModalShowDetails } from "../../Modals";
import {
  actCalcolateTotal,
  actDeleteToMyDish,
  actUpdateMyDish,
} from "../../../store/myDishExercise/myDishExerciseSlice";
import ModalGeneralSelectGram from "../../Modals/Common/ModalGeneralSelectGram";
import { getFoodIcon } from "../../../assets/icons/Foods/data";

const { width, height } = Dimensions.get("window");

type TProps = {
  color?: any;
  data: {
    foodId: number;
    EnName: string;
    ArName: string;
    TrName: string;
    DeName: string;
    image: string;
    kcal: number;
    protein: number;
    fats: number;
    carbs: number;
    quantity: number;
    haveExplane: number;
  };
};

const DishCartAddMyDish = ({ data, color }: TProps) => {
  const { themeData } = useAppSelector((state) => state.theme);
  const { lang, words } = useAppSelector((state) => state.lang);
  const [showDetails, setShowDetails] = useState(false);
  const [showSelectGram, setShowSelectGram] = useState(false);

  const dispatch = useAppDispatch();
  const editBtn = color ? color : themeData["background-primary"];
  const dishData: TMyDishFoods = {
    foodId: data?.foodId,
    EnName:
      lang === "ar"
        ? data.ArName
        : lang === "de"
        ? data.DeName
        : lang === "tr"
        ? data.TrName
        : data.EnName,
    ArName: data.ArName,
    image: data?.image,
    kcal: parseInt(data?.kcal.toFixed(0)),
    protein: parseInt(data?.protein.toFixed(0)),
    fats: parseInt(data?.fats.toFixed(0)),
    carbs: parseInt(data?.carbs.toFixed(0)),
    quantity: parseInt(data?.quantity.toFixed(0)),
    haveExplane: data?.haveExplane,
  };

  const ModalDishData = {
    EnName: data.EnName,
    ArName: data.ArName,
    DeName: data.DeName,
    TrName: data.ArName,
    kcal: (data?.kcal).toFixed(0),
    protein: (data?.protein).toFixed(0),
    fats: (data?.fats).toFixed(0),
    carbs: (data?.carbs).toFixed(0),
  };

  const dataOfDish = [
    {
      name: words.protein,
      gram: ((data?.protein * data?.quantity) / 100).toFixed(0),
      oran: ((data?.protein * data?.quantity) / 100).toFixed(0),
      color: "secondary-meal1",
    },
    {
      name: words.fats,
      gram: ((data?.fats * data?.quantity) / 100).toFixed(0),
      oran: ((data?.fats * data?.quantity) / 100).toFixed(0),
      color: "secondary-meal2",
    },
    {
      name: words.carbs,
      gram: ((data?.carbs * data?.quantity) / 100).toFixed(0),
      oran: ((data?.carbs * data?.quantity) / 100).toFixed(0),
      color: "secondary-meal3",
    },
  ];

  const deleteHandler = () => {
    dispatch(actDeleteToMyDish(data));
    dispatch(actCalcolateTotal());
  };

  const updateHandler = (data) => {
    const updateData = {
      foodId: dishData.foodId,
      newQuan: data,
    };
    dispatch(actUpdateMyDish(updateData));
    dispatch(actCalcolateTotal());
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
          marginBottom: 10,
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
            {dishData.foodId.toString().startsWith("0") ? (
              <Image
                source={getFoodIcon(dishData.image)}
                style={{ width: 45, height: 45, borderRadius: 10 }}
              />
            ) : (
              <Image
                src={`${API_URL}/build/assets/${dishData?.image}`}
                style={{ width: 45, height: 45, borderRadius: 10 }}
              />
            )}

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
                {dishData.EnName}
              </Text>
              <Text
                style={[
                  styles.foodText2,
                  { color: themeData["text-secondary"] },
                ]}
              >
                {((dishData?.kcal * dishData?.quantity) / 100).toFixed(0)}{" "}
                {words.Kcal} - {dishData?.quantity}g
              </Text>
            </TouchableOpacity>
          </View>

          <View
            style={{
              flexDirection: "row",
              gap: 8,
              paddingHorizontal: 10,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                setShowSelectGram(true);
              }}
              style={[
                styles.cartRightIconView,
                {
                  backgroundColor: editBtn,
                },
              ]}
            >
              <Image style={styles.cartRightIcon} source={balance} />
            </TouchableOpacity>
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
            marginTop: 15,
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
                      height: (item?.oran * 40) / 100,
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
        <ModalShowDetails
          isOpen={showDetails}
          isOpenFunc={setShowDetails}
          data={ModalDishData}
        />
        <ModalGeneralSelectGram
          isOpen={showSelectGram}
          setIsOpen={setShowSelectGram}
          quantity={dishData.quantity}
          updateHandler={updateHandler}
          message={words.selectGrams}
          unit={"g"}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default DishCartAddMyDish;

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
