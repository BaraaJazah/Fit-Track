import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Pressable,
  Button,
} from "react-native";
import React, { useEffect, useState } from "react";
import WheelPickerExpo from "react-native-wheel-picker-expo";
import { useAppDispatch, useAppSelector } from "../../../hooks/storeHook";
import { updateFoodQuan } from "../../../store/user/userSlice";
import { Btn } from "../../common";

const { width, height } = Dimensions.get("window");

const ModalSelectGram = ({
  isOpen,
  setIsOpen,
  foodId,
  name,
  quantity,
  message,
}) => {
  const dispatch = useAppDispatch();
  const { themeData } = useAppSelector((state) => state.theme);
  const { lang, words } = useAppSelector((state) => state.lang);
  const [selectedValue, setSelectedValue] = useState(
    (quantity / 5 - 1).toString()
  );

  const NUMBERS = Array.from(
    { length: (2000 - 5) / 5 + 1 },
    (_, i) => 5 + i * 5
  );

  const onSaveHandler = () => {
    if (selectedValue && selectedValue !== "0") {
      const data = {
        meal: name,
        mealData: {
          id: foodId,
          newQuan: isNaN(parseInt(selectedValue, 10))
            ? 100
            : parseInt(selectedValue, 10),
        },
      };
      dispatch(updateFoodQuan(data));
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
            justifyContent: "center",
            borderRadius: 20,
          }}
        >
          <Text style={{ color: themeData["text-secondary"] }}>
            {message ? message : words.selectGrams}

            {/* {message ? message : "Select the amount of grams you need"} */}
          </Text>

          <View
            style={{
              paddingVertical: 20,
            }}
          >
            <View
              style={[
                styles.pickerWrapper,
                { backgroundColor: themeData["background-secondary"] },
              ]}
            >
              <WheelPickerExpo
                height={240}
                width={200}
                initialSelectedIndex={quantity / 5 - 1}
                items={NUMBERS.map((num) => ({
                  label: num.toString() + " g",
                  value: num,
                }))}
                onChange={({ item }) => setSelectedValue(item.label)}
                backgroundColor={themeData["background-secondary"]}
              />
            </View>
          </View>

          {/* <Button
            backgroundColor={themeData["background-primary"]}
            width={"32"}
            onPress={onSaveHandler}
          >
            Save
          </Button> */}

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

export default ModalSelectGram;

const styles = StyleSheet.create({
  body: {
    margin: 0,
    flex: 1,
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
