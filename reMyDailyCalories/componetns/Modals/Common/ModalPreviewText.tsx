import {
  Dimensions,
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useAppSelector } from "../../../hooks/storeHook";
import { plus, translator } from "../../../assets/icons/home";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";

const { width, height } = Dimensions.get("window");

const ModalPreviewText = ({ isOpen, setIsOpen, text, name }) => {
  const { themeData } = useAppSelector((state) => state.theme);
  const [isRTL, setIsRTL] = useState(false);
  const { lang, words } = useAppSelector((state) => state.lang);

  const renderFormattedText = () => {
    if (!text)
      return (
        <Text
          style={[styles.placeholderText, { color: themeData["text-primary"] }]}
        >
          {isRTL ? "لا يوجد نص للعرض" : "No text to display"}
        </Text>
      );

    return text.split("\n").map((line, index) => {
      let lineContent = line;
      let lineStyle = { color: themeData["text-primary"] };

      const isHeader = line.startsWith("##");
      if (isHeader) {
        lineContent = line.substring(2);
        lineStyle.fontSize = 20;
        lineStyle.borderBottomColor = themeData["background-secondary"];
        lineStyle.borderBottomWidth = 3;
        lineStyle.paddingVertical = 15;
        lineStyle.fontWeight = "bold";
      }

      const isFoodName = line.startsWith("#");
      if (isFoodName) {
        lineContent = line.substring(2);
        lineStyle.fontSize = 20;
        lineStyle.paddingVertical = 15;
        lineStyle.fontWeight = "bold";
      }

      const colorMatch = line.match(/\["([^"]+)"\]$/);
      if (colorMatch) {
        lineContent = lineContent.replace(/\["[^"]+"\]$/, "");
        lineStyle.color = colorMatch[1];
      }

      return (
        <Text
          key={index}
          style={[
            styles.line,
            lineStyle,
            { textAlign: isRTL ? "right" : "left" },
          ]}
        >
          {lineContent || " "}
        </Text>
      );
    });
  };
  const bottomSheetRef = useRef<BottomSheet>(null);
  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    if (index < 1) {
      setIsOpen(false);
    }
  }, []);

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isOpen}
      onRequestClose={() => setIsOpen(false)}
      statusBarTranslucent={true}
      navigationBarTranslucent={true}
    >
      <Pressable
        onPress={setIsOpen}
        style={{ flex: 1, width, backgroundColor: "rgba(0,0,0,0.5)" }}
      ></Pressable>

      <View
        style={{
          height: height * 0.75,
          width,
          position: "absolute",
          bottom: 0,
          direction: lang === "ar" ? "rtl" : "ltr",
        }}
      >
        <GestureHandlerRootView>
          <BottomSheet
            ref={bottomSheetRef}
            index={2} // يجب تحديد مؤشر البداية
            snapPoints={[5, height * 0.7]} // يجب تحديد نقاط الالتقاط
            onChange={handleSheetChanges}
            handleIndicatorStyle={{
              backgroundColor: "gray", // لون الخط
              width: 60, // عرض الخط
              height: 4, // ارتفاع الخط
              borderRadius: 10, // تدوير الأطراف
              marginVertical: 2, // المسافة من الأعلى
              marginTop: 4,
            }}
            backgroundStyle={{
              backgroundColor: themeData["background-secondary"], // لون الخلفية
              borderColor: themeData["background-secondary-2"],
              borderTopWidth: 2,
            }}
          >
            <BottomSheetScrollView
              style={[
                {
                  backgroundColor: themeData["background-secondary-2"],
                  width,
                },
              ]}
            >
              <View
                style={[
                  styles.modalView,
                  {
                    backgroundColor: themeData["background-secondary-2"],
                  },
                ]}
              >
                <View style={styles.modalContent}>
                  <View
                    style={[
                      styles.header,
                      {
                        borderWidth: 4,
                        borderRadius: 12,
                        marginBottom: 10,
                        overflow: "hidden",
                        borderColor: themeData["background-secondary"],
                        marginTop: 20,
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.title,
                        { color: themeData["text-primary"] },
                      ]}
                    >
                      {name ? name : ""}
                    </Text>
                    <TouchableOpacity onPress={() => setIsRTL(!isRTL)}>
                      <Image
                        source={translator}
                        style={styles.translatorIcon}
                      />
                    </TouchableOpacity>
                  </View>

                  <View
                    style={[
                      styles.previewContainer,
                      {
                        borderColor: themeData["background-secondary"],
                        zIndex: 500,
                      },
                    ]}
                  >
                    <ScrollView
                      style={styles.scrollView}
                      contentContainerStyle={styles.scrollContent}
                      showsVerticalScrollIndicator={false}
                    >
                      {renderFormattedText()}
                    </ScrollView>
                  </View>
                </View>
              </View>
            </BottomSheetScrollView>
          </BottomSheet>
        </GestureHandlerRootView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "flex-end",
  },
  modalView: {
    // flex: 1,
    width: width,

    // height: height * 0.75,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    zIndex: 400,
  },
  modalContent: {
    flex: 1,
    padding: 10,
  },
  header: {
    flexDirection: "row",
    paddingHorizontal: 26,
    paddingVertical: 10,
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 22,
  },
  translatorIcon: {
    width: 32,
    height: 32,
  },
  previewContainer: {
    flex: 1,
    borderWidth: 4,
    borderRadius: 12,
    marginBottom: 20,
    overflow: "hidden",
  },
  scrollContainer: {
    flex: 1,
    borderWidth: 4,
    borderRadius: 16,
    borderColor: "#ddd",
    overflow: "hidden",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 15,
    paddingBottom: 30, // مساحة إضافية في الأسفل
  },
  placeholderText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
  },
  line: {
    fontSize: 14,
    marginBottom: 10,
    lineHeight: 24,
  },
});

export default ModalPreviewText;
