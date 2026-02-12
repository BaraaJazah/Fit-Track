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
import {
  editWhite,
  plusWhite,
  backWhite,
  dropDown,
} from "../../assets/icons/home";
import { useAppSelector } from "../../hooks/storeHook";
import { calcBurnForExercise } from "../../hooks/calcBurnForExercise";

const { width, height } = Dimensions.get("window");

type Props = {
  name: string;
  color: any;
  Recomended?: number;
  type: string | "Exercise";
  onPress: () => void;
  typeText?: string;
  foodData: any;
};

const EditFood = ({
  name,
  color,
  Recomended,
  type,
  onPress,
  typeText,
  foodData,
}: Props) => {
  const { themeData } = useAppSelector((state) => state.theme);
  const { userData } = useAppSelector((state) => state.goal);
  const { lang, words } = useAppSelector((state) => state.lang);
  const [showDetails, setShowDetails] = useState(false);

  let total = 0;

  if (type === "Exercise") {
    foodData.map((item) => {
      total += Number(
        calcBurnForExercise(
          userData.userData.weight === 0 ? 70 : userData.userData.weight,
          item.quan,
          item.met
        )
      );
    });
  } else {
    foodData.map((item) => {
      total += item.kcal * (item.quan / 100);
    });
  }

  return (
    <View style={styles.body}>
      <View style={{ flexDirection: "row" }}>
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
            <View style={styles.rightCard}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={[styles.rightCardText1, { color: color }]}>
                  {name}{" "}
                </Text>
                <Text
                  style={{ fontSize: 12, color: themeData["text-secondary"] }}
                >
                  {" "}
                  ( {total.toFixed(0)} {words.Kcal} )
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    setShowDetails(!showDetails);
                  }}
                  style={[styles.iconCart]}
                >
                  <Image
                    style={{ width: 14, height: 14, marginHorizontal: 10 }}
                    source={dropDown}
                  />
                </TouchableOpacity>
              </View>

              <Text
                style={[
                  styles.rightCardText2,
                  {
                    color: themeData["text-secondary"],
                  },
                ]}
              >
                {type == "Exercise" ? typeText : `${words["Recommended Kcal"]}`}{" "}
                {Recomended}
              </Text>
            </View>
            <TouchableOpacity
              onPress={onPress}
              style={[styles.iconCart, { backgroundColor: color }]}
            >
              <Image style={styles.iconCartImage} source={editWhite} />
            </TouchableOpacity>
          </View>

          {/* Details */}

          {showDetails ? (
            <View style={[{ paddingHorizontal: 20, marginBottom: 10, gap: 6 }]}>
              {foodData.map((item, index) => {
                const burn = Number(
                  calcBurnForExercise(
                    userData.userData.weight === 0
                      ? 70
                      : userData.userData.weight,
                    60 * (item.quan / 60),
                    item.met
                  )
                );

                return (
                  <View
                    key={index}
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      paddingBottom: 20,
                      direction: lang === "ar" ? "rtl" : "ltr",
                    }}
                  >
                    {type === "Exercise" ? (
                      <>
                        <Text
                          style={[
                            styles.rightCardText2,
                            {
                              color: themeData["text-secondary"],
                              fontSize: 10,
                            },
                          ]}
                        >
                          {lang === "ar"
                            ? item.ArName
                            : lang === "de"
                            ? item.DeName
                            : lang === "tr"
                            ? item.TrName
                            : item.EnName}{" "}
                          ( {item.quan} M ){" "}
                        </Text>
                        <Text
                          style={[
                            styles.rightCardText2,
                            {
                              color: themeData["text-secondary"],
                              fontSize: 10,
                            },
                          ]}
                        >
                          {burn.toFixed(0)} {words.Kcal}{" "}
                        </Text>
                      </>
                    ) : (
                      <>
                        <Text
                          style={[
                            styles.rightCardText2,
                            {
                              color: themeData["text-secondary"],
                              fontSize: 10,
                            },
                          ]}
                        >
                          {lang === "ar"
                            ? item.ArName
                            : lang === "de"
                            ? item.DeName
                            : lang === "tr"
                            ? item.TrName
                            : item.EnName}{" "}
                          ( {item.quan} g ){" "}
                        </Text>
                        <Text
                          style={[
                            styles.rightCardText2,
                            {
                              color: themeData["text-secondary"],
                              fontSize: 10,
                            },
                          ]}
                        >
                          {(item.kcal * (item.quan / 100)).toFixed(0)}{" "}
                          {words.Kcal}{" "}
                        </Text>
                      </>
                    )}
                  </View>
                );
              })}
            </View>
          ) : (
            ""
          )}
        </View>
      </View>
    </View>
  );
};

export default EditFood;

const styles = StyleSheet.create({
  body: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: width,
  },
  left: {
    width: width * 0.04,
    minHeight: 80,
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
  },
  right: {
    flexDirection: "row",
    minHeight: 80,
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
    borderRadius: 8,
    padding: 6,
  },
  iconCartImage: {
    width: 22,
    height: 22,
  },
});
