import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  TextInput,
  Pressable,
  Modal,
  RefreshControl,
  Linking,
  KeyboardAvoidingView,
  ScrollView,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";

import { useAppDispatch, useAppSelector } from "../../../hooks/storeHook";
import { HeaderPages } from "../../screens/home";
import { AISmile, copy, invite, rate } from "../../../assets/icons";
import { food3 } from "../../../assets/icons/Foods";
import { gift, start } from "../../../assets/icons/add";
import RatingScreen from "./RatingScreen";
import {
  actGetSubscribeData,
  actRateReward,
  actReferralReward,
} from "../../../store/auth/authSlice";
import Toast from "react-native-toast-message";
import ModalAccept from "./ModalAccept";
import { RATE_ON_PLAY_STORE } from "@env";

const { width, height } = Dimensions.get("screen");

const ModalAccount = ({ isOpen, setIsOpen }) => {
  const { themeData } = useAppSelector((state) => state.theme);
  const { update } = useAppSelector((state) => state.update);
  const { lang, words } = useAppSelector((state) => state.lang);

  const { userSubscribe } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const userData = {
    userSubscribe: {
      premier: userSubscribe?.premier,
      premierEndDate: userSubscribe?.premierEndDate,
      limitDish: userSubscribe?.limitDish,
      limitAI: userSubscribe?.limitAI,
      myDish: userSubscribe?.myDish,
      myAI: userSubscribe?.myAI,
      makeReview: userSubscribe?.makeReview,
      referralCode: userSubscribe?.referralCode,
      myReferralCode: userSubscribe?.myReferralCode,
    },
  };

  const [playRateAccept, setPlayRateAccept] = useState(false);
  const [delayToast, setDelayToast] = useState(false);
  const [enterInviteCode, setEnterInviteCode] = useState(false);
  const [isOpenRatingScreen, setIsOpenRatingScreen] = useState(false);
  const [refreshing, setRefreshing] = React.useState(false);
  const [inviteMessage, setInviteMessage] = React.useState("");
  const [rateComment, setRateComment] = React.useState({
    stars: 1,
    comment: "",
  });

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    dispatch(actGetSubscribeData())
      .unwrap()
      .finally(() => {
        setRefreshing(false);
      });
  }, []);

  const Referral = [
    {
      msg:
        lang === "ar"
          ? "تحصل على +1 وجبات مجانية"
          : lang === "de"
          ? "Du erhältst +1 kostenlose Mahlzeiten"
          : lang === "tr"
          ? "+1 ücretsiz öğün kazanıyorsun"
          : "You get +1 free meals",
      icon: food3,
    },
    {
      msg:
        lang === "ar"
          ? "تحصل على +10 طلبات AI"
          : lang === "de"
          ? "Du erhältst +10 KI-Anfragen"
          : lang === "tr"
          ? "+10 AI isteği kazanıyorsun"
          : "You get +10 AI requests",
      icon: AISmile,
    },
    {
      msg: words.friendGetsSame,
      icon: gift,
    },
  ];

  const Reward = [
    {
      msg:
        lang === "ar"
          ? "تحصل على +2 وجبات مجانية"
          : lang === "de"
          ? "Du erhältst +2 kostenlose Mahlzeiten"
          : lang === "tr"
          ? "+2 ücretsiz öğün kazanıyorsun"
          : "You get +2 free meals",
      icon: food3,
    },
    {
      msg:
        lang === "ar"
          ? "تحصل على +20 طلبات AI"
          : lang === "de"
          ? "Du erhältst +20 KI-Anfragen"
          : lang === "tr"
          ? "+20 AI isteği kazanıyorsun"
          : "You get +20 AI requests",
      icon: AISmile,
    },
  ];

  const getreffrralReward = () => {
    setDelayToast(true);
    if (inviteMessage === "") {
      ErrorToast("Please Enter Invite Code");
    } else if (inviteMessage.length > 12) {
      ErrorToast("Invite Code Must Be Less Than 12 Characters");
    } else {
      dispatch(actReferralReward({ referralCode: inviteMessage }))
        .unwrap()
        .then(() => {
          setEnterInviteCode(false);
          setInviteMessage("");
          //   TODO Lotti funny
        })
        .catch((e) => {
          ErrorToast("Invite Code Is Wrong");
        });
    }
  };
  const getRateReward = () => {
    setDelayToast(true);
    if (rateComment.stars === 0) {
      ErrorToast("Please Select Start");
    } else {
      dispatch(actRateReward(rateComment))
        .unwrap()
        .then(() => {
          setIsOpenRatingScreen(false);
          setRateComment({
            stars: 1,
            comment: "",
          });
          //   TODO Lotti funny
        })
        .catch((e) => {
          ErrorToast("Invite Code Is Wrong");
        });
    }
  };

  const rateOnStore = () => {
    const playStoreUrl = RATE_ON_PLAY_STORE;

    Linking.openURL(playStoreUrl).catch((err) =>
      console.error("Failed to open Play Store", err)
    );
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

  // const handleCopy = async () => {
  //   setDelayToast(true);

  //   await Clipboard.setStringAsync(`
  //       Hey! 👋

  // I’m using an awesome app called Daily Calories and I think you’ll love it too!

  // Use my referral code  ${userSubscribe.myReferralCode}  when you sign up to get a special bonus 🎁

  // Download the app here:
  // 📲 https://play.google.com/store/apps/details?id=com.gamovation.chessclubpilot&pcampaignid=web_share

  // Let me know once you're in so we can both enjoy the rewards! 🚀

  //       `);
  //   let text = "Copied! You can now share the invitation message..";
  //   Toast.show({
  //     type: "success",
  //     text1: "Success",
  //     text2: `${text}`,
  //     position: "bottom",
  //   });
  // };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isOpen}
      onRequestClose={() => setIsOpen(false)}
      statusBarTranslucent={true}
      navigationBarTranslucent={true}
    >
      <KeyboardAvoidingView style={{ height }}>
        <ScrollView
          scrollEnabled={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <View
            style={[
              styles.container,
              {
                backgroundColor: themeData["background-secondary-2"],
              },
            ]}
          >
            <View style={{ height: height * 0.07 }}>
              <HeaderPages
                onpress={() => {
                  setIsOpen(false);
                }}
                header={words.myAccount}
                title=""
                text=""
              />
            </View>

            <View
              style={{
                marginVertical: 20,
                gap: 20,
              }}
            >
              {/* group 1 */}
              <View style={{ gap: 14 }}>
                <View>
                  <Text
                    style={{
                      color: themeData["text-primary"],
                      paddingHorizontal: 10,
                      direction: lang === "ar" ? "rtl" : "ltr",
                    }}
                  >
                    {words.subscription}{" "}
                  </Text>
                </View>
                <View
                  style={[
                    styles.accountBox,
                    { backgroundColor: themeData["background-secondary"] },
                  ]}
                >
                  <View
                    style={[
                      styles.iconBox,
                      {
                        backgroundColor: themeData["background-secondary-2"],
                      },
                    ]}
                  >
                    <Image source={AISmile} style={styles.icon} />
                  </View>
                  <View style={styles.accountBoxTexts}>
                    <View style={{ flexDirection: "row" }}>
                      <Text
                        style={[{ color: themeData["background-primary"] }]}
                      >
                        {userData.userSubscribe.limitAI}
                      </Text>
                      <Text style={{ color: themeData["text-primary"] }}>
                        {" "}
                        /{" "}
                      </Text>

                      <Text style={[{ color: themeData["text-primary"] }]}>
                        {userData.userSubscribe.myAI}
                      </Text>
                    </View>
                    <Text style={[{ color: themeData["text-primary"] }]}>
                      {words.aiRequest}
                    </Text>
                  </View>
                </View>

                <View
                  style={[
                    styles.accountBox,
                    { backgroundColor: themeData["background-secondary"] },
                  ]}
                >
                  <View
                    style={[
                      styles.iconBox,
                      {
                        backgroundColor: themeData["background-secondary-2"],
                      },
                    ]}
                  >
                    <Image source={food3} style={styles.icon} />
                  </View>
                  <View style={styles.accountBoxTexts}>
                    <View style={{ flexDirection: "row" }}>
                      <Text style={{ color: themeData["background-primary"] }}>
                        {userData.userSubscribe.limitDish}
                      </Text>
                      <Text style={{ color: themeData["text-primary"] }}>
                        {" "}
                        /{" "}
                      </Text>
                      <Text style={{ color: themeData["text-primary"] }}>
                        {userData.userSubscribe.myDish}{" "}
                      </Text>
                    </View>
                    <Text style={{ color: themeData["text-primary"] }}>
                      {words.myMeals}
                    </Text>
                  </View>
                </View>
              </View>

              {/* group 2 */}
              <View style={{ gap: 14, marginTop: 4 }}>
                <View>
                  <Text
                    style={{
                      color: themeData["text-primary"],
                      paddingHorizontal: 10,
                      direction: lang === "ar" ? "rtl" : "ltr",
                    }}
                  >
                    {words.evaluationReferral}{" "}
                  </Text>
                </View>
                {/* one */}
                <View
                  style={[
                    styles.accountBox,
                    { backgroundColor: themeData["background-secondary"] },
                  ]}
                >
                  {userData.userSubscribe.makeReview === 0 ? (
                    <View
                      style={[
                        styles.accountBoxTexts,
                        { flexDirection: "column" },
                      ]}
                    >
                      <View
                        style={{
                          flexDirection: "row",
                          width: width * 0.75,
                          justifyContent: "center",
                          marginBottom: 10,
                        }}
                      >
                        <Text style={{ fontSize: 16 }}>💝</Text>
                        <Text
                          // numberOfLines={1}
                          style={{
                            fontSize: 16,
                            fontWeight: 600,
                            color: themeData["background-primary"],
                            paddingHorizontal: 10,
                            textAlign: "center",
                          }}
                        >
                          {words.helpUsGrow}
                        </Text>
                        <Text style={{ fontSize: 16 }}>💝</Text>
                      </View>

                      {/* <start /> */}

                      {Reward.map((item, index) => {
                        return (
                          <View
                            key={index}
                            style={{
                              flexDirection: "row",
                              transform: [{ translateX: 20 }],
                              gap: 20,
                              alignItems: "center",
                              justifyContent: "center",
                              margin: "auto",
                              // backgroundColor: "red",
                            }}
                          >
                            <View style={{}}>
                              <Image
                                source={item.icon}
                                style={{
                                  width: 20,
                                  height: 20,
                                }}
                              />
                            </View>
                            <Text
                              style={[
                                {
                                  color: themeData["text-primary"],
                                  fontSize:
                                    lang == "ar" || lang == "en" ? 12 : 9,
                                  lineHeight: 24,
                                  width: width * 0.4,
                                },
                              ]}
                            >
                              {item.msg}
                            </Text>
                          </View>
                        );
                      })}
                      <View style={{ gap: 10 }}>
                        <TouchableOpacity
                          onPress={() => {
                            setIsOpenRatingScreen(true);
                          }}
                          style={{
                            marginTop: 20,
                            padding: 12,
                            backgroundColor: themeData["background-primary"],
                            borderRadius: 10,
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: 10,
                          }}
                        >
                          <Image
                            source={rate}
                            style={{ width: 20, height: 20 }}
                          />
                          <Text
                            style={{
                              color: "#fff",
                              fontSize: 11,
                            }}
                          >
                            {words.rateNow}
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  ) : (
                    <View
                      style={[
                        styles.accountBoxTexts,
                        { flexDirection: "column" },
                      ]}
                    >
                      <Text
                        style={{
                          fontSize: 16,
                          fontWeight: 600,
                          marginBottom: 10,
                          color: themeData["background-primary"],
                          width: width * 0.8,
                          textAlign: "center",
                        }}
                      >
                        ❤️ {""} {words.ThanksRating} {""} ❤️
                      </Text>
                      <Text
                        style={{
                          fontSize: 12,
                          fontWeight: 600,
                          color: themeData["text-primary"],
                          width: width * 0.8,
                          textAlign: "center",
                        }}
                      >
                        {words.AppreciateFeedback}
                      </Text>

                      <View style={{ gap: 10 }}>
                        <TouchableOpacity
                          onPress={() => {
                            setPlayRateAccept(true);
                          }}
                          style={{
                            marginTop: 20,
                            padding: 12,
                            backgroundColor: themeData["background-primary"],
                            borderRadius: 10,
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: 10,
                          }}
                        >
                          <Image
                            source={rate}
                            style={{ width: 20, height: 20 }}
                          />
                          <Text
                            style={{
                              color: "#fff",
                              fontSize: 11,
                            }}
                          >
                            {words.helpUsGrow}
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  )}
                </View>

                {/* two */}
                <View
                  style={[
                    styles.accountBox,
                    { backgroundColor: themeData["background-secondary"] },
                  ]}
                >
                  <View
                    style={[
                      styles.accountBoxTexts,
                      { flexDirection: "column" },
                    ]}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        width: width * 0.75,
                        justifyContent: "center",
                        marginBottom: 10,
                      }}
                    >
                      <Text style={{ fontSize: 16 }}>💝</Text>
                      <Text
                        style={{
                          fontSize: 16,
                          fontWeight: 600,
                          color: themeData["background-primary"],
                          textAlign: "center",
                          paddingHorizontal: 10,
                        }}
                      >
                        {words.inviteFriends}
                      </Text>
                      <Text style={{ fontSize: 16 }}>💝</Text>
                    </View>

                    {Referral.map((item, index) => {
                      return (
                        <View
                          key={index}
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                            transform: [{ translateX: 20 }],
                            gap: 20,
                          }}
                        >
                          <View
                            style={{
                              justifyContent: "flex-end",
                            }}
                          >
                            <Image
                              source={item.icon}
                              style={{
                                width: 20,
                                height: 20,
                              }}
                            />
                          </View>
                          <Text
                            style={[
                              {
                                color: themeData["text-primary"],
                                fontSize: lang == "ar" || lang == "en" ? 12 : 9,
                                lineHeight: 24,
                                width: width * 0.4,
                              },
                            ]}
                          >
                            {item.msg}
                          </Text>
                        </View>
                      );
                    })}
                    <View
                      style={{
                        gap: 10,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <TouchableOpacity
                        // onPress={handleCopy}
                        onPress={() => {}}
                        style={{
                          marginTop: 20,
                          padding: 12,
                          paddingHorizontal: 20,
                          backgroundColor: themeData["background-primary"],
                          borderRadius: 10,
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: 10,
                        }}
                      >
                        <Image
                          source={copy}
                          style={{ width: 20, height: 20 }}
                        />
                        <Text style={{ color: "#fff", fontSize: 11 }}>
                          {words.copyMessage}{" "}
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => {
                          setEnterInviteCode(true);
                        }}
                        style={{
                          padding: 12,
                          backgroundColor: themeData["background-primary"],
                          borderRadius: 10,
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: 10,
                        }}
                      >
                        <Image
                          source={invite}
                          style={{ width: 20, height: 20 }}
                        />
                        <Text style={{ color: "#fff", fontSize: 11 }}>
                          {words.enterCode}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>

          <RatingScreen
            isOpen={isOpenRatingScreen}
            setIsOpen={setIsOpenRatingScreen}
            rateComment={rateComment}
            getRateReward={getRateReward}
            setRateComment={setRateComment}
          />
          <Modal
            visible={enterInviteCode}
            transparent={true}
            animationType="fade"
            onRequestClose={() => {
              setEnterInviteCode(false);
              setInviteMessage("");
            }}
            statusBarTranslucent={true}
            navigationBarTranslucent={true}
          >
            <Pressable
              onPress={() => {
                setEnterInviteCode(false);
                setInviteMessage("");
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
                  <View
                    style={{
                      flexDirection: "row",
                      width: width * 0.75,
                      justifyContent: "center",
                      marginBottom: 20,
                    }}
                  >
                    <Text style={{ fontSize: 16 }}>💝</Text>
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: 600,
                        color: themeData["background-primary"],
                        paddingHorizontal: 10,
                        textAlign: "center",
                      }}
                    >
                      {words.EnterInviteCode}
                    </Text>
                    <Text style={{ fontSize: 16 }}>💝</Text>
                  </View>

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
                      value={inviteMessage}
                      placeholder={words.TypeCode}
                      placeholderTextColor={themeData["text-secondary"]}
                      onChangeText={(text) => {
                        setInviteMessage(text);
                      }}
                    />
                  </View>
                  <View>
                    <TouchableOpacity
                      onPress={getreffrralReward}
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
                        {words.ConfirmInvitation}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Pressable>
            </Pressable>
          </Modal>

          <ModalAccept
            isOpen={playRateAccept}
            setIsOpen={setPlayRateAccept}
            text={words.rateApp}
            active={rateOnStore}
          />

          <View style={{ position: "absolute", bottom: 0, width, zIndex: 400 }}>
            {delayToast ? <Toast /> : <></>}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default ModalAccount;

const styles = StyleSheet.create({
  container: {
    width,
    height,
    paddingTop: 30,
    alignItems: "center",
  },
  icon: {
    width: 25,
    height: 25,
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
