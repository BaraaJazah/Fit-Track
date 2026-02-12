import { memo, useRef, useState } from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import PagerView from "react-native-pager-view";
import { DishCart, TabBtn } from "../../common";
import { useAppSelector } from "../../../hooks/storeHook";
import { useRouter } from "expo-router";
import LottieFile from "../../../constants/loffieFile/LottieFile";

const { width, height } = Dimensions.get("window");

type Props = {
  name: string;
  work?: string;
  data: {
    id: number;
    catagoryId: number;
    EnName: string;
    ArName: string;
    TrName: string;
    DeName: string;
    foods: {}[];
  }[];
};

const AddDailyFoodTabView = memo(({ data, name, work = "" }: Props) => {
  const ref = useRef(null);
  const { themeData } = useAppSelector((state) => state.theme);
  const { favoriteFood } = useAppSelector((state) => state.favorite);
  const { lang, words } = useAppSelector((state) => state.lang);
  const [isSelected, setIsSelected] = useState(0);
  return (
    <SafeAreaView
      style={[styles.container, { transform: [{ translateY: 0 }] }]}
    >
      {/* tab btn */}
      <View
        style={{
          flexDirection: "row",
          width: width * 0.9,
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
      <PagerView
        style={[
          styles.pager,
          { flex: 1, direction: lang === "ar" ? "rtl" : "ltr" },
        ]}
        ref={ref}
        initialPage={1}
        onPageSelected={(e) => {
          const selectedPage = e.nativeEvent.position;
          setIsSelected(selectedPage);
        }}
      >
        <ScrollView
          fadingEdgeLength={20} // make fade in top and botton
          scrollEnabled={true} // make scroll anable
          showsVerticalScrollIndicator={false}
        >
          {favoriteFood.length > 0 ? (
            <TabPage
              foodIdFrom={"favorite"}
              foodCataId={data[0]?.catagoryId}
              data={favoriteFood}
              name={name}
              work={work}
            />
          ) : (
            <SafeAreaView style={styles.container2}>
              <LottieFile
                lottieName="lottie_nodataRobot"
                lottieHeigh={250}
                lottieWidth={width * 0.8}
              />
            </SafeAreaView>
          )}
        </ScrollView>

        {data?.map((item, index) => (
          <ScrollView
            key={index + 1}
            fadingEdgeLength={20} // make fade in top and botton
            scrollEnabled={true} // make scroll anable
            showsVerticalScrollIndicator={false}
          >
            <TabPage
              foodIdFrom={"food"}
              data={item.foods}
              foodCataId={item.catagoryId}
              name={name}
              work={work}
            />
          </ScrollView>
        ))}
      </PagerView>
    </SafeAreaView>
  );
});

export default AddDailyFoodTabView;

const TabPage = ({ data, name, foodIdFrom, foodCataId, work }) => {
  const router = useRouter();

  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <View style={{ flex: 0.1, alignItems: "center" }}>
        {Array.isArray(data) &&
          data?.map((item, index) => {
            return (
              <DishCart
                key={index}
                foodCataId={foodCataId}
                data={item}
                name={name}
                work={work}
              />
            );
          })}

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
  },

  container2: {
    flex: 1,
    width,

    alignItems: "center",
    justifyContent: "center",
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
