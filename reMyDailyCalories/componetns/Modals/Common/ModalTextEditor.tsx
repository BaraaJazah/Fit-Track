import React, { useState, useRef, useEffect } from "react";
import {
  Dimensions,
  Modal,
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { useAppSelector } from "../../../hooks/storeHook";
import PagerView from "react-native-pager-view";
import { save, translator } from "../../../assets/icons/home";
import { HeaderPages } from "../../screens/home";

const { width, height } = Dimensions.get("screen");

type Props = {
  isOpen: boolean;
  setIsOpen: (boolean) => void;
  setExplaneText: (string, any) => void;
  explane?: string;
};

const ModalTextEditor = ({
  isOpen,
  setIsOpen,
  setExplaneText,
  explane,
}: Props) => {
  const [text, setText] = useState("");
  const { themeData } = useAppSelector((state) => state.theme);
  const { myAddTotalDish } = useAppSelector((state) => state.myDishExercise);
  const { lang, words } = useAppSelector((state) => state.lang);

  const [activeTab, setActiveTab] = useState(0);
  const [currentLine, setCurrentLine] = useState(0);
  const [isRTL, setIsRTL] = useState(false);
  const textInputRef = useRef(null);

  // Default colors + dynamic colors
  const [colors, setColors] = useState([
    themeData["text-primary"],
    themeData["text-secondary"],
    themeData["background-primary"],
    themeData["secondary-meal1"],
    themeData["secondary-meal2"],
    themeData["secondary-meal3"],
    themeData["secondary-meal4"],
  ]);

  useEffect(() => {
    if (explane) {
      setText(explane);
    } else {
      setText("");
    }
  }, [explane]);

  useEffect(() => {
    if (isOpen && textInputRef.current) {
      textInputRef.current.focus();
      setTimeout(() => {
        textInputRef.current.setNativeProps({
          selection: { start: 0, end: 0 },
        });
      }, 100);
    }
  }, [isOpen]);

  const renderFormattedText = () => {
    if (!text)
      return (
        <Text style={styles.placeholderText}>
          {/* {isRTL ? "لا يوجد نص للعرض" : "No text to display"} */}
          {words.noTextDisplay}
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

  const toggleHeader = () => {
    const lines = text.split("\n");
    let currentLineText = lines[currentLine] || "";

    if (currentLineText.startsWith("##")) {
      lines[currentLine] = currentLineText.substring(2);
    } else {
      lines[currentLine] = `##${currentLineText}`;
    }

    setText(lines.join("\n"));
  };

  const changeColor = (color) => {
    const lines = text.split("\n");
    let currentLineText = lines[currentLine] || "";

    currentLineText = currentLineText.replace(/\["[^"]+"\]$/, "");

    if (color !== themeData["text-primary"]) {
      currentLineText = `${currentLineText}["${color}"]`;

      // Add to colors if not already there
      if (!colors.includes(color) && color !== themeData["text-primary"]) {
        setColors([...colors, color]);
      }
    }

    lines[currentLine] = currentLineText;
    setText(lines.join("\n"));
  };

  const handleSelectionChange = ({ nativeEvent }) => {
    const cursorPosition = nativeEvent.selection.start;
    const textBeforeCursor = text.substring(0, cursorPosition);
    const lineNumber = textBeforeCursor.split("\n").length - 1;
    setCurrentLine(lineNumber);
  };

  const getCurrentLineFormats = () => {
    const currentLineText = text.split("\n")[currentLine] || "";
    const colorMatch = currentLineText.match(/\["([^"]+)"\]$/);
    return {
      isHeader: currentLineText.startsWith("##"),
      color: colorMatch ? colorMatch[1] : "black",
    };
  };

  const saveTextHandler = () => {
    setExplaneText("explane", text);
    setIsOpen(false);
  };

  const ref = useRef(null);

  return (
    <Modal
      animationType="fade"
      transparent={false}
      visible={isOpen}
      onRequestClose={() => setIsOpen(false)}
      statusBarTranslucent={true}
      navigationBarTranslucent={true}
    >
      <View
        style={[
          styles.fullScreenContainer,
          {
            backgroundColor: themeData["background-secondary-2"],
          },
        ]}
      >
        <View style={{ height: height * 0.06 }}>
          <HeaderPages
            onpress={() => {
              setIsOpen(false);
            }}
            header={words["Add an explanation"]}
            text=""
          />
        </View>

        <View
          style={[
            styles.tabBar,
            {
              backgroundColor: themeData["background-secondary-2"],
              direction: lang === "ar" ? "rtl" : "ltr",
            },
          ]}
        >
          {/* preview btn */}
          <View style={{ flexDirection: "row", gap: 10 }}>
            <TouchableOpacity
              style={{
                backgroundColor: themeData["background-secondary"],
                borderRadius: 10,
                padding: 12,
                alignItems: "center",
                width: width * 0.3,
              }}
              onPress={() => ref.current?.setPage(0)}
            >
              <Text
                style={[
                  styles.pagerBtnText,
                  {
                    color: themeData["text-secondary"],
                  },
                  activeTab === 0
                    ? {
                        color: themeData["background-primary"],
                      }
                    : {},
                ]}
              >
                {words.preview}
              </Text>
            </TouchableOpacity>

            {/* edit btn */}

            <TouchableOpacity
              style={{
                backgroundColor: themeData["background-secondary"],
                borderRadius: 10,
                padding: 12,
                alignItems: "center",
                width: width * 0.3,
              }}
              onPress={() => ref.current?.setPage(1)}
            >
              <Text
                style={[
                  styles.pagerBtnText,
                  {
                    color: themeData["text-secondary"],
                  },
                  activeTab === 1
                    ? {
                        color: themeData["background-primary"],
                      }
                    : {},
                ]}
              >
                {words.edit}
              </Text>
            </TouchableOpacity>
          </View>
          {/* save btn */}
          <TouchableOpacity
            style={[
              styles.closeButton,
              { backgroundColor: themeData["background-secondary"] },
            ]}
            onPress={saveTextHandler}
          >
            <Image source={save} style={{ width: 30, height: 30 }} />
          </TouchableOpacity>

          {/* chnage language btn */}
        </View>
        <PagerView
          style={{
            flex: 1,
            alignSelf: "stretch",
            width: width,
            margin: "auto",
            marginVertical: 30,
          }}
          ref={ref}
          initialPage={0}
          onPageSelected={(e) => {
            const selectedPage = e.nativeEvent.position;
            setActiveTab(selectedPage);
          }}
        >
          <View
            key="1"
            style={{
              flex: 1,
              alignItems: "center",
              margin: "auto",
            }}
          >
            <View
              style={[
                styles.previewContainer,
                {
                  flex: 1,
                  borderColor: themeData["background-secondary"],
                  direction: lang === "ar" ? "rtl" : "ltr",
                },
              ]}
            >
              <ScrollView
                style={{ flex: 1 }}
                showsVerticalScrollIndicator={false}
              >
                {renderFormattedText()}
              </ScrollView>
            </View>
          </View>
          <View
            key="2"
            style={{ flex: 1, alignItems: "center", margin: "auto" }}
          >
            <>
              <TextInput
                ref={textInputRef}
                style={[
                  styles.textInput,
                  {
                    backgroundColor: themeData["background-secondary-2"],
                    borderColor: themeData["background-secondary"],
                    color: themeData["text-primary"],
                    padding: 20,
                    width: width * 0.94,
                  },
                ]}
                multiline
                value={text}
                onChangeText={setText}
                textAlignVertical="top"
                onSelectionChange={handleSelectionChange}
                placeholder={words.typeDishExplain}
                placeholderTextColor="#999"
              />

              <View style={styles.formatButtons}>
                <TouchableOpacity
                  style={[
                    styles.formatButton,
                    {
                      backgroundColor: themeData["background-secondary-2"],
                      borderColor: themeData["background-secondary"],
                    },
                    getCurrentLineFormats().isHeader && {
                      borderColor: themeData["background-primary"],
                    },
                  ]}
                  onPress={toggleHeader}
                >
                  <Text
                    style={[
                      styles.formatButtonText,
                      { color: themeData["text-primary"] },
                    ]}
                  >
                    {/* {isRTL ? "عنوان كبير" : "Set as title"} */}
                    {words.setAsTitle}
                  </Text>
                </TouchableOpacity>

                <View style={styles.colorButtons}>
                  {colors.map((color) => (
                    <TouchableOpacity
                      key={color}
                      style={[
                        styles.colorButton,
                        { backgroundColor: color },

                        getCurrentLineFormats().color === color && {
                          borderColor: themeData["background-primary"],
                          borderWidth: 2,
                        },
                      ]}
                      onPress={() => changeColor(color)}
                    />
                  ))}
                </View>
              </View>
            </>
          </View>
        </PagerView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  fullScreenContainer: {
    height,
    paddingVertical: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  tabBar: {
    flexDirection: "row",
    paddingTop: 30,
    alignItems: "center",
    // justifyContent: "center",
    justifyContent: "space-between",
    width: width * 0.92,
    gap: 10,
  },
  tabButton: {
    padding: 15,
    alignItems: "center",
    flex: 1,
  },

  tabButtonText: {
    fontSize: 16,
    fontWeight: "500",
  },
  languageButton: {
    padding: 10,
    marginHorizontal: 5,
    backgroundColor: "#e0e0e0",
    borderRadius: 5,
  },
  languageButtonText: {
    fontWeight: "bold",
  },
  closeButton: {
    marginLeft: 10,
  },
  closeButtonText: {
    color: "#1a73e8",
    fontSize: 16,
    fontWeight: "500",
  },
  content: {
    flex: 1,
    padding: 15,
  },
  textInput: {
    flex: 1,
    fontSize: 14,
    lineHeight: 24,
    padding: 10,
    borderWidth: 4,
    borderRadius: 16,
    marginBottom: 20,
  },
  previewContainer: {
    flex: 1,
    width: width * 0.94,
    padding: 20,
    paddingVertical: 25,
    borderWidth: 4,
    borderRadius: 16,
  },
  placeholderText: {
    textAlign: "center",
    color: "#999",
    marginTop: 10,
  },
  line: {
    fontSize: 14,
    marginBottom: 10,
    lineHeight: 24,
  },
  formatButtons: {
    flexDirection: "column",
    gap: 15,
  },
  formatButton: {
    padding: 12,
    borderRadius: 12,
    alignItems: "center",
    borderWidth: 4,
  },
  colorButtons: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    flexWrap: "wrap",
    paddingVertical: 10,
    gap: 8,
  },
  colorButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  addColorButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
  },
  addColorButtonText: {
    fontSize: 20,
    color: "#555",
  },
  activeButton: {
    borderWidth: 3,
    borderColor: "#1a73e8",
  },
  colorPickerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  colorPicker: {
    width: width * 0.8,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
  },
  colorPickerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  colorInput: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  colorPreview: {
    width: "100%",
    height: 50,
    borderRadius: 5,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  colorPickerButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  colorPickerButton: {
    padding: 10,
    borderRadius: 5,
    flex: 1,
    alignItems: "center",
    marginHorizontal: 5,
  },
  applyButton: {
    backgroundColor: "#1a73e8",
  },
  applyButtonText: {
    color: "white",
  },
  pagerBtnText: {
    fontSize: 14,
    fontWeight: 600,
  },
  formatButtonText: {
    fontWeight: 600,
  },
});

export default ModalTextEditor;
