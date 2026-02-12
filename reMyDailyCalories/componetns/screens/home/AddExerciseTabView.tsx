import { useRef, useState } from "react";
import { StyleSheet, View, Dimensions, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import PagerView from "react-native-pager-view";
import { TabBtn } from "../../common";
import { useAppSelector } from "../../../hooks/storeHook";
import { ExerciseCart } from "../Exercise";
import { love, loveRed } from "../../../assets/icons/home";
import LottieFile from "../../../constants/loffieFile/LottieFile";

const { width, height } = Dimensions.get("window");

type Props = {
  cartWithLove: boolean;
  addDailyExercise?: string;
  data: {
    catagoryId: any;
    id: number;
    type_id: number;
    EnName: string;
    ArName: string;
    TrName: string;
    DeName: string;
    exercises: {}[];
  }[];
};

const AddExerciseTabView = ({
  cartWithLove,
  data,
  addDailyExercise,
}: Props) => {
  const ref = useRef(null);
  const { themeData } = useAppSelector((state) => state.theme);
  const { favoriteExercise } = useAppSelector((state) => state.favorite);
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

      <PagerView
        style={[styles.pager, { flex: 1 }]}
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
            data={favoriteExercise}
            exerciesIdFrom={"favorite"}
            catagoryId={data[0]?.catagoryId}
            cartWithLove={cartWithLove}
          />
        </ScrollView>

        {data?.map((item, index) => (
          <ScrollView
            key={index + 1}
            fadingEdgeLength={20} // make fade in top and botton
            scrollEnabled={true} // make scroll anable
            showsVerticalScrollIndicator={false}
          >
            <TabPage
              data={item.exercises}
              exerciesIdFrom={"exercise"}
              catagoryId={data[0].catagoryId}
              cartWithLove={cartWithLove}
            />
          </ScrollView>
        ))}
      </PagerView>
    </SafeAreaView>
  );
};

export default AddExerciseTabView;

const TabPage = ({ cartWithLove, data, catagoryId, exerciesIdFrom }) => {
  const { lang, words } = useAppSelector((state) => state.lang);
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        direction: lang === "ar" ? "rtl" : "ltr",
      }}
    >
      <View style={{ flex: 0.1, alignItems: "center" }}>
        {Array.isArray(data) && data.length !== 0 ? (
          data?.map((item, index) => (
            <ExerciseCart
              key={index}
              catagoryId={catagoryId}
              exerciseId={
                exerciesIdFrom === "exercise" ? item.id : item.exerciseId
              }
              iconLeft={exerciesIdFrom === "exercise" ? love : loveRed}
              data={item}
            />
          ))
        ) : (
          <View key={catagoryId} style={{}}>
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
