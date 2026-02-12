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
import { useAppSelector } from "../../../hooks/storeHook";
import {
  balance,
  details,
  sportTime,
  trashWight,
} from "../../../assets/icons/home";
import { API_URL } from "@env";
import ModalSelectTime from "../../Modals/Exercise/ModalSelectTime";
import { calcBurnForExercise } from "../../../hooks/calcBurnForExercise";
import ModalExersiceMiniDetails from "../../Modals/Exercise/ModalExersiceMiniDetails";

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
    met: number;
    quan: number;
  };
};

const OwnExerciseCart = ({
  data,
  onPressQuantity,
  onPressDelete,
  onPressShowDetials,
  name,
}: TProps) => {
  const { themeData } = useAppSelector((state) => state.theme);
  const [showList, setShowList] = useState(false);
  const { userData } = useAppSelector((state) => state.goal);
  const { words, lang } = useAppSelector((state) => state.lang);

  const weight = userData.userData.weight === 0 ? 70 : userData.userData.weight;
  const [showPreview, setShowPreview] = useState(false);

  const dataOfDish = [
    {
      name: `60 ${words.minutes}`,
      gram: calcBurnForExercise(weight, 60, data?.met),
      oran: ((60 * 100) / 60).toFixed(0),
      color: "secondary-meal2",
    },
    {
      name: `30 ${words.minutes}`,
      gram: calcBurnForExercise(weight, 30, data?.met),
      oran: ((30 * 100) / 60).toFixed(0),
      color: "secondary-meal3",
    },
    {
      name: `15 ${words.minutes}`,
      gram: calcBurnForExercise(weight, 15, data?.met),
      oran: ((15 * 100) / 60).toFixed(0),
      color: "secondary-meal1",
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
            <Image
              src={`${API_URL}/build/assets/${data?.image}`}
              style={{ width: 45, height: 45, borderRadius: 10 }}
            />

            <View style={{ gap: 5 }}>
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
                {calcBurnForExercise(weight, data?.quan, data?.met)} kcal in{" "}
                {data?.quan.toFixed(0)} Minutes
              </Text>
            </View>
          </TouchableOpacity>

          <View
            style={{
              flexDirection: "row",
              gap: 10,
              paddingVertical: 10,
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
              <Image style={styles.cartRightIcon} source={sportTime} />
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
                    {item.gram} {words.Kcal}
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
        <ModalSelectTime
          isOpen={showList}
          setIsOpen={setShowList}
          quantity={data?.quan}
          foodId={data?.id}
          name={name}
        />

        <ModalExersiceMiniDetails
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

export default OwnExerciseCart;

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
