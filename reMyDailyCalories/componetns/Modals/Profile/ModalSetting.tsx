import {
  Alert,
  Dimensions,
  Linking,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "expo-router";
import { HeaderBack, Packet } from "../../../componetns/common";
import { useAppDispatch, useAppSelector } from "../../../hooks/storeHook";
import { CartLink, CartMood } from "../../screens/Profile";
import { dropDown } from "../../../assets/icons/home";
import {
  english,
  german,
  list,
  lock,
  logout,
  message,
  syria,
  trash,
  turkish,
} from "../../../assets/icons/add";
import { Image } from "react-native";

import { changeTheme } from "../../../store/theme/themeSlice";
import ModalChangePass from "./ModalChangePass";
import { actDeleteAccount, actLogout } from "../../../store/auth/authSlice";
import ModalSelectItems from "../Common/ModalSelectItems";
import { MotiView, MotiText, MotiSafeAreaView } from "moti";
import ModalCustomerSupport from "./ModalCustomerSupport";
import { PRIVACY_LINK, TERMS_LINK } from "@env";
import ModalAccept from "./ModalAccept";
import { changeLang } from "../../../store/theme/langSlice";
import { actReset } from "../../../store/goal/goalSlice";
import { resetFood } from "../../../store/user/userSlice";
import {
  actResetAllDish,
  actResetMyExercise,
} from "../../../store/myDishExercise/myDishExerciseSlice";
import { resetCalender } from "../../../store/calender/calenderSlice";
import { resetFavorite } from "../../../store/favorite/favoriteSlice";

const { width, height } = Dimensions.get("screen");

const ModalSetting = ({ isOpen = false, setIsOpen, darkMood, setDarkMood }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { themeData, themeName } = useAppSelector((state) => state.theme);
  const { lang, words } = useAppSelector((state) => state.lang);

  const [chnagePass, setChnagePass] = useState(false);
  const [customerSupport, setCustomerSupport] = useState(false);
  const [openAcceptTerms, setOpenAcceptTerms] = useState(false);
  const [openAcceptPrivacy, setOpenAcceptPrivacy] = useState(false);
  const [deleteUserAccount, setDeleteUserAccount] = useState(false);
  const [userLogOut, setUserLogOut] = useState(false);

  const [chnageLanguage, setChnageLanguage] = useState(false);

  const language = [
    { icon: english, text: words.english },
    { icon: syria, text: words.arabic },
    { icon: turkish, text: words.turkish },
    { icon: german, text: words.german },
  ];

  const [langValue, setLangValue] = useState(
    lang === "ar" ? 1 : lang === "tr" ? 2 : lang === "de" ? 3 : 0
  );

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

  const changeThemeHandler = () => {
    setDarkMood(!darkMood);
    dispatch(changeTheme(darkMood ? 0 : 1));
  };

  const changeLangHandler = (index) => {
    setLangValue(index);
    dispatch(changeLang(index));
  };

  const privacyLink = () => {
    const playStoreUrl = PRIVACY_LINK; // <-- غيّرها حسب اسم تطبيقك
    Linking.openURL(playStoreUrl).catch((err) =>
      console.error("Failed to open Play Store", err)
    );
  };

  const termsLink = () => {
    const playStoreUrl = TERMS_LINK; // <-- غيّرها حسب اسم تطبيقك
    Linking.openURL(playStoreUrl).catch((err) =>
      console.error("Failed to open Play Store", err)
    );
  };

  const deleteAccount = () => {
    dispatch(actReset());
    dispatch(resetFood());
    dispatch(actResetAllDish());
    dispatch(actResetMyExercise());
    dispatch(resetCalender());
    dispatch(resetFavorite());
    dispatch(actDeleteAccount());
    router.replace("/(welcome)/Login");
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
      <MotiSafeAreaView
        animate={{
          backgroundColor: themeData["background-secondary-2"], // اللون الجديد
        }}
        transition={{
          type: "timing",
          duration: 500,
        }}
        style={[styles.body]}
      >
        <HeaderBack
          onPress={() => {
            setIsOpen(false);
          }}
          title={words.setting}
        />
        <Packet
          packetStyle={[
            styles.packet,
            {
              direction: lang === "ar" ? "rtl" : "ltr",
            },
          ]}
        >
          <View style={{ width: width * 0.9, paddingTop: 10 }}>
            <Text
              style={[
                styles.titleText,
                {
                  color: themeData["text-secondary"],
                },
              ]}
            >
              {words["theme & language"]}
            </Text>
            <CartMood darkMood={darkMood} setDarkMood={changeThemeHandler} />
          </View>
          <MotiView
            animate={{
              backgroundColor: themeData["background-secondary-2"], // اللون الجديد
              borderColor: themeData["background-secondary"],
            }}
            transition={{
              type: "timing",
              duration: 500,
            }}
            style={{
              flexDirection: "row",
              backgroundColor: themeData["background-secondary-2"],
              borderWidth: 3,
              borderRadius: 12,
              borderColor: themeData["background-secondary"],
              width: width * 0.9,
            }}
          >
            <Pressable
              onPress={() => {
                setChnageLanguage(true);
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  width: width * 0.84,
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginVertical: 15,
                  borderColor: "transparent",
                  borderWidth: 3,
                }}
              >
                <View style={{ flexDirection: "row", gap: 10 }}>
                  <Image
                    source={language[langValue].icon}
                    style={{ width: 24, height: 24, marginHorizontal: 10 }}
                  />
                  <Text style={{ color: themeData["text-secondary"] }}>
                    {language[langValue].text}
                  </Text>
                </View>

                <Image source={dropDown} style={{ width: 16, height: 16 }} />
              </View>
            </Pressable>
          </MotiView>

          <View style={{ width: width * 0.9, paddingTop: 20 }}>
            <Text
              style={[
                styles.titleText,
                {
                  color: themeData["text-secondary"],
                  direction: lang === "ar" ? "rtl" : "ltr",
                },
              ]}
            >
              {words["general"]}
            </Text>
            <CartLink
              text={words["privacy policy"]}
              leftIcon={lock}
              rightIcons={dropDown}
              onPress={() => {
                setOpenAcceptPrivacy(true);
              }}
            />

            <CartLink
              text={words["terms & conditions"]}
              leftIcon={list}
              rightIcons={dropDown}
              onPress={() => {
                setOpenAcceptTerms(true);
              }}
            />
            <CartLink
              text={words["customer support"]}
              leftIcon={message}
              rightIcons={dropDown}
              onPress={() => {
                setCustomerSupport(true);
              }}
            />

            <CartLink
              text={words["change password"]}
              leftIcon={lock}
              rightIcons={dropDown}
              onPress={() => {
                setChnagePass(true);
              }}
            />
          </View>
          <View style={{ width: width * 0.9, paddingTop: 20 }}>
            <Text
              style={[
                styles.titleText,
                {
                  color: themeData["text-secondary"],
                  direction: lang === "ar" ? "rtl" : "ltr",
                },
              ]}
            >
              {words.others}
            </Text>
            <CartLink
              text={words["delete account"]}
              leftIcon={trash}
              rightIcons={""}
              onPress={() => {
                setDeleteUserAccount(true);
              }}
            />
            <CartLink
              text={words["log out"]}
              leftIcon={logout}
              rightIcons={""}
              onPress={() => {
                setUserLogOut(true);
              }}
            />
          </View>
        </Packet>

        {chnagePass && (
          <ModalChangePass isOpen={chnagePass} setIsOpen={setChnagePass} />
        )}

        {chnageLanguage && (
          <ModalSelectItems
            dataArray={language}
            isOpen={chnageLanguage}
            setIsOpen={setChnageLanguage}
            defualtIndex={langValue}
            setIndex={changeLangHandler}
          />
        )}
        {customerSupport && (
          <ModalCustomerSupport
            isOpen={customerSupport}
            setIsOpen={setCustomerSupport}
          />
        )}
      </MotiSafeAreaView>

      {openAcceptPrivacy && (
        <ModalAccept
          isOpen={openAcceptPrivacy}
          setIsOpen={setOpenAcceptPrivacy}
          active={privacyLink}
          text={words.MsgPrivacy}
        />
      )}

      {openAcceptTerms && (
        <ModalAccept
          isOpen={openAcceptTerms}
          setIsOpen={setOpenAcceptTerms}
          active={termsLink}
          text={words.MsgTerms}
        />
      )}

      {deleteUserAccount && (
        <ModalAccept
          isOpen={deleteUserAccount}
          setIsOpen={setDeleteUserAccount}
          active={deleteAccount}
          text={words.MsgDeleteAccount}
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
    </Modal>
  );
};

export default ModalSetting;

const styles = StyleSheet.create({
  body: {
    height: height,
    width: width,
    alignItems: "center",
    marginTop: 30,
  },
  packet: {
    paddingVertical: 20,
    padding: 8,
    alignItems: "center",
  },
  titleText: {
    fontWeight: 800,
    marginHorizontal: 10,
    marginBottom: 5,
  },
});
