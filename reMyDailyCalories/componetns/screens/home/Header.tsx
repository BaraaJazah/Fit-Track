import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useCallback, useState } from "react";
import { dots, calender } from "../../../assets/icons/home";
import { useAppSelector } from "../../../hooks/storeHook";
import { useFocusEffect } from "expo-router";
import { ModalCalender, ModalHeaderList } from "../../Modals/Home";

const { width, height } = Dimensions.get("window");

const Header = () => {
  const { themeData, themeName } = useAppSelector((state) => state.theme);

  const [showList, setShowList] = useState(false);
  const [showCalnder, setShowCalnder] = useState(false);

  const [isOpen, setIsOpen] = useState(false);

  const getFormattedDate = () => {
    const today = new Date();
    return today.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      weekday: "long",
    });
  };

  useFocusEffect(
    useCallback(() => {
      return () => {
        setShowList(false);
      };
    }, [])
  );

  return (
    <View
      style={[
        styles.body,
        {
          backgroundColor: themeData["background-secondary-2"],
        },
      ]}
    >
      <TouchableOpacity
        onPress={() => {
          setShowCalnder(true);
        }}
        style={[
          styles.left,
          { backgroundColor: themeData["background-secondary"] },
        ]}
      >
        <Image source={calender} style={styles.leftIcon} />
      </TouchableOpacity>

      <View>
        <Text style={[styles.title, { color: themeData["text-primary"] }]}>
          {getFormattedDate()}
        </Text>
      </View>

      <TouchableOpacity
        onPress={() => {
          // setShowList(!showList);
          setIsOpen(!isOpen);
        }}
        style={[
          styles.right,
          { backgroundColor: themeData["background-secondary"] },
        ]}
      >
        <Image source={dots} style={styles.rightIcon} />
      </TouchableOpacity>

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

          showList ? { display: "flex" } : { display: "none" },
        ]}
      ></View>
      <ModalHeaderList setIsOpen={setIsOpen} isOpen={isOpen} />
      <ModalCalender isOpen={showCalnder} setIsOpen={setShowCalnder} />
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  body: {
    flexDirection: "row",
    width: width,
    height: height * 0.06,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginTop: height * 0.01,
  },
  left: {
    position: "absolute",
    left: 0,
    marginLeft: 20,
    borderRadius: 14,
    width: 46,
    height: 46,
    justifyContent: "center",
    alignItems: "center",
  },
  leftIcon: {
    width: 20,
    height: 24,
  },
  rightIcon: {
    width: 30,
    height: 30,
  },

  title: {
    fontWeight: 600,
    fontSize: 16,
  },
  right: {
    position: "absolute",
    right: 0,
    marginRight: 20,
    borderRadius: 14,
    width: 46,
    height: 46,
    justifyContent: "center",
    alignItems: "center",
  },

  list: {
    position: "absolute",
    width: 190,
    height: 250,
    borderRadius: 12,
    paddingVertical: 6,
    top: 64,
    right: 20,
    justifyContent: "space-between",
  },
});
