import {
  Dimensions,
  Pressable,
  StyleSheet,
  Text,
  View,
  Modal,
} from "react-native";
import React, { useEffect, useState } from "react";
import { ListItem } from "../../screens/home";
import {
  bicycle,
  calculator,
  calculatorBlack,
  chatbot,
  dish,
  logout,
  Settings,
} from "../../../assets/icons/home";
import { useAppDispatch, useAppSelector } from "../../../hooks/storeHook";
import { useRouter } from "expo-router";
import { actLogout } from "../../../store/auth/authSlice";
import ModalCalcNeeds from "./ModalCalcNeeds";
import ModalOwnDish from "./ModalOwnDish";
import { AIFood, AISmile } from "../../../assets/icons";
import { actReset } from "../../../store/goal/goalSlice";
import { resetFood } from "../../../store/user/userSlice";
import { resetFavorite } from "../../../store/favorite/favoriteSlice";
import { resetCalender } from "../../../store/calender/calenderSlice";
import {
  actResetAllDish,
  actResetMyExercise,
} from "../../../store/myDishExercise/myDishExerciseSlice";
import { ModalAccept } from "../Profile";
const { width, height } = Dimensions.get("window");

const ModalHeaderList = ({ isOpen, setIsOpen }) => {
  const { themeData, themeName } = useAppSelector((state) => state.theme);
  const { lang, words } = useAppSelector((state) => state.lang);

  const dispatch = useAppDispatch();
  const router = useRouter();
  const [showList, setShowList] = useState(false);
  const [showCalcNeeds, setShowCalcNeeds] = useState(false);
  const [showOwnDish, setShowOwnDish] = useState(false);
  const [showOwnAIDish, setShowOwnAIDish] = useState(false);
  const [userLogOut, setUserLogOut] = useState(false);

  const [showOwnExercise, setShowOwnExercise] = useState(false);

  const logoutHandler = () => {
    dispatch(actReset());
    dispatch(resetFood());
    dispatch(actResetAllDish());
    dispatch(actResetMyExercise());
    dispatch(resetCalender());
    dispatch(resetFavorite());
    dispatch(actLogout());
    router.replace("/(welcome)/Login");
  };

  return (
    <>
      <Modal
        animationType="fade"
        transparent={true}
        visible={isOpen}
        onRequestClose={() => setIsOpen(false)}
        statusBarTranslucent={true}
        navigationBarTranslucent={true}
      >
        <Pressable
          onPress={() => setIsOpen(false)}
          style={{ height, width, backgroundColor: "rgba(0,0,0,0)" }}
        >
          <View
            style={[
              styles.list,
              {
                backgroundColor: themeData["background-secondary"],
                borderWidth: 2,
              },
              themeName === "dark"
                ? { borderColor: "#404040" }
                : { borderColor: "#eee" },
            ]}
          >
            <ListItem
              text={words["Daily Calories Goal"]}
              icon={calculatorBlack}
              onPress={() => {
                setShowCalcNeeds(true);
                setIsOpen(false);
              }}
            />

            {/* <ListItem text='My own dishs' icon={dish} onPress={() => {
                router.push("/(homeScreens)/ownDish"); setShowList(false)
            }} /> */}

            <ListItem
              text={words["Add New Meal"]}
              icon={dish}
              onPress={() => {
                setShowOwnDish(true);
                setIsOpen(false);
              }}
            />

            <ListItem
              text={words["Add New Meal By AI"]}
              icon={AISmile}
              onPress={() => {
                setShowOwnAIDish(true);
                setIsOpen(false);
              }}
            />

            <ListItem
              text={words.setting}
              icon={Settings}
              onPress={() => {
                router.replace("/Profile");
                setIsOpen(false);
              }}
            />
            <ListItem
              text={words["log out"]}
              icon={logout}
              onPress={() => {
                setUserLogOut(true);
              }}
            />
          </View>
        </Pressable>
      </Modal>
      {showCalcNeeds && (
        <ModalCalcNeeds isOpen={showCalcNeeds} setIsOpen={setShowCalcNeeds} />
      )}
      {showOwnDish && (
        <ModalOwnDish
          isOpen={showOwnDish}
          setIsOpen={setShowOwnDish}
          type={"normal"}
        />
      )}

      {showOwnAIDish && (
        <ModalOwnDish
          isOpen={showOwnAIDish}
          setIsOpen={setShowOwnAIDish}
          type={"ai"}
        />
      )}

      {userLogOut && (
        <ModalAccept
          isOpen={userLogOut}
          setIsOpen={setUserLogOut}
          active={logoutHandler}
          text={words.MsgLogOut}
        />
      )}

      {/* {showOwnExercise && (
        <ModalOwnExercise
          isOpen={showOwnExercise}
          setIsOpen={setShowOwnExercise}
        />
      )} */}
    </>
  );
};

export default ModalHeaderList;

const styles = StyleSheet.create({
  list: {
    position: "absolute",
    width: 200,
    height: 270,
    borderRadius: 12,
    paddingVertical: 6,
    top: 100,
    right: 20,
    justifyContent: "space-between",
  },
});
