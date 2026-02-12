import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { plusWhite } from "../../assets/icons/home";
import { useAppDispatch, useAppSelector } from "../../hooks/storeHook";
import {
  waterEmpty,
  waterHalf,
  waterPull2,
  minusWhite,
} from "../../assets/icons";
import { addWater } from "../../store/user/userSlice";

const { width, height } = Dimensions.get("window");

type Props = {
  color: any;
  Recomended: number;
  type: string | "Exercise";
};

const AddWater = ({ color, Recomended, type }: Props) => {
  const dispatch = useAppDispatch();
  const { themeData } = useAppSelector((state) => state.theme);
  const { userDaily } = useAppSelector((state) => state.user);
  const { lang, words } = useAppSelector((state) => state.lang);
  const [drinkedWater, setDrinkedWater] = useState(0.0);

  // const userDaily = {
  //     water: 0
  // }
  const waterFullNum =
    (userDaily.water <= 0 ? 0 : userDaily.water * 10000) / Recomended > 10
      ? 10
      : (userDaily.water <= 0 ? 0 : userDaily.water * 10000) / Recomended; // result is ex : 3.440(from 10) * 10 = 34.40%
  const waterHalfNum = Math.floor((waterFullNum % 1) * 10) > 0 ? 1 : 0;
  const waterEmptyNum = 10 - (Math.floor(waterFullNum) + waterHalfNum);

  const handerWater = (op: "+" | "-") => {
    const data = { op: op, value: 0.1 };

    if (op === "-") {
      if (userDaily.water > 0) {
        dispatch(addWater(data));
      }
    } else {
      dispatch(addWater(data));
    }
  };

  return (
    <View style={styles.body}>
      <View style={[styles.left, { backgroundColor: color }]}></View>
      <View
        style={[
          {
            backgroundColor: themeData["background-secondary"],
            borderTopRightRadius: 12,
            borderBottomRightRadius: 12,
          },
        ]}
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
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={[styles.rightCardText1, { color: color }]}>
                {" "}
                {type}{" "}
              </Text>
              <Text
                style={{ fontSize: 14, color: themeData["text-secondary"] }}
              >
                {" "}
                {userDaily.water <= 0 ? 0 : userDaily.water.toFixed(1)}{" "}
                {words.L} ({Math.floor((waterFullNum ? waterFullNum : 0) * 10)}
                %)
              </Text>
            </View>

            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text
                style={[
                  styles.rightCardText2,
                  { color: themeData["text-secondary"], marginBottom: 6 },
                ]}
              >
                {words["Recommended Amount"]} {Recomended / 1000} {words.L}
              </Text>
            </View>

            <View style={{ flexDirection: "row", gap: 4 }}>
              {Array(Math.floor(waterFullNum ? waterFullNum : 0))
                .fill(0)
                .map((item, index) => {
                  return (
                    <Image
                      key={index}
                      style={styles.iconCartImage}
                      source={waterPull2}
                    />
                  );
                })}
              {waterHalfNum === 1 ? (
                <Image style={styles.iconCartImage} source={waterHalf} />
              ) : (
                ""
              )}
              {Array(waterEmptyNum ? waterEmptyNum : 0)
                .fill(0)
                .map((item, index) => {
                  return (
                    <Image
                      key={index}
                      style={styles.iconCartImage}
                      source={waterEmpty}
                    />
                  );
                })}
            </View>
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 2,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                handerWater("-");
              }}
              style={[styles.iconCart, { backgroundColor: color }]}
            >
              <Image style={styles.iconCartImage} source={minusWhite} />
            </TouchableOpacity>

            <Text
              style={{
                fontSize: 12,
                fontWeight: 500,
                color: themeData["text-secondary"],
                marginHorizontal: 5,
              }}
            >
              {userDaily.water <= 0 ? 0 : userDaily.water.toFixed(1)} {words.L}
            </Text>

            <TouchableOpacity
              onPress={() => {
                handerWater("+");
              }}
              style={[styles.iconCart, { backgroundColor: color }]}
            >
              <Image style={styles.iconCartImage} source={plusWhite} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default AddWater;

const styles = StyleSheet.create({
  body: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: width,
  },
  left: {
    width: width * 0.04,
    height: 100,
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
  },
  right: {
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
    flexDirection: "row",
    height: 100,
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
    borderRadius: 50,
    padding: 6,
  },
  iconCartImage: {
    width: 14,
    height: 14,
  },
});
