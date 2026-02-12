import {
  Dimensions,
  Image,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { HeaderPages } from "../../screens/home";
import { useAppDispatch, useAppSelector } from "../../../hooks/storeHook";
import { Packet } from "../../common";
import { explane, image, note } from "../../../assets/icons/home";
import { ModalAddImage } from "..";
import {
  actResetMyDish,
  actSetMyDishs,
  addCalcolateTotal,
} from "../../../store/myDishExercise/myDishExerciseSlice";
import Toast from "react-native-toast-message";
import { getFoodIcon } from "../../../assets/icons/Foods/data";
import ModalGeneralSelectGram from "../Common/ModalGeneralSelectGram";
import ModalTextEditor from "../Common/ModalTextEditor";
import { calcBurnForExercise } from "../../../hooks/calcBurnForExercise";

const { width, height } = Dimensions.get("screen");

const ModalAddNewExercise = ({
  isOpen = false,
  setIsOpen,
  name,
  SuccessToast,
}) => {
  const { themeData } = useAppSelector((state) => state.theme);

  const dispatch = useAppDispatch();
  const { myAddDish, myAddTotalDish } = useAppSelector(
    (state) => state.myDishExercise
  );
  const { userData } = useAppSelector((state) => state.goal);
  const userWight = userData.userData.weight;
  const [isOpenReadyDishSelect, setIsOpenReadyDishSelect] = useState(false);
  const [addImageVisible, setAddImageVisible] = useState(false);
  const [textEditorVisible, setTextEditorVisible] = useState(false);
  const [delayToast, setDelayToast] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [sendData, setSendData] = useState({
    exerciseType: name,
    iconName: "",
    name: "",
    explane: "",
    met: 0,
  });

  const saveDishHandler = () => {
    const dishInputData = {
      exerciseType: name,
      iconName: sendData.iconName,
      name: sendData.name,
      explane: sendData.explane,
      met: sendData.met,
    };
    setDelayToast(true);
    setTimeout(() => {
      if (!sendData.iconName) {
        showToast("PleaseSelectIcon");
        return;
      } else if (!sendData.name.trim()) {
        showToast("Please add Exercise name");
        return;
      } else if (sendData.name.trim().length > 20) {
        showToast("The name must be less than 20 characters");
        return;
      } else if (sendData.met === 0) {
        showToast("Please enter number of MET");
        return;
      } else {
        setIsLoading(true);
        const timerId = setTimeout(() => {
          setIsLoading(false);
          const mergedDish = {
            name: dishInputData.name,
            kcal: myAddTotalDish.kcal,
            protein: myAddTotalDish.protein,
            fats: myAddTotalDish.fats,
            carbs: myAddTotalDish.carbs,
            totalQuantity: myAddTotalDish.totalQuantity,
            iconName: dishInputData.iconName,
            explane: dishInputData.explane || null,
            my_dish_foods: myAddDish.map((item) => ({
              foodId: item.foodId,
              EnName: item.EnName,
              ArName: item.ArName,
              image: item.image,
              kcal: item.kcal,
              protein: item.protein,
              fats: item.fats,
              carbs: item.carbs,
              quantity: item.quantity,
              haveExplane: item.haveExplane,
            })),
          };

          dispatch(actSetMyDishs(mergedDish))
            .unwrap()
            .then(() => {
              // reset and send success message
              dispatch(actResetMyDish());
              setSendData({
                exerciseType: "",
                iconName: "",
                name: "",
                explane: "",
                met: 0,
              });
              SuccessToast(`${name} Saved Successfully`);
              setIsOpen(false);
            })
            .catch(() => {
              showToast("There is a problem on the server");

              setIsOpen(false);
            })
            .finally(() => {
              setIsOpen(false);
            });
        }, 100);

        return () => clearTimeout(timerId);
      }
    }, 100);
  };

  const setDataHandler = (field, value) => {
    setSendData({
      ...sendData,
      [field]: value,
    });
  };

  const iconSelectHandler = (value) => {
    setSendData({
      ...sendData,
      iconName: value,
    });
  };
  const metSelectHandler = (value) => {
    setSendData({
      ...sendData,
      met: value,
    });
  };

  const showToast = (item) => {
    let text = item.charAt(0).toUpperCase() + item.slice(1).toLowerCase();
    Toast.show({
      type: "error",
      text1: "Error",
      text2: `${text}`,
      position: "bottom",
    });
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isOpen}
      onRequestClose={() => {
        setIsOpen(false);
      }}
    >
      <View
        style={[
          styles.body,
          {
            backgroundColor: themeData["background-secondary-2"],
            alignItems: "center",
            justifyContent: "space-between",
          },
        ]}
      >
        <View style={{ height: height * 0.08 }}>
          <HeaderPages
            right={false}
            onpress={() => {
              setIsOpen(false);
            }}
            header={`Add new ${name} exercise`}
            title={""}
            text=""
          />
        </View>

        <Packet
          packetStyle={[
            styles.packet,
            {
              borderColor: themeData["background-secondary"],
              paddingTop: 10,
              alignItems: "center",
              height: height * 0.6,
            },
          ]}
        >
          <View style={{ flex: 1 }}>
            <View
              style={[
                styles.middlePartHead,
                {
                  width: width * 0.9,
                  gap: 10,
                  alignItems: "center",
                },
              ]}
            >
              {/* image */}

              <TouchableOpacity
                onPress={() => {
                  setAddImageVisible(true);
                }}
              >
                <Image
                  source={
                    sendData.iconName ? getFoodIcon(sendData.iconName) : image
                  }
                  style={styles.middlePartIcon}
                />
              </TouchableOpacity>

              {/* name */}
              <TextInput
                onChangeText={(text) => {
                  setDataHandler("name", text);
                }}
                value={sendData.name}
                style={[
                  styles.input,
                  {
                    borderColor: themeData["background-secondary"],
                    color: themeData["text-secondary"],
                  },
                ]}
                placeholder="Exercise Name"
                placeholderTextColor={themeData["text-secondary"]}
              />

              {/* explane */}

              <TouchableOpacity
                onPress={() => {
                  setTextEditorVisible(true);
                }}
              >
                {!sendData.explane && (
                  <View
                    style={{
                      width: 15,
                      height: 15,
                      backgroundColor: "#FFF",
                      borderRadius: 10,
                      alignItems: "center",
                      justifyContent: "center",
                      position: "absolute",
                      transform: [{ translateY: -15 }, { translateX: 5 }],
                    }}
                  >
                    <Image source={explane} style={{ width: 20, height: 20 }} />
                  </View>
                )}
                <Image source={note} style={styles.middlePartIcon} />
              </TouchableOpacity>
            </View>
            <View style={{ gap: 15, marginVertical: 20 }}>
              <View style={styles.prepredDishView}>
                <TouchableOpacity
                  onPress={() => {
                    setIsOpenReadyDishSelect(true);
                  }}
                  style={[
                    styles.prepredDishBtn,
                    {
                      borderColor: themeData["secondary-meal2"],
                      width: width * 0.8 + 10,
                    },
                  ]}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "center",
                    }}
                  >
                    <Text
                      style={{
                        color: themeData["secondary-meal2"],
                        marginHorizontal: 10,
                      }}
                    >
                      {sendData.met.toFixed(1)}
                    </Text>
                    <Text style={{ color: themeData["text-primary"] }}>
                      Metabolic Equivalent ( MET )
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Packet>
        <Packet
          packetStyle={[
            styles.packet2,
            {
              borderColor: themeData["background-secondary"],
              height: height * 0.17,
              alignItems: "center",
            },
          ]}
        >
          <View style={styles.packetTowpart}>
            <View style={{ width: width * 0.06, alignItems: "center" }}>
              <View
                style={[
                  styles.packetTowpartView1,
                  { borderColor: themeData["secondary-meal2"] },
                ]}
              >
                <View
                  style={{
                    width: width * 0.15,
                    alignItems: "center",
                    position: "absolute",
                  }}
                >
                  <Text
                    style={{
                      color: themeData["text-primary"],
                      fontSize: 12,
                      fontWeight: 500,
                    }}
                  >
                    Burn
                  </Text>
                  <Text
                    style={{
                      color: themeData["text-secondary"],
                      fontSize: 10,
                      textAlign: "center",
                    }}
                  >
                    {calcBurnForExercise(
                      userWight ? userWight : 70,
                      30,
                      sendData.met
                    )}{" "}
                    Kcal
                  </Text>
                </View>
              </View>
            </View>

            <Text
              style={{
                color: themeData["text-secondary"],
                width: width,
                textAlign: "center",
                fontSize: 10,
              }}
            >
              {/* Burns in 30 minutes based on your weight ( {userWight} kg ) */}
              30-Minute Calorie Burn Estimate (Based on your Weight :{" "}
              {userWight} kg)
            </Text>
          </View>
        </Packet>
        <View
          style={{
            alignItems: "center",
            height: height * 0.1,
          }}
        >
          <TouchableOpacity
            onPress={saveDishHandler}
            style={[
              styles.saveBtn,
              {
                backgroundColor: themeData["background-primary"],
                marginTop: 10,
              },
            ]}
          >
            <Text style={[{ color: "#fff" }]}>Save</Text>
          </TouchableOpacity>
        </View>

        <View style={{ position: "absolute", bottom: 0, zIndex: 400 }}>
          {delayToast ? <Toast /> : <></>}
        </View>

        <ModalAddImage
          isOpen={addImageVisible}
          isOpenFunc={() => {
            setAddImageVisible(false);
          }}
          setFoodImage={iconSelectHandler}
        />

        {/* page2 */}
        <ModalGeneralSelectGram
          setIsOpen={setIsOpenReadyDishSelect}
          isOpen={isOpenReadyDishSelect}
          quantity={sendData.met}
          unit={" Met"}
          typeOfSelect={"selectMet"}
          updateHandler={metSelectHandler}
          message={`Select metabolic equivalent of task`}
        />
        <ModalTextEditor
          isOpen={textEditorVisible}
          setIsOpen={setTextEditorVisible}
          setExplaneText={setDataHandler}
        />
      </View>
    </Modal>
  );
};

export default ModalAddNewExercise;

const styles = StyleSheet.create({
  body: {
    height: height,
    width: width,
    alignItems: "center",
    justifyContent: "space-between",
  },
  packet: {
    borderWidth: 4,
    marginBottom: 10,
    height: height * 0.5,
    paddingBottom: 6,
  },
  packet2: {
    borderWidth: 4,
    marginBottom: 10,
    height: height * 0.23,
    justifyContent: "center",
  },
  middlePartHead: {
    flexDirection: "row",
    marginVertical: 12,
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },
  middlePartIcon: {
    height: 30,
    width: 30,
  },
  input: {
    borderWidth: 3,
    borderRadius: 12,
    width: width * 0.65,
    padding: 12,
  },
  saveBtn: {
    width: width * 0.66,
    borderRadius: 12,
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    zIndex: 2,
  },
  prepredDishView: {
    width: width * 0.9,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  prepredDishBtn: {
    width: width * 0.4,
    borderWidth: 3,
    padding: 16,
    borderRadius: 16,
  },
  packetTowpart: {
    width: width * 0.4,
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  packetTowpartView1: {
    width: width * 0.2,
    height: width * 0.2,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 5,
  },
});
