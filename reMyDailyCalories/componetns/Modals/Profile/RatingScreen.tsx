// RatingRewardScreen

import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
  Modal,
  Dimensions,
  Pressable,
  TextInput,
} from "react-native";
// import Stars from "react-native-stars";
// import { Rating, AirbnbRating } from "react-native-ratings";
import StarRating from "react-native-star-rating-widget";

import { useAppSelector } from "../../../hooks/storeHook";
const { width, height } = Dimensions.get("screen");

export default function RatingScreen({
  isOpen,
  setIsOpen,
  rateComment,
  getRateReward,
  setRateComment,
}) {
  const { themeData } = useAppSelector((state) => state.theme);
  const { lang, words } = useAppSelector((state) => state.lang);
  // rateComment
  const handleRate = () => {
    getRateReward();
  };

  const ratingCompleted = (rating) => {
    setRateComment({
      ...rateComment,
      stars: rating,
    });
  };

  const [rating, setRating] = useState(0);

  return (
    <Modal
      visible={isOpen}
      transparent={true}
      animationType="fade"
      onRequestClose={() => {
        setIsOpen(false);
        setRateComment({
          stars: 1,
          comment: "",
        });
      }}
      statusBarTranslucent={true}
      navigationBarTranslucent={true}
    >
      <Pressable
        style={[styles.container]}
        onPress={() => {
          setIsOpen(false);
          setRateComment({
            stars: 1,
            comment: "",
          });
        }}
      >
        <Pressable
          onPress={() => {}}
          style={{
            backgroundColor: themeData["background-secondary"],
            width: width * 0.9,
            borderRadius: 10,
            padding: 20,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              width: width * 0.75,
              justifyContent: "center",
              marginBottom: 20,
            }}
          >
            <Text style={{ fontSize: 16 }}>🔥</Text>
            <Text
              style={[
                styles.title,
                {
                  color: themeData["background-primary"],
                  textAlign: "center",
                  paddingHorizontal: 10,
                },
              ]}
            >
              {words.Rate5Stars}
            </Text>
            <Text style={{ fontSize: 16 }}>🔥</Text>
          </View>

          <StarRating rating={rating} onChange={setRating} />

          <View style={{ width: width * 0.65, marginTop: 12 }}>
            <TextInput
              style={{
                borderColor: "#999",
                borderWidth: 2,
                borderRadius: 8,
                padding: 10,
                paddingHorizontal: 16,
                color: themeData["text-primary"],
              }}
              placeholder={words.TypeComment}
              placeholderTextColor={themeData["text-secondary"]}
              value={rateComment.comment}
              onChangeText={(text) => {
                setRateComment({
                  ...rateComment,
                  comment: text,
                });
              }}
            />
          </View>

          <TouchableOpacity
            style={[
              styles.button,
              { backgroundColor: themeData["background-primary"] },
            ]}
            onPress={handleRate}
          >
            <Text style={styles.buttonText}>{words.rateNow}</Text>
          </TouchableOpacity>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    height,
    backgroundColor: "rgba(0,0,0,0.5)",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
  },
  myStarStyle: {
    color: "#f1c40f",
    backgroundColor: "transparent",
    fontSize: 40,
  },
  myEmptyStarStyle: {
    color: "#ccc",
  },
  button: {
    backgroundColor: "#27ae60",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    marginTop: 25,
  },
  buttonText: {
    color: "#fff",
    fontSize: 14,
  },
  giftImage: {
    width: 100,
    height: 100,
    marginTop: 30,
  },
});
