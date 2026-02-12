import {
  Dimensions,
  Image,
  Linking,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import React, { useState } from "react";
import { Btn, GoogleBtn } from "../../componetns/common";
import { usePathname, useRouter } from "expo-router";
import { logo } from "../../assets/images";
import { useAppSelector } from "../../hooks/storeHook";
import { PRIVACY_LINK, TERMS_LINK } from "@env";
import { ModalAccept } from "../../componetns/Modals/Profile";

const { width } = Dimensions.get("window");

const SelectLogin = () => {
  const router = useRouter();
  const { themeData } = useAppSelector((state) => state.theme);
  const [openAcceptTerms, setOpenAcceptTerms] = useState(false);
  const [openAcceptPrivacy, setOpenAcceptPrivacy] = useState(false);

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

  return (
    <SafeAreaView
      style={[
        styles.body,
        { backgroundColor: themeData["background-secondary-2"] },
      ]}
    >
      {/* title */}
      <View style={styles.title}>
        <Image source={logo} style={styles.logo} />
        <Text style={[styles.mainTitle, { color: themeData["text-primary"] }]}>
          Let’s Get Start
        </Text>
        <Text
          style={[styles.secondTitle, { color: themeData["text-secondary"] }]}
        >
          let’s dive in into your Account
        </Text>
      </View>

      {/* botton */}
      <View>
        <Btn
          btnStyle={styles.btn}
          textColor="background-secondary"
          bgColor="background-primary"
          text="Sign Up"
          onPress={() => {
            router.push("/Register");
          }}
          btnTextStyle={{ color: "#fff" }}
        />
        <Btn
          btnStyle={styles.btn}
          textColor="background-primary"
          bgColor="background-secondary"
          text="Log In"
          onPress={() => {
            router.push("/Login");
          }}
        />
      </View>

      <View style={styles.footer}>
        <Text
          style={[styles.footerTitle, { color: themeData["text-secondary"] }]}
        >
          By signing in or creating an account, you agree with our
          <Text
            onPress={() => {
              setOpenAcceptTerms(true);
            }}
            style={[{ color: themeData["background-primary"] }]}
          >
            Terms & Conditions
          </Text>
          <Text> and </Text>
          <Text
            onPress={() => {
              setOpenAcceptPrivacy(true);
            }}
            style={[{ color: themeData["background-primary"] }]}
          >
            Privacy Policy
          </Text>
        </Text>
      </View>

      {openAcceptTerms && (
        <ModalAccept
          isOpen={openAcceptTerms}
          setIsOpen={setOpenAcceptTerms}
          active={termsLink}
          text={
            "You will be redirected to the Terms & Conditions page in your browser"
          }
        />
      )}

      {openAcceptPrivacy && (
        <ModalAccept
          isOpen={openAcceptPrivacy}
          setIsOpen={setOpenAcceptPrivacy}
          active={privacyLink}
          text={
            "You will be redirected to the Privacy Policy page in your browser"
          }
        />
      )}
    </SafeAreaView>
  );
};

export default SelectLogin;

const styles = StyleSheet.create({
  body: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  logo: {
    width: 180,
    height: 180,
    marginBottom: 20,
  },
  title: {
    alignItems: "center",
  },
  mainTitle: {
    fontSize: 36,
    fontWeight: 600,
  },
  secondTitle: {
    fontSize: 16,
    marginTop: 4,
  },

  googleBtn: {
    width: width * 0.9,
    margin: 8,
    borderColor: "#eee",
  },
  googleBtnText: {
    fontSize: 16,
  },

  btn: {
    width: width * 0.9,
    margin: 8,
    boxShadow: " 5px 5px 5px rgba(0, 0, 0, 0.2)",
  },

  footer: {
    width: width * 0.85,
  },
  footerTitle: {
    fontSize: 12,
    textAlign: "center",
    lineHeight: 20,
  },
  footerText: {},
});
