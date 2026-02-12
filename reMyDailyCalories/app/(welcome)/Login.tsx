import {
  Dimensions,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
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
import { email, lock } from "../../assets/icons";
import { Loading } from "../../componetns/feedback";
import { actLogin } from "../../store/auth/authSlice";
import Toast from "react-native-toast-message";

// import { GoogleSignin } from "@react-native-google-signin/google-signin";

const { width, height } = Dimensions.get("screen");
const Login = () => {
  const router = useRouter();
  const { themeData } = useAppSelector((state) => state.theme);
  const { loading } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const [login, setLogin] = useState({ email: "", password: "" });

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

  const loginHandeler = () => {
    const data = login;

    if (data.email == "") {
      showToast("Email is required");
      return;
    }
    if (!data.email.includes("@")) {
      showToast("Email is invalid");
      return;
    }

    if (data.password == "") {
      showToast("Password is required");
      return;
    }
    if (data.password.length < 8) {
      showToast("Password must be at least 8 characters");
      return;
    }
    dispatch(actLogin(data))
      .unwrap()
      .then(() => {
        router.replace("/(home)");
      })
      .catch((e) => {
        showToast(e);
      })
      .finally(() => {
        setLogin({ email: "", password: "" });
      });
  };

  // useEffect(() => {
  //   GoogleSignin.configure({
  //     webClientId: "YOUR_WEB_CLIENT_ID", // لازم يكون من Google Console
  //   });
  // }, []);

  // const signIn = async () => {
  //   try {
  //     await GoogleSignin.hasPlayServices();
  //     const userInfo = await GoogleSignin.signIn();
  //     console.log("User Info:", userInfo);
  //   } catch (error) {
  //     console.log("Error signing in:", error);
  //   }
  // };

  return (
    <View
      style={[
        styles.body,
        { backgroundColor: themeData["background-secondary-2"] },
      ]}
    >
      <View style={{ height: height * 0.07 }}>
        <HeaderBack
          title={"Login"}
          onPress={() => {
            router.replace("/SelectLogin");
          }}
        />
      </View>
      <View style={styles.main}>
        <View style={{ zIndex: 100, top: -40 }}>
          <Toast />
        </View>

        <Packet
          packetStyle={{
            margin: 20,
            marginBottom: 0,
            backgroundColor: themeData["background-secondary-2"],
          }}
        >
          <Text
            style={[styles.titleText1, { color: themeData["text-primary"] }]}
          >
            Welcome Back!
          </Text>
          <Text
            style={[styles.titleText2, { color: themeData["text-secondary"] }]}
          >
            Sign in to continue your wellness journey.
          </Text>
        </Packet>

        {/* Form */}

        <Packet
          packetStyle={{
            alignItems: "center",
            backgroundColor: themeData["background-secondary-2"],
          }}
        >
          <Input
            value={login.email}
            title={"Email"}
            leftIcon={email}
            onChangeText={(email) => {
              setLogin((prev) => ({ ...prev, email: email }));
            }}
          />
          <Input
            value={login.password}
            title={"Password"}
            leftIcon={lock}
            rightIcon={true}
            onChangeText={(password) => {
              setLogin((prev) => ({ ...prev, password: password }));
            }}
          />
          <View style={styles.RemFor}>
            <View style={styles.RemForLeft}></View>
            <TouchableOpacity>
              <Text
                style={[
                  styles.RemForRight,
                  { color: themeData["background-primary"] },
                ]}
              >
                Forgot Password?
              </Text>
            </TouchableOpacity>
          </View>
          <Btn
            bgColor={"background-primary"}
            text="Login"
            textColor={"background-secondary-2"}
            onPress={loginHandeler}
            btnStyle={styles.loginBtn}
            btnTextStyle={{
              color: "#fff",
              fontWeight: 600,
            }}
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
              // signIn
              onPress={() => {}}
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
            text1="I Don’t have an account? "
            text2="Sign Up"
            onPress={() => {
              router.push("/Register");
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
          <Loading text="Login ..." />
        </View>
      </Modal>
    </View>
  );
};

export default Login;

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
    flexDirection: "row",
    width: width * 0.84,
    justifyContent: "space-between",
    alignContent: "center",
    paddingHorizontal: 12,
    marginVertical: 20,
    alignItems: "center",
  },
  RemForLeft: {
    flexDirection: "row",
    marginVertical: 6,
  },
  RemForRight: {
    fontSize: 12,
    marginVertical: 10,
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
