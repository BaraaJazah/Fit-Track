import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  Modal,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/storeHook";
import { getFoodIcon } from "../../../assets/icons/Foods/data";
import { exercise2 } from "../../../assets/icons/exercise";
import { ModalLoading } from "../../feedback";
import { HeaderPages } from "../../screens/home";
import { actGetFoods } from "../../../store/food/foodSlice";
import { actGetExercise } from "../../../store/exercise/exerciseSlice";
import { explane } from "../../../assets/icons/home";
import {
  actUpdateExercise,
  actUpdateFood,
} from "../../../store/update/updateSlice";
import Toast from "react-native-toast-message";

const { width, height } = Dimensions.get("screen");

const ModalUpdate = ({ isOpen, setIsOpen }) => {
  const { themeData } = useAppSelector((state) => state.theme);
  const { update } = useAppSelector((state) => state.update);
  const { lang, words } = useAppSelector((state) => state.lang);

  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();

  // update foods
  const updateFoodsHandler = () => {
    setIsLoading(true);
    dispatch(actGetFoods())
      .unwrap()
      .then((res) => {
        dispatch(actUpdateFood())
          .unwrap()
          .finally(() => {
            setIsLoading(false);
          });
      })
      .catch((e) => {
        ErrorToast("There is a problem on the server");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  // update exercise
  const updateExerciseHandler = () => {
    setIsLoading(true);
    dispatch(actGetExercise())
      .unwrap()
      .then((res) => {
        dispatch(actUpdateExercise())
          .unwrap()
          .finally(() => {
            setIsLoading(false);
          });
      })
      .catch((e) => {
        ErrorToast("There is a problem on the server");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const ErrorToast = (item) => {
    setTimeout(() => {
      let text = item.charAt(0).toUpperCase() + item.slice(1).toLowerCase();
      Toast.show({
        type: "error",
        text1: "Error",
        text2: `${text}`,
        position: "bottom",
      });
    }, 100);
  };
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isOpen}
      onRequestClose={() => setIsOpen(false)}
      statusBarTranslucent={true}
      navigationBarTranslucent={true}
    >
      <View
        style={[
          styles.container,
          { backgroundColor: themeData["background-secondary-2"] },
        ]}
      >
        <View style={{ height: height * 0.16 }}>
          <HeaderPages
            onpress={() => {
              setIsOpen(false);
            }}
            header="Update Data"
            title=""
            text={words.updateMgs}
          />
        </View>

        <View
          style={{
            marginVertical: 20,
            flexDirection: "row",
            gap: 20,
          }}
        >
          <TouchableOpacity
            onPress={updateFoodsHandler}
            style={[
              styles.box,
              { backgroundColor: themeData["background-secondary"] },
            ]}
          >
            {update?.food === 1 && (
              <View
                style={[
                  styles.explane,
                  {
                    backgroundColor: themeData["background-secondary-2"],
                  },
                ]}
              >
                <Image source={explane} style={[{ width: 30, height: 30 }]} />
              </View>
            )}
            <Image style={styles.image} source={getFoodIcon("food2")} />
            <Text
              style={[styles.imageText, { color: themeData["text-primary"] }]}
            >
              {words.foods}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={updateExerciseHandler}
            style={[
              styles.box,
              { backgroundColor: themeData["background-secondary"] },
            ]}
          >
            {update?.exercise === 1 && (
              <View
                style={[
                  styles.explane,
                  {
                    backgroundColor: themeData["background-secondary-2"],
                  },
                ]}
              >
                <Image source={explane} style={[{ width: 30, height: 30 }]} />
              </View>
            )}

            <Image style={styles.image} source={exercise2} />
            <Text
              style={[styles.imageText, { color: themeData["text-primary"] }]}
            >
              {words.exercises}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <ModalLoading isOpen={isLoading} text={"Waiting to Update Database"} />
    </Modal>
  );
};

export default ModalUpdate;

const styles = StyleSheet.create({
  container: {
    width,
    height,
    alignItems: "center",
    marginTop: 30,
  },
  box: {
    width: width * 0.4,
    height: width * 0.4,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 70,
    height: 70,
  },
  imageText: {
    marginTop: 20,
    fontWeight: 600,
    fontSize: 16,
  },
  explane: {
    position: "absolute",
    zIndex: 100,
    top: -10,
    left: -10,
    borderRadius: 20,
    padding: 5,
  },
});
