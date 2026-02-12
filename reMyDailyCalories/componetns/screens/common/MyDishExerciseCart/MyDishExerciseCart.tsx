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
import { useAppSelector } from "../../../../hooks/storeHook";
import { API_URL } from "@env";
import { getFoodIcon } from "../../../../assets/icons/Foods/data";
import { TMyDish } from "../../../../type/myDishExercise.type";
import { ModalShowDetails } from "../../../Modals";

const { width, height } = Dimensions.get("window");

type Props = {
  data: TMyDish;
  type: "food" | "exercise";
};

const MyDishExerciseCart = ({ data, type }: Props) => {
  const { themeData } = useAppSelector((state) => state.theme);
  const [showDetials, setShowDetials] = useState(false);
  const cameData = {
    name: data.name,
    iconName: data.iconName,
    kcal: ((data.kcal / data.totalQuantity) * 100).toFixed(0),
    protein: ((data.protein / data.totalQuantity) * 100).toFixed(0),
    carbs: ((data.carbs / data.totalQuantity) * 100).toFixed(0),
    fats: ((data.fats / data.totalQuantity) * 100).toFixed(0),
    explane: data.explane,
  };

  return (
    <TouchableWithoutFeedback
      touchSoundDisabled={true}
      onPress={() => {
        // setShowList(false);
      }}
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
            <View
              style={{
                width: 50,
                height: 50,
                borderRadius: 12,
                backgroundColor: themeData["background-secondary-2"],
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                source={getFoodIcon(cameData.iconName)}
                resizeMode="cover"
                style={{
                  width: 35,
                  height: 35,
                }}
              />
            </View>
            <View style={{ gap: 5 }}>
              <Text
                style={[
                  styles.foodText1,
                  { color: themeData["text-primary"], fontWeight: 500 },
                ]}
              >
                {cameData.name}
              </Text>
              <Text
                style={[
                  styles.foodText2,
                  { color: themeData["text-secondary"] },
                ]}
              >
                {cameData.kcal} kcal - 100g
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <ModalShowDetails
          isOpen={showDetials}
          isOpenFunc={setShowDetials}
          data={cameData}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default MyDishExerciseCart;

const styles = StyleSheet.create({
  foodText1: {
    fontSize: 12,
  },
  foodText2: {
    fontSize: 10,
  },
});
