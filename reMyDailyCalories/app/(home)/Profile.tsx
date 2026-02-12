import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Pressable,
  Modal,
  StatusBar,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Packet } from "../../componetns/common";
import { me, meGirl } from "../../assets/images";
import { useAppDispatch, useAppSelector } from "../../hooks/storeHook";
import { CartLink, CartMood } from "../../componetns/screens/Profile";
import { camera, premium, pro, start } from "../../assets/icons/add";
import * as ImagePicker from "expo-image-picker";
import { getUsersIcon } from "../../assets/icons/users/data";
import * as SystemUI from "expo-system-ui";
import * as Animatable from "react-native-animatable";
import { MotiView, MotiText, MotiSafeAreaView } from "moti";

import {
  account,
  dish,
  dropDown,
  edit,
  refresh,
  Settings,
} from "../../assets/icons/home";
import {
  ModalMyDish,
  ModalPremium,
  ModalSetting,
  ModalUpdate,
} from "../../componetns/Modals/Profile";
import { changeTheme } from "../../store/theme/themeSlice";
import ModalAccount from "../../componetns/Modals/Profile/ModalAccount";
import { actChangeImage, actChangeName } from "../../store/auth/authSlice";
import Toast from "react-native-toast-message";
import ModalAddImage from "../../componetns/Modals/Profile/ModalAddImage";
import { SafeAreaView } from "react-native-safe-area-context";

