import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  Modal,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import WheelPickerExpo from "react-native-wheel-picker-expo";
import { useAppDispatch, useAppSelector } from "../../../hooks/storeHook";
import { updateFoodQuan } from "../../../store/user/userSlice";
import { Btn } from "../../common";

const { width, height } = Dimensions.get("window");

const ModalSelectTime = ({ isOpen, setIsOpen, foodId, name, quantity }) => {
  const dispatch = useAppDispatch();
  const { themeData } = useAppSelector((state) => state.theme);
  const { lang, words } = useAppSelector((state) => state.lang);

  const [selectedValue, setSelectedValue] = useState(
    (quantity / 5 - 1).toString()
  );

  const NUMBERS = Array.from(
    { length: (300 - 2) / 2 + 1 },
    (_, i) => 2 + i * 2
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
            {/* Please select the duration of your workout in minutes{" "} */}
            {words.selectWorkoutDuration}
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
                initialSelectedIndex={quantity / 2 - 1}
                items={NUMBERS.map((num) => ({
                  label: num.toString() + " M",
                  value: num,
                }))}
                onChange={({ item }) => setSelectedValue(item.label)}
                backgroundColor={themeData["background-secondary"]}
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

export default ModalSelectTime;

const styles = StyleSheet.create({
  body: {
    margin: 0,
    width,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },

  pickerWrapper: {
    borderRadius: 20,
    overflow: "hidden",
  },
});
