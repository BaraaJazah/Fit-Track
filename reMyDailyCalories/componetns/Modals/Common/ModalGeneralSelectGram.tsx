import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  Modal,
  Pressable,
  Button,
} from "react-native";
import React, { useState } from "react";
import WheelPickerExpo from "react-native-wheel-picker-expo";
import { useAppSelector } from "../../../hooks/storeHook";
import { Btn } from "../../common";

const { width, height } = Dimensions.get("screen");

type Props = {
  setIsOpen: any;
  updateHandler: any;
  isOpen: boolean;
  quantity: number;
  message: string;
  unit: string;
  typeOfSelect?: string;
};
const ModalGeneralSelectGram = ({
  isOpen,
  setIsOpen,
  quantity,
  updateHandler,
  message,
  unit,
  typeOfSelect,
}: Props) => {
  const { themeData } = useAppSelector((state) => state.theme);

  const { lang, words } = useAppSelector((state) => state.lang);

  let NUMBERS = [];
  if (typeOfSelect === "selectServing") {
    NUMBERS = Array.from({ length: 11 }, (_, i) => i);
  } else if (typeOfSelect === "selectMet") {
    NUMBERS = Array.from({ length: 201 }, (_, i) => i * 0.1);
  } else if (
    typeOfSelect === "fats" ||
    typeOfSelect === "carbs" ||
    typeOfSelect === "protein"
  ) {
    NUMBERS = Array.from({ length: 1000 }, (_, i) => i);
  } else {
    NUMBERS = Array.from({ length: 2000 }, (_, i) => i * 2);
  }

  const initialIndex =
    typeOfSelect === "selectServing"
      ? NUMBERS.findIndex((n) => n === quantity)
      : NUMBERS.findIndex((n) => n === quantity);

  const [selectedValue, setSelectedValue] = useState(
    NUMBERS[initialIndex]?.toString() || "0"
  );

  const onSaveHandler = () => {
    if (selectedValue && selectedValue !== "0") {
      updateHandler(
        isNaN(parseFloat(selectedValue)) ? quantity : parseFloat(selectedValue)
      );
    }
    setIsOpen(false);
  };

  return (
    <Modal
      visible={isOpen}
      animationType="fade"
      transparent={true}
      onRequestClose={() => {
        setIsOpen(false);
      }}
      statusBarTranslucent={true}
      navigationBarTranslucent={true}
    >
      <Pressable
        onPress={() => {
          setIsOpen(false);
        }}
        style={styles.body}
      >
        <View
          style={{
            width: width * 0.95,
            height: width,
            backgroundColor: themeData["background-secondary-2"],
            borderWidth: 4,
            borderColor: themeData["background-secondary"],
            alignItems: "center",
            justifyContent: "space-around",
            borderRadius: 20,
            paddingVertical: 10,
          }}
        >
          <Text style={{ color: themeData["text-secondary"] }}>
            {message ? message : words.selectGrams}
          </Text>

          <View
            style={{
              paddingVertical: 20,
            }}
          >
            <View
              style={[
                styles.pickerWrapper,
                {
                  backgroundColor: themeData["background-secondary"],
                  borderWidth: 5,
                  borderColor: themeData["background-secondary"],
                },
              ]}
            >
              <WheelPickerExpo
                height={240}
                width={180}
                initialSelectedIndex={initialIndex}
                items={NUMBERS.map((num) => ({
                  label: num.toFixed(1).toString() + " " + unit,
                  value: num.toFixed(1),
                }))}
                onChange={({ item }) => setSelectedValue(item.label)}
                backgroundColor={themeData["background-secondary-2"]}
              />
            </View>
          </View>

          <Btn
            bgColor="background-primary"
            text={words.Save}
            textColor={themeData["background-secondary-2"]}
            btnTextStyle={{ color: "#fff", paddingVertical: 12 }}
            onPress={onSaveHandler}
          />
        </View>
      </Pressable>
    </Modal>
  );
};

export default ModalGeneralSelectGram;

const styles = StyleSheet.create({
  body: {
    margin: 0,
    width,
    height,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },

  pickerWrapper: {
    borderRadius: 20,
    overflow: "hidden",
  },
});
