import { useRef, useState } from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  ScrollView,
  Text,
  Pressable,
  Image,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import PagerView from "react-native-pager-view";
import { TabBtn } from "../../common";
import { useAppSelector } from "../../../hooks/storeHook";
import LottieFile from "../../../constants/loffieFile/LottieFile";
import { TMyDish } from "../../../type/myDishExercise.type";
import { MyDishExerciseCart } from "../common";
import MyDishExerciseAddCart from "../common/MyDishExerciseCart/MyDishExerciseAddCart";
import { dish, plus } from "../../../assets/icons/home";
import { ModalOwnDish } from "../../Modals";
import { AISmile, plusRobot } from "../../../assets/icons";
import * as Animatable from "react-native-animatable";

const { width, height } = Dimensions.get("window");

type Props = {
  cartWithLove: boolean;
  data: TMyDish[];
  active?: string;
  name?: string;
  isNewFood?: true | false;
};

const MyDishTabView = ({
  cartWithLove,
  data,
  active,
  name,
  isNewFood = false,
}: Props) => {
  const ref = useRef(null);
  const { themeData } = useAppSelector((state) => state.theme);
  const { favoriteFood } = useAppSelector((state) => state.favorite);
  const { lang, words } = useAppSelector((state) => state.lang);
  const [isSelected, setIsSelected] = useState(0);
  const [showOwnDish, setShowOwnDish] = useState(false);
  const [showOwnAIDish, setShowOwnAIDish] = useState(false);

  const breakfast = data.filter((item) => {
    return item.foodType === "breakfast";
  });
  const lunch = data.filter((item) => {
    return item.foodType === "lunch";
  });
  const dinner = data.filter((item) => {
    return item.foodType === "dinner";
  });
  const snack = data.filter((item) => {
    return item.foodType === "snack";
  });

  //  animation

  const robotMove = {
    0: { transform: [{ translateY: 0 }, { rotate: "0deg" }], opacity: 1 }, // الأرض، كامل الوضوح
    0.3: { transform: [{ translateY: -20 }, { rotate: "0deg" }], opacity: 0.7 }, // يرتفع للقمة، يخفف الشفافية
    0.7: {
      transform: [{ translateY: -20 }, { rotate: "360deg" }],
      opacity: 0.7,
    }, // يدوّر على القمة بنفس الشفافية
    1: { transform: [{ translateY: 0 }, { rotate: "360deg" }], opacity: 1 }, // النزول للأرض، يعود كامل الوضوح
  };

  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          transform: [{ translateY: 0 }],
        },
      ]}
    >
      <View
        style={{
          flexDirection: "row",
          width: width * 0.87,
          marginVertical: 5,
          flexWrap: "wrap",
        }}
      >
        <TabBtn
          onPress={() => {
            ref.current?.setPage(0);
          }}
          active={isSelected == 0 ? true : false}
          title={words.Breakfast}
          color={themeData["background-primary"]}
        />
        <TabBtn
          onPress={() => {
            ref.current?.setPage(1);
          }}
          active={isSelected == 1 ? true : false}
          title={words.Lunch}
          color={themeData["background-primary"]}
        />
        <TabBtn
          onPress={() => {
            ref.current?.setPage(2);
          }}
          active={isSelected == 2 ? true : false}
          title={words.Dinner}
          color={themeData["background-primary"]}
        />
        <TabBtn
          onPress={() => {
            ref.current?.setPage(3);
          }}
          active={isSelected == 3 ? true : false}
          title={words.Snack}
          color={themeData["background-primary"]}
        />
      </View>

      {isNewFood === false ? (
        <View
          style={{
            width: width * 0.85,
            // justifyContent: "center",
            flexDirection: "row-reverse",
            marginBottom: 10,
          }}
        >
          {/* add new food */}
          <TouchableOpacity
            onPress={() => {
              setShowOwnDish(true);
            }}
            style={[
              {
                backgroundColor: themeData["background-secondary"],
                padding: 10,
                borderRadius: 6,
              },
            ]}
          >
            <Image
              style={{
                width: 10,
                height: 10,
                position: "absolute",
                transform: [
                  { translateY: 2 },
                  { translateX: lang === "ar" ? -2 : 2 },
                ],
              }}
              source={plus}
            />

            <Image
              style={{
                width: 20,
                height: 20,
              }}
              source={dish}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              setShowOwnAIDish(true);
            }}
            style={[
              {
                backgroundColor: themeData["background-secondary"],
                padding: 10,
                borderRadius: 6,
                marginHorizontal: 10,
              },
            ]}
          >
            <Image
              style={{
                width: 10,
                height: 10,
                position: "absolute",
                transform: [
                  { translateY: 2 },
                  { translateX: lang === "ar" ? -2 : 2 },
                ],
              }}
              source={plus}
            />
            <Animatable.Image
              animation={robotMove}
              iterationCount={"infinite"}
              direction="alternate"
              duration={3000}
              easing="ease-in-out"
              style={{
                width: 20,
                height: 20,

                // transform: [{ translateY: -10 }],
              }}
              source={AISmile}
            />
          </TouchableOpacity>
        </View>
      ) : (
        <View style={{ height: 20 }}></View>
      )}

      <PagerView
        style={[
          styles.pager,
          { flex: 1, direction: lang === "ar" ? "rtl" : "ltr" },
        ]}
        ref={ref}
        initialPage={0}
        onPageSelected={(e) => {
          const selectedPage = e.nativeEvent.position;
          setIsSelected(selectedPage);
        }}
      >
        <ScrollView
          key={0}
          fadingEdgeLength={20} // make fade in top and botton
          scrollEnabled={true}
          showsVerticalScrollIndicator={false}
        >
          <TabPage
            name={name}
            data={breakfast}
            active={active}
            isNewFood={isNewFood}
          />
        </ScrollView>

        <ScrollView
          key={1}
          fadingEdgeLength={20} // make fade in top and botton
          scrollEnabled={true}
          showsVerticalScrollIndicator={false}
        >
          <TabPage
            name={name}
            data={lunch}
            active={active}
            isNewFood={isNewFood}
          />
        </ScrollView>

        <ScrollView
          key={2}
          fadingEdgeLength={20} // make fade in top and botton
          scrollEnabled={true}
          showsVerticalScrollIndicator={false}
        >
          <TabPage
            name={name}
            data={dinner}
            active={active}
            isNewFood={isNewFood}
          />
        </ScrollView>

        <ScrollView
          key={3}
          fadingEdgeLength={20} // make fade in top and botton
          scrollEnabled={true}
          showsVerticalScrollIndicator={false}
        >
          <TabPage
            name={name}
            data={snack}
            active={active}
            isNewFood={isNewFood}
          />
        </ScrollView>
      </PagerView>

      {showOwnDish && (
        <ModalOwnDish
          isOpen={showOwnDish}
          setIsOpen={setShowOwnDish}
          type={"normal"}
        />
      )}

      {showOwnAIDish && (
        <ModalOwnDish
          isOpen={showOwnAIDish}
          setIsOpen={setShowOwnAIDish}
          type={"ai"}
        />
      )}
    </SafeAreaView>
  );
};

export default MyDishTabView;

const TabPage = ({ data, active, name, isNewFood }) => {
  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <View style={{ flex: 0.1, alignItems: "center" }}>
        {Array.isArray(data) && data.length !== 0 ? (
          data?.map((item, index) => {
            if (active === "add") {
              return (
                <MyDishExerciseAddCart
                  name={name}
                  key={index}
                  data={item}
                  type={"food"}
                  isNewFood={isNewFood}
                />
              );
            }
            return <MyDishExerciseCart key={index} data={item} type={"food"} />;
          })
        ) : (
          <LottieFile
            lottieHeigh={250}
            lottieWidth={width * 0.8}
            lottieName="lottie_nodataRobot"
          />
        )}

        <View style={{ height: 10 }}></View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",

    // marginTop: 60,
  },

  btns: {
    width: width * 0.85,
  },
  pager: {
    alignSelf: "stretch",
  },
  foodText1: {
    fontSize: 16,
  },
  foodText2: {
    fontSize: 10,
  },
});
