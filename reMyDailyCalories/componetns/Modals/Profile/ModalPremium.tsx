import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  ScrollView,
  Modal,
} from "react-native";
import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/storeHook";
import { ModalLoading } from "../../feedback";
import { HeaderPages } from "../../screens/home";

import { food3 } from "../../../assets/icons/Foods";
import { premium, pro, start } from "../../../assets/icons/add";
import { adBlock, AISmile } from "../../../assets/icons";

const { width, height } = Dimensions.get("screen");

const ModalPremium = ({ isOpen, setIsOpen }) => {
  const { themeData } = useAppSelector((state) => state.theme);
  const { lang, words } = useAppSelector((state) => state.lang);
  const [isLoading, setIsLoading] = useState(false);

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
        <View style={{ height: height * 0.18 }}>
          <HeaderPages
            onpress={() => {
              setIsOpen(false);
            }}
            header={words.getPremium}
            title=""
            text={words.flexibleCredit}
          />
        </View>
        <View style={{ height: height * 0.76 }}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ margin: 10 }}
          >
            <View style={styles.pricingWrapper}>
              {[
                {
                  name: words.starter,
                  price: "$5.99",
                  features: [
                    {
                      msg:
                        lang === "ar"
                          ? "تحصل على +15 وجبات مجانية"
                          : lang === "de"
                          ? "Du erhältst +15 kostenlose Mahlzeiten"
                          : lang === "tr"
                          ? "+15 ücretsiz öğün kazanıyorsun"
                          : "You get +15 free meals",
                      icon: food3,
                    },
                    {
                      msg:
                        lang === "ar"
                          ? "تحصل على +300 طلبات AI"
                          : lang === "de"
                          ? "Du erhältst +300 KI-Anfragen"
                          : lang === "tr"
                          ? "+300 AI isteği kazanıyorsun"
                          : "You get +300 AI requests",
                      icon: AISmile,
                    },
                    {
                      msg: words.removeAds,
                      icon: adBlock,
                    },
                  ],

                  icon: start,
                  popular: false,
                },
                {
                  name: words.pro,
                  price: "$9.99",
                  features: [
                    {
                      msg:
                        lang === "ar"
                          ? "تحصل على +30 وجبات مجانية"
                          : lang === "de"
                          ? "Du erhältst +30 kostenlose Mahlzeiten"
                          : lang === "tr"
                          ? "+30 ücretsiz öğün kazanıyorsun"
                          : "You get +30 free meals",
                      icon: food3,
                    },
                    {
                      msg:
                        lang === "ar"
                          ? "تحصل على +600 طلبات AI"
                          : lang === "de"
                          ? "Du erhältst +600 KI-Anfragen"
                          : lang === "tr"
                          ? "+600 AI isteği kazanıyorsun"
                          : "You get +600 AI requests",
                      icon: AISmile,
                    },
                    {
                      msg: words.removeAds,
                      icon: adBlock,
                    },
                  ],
                  icon: pro,
                  popular: true,
                },
                {
                  name: words.premium,
                  price: "$39.99",
                  features: [
                    {
                      msg:
                        lang === "ar"
                          ? "تحصل على +200 وجبات مجانية"
                          : lang === "de"
                          ? "Du erhältst +200 kostenlose Mahlzeiten"
                          : lang === "tr"
                          ? "+200 ücretsiz öğün kazanıyorsun"
                          : "You get +200 free meals",
                      icon: food3,
                    },
                    {
                      msg:
                        lang === "ar"
                          ? "تحصل على +4000 طلبات AI"
                          : lang === "de"
                          ? "Du erhältst +4000 KI-Anfragen"
                          : lang === "tr"
                          ? "+4000 AI isteği kazanıyorsun"
                          : "You get +4000 AI requests",
                      icon: AISmile,
                    },
                    {
                      msg: words.removeAds,
                      icon: adBlock,
                    },
                  ],
                  icon: premium,
                  popular: false,
                },
              ].map((plan, index) => (
                <View
                  key={index}
                  style={[
                    styles.planCard,
                    {
                      backgroundColor: plan.popular
                        ? "rgba(49, 214, 214,0.8)"
                        : themeData["background-seconary"],
                      borderColor: plan.popular
                        ? themeData["text-primary"]
                        : themeData["background-secondary"],
                    },
                  ]}
                >
                  {plan.popular && (
                    <View style={styles.badge}>
                      <Text style={styles.badgeText}>MOST POPULAR</Text>
                    </View>
                  )}

                  <Image source={plan.icon} style={styles.planIcon} />
                  <Text
                    style={[
                      styles.planName,
                      { color: themeData["text-primary"] },
                    ]}
                  >
                    {plan.name}
                  </Text>
                  <Text
                    style={[
                      styles.planPrice,
                      { color: themeData["text-primary"] },
                    ]}
                  >
                    {plan.price}
                  </Text>

                  <View
                    style={{
                      marginVertical: 4,
                    }}
                  >
                    {plan.features.map((item, index) => {
                      return (
                        <View
                          key={index}
                          style={{
                            flexDirection: "row",
                            transform: [{ translateX: 10 }],
                            marginVertical: 4,
                          }}
                        >
                          <View
                            style={{
                              // width: width * 0.2,
                              flexDirection: "row",
                              justifyContent: "center",
                              alignItems: "center",
                              gap: 6,
                            }}
                          >
                            <View
                              style={{
                                backgroundColor: plan.popular
                                  ? themeData["text-primary"]
                                  : themeData["background-secondary"],
                                width: 35,
                                height: 35,
                                borderRadius: 20,
                                alignItems: "center",
                                justifyContent: "center",
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
                                  fontSize: 11,
                                  lineHeight: 16,
                                  // flex: 1,
                                  width: width * 0.4,
                                },
                              ]}
                            >
                              {item.msg}
                            </Text>
                          </View>
                        </View>
                      );
                    })}
                  </View>
                  <TouchableOpacity
                    style={[
                      styles.subscribeBtn,
                      {
                        backgroundColor: plan.popular
                          ? themeData["text-primary"]
                          : themeData["background-secondary"],
                      },
                    ]}
                  >
                    <Text
                      style={{
                        color: plan.popular
                          ? themeData["background-secondary-2"]
                          : themeData["text-primary"],
                        fontWeight: "600",
                      }}
                    >
                      {words.subscribe}
                    </Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </ScrollView>
        </View>
      </View>
      <ModalLoading isOpen={isLoading} text={"Waiting to Update Database"} />
    </Modal>
  );
};

export default ModalPremium;

const styles = StyleSheet.create({
  container: {
    height,
    backgroundColor: "#fff",
    width,
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
    width: 80,
    height: 80,
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

  pricingWrapper: {
    paddingHorizontal: 16,
    paddingBottom: 24,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
  },

  planCard: {
    width: width * 0.85,
    padding: 20,
    borderRadius: 20,
    alignItems: "center",
    position: "relative",
    borderWidth: 5,
  },

  badge: {
    position: "absolute",
    top: -10,
    right: -10,
    backgroundColor: "#FFD700",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
    zIndex: 10,
  },

  badgeText: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#000",
  },

  planIcon: {
    width: 50,
    height: 50,
    marginBottom: 10,
  },

  planName: {
    fontSize: 20,
    fontWeight: "bold",
  },

  planPrice: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 4,
  },

  planFeature: {
    fontSize: 14,
    textAlign: "center",
    marginVertical: 2,
  },

  subscribeBtn: {
    marginTop: 16,
    paddingVertical: 10,
    paddingHorizontal: 32,
    borderRadius: 12,
  },
});