const { width, height } = Dimensions.get("screen");
const Profile = () => {
  const { themeData, themeName } = useAppSelector((state) => state.theme);
  const { userSubscribe, user, userImage } = useAppSelector(
    (state) => state.auth
  );
  const { lang, words } = useAppSelector((state) => state.lang);
  const { userData } = useAppSelector((state) => state.goal);

  const dispatch = useAppDispatch();
  const [darkMood, setDarkMood] = useState(themeName == "dark" ? true : false);

  //  modal states

  const [myDish, setMyDish] = useState(false);
  const [myEccount, setMyEccount] = useState(false);
  const [update, setUpdate] = useState(false);
  const [openSelectImage, setOpenSelectImage] = useState(false);

  const [getPremium, setGetPremium] = useState(false);
  const [setting, setSetting] = useState(false);

  const changeThemeHandler = () => {
    setDarkMood(!darkMood);
    dispatch(changeTheme(darkMood ? 0 : 1));
  };

  const userDatas = {
    user: {
      name: user?.name,
      email: user?.email,
      image: user?.image,
    },
    // me
    image2: userData.userData.gender === "man" ? me : meGirl,
    userSubscribe: {
      premier: userSubscribe?.premier,
      icon:
        userSubscribe?.premier === 1
          ? start
          : userSubscribe?.premier === 2
          ? pro
          : userSubscribe?.premier === 3
          ? premium
          : "",
    },
  };

  const [openNameEditor, setOpenNameEditor] = useState(false);
  const [newName, setNewName] = useState("");
  const [delayToast, setDelayToast] = useState(false);

  const selectImage = async () => {
    // no permmition need
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [3, 3],
      quality: 0.7,
    });

    if (!result.canceled && result.assets[0]) {
      const uri = result.assets[0].uri;
      const fileName = uri.split("/").pop() || `profile_${Date.now()}.jpg`;
      const fileType = uri.split(".").pop() || "jpg";

      const response = await fetch(uri);
      const blob = await response.blob();

      const formData = new FormData();

      formData.append("image", {
        uri: uri,
        name: fileName,
        type: `image/${fileType}`,
      } as any);

      await dispatch(actChangeImage(formData))
        .unwrap()
        .then(() => {})
        .catch((e) => {});
    }
  };

  const changeNameHandler = () => {
    setDelayToast(true);
    if (newName === "") {
      ErrorToast("Please Enter Invite Code");
    } else if (newName.length > 20) {
      ErrorToast("Your Name Must Be Less Than 20 Characters");
    } else {
      dispatch(actChangeName({ name: newName }))
        .unwrap()
        .then(() => {
          setOpenNameEditor(false);
          setNewName("");
          //   TODO make loading modal
        })
        .catch((e) => {
          ErrorToast("Invite Code Is Wrong");
        });
    }
  };

  const ErrorToast = (item) => {
    setDelayToast(true);
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

  useEffect(() => {
    SystemUI.setBackgroundColorAsync(themeData["background-secondary-2"]); // غيّر اللون حسب التصميم
  }, [themeData]);

  return (
    <SafeAreaView>
      <MotiView
        animate={{ backgroundColor: themeData["background-secondary-2"] }}
        transition={{
          type: "timing",
          duration: 500,
        }}
        style={[
          styles.container,
          { backgroundColor: themeData["background-secondary-2"] },
        ]}
      >
        <StatusBar
          backgroundColor={themeData["background-secondary-2"]} // لون الخلفية في أندرويد
          barStyle={themeName === "dark" ? "light-content" : "dark-content"} // نوع الأيقونات: light-content أو dark-content
          translucent={false} // إذا كنت تريد أن يكون فوق المحتوى
        />
        <Packet
          packetStyle={{
            width: width * 0.94,
            paddingVertical: 0,
            // backgroundColor: themeData["background-secondary-2"],
            height: height * 0.25,
            justifyContent: "center",
          }}
        >
          <View style={{ alignItems: "center", flexDirection: "row" }}>
            <View style={styles.profileImage}>
              <View style={[styles.imageBox]}>
                <Image
                  source={
                    userImage ? getUsersIcon(userImage) : getUsersIcon("man1")
                  }
                  style={styles.Image}
                />
              </View>
              <MotiView
                animate={{
                  backgroundColor: themeData["background-secondary-2"],
                }}
                transition={{
                  duration: 500,
                  type: "timing",
                }}
                style={{
                  width: 45,
                  height: 45,
                  backgroundColor: themeData["background-secondary-2"],
                  borderRadius: 30,
                  position: "absolute",
                  alignItems: "center",
                  justifyContent: "center",
                  bottom: -10,
                  right: 10,
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    setOpenSelectImage(true);
                  }}
                  style={{
                    width: 35,
                    height: 35,
                    backgroundColor: "#eee",
                    borderRadius: 20,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Image source={camera} style={{ width: 20, height: 20 }} />
                </TouchableOpacity>
              </MotiView>
            </View>
            <View style={styles.profileTexts}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                <Text
                  numberOfLines={1}
                  style={[
                    styles.profileText1,
                    {
                      color: themeData["text-primary"],
                    },
                  ]}
                >
                  {userDatas.user.name || ""}
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    setOpenNameEditor(true);
                  }}
                >
                  <Image source={edit} style={{ width: 24, height: 24 }} />
                </TouchableOpacity>
              </View>
              <Text
                numberOfLines={1}
                style={[
                  styles.profileText2,
                  { color: themeData["text-secondary"] },
                ]}
              >
                {userDatas.user.email || ""}
              </Text>
              {userDatas.userSubscribe.premier > 0 && (
                <View style={{ flexDirection: "row", marginTop: 6 }}>
                  <View
                    style={{
                      borderWidth: 1,
                      padding: 4,
                      paddingHorizontal: 10,
                      borderColor: "#ccc",
                      borderRadius: 8,
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 8,
                    }}
                  >
                    <Image
                      source={userDatas.userSubscribe.icon}
                      style={{ width: 16, height: 16 }}
                    />
                    <Text
                      style={[
                        styles.profileText3,
                        { color: themeData["text-secondary"] },
                      ]}
                    >
                      {userDatas.userSubscribe.premier === 1
                        ? words.starter
                        : userDatas.userSubscribe.premier === 2
                        ? words.pro
                        : words.premium}
                    </Text>
                  </View>
                </View>
              )}
            </View>
          </View>
        </Packet>

        <Packet
          backgroundCustomColor={themeData["background-secondary"]}
          packetStyle={{
            marginVertical: 20,
            alignItems: "center",
            // backgroundColor: themeData["background-secondary"],
            width: width,
            height: height * 0.75 + 20,
            transform: [{ translateY: -20 }],
            borderRadius: 40,
            direction: lang === "ar" ? "rtl" : "ltr",
          }}
        >
          <View style={{ width: width * 0.9, paddingVertical: 10 }}>
            <Text
              style={[styles.titleText, { color: themeData["text-secondary"] }]}
            >
              {words["theme"]}
            </Text>
            <CartMood darkMood={darkMood} setDarkMood={changeThemeHandler} />
          </View>

          <View style={{ width: width * 0.9 }}>
            <Text
              style={[styles.titleText, { color: themeData["text-secondary"] }]}
            >
              {words.general}
            </Text>
            <CartLink
              text={words.getPremium}
              leftIcon={premium}
              rightIcons={dropDown}
              onPress={() => {
                setGetPremium(true);
              }}
            />
            <CartLink
              text={words.myAccount}
              leftIcon={account}
              rightIcons={dropDown}
              onPress={() => {
                setMyEccount(true);
              }}
            />

            <CartLink
              text={words.updates}
              leftIcon={refresh}
              rightIcons={dropDown}
              onPress={() => {
                setUpdate(true);
              }}
            />
            <CartLink
              text={words["My Meals"]}
              leftIcon={dish}
              rightIcons={dropDown}
              onPress={() => {
                setMyDish(true);
              }}
            />

            <CartLink
              text={words.setting}
              leftIcon={Settings}
              rightIcons={dropDown}
              onPress={() => {
                setSetting(true);
              }}
            />
          </View>
        </Packet>

        <Modal
          visible={openNameEditor}
          transparent={true}
          animationType="fade"
          onRequestClose={() => {
            setOpenNameEditor(false);
            setNewName("");
          }}
          statusBarTranslucent={true}
          navigationBarTranslucent={true}
        >
          <Pressable
            onPress={() => {
              setOpenNameEditor(false);
              setNewName("");
            }}
            style={{
              height,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(0,0,0,0.6)",
            }}
          >
            <Pressable
              style={[
                styles.accountBox,
                {
                  backgroundColor: themeData["background-secondary"],
                  padding: 30,
                },
              ]}
            >
              <View
                style={[styles.accountBoxTexts, { flexDirection: "column" }]}
              >
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: 600,
                    color: themeData["background-primary"],
                  }}
                >
                  {words.enterNewName}
                </Text>
                <View style={{ width: width * 0.65, marginVertical: 16 }}>
                  <TextInput
                    style={{
                      borderColor: "#999",
                      borderWidth: 2,
                      borderRadius: 8,
                      padding: 10,
                      paddingHorizontal: 16,
                      color: themeData["text-primary"],
                    }}
                    value={newName}
                    placeholder={words.typeNameHere}
                    placeholderTextColor={themeData["text-secondary"]}
                    onChangeText={(text) => {
                      setNewName(text);
                    }}
                  />
                </View>
                <View>
                  <TouchableOpacity
                    onPress={changeNameHandler}
                    style={{
                      padding: 12,
                      paddingHorizontal: 20,
                      backgroundColor: themeData["background-primary"],
                      borderRadius: 10,
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 10,
                    }}
                  >
                    <Text style={{ color: "#fff", fontSize: 12 }}>
                      {words.changeName}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Pressable>
          </Pressable>
          <View style={{ position: "absolute", bottom: 0, width, zIndex: 400 }}>
            {delayToast ? <Toast /> : <></>}
          </View>
        </Modal>

        <ModalAddImage
          isOpen={openSelectImage}
          isOpenFunc={setOpenSelectImage}
        />

        <ModalMyDish isOpen={myDish} setIsOpen={setMyDish} />
        <ModalSetting
          isOpen={setting}
          setIsOpen={setSetting}
          darkMood={darkMood}
          setDarkMood={setDarkMood}
        />
        <ModalUpdate isOpen={update} setIsOpen={setUpdate} />
        <ModalPremium isOpen={getPremium} setIsOpen={setGetPremium} />
        <ModalAccount isOpen={myEccount} setIsOpen={setMyEccount} />
      </MotiView>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    width,
    height,
    alignItems: "center",
    // backgroundColor: "#fff"
  },
  profileImage: {
    marginVertical: 16,
  },
  imageBox: {
    borderRadius: 60,
    width: 110,
    height: 110,
    marginRight: 20,
  },
  Image: {
    width: 110,
    height: 110,
    borderRadius: 60,
    marginRight: 20,
  },
  profileTexts: {
    // alignItems: "center",
    rowGap: 4,
  },
  profileText1: {
    fontSize: 20,
    fontWeight: 700,
    textTransform: "capitalize",
    maxWidth: width * 0.5,
  },
  profileText2: {
    fontSize: 14,
    maxWidth: width * 0.55,
  },
  profileText3: {
    fontSize: 14,
    fontWeight: 500,
  },

  line: {
    height: 1,
    width: width * 0.84,
    backgroundColor: "#ccc",
  },
  titleText: {
    fontWeight: 800,
    marginHorizontal: 10,
    marginBottom: 5,
  },
  // DropDowm

  input: {
    width: width * 0.9 - 22,
  },

  accountBox: {
    padding: 16,
    width: width * 0.9,
    flexDirection: "row",
    paddingHorizontal: 20,
    gap: 10,
    borderRadius: 14,
    alignItems: "center",
  },
  accountBoxTexts: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  accountBoxText: {},
  iconBox: {
    width: 45,
    height: 45,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
});
