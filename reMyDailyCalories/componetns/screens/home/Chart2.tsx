import { Dimensions, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useMemo } from "react";
import { LineChart } from "react-native-gifted-charts";
import { useAppSelector } from "../../../hooks/storeHook";

const { width, height } = Dimensions.get("window");

const Chart2 = () => {
  const { themeData } = useAppSelector((state) => state.theme);
  const { calender } = useAppSelector((state) => state.calender);
  useEffect(() => {}, [calender]);
  // تحسين: استخدام useMemo لحساب البيانات فقط عند تغيير calender
  const ptData = useMemo(() => {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    return calender.slice(calender.length > 30 ? -30 : 0).map((item) => ({
      value: Math.max(0, item.kcal - item.burn), // تأكد من أن القيمة لا تكون سالبة
      date: item.day,
      label: `${new Date(item.day).getDate()} ${
        months[new Date(item.day).getMonth()]
      }`,
      protein: item.protein,
      fats: item.fats,
      carbs: item.carbs,
      labelTextStyle: {
        color: themeData["text-secondary"],
        width: 60,
        fontSize: 10,
      },
      customDataPoint: () => (
        <View
          style={{
            width: 12,
            height: 12,
            backgroundColor: themeData["background-primary"],
            borderRadius: 6,
            borderWidth: 2,
            borderColor: "#fff",
          }}
        />
      ),
    }));
  }, [calender, themeData]);

  // تحسين: حساب القيم القصوى ديناميكياً
  const maxValue = useMemo(() => {
    const values = ptData.map((item) => item.value);
    return Math.max(...values, 3000) * 1.1; // إضافة هامش 10%
  }, [ptData]);

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: themeData["background-secondary-2"] },
      ]}
    >
      <LineChart
        areaChart
        data={ptData}
        width={width * 0.85}
        height={height * 0.24}
        curved
        isAnimated
        animateOnDataChange
        animationDuration={1200}
        hideDataPoints={false}
        // spacing={width / ptData.length}
        spacing={Math.min(60, Math.max(50, width / (ptData.length + 1)))}
        color={themeData["background-primary"]}
        thickness={3}
        startFillColor={`${themeData["background-primary"]}20`}
        endFillColor={`${themeData["background-primary"]}02`}
        startOpacity={0.6}
        endOpacity={0.1}
        initialSpacing={20}
        noOfSections={5}
        maxValue={maxValue}
        yAxisColor="transparent"
        yAxisThickness={0}
        rulesType="dashed"
        rulesColor={`${themeData["text-secondary"]}30`}
        yAxisTextStyle={{
          color: themeData["text-secondary"],
          fontSize: 10,
        }}
        xAxisColor={`${themeData["text-secondary"]}30`}
        xAxisLabelTextStyle={{
          color: themeData["text-secondary"],
          fontSize: 10,
          marginTop: 8,
        }}
        pointerConfig={{
          pointerStripHeight: height * 0.25,
          pointerStripColor: `${themeData["text-secondary"]}50`,
          pointerStripWidth: 1.5,
          pointerColor: themeData["background-primary"],
          radius: 6,
          pointerLabelWidth: 130,
          pointerLabelHeight: 110,
          activatePointersOnLongPress: true,
          autoAdjustPointerLabelPosition: true,
          pointerLabelComponent: (items) => (
            <View
              style={[
                styles.tooltip,
                {
                  backgroundColor: themeData["background-primary"],
                  shadowColor: themeData["text-primary"],
                },
              ]}
            >
              <Text style={[styles.tooltipDate, { color: "#fff" }]}>
                {items[0].date}
              </Text>

              <View style={styles.tooltipRow}>
                <Text style={styles.tooltipLabel}>Net Kcal:</Text>
                <Text style={styles.tooltipValue}>{items[0].value}</Text>
              </View>

              <View style={styles.tooltipRow}>
                <Text style={styles.tooltipLabel}>Protein:</Text>
                <Text style={styles.tooltipValue}>{items[0].protein}g</Text>
              </View>

              <View style={styles.tooltipRow}>
                <Text style={styles.tooltipLabel}>Fats:</Text>
                <Text style={styles.tooltipValue}>{items[0].fats}g</Text>
              </View>

              <View style={styles.tooltipRow}>
                <Text style={styles.tooltipLabel}>Carbs:</Text>
                <Text style={styles.tooltipValue}>{items[0].carbs}g</Text>
              </View>
            </View>
          ),
        }}
      />
    </View>
  );
};

export default Chart2;

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    paddingBottom: 40,
    paddingHorizontal: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: 20,
  },
  tooltip: {
    padding: 12,
    borderRadius: 10,
    width: 130,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  tooltipDate: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "center",
  },
  tooltipRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  tooltipLabel: {
    fontSize: 12,
    color: "#fff",
    opacity: 0.8,
  },
  tooltipValue: {
    fontSize: 12,
    color: "#fff",
    fontWeight: "600",
  },
});
