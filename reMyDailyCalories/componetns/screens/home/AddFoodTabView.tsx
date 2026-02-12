import { useRef, useState } from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  ScrollView,
  Text,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import PagerView from "react-native-pager-view";
import { DishCartLove, TabBtn } from "../../common";
import { useAppSelector } from "../../../hooks/storeHook";
import { love, loveRed, plus, plusWhite } from "../../../assets/icons/home";
import LottieFile from "../../../constants/loffieFile/LottieFile";
import { SortPart } from "../Dish";

const { width, height } = Dimensions.get("window");

type Props = {
  cartWithLove: boolean;
  data: {
    id: number;
    catagoryId: number;
    EnName: string;
    ArName: string;
    DeName: string;
    TrName: string;
    foods: {}[];
  }[];
};

const AddFoodTabView = ({ cartWithLove, data }: Props) => {
  const ref = useRef(null);
  const { themeData } = useAppSelector((state) => state.theme);
  const { favoriteFood } = useAppSelector((state) => state.favorite);
  const { lang, words } = useAppSelector((state) => state.lang);

  const [isSelected, setIsSelected] = useState(0);

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
          title={words.Favorite}
        />

        {data?.map((item, index) => (
          <TabBtn
            key={index}
            onPress={() => {
              ref.current?.setPage(index + 1);
            }}
            active={isSelected == index + 1 ? true : false}
            title={
              lang === "ar"
                ? item.ArName
                : lang === "de"
                ? item.DeName
                : lang === "tr"
                ? item.TrName
                : item.EnName
            }
          />
        ))}
      </View>

      <SortPart />

      <PagerView
        style={[
          styles.pager,
          {
            flex: 1,
            direction: lang === "ar" ? "rtl" : "ltr",
          },
        ]}
        ref={ref}
        initialPage={1}
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
            data={favoriteFood}
            foodIdFrom={"favorite"}
            foodCataId={data[0]?.catagoryId}
            cartWithLove={cartWithLove}
          />
        </ScrollView>

        {data?.map((item, index) => (
          <ScrollView
            key={index + 1}
            fadingEdgeLength={20} // make fade in top and botton
            scrollEnabled={true}
            showsVerticalScrollIndicator={false}
          >
            <TabPage
              data={item.foods}
              foodIdFrom={"food"}
              foodCataId={item.catagoryId}
              cartWithLove={cartWithLove}
            />
          </ScrollView>
        ))}
      </PagerView>
    </SafeAreaView>
  );
};

export default AddFoodTabView;

const TabPage = ({ cartWithLove, data, foodCataId, foodIdFrom }) => {
  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <View style={{ flex: 0.1, alignItems: "center" }}>
        {Array.isArray(data) && data.length !== 0 ? (
          data?.map((item, index) => {
            return (
              <DishCartLove
                foodCataId={foodCataId}
                foodId={foodIdFrom === "food" ? item.id : item.foodId}
                key={index}
                data={item}
                iconLeft={foodIdFrom === "food" ? love : loveRed}
              />
            );
          })
        ) : (
          <View
            key={foodCataId}
            style={{
              justifyContent: "center",
              height: height * 0.3,
            }}
          >
            <LottieFile
              lottieHeigh={250}
              lottieWidth={width * 0.8}
              lottieName="lottie_nodataRobot"
            />
          </View>
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
