import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { plusWhite } from "../../assets/icons/home";
import { useAppDispatch, useAppSelector } from "../../hooks/storeHook";

import ModalGeneralSelectGram from "../Modals/Common/ModalGeneralSelectGram";
import {
  actAddWater,
  actCalcolateTotal,
} from "../../store/myDishExercise/myDishExerciseSlice";

const { width, height } = Dimensions.get("window");

type Props = {
  color: any;
  Recomended: number;
  type: string | "Exercise";
};

const MyDishAddWater = ({ color, Recomended, type }: Props) => {
  const dispatch = useAppDispatch();
  const { themeData } = useAppSelector((state) => state.theme);
  const { myAddTotalDish, myAddDish } = useAppSelector(
    (state) => state.myDishExercise
  );
  const { lang, words } = useAppSelector((state) => state.lang);

  const [isOpen, setIsOpen] = useState(false);
  const [drinkedWater, setDrinkedWater] = useState(0);

  const handerWater = (data) => {
    setDrinkedWater(data);
    dispatch(actAddWater(data));
    dispatch(actCalcolateTotal());
  };

  useEffect(() => {
    let notWater = 0;
    if (myAddDish.length > 0) {
      myAddDish.map((item) => {
        notWater += item.quantity;
      });
      dispatch(actAddWater(myAddTotalDish.totalQuantity - notWater));
      setDrinkedWater(myAddTotalDish.totalQuantity - notWater);
    }
  }, []);

  return (
    <View style={styles.body}>
      <View style={[styles.left, { backgroundColor: color }]}></View>
      {/* */}

      <View
        style={{
          backgroundColor: themeData["background-secondary"],
          borderTopRightRadius: 12,
          borderBottomRightRadius: 12,
        }}
      >
        <View
          style={[
            styles.right,
            {
              direction: lang === "ar" ? "rtl" : "ltr",
            },
          ]}
        >
          <View style={[styles.rightCard, {}]}>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
            >
              <Text style={[styles.rightCardText1, { color: color }]}>
                {type}
              </Text>
              <Text
                style={{ fontSize: 14, color: themeData["text-secondary"] }}
              >
                {drinkedWater} ml
              </Text>
            </View>
          </View>

          <View style={{ flexDirection: "row", alignItems: "center", gap: 2 }}>
            <TouchableOpacity
              onPress={() => {
                setIsOpen(true);
              }}
              style={[styles.iconCart, { backgroundColor: color }]}
            >
              <Image style={styles.iconCartImage} source={plusWhite} />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <ModalGeneralSelectGram
        setIsOpen={setIsOpen}
        isOpen={isOpen}
        quantity={drinkedWater}
        unit={" ml"}
        updateHandler={handerWater}
        message={words.selectWater}
        typeOfSelect=""
      />
    </View>
  );
};

export default MyDishAddWater;

const styles = StyleSheet.create({
  body: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: width * 0.86,
    marginBottom: 10,
  },
  left: {
    width: width * 0.04,
    height: 80,
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
  },
  right: {
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
    flexDirection: "row",
    height: 80,
    width: width * 0.82,
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  rightCard: {
    gap: 2,
  },
  rightCardText1: {
    fontSize: 18,
    fontWeight: 500,
  },
  rightCardText2: {
    fontSize: 12,
  },

  iconCart: {
    borderRadius: 6,
    padding: 6,
  },
  iconCartImage: {
    width: 18,
    height: 18,
  },
});
