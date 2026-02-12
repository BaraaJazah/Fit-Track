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
import { useAppSelector } from "../../hooks/storeHook";
import { balance, details, trashWight } from "../../assets/icons/home";
import { API_URL } from "@env";
import { ModalSelectGram, ModalShowDetails } from "../Modals";
import { getFoodIcon } from "../../assets/icons/Foods/data";

const { width, height } = Dimensions.get("window");

type TProps = {
  onPressQuantity: () => void;
  onPressDelete: () => void;
  onPressShowDetials: () => void;
  name: string;

  data: {
    id: number;
    EnName: string;
    ArName: string;
    TrName: string;
    DeName: string;
    image: string;
    kcal: number;
    protein: number;
    fats: number;
    carbs: number;
    quan: number;
  };
};

const OwnDishCart = ({
  data,
  onPressQuantity,
  onPressDelete,
  onPressShowDetials,
  name,
}: TProps) => {
  const { themeData } = useAppSelector((state) => state.theme);
  const [showList, setShowList] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const { lang, words } = useAppSelector((state) => state.lang);
  const dataOfDish = [
    {
      name: words.protein,
      gram: ((data?.protein * data?.quan) / 100).toFixed(0),
      oran: ((data?.protein * data?.quan) / 100).toFixed(0),
      color: "secondary-meal1",
    },
    {
      name: words.fats,
      gram: ((data?.fats * data?.quan) / 100).toFixed(0),
      oran: ((data?.fats * data?.quan) / 100).toFixed(0),
      color: "secondary-meal2",
    },
    {
      name: words.carbs,
      gram: ((data?.carbs * data?.quan) / 100).toFixed(0),
      oran: ((data?.carbs * data?.quan) / 100).toFixed(0),
      color: "secondary-meal3",
    },
  ];

  return (
    <TouchableWithoutFeedback
      touchSoundDisabled={true}
      onPress={() => {
        setShowList(false);
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
          }}
        >
          <TouchableOpacity
            // onPress={onPressShowDetials}
            onPress={() => {
              setShowPreview(true);
            }}
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
              width: width * 0.55,
            }}
          >
            {data?.image.includes("/") ? (
              <Image
                src={`${API_URL}/build/assets/${data?.image}`}
                style={{ width: 45, height: 45, borderRadius: 10 }}
              />
            ) : (
              <Image
                source={getFoodIcon(data?.image)}
                style={{ width: 45, height: 45, borderRadius: 10 }}
              />
            )}

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
                {((data?.kcal * data?.quan) / 100).toFixed(0)} {words.Kcal} -{" "}
                {data?.quan.toFixed(0)}g
              </Text>
            </View>
          </TouchableOpacity>

          <View
            style={{
              flexDirection: "row",
              gap: 10,
              padding: 10,
            }}
          >
            <TouchableOpacity
              // onPress={onPressQuantity}
              onPress={() => {
                setShowList(true);
              }}
              style={[
                styles.cartRightIconView,
                {
                  backgroundColor: themeData["background-primary"],
                },
              ]}
            >
              <Image style={styles.cartRightIcon} source={balance} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onPressDelete}
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
        <ModalSelectGram
          isOpen={showList}
          setIsOpen={setShowList}
          quantity={data?.quan}
          foodId={data?.id}
          name={name}
          message={""}
        />

        <ModalShowDetails
          data={data}
          isOpen={showPreview}
          isOpenFunc={() => {
            setShowPreview(false);
          }}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default OwnDishCart;

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
