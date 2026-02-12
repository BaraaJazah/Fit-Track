import {
  Dimensions,
  Image,
  Linking,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import {
  Btn,
  ColorText,
  GoogleBtn,
  HeaderBack,
  Packet,
} from "../../componetns/common";
import { useRouter } from "expo-router";
import { useAppDispatch, useAppSelector } from "../../hooks/storeHook";
import { Input } from "../../componetns/screens/welcome";
import { email, lock, profile, close } from "../../assets/icons";
import { Loading } from "../../componetns/feedback";
import Toast from "react-native-toast-message";
import { actRegister } from "../../store/auth/authSlice";
import Checkbox from "expo-checkbox";
import { ModalAccept } from "../../componetns/Modals/Profile";
import { TERMS_LINK } from "@env";

const { width, height } = Dimensions.get("screen");

const Register = () => {
  const router = useRouter();
  const { themeData } = useAppSelector((state) => state.theme);

  const [openAcceptTerms, setOpenAcceptTerms] = useState(false);

  const { loading } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const [register, setRegister] = useState({
    name: "",
    email: "",
    password: "",
    confirm_password: "",
    agree: false,
  });

  const showToast = (item) => {
    let type = "success";
    let text1;
    let text2;

    type = "error";
    text1 = "Error";
    text2 = item;

    Toast.show({
      type: type,
      text1: text1,
      text2: text2,
      position: "top",
    });
  };

  const registerHandeler = () => {
    const data = register;

    if (data.name === "") {
      showToast("Name is required");
      return;
    }
    if (data.email === "") {
      showToast("Email is required");
      return;
    }
    if (!data.email.includes("@")) {
      showToast("Email is invalid");
      return;
    }
    if (data.password === "") {
      showToast("Password is required");
      return;
    }
    if (data.password.length < 8) {
      showToast("Password must be at least 8 characters");
      return;
    }
    if (data.confirm_password === "") {
      showToast("Confirm Password is required");
      return;
    }

    if (data.password !== data.confirm_password) {
      showToast("The password field confirmation does not match.");
      return;
    }

    if (data.agree === false) {
      showToast("Please accept the Terms & Conditions to proceed.");
      return;
    }

    dispatch(actRegister(data))
      .unwrap()
      .then(() => {
        router.replace("(home)");
      })
      .catch((e) => {
        showToast(e);
      })
      .finally(() => {
        setRegister({
          name: "",
          email: "",
          password: "",
          confirm_password: "",
          agree: false,
        });
      });
  };

  const setRegisterHandler = (
    item: "name" | "email" | "password" | "confirm_password" | "agree",
    value
  ) => {
    setRegister((prev) => ({ ...prev, [item]: value }));
  };

  const termsLink = () => {
    const playStoreUrl = TERMS_LINK; // <-- غيّرها حسب اسم تطبيقك
    Linking.openURL(playStoreUrl).catch((err) =>
      console.error("Failed to open Play Store", err)
    );
  };

  return (
    <View
      style={[
        styles.body,
        { backgroundColor: themeData["background-secondary-2"] },
      ]}
    >
      <HeaderBack
        title={"Register"}
        onPress={() => {
          router.replace("/SelectLogin");
        }}
      />
      <View style={styles.main}>
        <Packet
          packetStyle={{
            alignItems: "center",
            backgroundColor: themeData["background-secondary-2"],
          }}
        >
          <View style={{ zIndex: 100, top: -100 }}>
            <Toast />
          </View>

          <Input
            onChangeText={(text) => {
              setRegisterHandler("name", text);
            }}
            value={register.name}
            title={"Name"}
            leftIcon={profile}
          />
          <Input
            onChangeText={(text) => {
              setRegisterHandler("email", text);
            }}
            value={register.email}
            title={"Email"}
            leftIcon={email}
          />
          <Input
            onChangeText={(text) => {
              setRegisterHandler("password", text);
            }}
            value={register.password}
            title={"Password"}
            leftIcon={lock}
            rightIcon={true}
          />
          <Input
            onChangeText={(text) => {
              setRegisterHandler("confirm_password", text);
            }}
            value={register.confirm_password}
            title={"Confirm Password"}
            leftIcon={lock}
            rightIcon={true}
          />

          <View style={styles.RemFor}>
            <View style={styles.RemForLeft}>
              <Checkbox
                style={{
                  borderRadius: 5,
                }}
                value={register.agree}
                onValueChange={(isChecked: boolean) => {
                  setRegisterHandler("agree", isChecked);
                }}
              />
              <ColorText
                text1="I have read and agree to the "
                text2="Terms of Service"
                textsBtn={{ fontSize: 12 }}
                onPress={() => {
                  setOpenAcceptTerms(true);
                }}
              />
            </View>
          </View>
          <Btn
            bgColor={"background-primary"}
            text="Sign Up"
            textColor={"background-secondary-2"}
            onPress={registerHandeler}
            btnStyle={styles.loginBtn}
            btnTextStyle={{ fontWeight: 600, color: "#fff" }}
          />
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              margin: 30,
              marginBottom: 20,
            }}
          >
            <View
              style={[
                styles.line,
                { backgroundColor: themeData["text-secondary"] },
              ]}
            ></View>
            <Text
              style={[styles.lineText, { color: themeData["text-secondary"] }]}
            >
              or
            </Text>
            <View
              style={[
                styles.line,
                { backgroundColor: themeData["text-secondary"] },
              ]}
            ></View>
          </View>
          <View style={styles.googleBtns}>
            <GoogleBtn
              onPress={() => {
                router.push("/(home)");
              }}
              text="Continue With Google"
              icon={"google"}
              btnStyle={[
                styles.googleBtn,
                { borderColor: themeData["text-secondary"], opacity: 0.8 },
              ]}
            />
          </View>
        </Packet>

        <View style={{ padding: 20 }}>
          <ColorText
            text1="Already have an account? "
            text2="Login"
            onPress={() => {
              router.push("/Login");
            }}
          />
        </View>
      </View>

      <Modal
        animationType="fade"
        transparent={true}
        visible={loading == "pending" ? true : false}
        statusBarTranslucent={true}
        navigationBarTranslucent={true}
      >
        <View style={styles.model}>
          <Loading text="Sign Up ..." />
        </View>
      </Modal>
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
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({
  // model
  model: {
    backgroundColor: "rgba(0, 0, 0,0.5)",
    height: height,
    width: width,
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
  },
  modelCloseBtn: {
    backgroundColor: "#fff",
    position: "absolute",
    padding: 6,
    top: 20,
    right: 20,
    borderRadius: 10,
  },

  //page

  body: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  main: {
    justifyContent: "space-evenly",
    alignItems: "center",
    height: height * 0.8,
  },

  titleText1: {
    fontSize: 24,
    fontWeight: 600,
    marginBottom: 20,
  },
  titleText2: {
    fontSize: 16,
  },
  loginBtn: {
    width: width * 0.8,
    margin: "auto",
    boxShadow: " 5px 5px 5px rgba(0, 0, 0, 0.2)",
  },
  // Remmber & Forgot
  RemFor: {
    paddingHorizontal: 12,
    marginTop: 10,
    marginBottom: 20,
    width: width * 0.84,
  },
  RemForLeft: {
    flexDirection: "row",
    marginVertical: 8,
  },
  RemForRight: {
    fontSize: 12,
  },

  // line

  line: {
    height: 1.5,
    width: width * 0.35,
    backgroundColor: "#ccc",
    borderRadius: 50,
  },
  lineText: {
    marginHorizontal: 10,
    color: "#ccc",
  },

  googleBtns: {
    width: width * 0.9,
    alignItems: "center",
  },
  googleBtn: {
    width: width * 0.8,
    marginVertical: 10,
  },
});
