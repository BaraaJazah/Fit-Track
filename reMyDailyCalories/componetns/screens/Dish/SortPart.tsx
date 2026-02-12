import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState } from "react";
import { dropDown, plus, plusWhite } from "../../../assets/icons/home";
import { change } from "../../../assets/icons";
import { useAppDispatch, useAppSelector } from "../../../hooks/storeHook";
import ModalSelectItemsNoIcon from "../../Modals/Common/ModalSelectItemsNoIcon";
import { actSortFood } from "../../../store/food/foodSlice";
import { ModalLoading, ModalLoadingUsageAllPage } from "../../feedback";
const { width, height } = Dimensions.get("window");

const SortPart = () => {
  const { themeData } = useAppSelector((state) => state.theme);
  const { lang, words } = useAppSelector((state) => state.lang);
  const dispatch = useAppDispatch();
  const [reSort, setReSort] = useState(false);

  const sortData = [
    { text: words.kcal },
    { text: words.protein },
    { text: words.carbs },
    { text: words.fats },
  ];

  const [dishIndex, setDishIndex] = useState(0);
  const [dishSort, setDishSort] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  const setDataForDish = (index) => {
    setReSort(true);
    setIsOpen(false);
    setDishIndex(index);
    let sortBy = "kcal";
    if (index === 0) {
      sortBy = "kcal";
    } else if (index === 1) {
      sortBy = "protein";
    } else if (index === 2) {
      sortBy = "carbs";
    } else if (index === 3) {
      sortBy = "fats";
    }

    setReSort(true);
    const timerId = setTimeout(() => {
      dispatch(actSortFood({ key: sortBy, order: dishSort ? "asc" : "desc" }));
      setDishSort(!dishSort);
      setReSort(false);
    }, 1000);
    return () => clearTimeout(timerId);

    // setReSort(false);
  };

  const sortDataAsAsc = () => {
    let sortBy = "kcal";
    if (dishIndex === 0) {
      sortBy = "kcal";
    } else if (dishIndex === 1) {
      sortBy = "protein";
    } else if (dishIndex === 2) {
      sortBy = "carbs";
    } else if (dishIndex === 3) {
      sortBy = "fats";
    }
    dispatch(actSortFood({ key: sortBy, order: dishSort ? "asc" : "desc" }));
    setDishSort(!dishSort);
  };

  return (
    <View
      style={{
        width: width * 0.85,
        justifyContent: "space-between",
        flexDirection: "row-reverse",
        marginVertical: 10,
      }}
    >
      {/* sort part */}

      <View style={{ flexDirection: "row" }}>
        {/* sort button */}

        <Pressable
          onPress={() => {
            setReSort(true);
            const timerId = setTimeout(() => {
              sortDataAsAsc();
              setReSort(false);
            }, 1000);
            return () => clearTimeout(timerId);
          }}
          style={[
            styles.sortIcons,
            {
              backgroundColor: themeData["background-secondary"],
            },
          ]}
        >
          <Image style={{ width: 20, height: 20 }} source={change} />
        </Pressable>

        {/* sort select */}
        <Pressable
          onPress={() => {
            setIsOpen(!isOpen);
          }}
          style={{
            width: width * 0.25,
            backgroundColor: themeData["background-secondary"],
            justifyContent: "space-around",
            alignItems: "center",
            borderRadius: 6,
            marginHorizontal: 5,
            flexDirection: "row",
          }}
        >
          <Text style={{ color: themeData["text-secondary"], fontSize: 10 }}>
            {sortData[dishIndex].text}
          </Text>
          <Image style={{ width: 10, height: 10 }} source={dropDown} />
        </Pressable>
      </View>

      {isOpen && (
        <ModalSelectItemsNoIcon
          dataArray={sortData}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          defualtIndex={dishIndex}
          setIndex={setDataForDish}
        />
      )}
      {reSort && (
        <ModalLoadingUsageAllPage isOpen={reSort} text={"Loading ... "} />
      )}
    </View>
  );
};

export default SortPart;

const styles = StyleSheet.create({
  sortIcons: {
    padding: 8,
    borderRadius: 6,
  },
});
