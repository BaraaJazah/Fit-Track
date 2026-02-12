import { Dimensions, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useAppSelector } from "../../hooks/storeHook";

const { width, height } = Dimensions.get("window");

type Props = {
  color: any;
  title: string;
  type: string;
  value: number;
};

const ExerciseDetails = ({ color, title, type, value }: Props) => {
  const { themeData } = useAppSelector((state) => state.theme);

  return (
    <View style={{}}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginVertical: 10,
        }}
      >
        <Text
          style={{
            fontSize: 14,
            fontWeight: 500,
            color: themeData["text-primary"],
          }}
        >
          {title}
        </Text>
        <Text style={{ fontSize: 10, color: themeData["text-secondary"] }}>
          {value} {type}
        </Text>
      </View>

      <View style={styles.backColor}>
        <View
          style={[
            styles.color,
            // كنت حاطط بالخواص كمان مقدار النشاط (mets)
            type == "Met"
              ? {
                  width: (width * 0.8 * (value > 20 ? 20 : value)) / 20,
                  backgroundColor: color,
                }
              : {
                  width: (width * 0.8 * (value > 60 ? 60 : value)) / 60,
                  backgroundColor: color,
                },
          ]}
        ></View>
      </View>
    </View>
  );
};

export default ExerciseDetails;

const styles = StyleSheet.create({
  backColor: {
    backgroundColor: "#ccc",
    width: width * 0.8,
    height: 5,
    borderRadius: 50,
  },
  color: {
    height: 5,
    borderRadius: 50,
  },
});
