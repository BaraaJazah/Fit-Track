import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { LineChart } from "react-native-gifted-charts"
import { useAppSelector } from '../../../hooks/storeHook'


const { width, height } = Dimensions.get("window")

const Chart2 = () => {
    const { themeData } = useAppSelector(state => state.theme)

    // حالة لحفظ النقطة المحددة
    const ptData = [
        {
            value: 1300,
            protein: 78,
            fats: 45,
            carbs: 95,

            date: '20 Apr 2022',
            label: '20 Apr',
            labelTextStyle: { color: 'lightgray', width: 100, },
        },

        {
            value: 1400,
            protein: 68,
            fats: 41,
            carbs: 75,

            date: '21 Apr 2022',
            label: '21 Apr',
            labelTextStyle: { color: 'lightgray', width: 100 },
        },
        {
            value: 1200,
            date: '22 Apr 2022',
            label: '22 Apr',
            labelTextStyle: { color: 'lightgray', width: 100 },
        },
        {
            value: 1400,
            date: '24 Apr 2022',
            label: '23 Apr',
            labelTextStyle: { color: 'lightgray', width: 100 },
        },
        {
            value: 1800,
            date: '24 Apr 2022',
            label: '24 Apr',
            labelTextStyle: { color: 'lightgray', width: 100 },
        },
        {
            value: 1600,
            date: '24 Apr 2022',
            label: '25 Apr',
            labelTextStyle: { color: 'lightgray', width: 100 },
        },
        {
            value: 2000,
            date: '24 Apr 2022',
            label: '26 Apr',
            labelTextStyle: { color: 'lightgray', width: 100 },
        },
        {
            value: 2400,
            date: '24 Apr 2022',
            label: '27 Apr',
            labelTextStyle: { color: 'lightgray', width: 100 },
        },
        {
            value: 1800,
            date: '24 Apr 2022',
            label: '28 Apr',
            labelTextStyle: { color: 'lightgray', width: 100 },
        },

    ];


    return (
        <View
            style={{
                paddingTop: 30,
                paddingVertical: 60,
                paddingLeft: 10,
                backgroundColor: themeData['background-secondary-2'],
                height: height * 0.1,
                width: width * 1,
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,

            }}>
            <LineChart
                areaChart
                data={ptData}
                // rotateLabel
                width={width - 22}
                hideDataPoints
                spacing={width / 6}
                color="rgb(119, 212, 212)"
                thickness={2}
                startFillColor="rgba(119, 212, 212,0.2)"
                endFillColor="rgba(119, 212, 212,0.01)"
                startOpacity={0.6}
                endOpacity={0.2}
                initialSpacing={120}
                noOfSections={5}
                maxValue={3000}
                yAxisColor="white"
                yAxisThickness={0}
                rulesType="solid"
                rulesColor={themeData['text-secondary']}
                yAxisTextStyle={{ color: themeData['text-secondary'] }}

                xAxisColor="lightgray"
                pointerConfig={{
                    pointerStripHeight: 160,
                    pointerStripColor: 'lightgray',
                    pointerStripWidth: 2,
                    pointerColor: 'lightgray',
                    radius: 6,
                    pointerLabelWidth: 100,
                    pointerLabelHeight: 90,
                    activatePointersOnLongPress: true,
                    autoAdjustPointerLabelPosition: false,
                    pointerLabelComponent: items => {
                        return (
                            <View
                                style={{
                                    height: 90,
                                    width: 120,
                                    justifyContent: 'space-evenly',
                                    marginTop: -0,
                                    marginLeft: -100,
                                    backgroundColor: "#9ee0e0",
                                    borderRadius: 12,
                                    paddingRight: 20
                                }}>

                                <View style={styles.middleMiddle}>
                                    <Text style={styles.middleText1}>Kcal</Text>
                                    <Text style={styles.middleText2}> {items[0].value}</Text>
                                </View>
                                <View style={styles.middleMiddle}>
                                    <Text style={styles.middleText1}>Protein</Text>
                                    <Text style={styles.middleText2}>{items[0].protein}g</Text>
                                </View>
                                <View style={styles.middleMiddle}>
                                    <Text style={styles.middleText1}>Fats</Text>
                                    <Text style={styles.middleText2}>{items[0].fats}g</Text>
                                </View>
                                <View style={styles.middleMiddle}>
                                    <Text style={styles.middleText1}>Carbs</Text>
                                    <Text style={styles.middleText2}>{items[0].carbs}g</Text>
                                </View>
                            </View>
                            // </View>
                        );
                    },
                }}
            />
        </View>
    );
}

export default Chart2

const styles = StyleSheet.create({
    middleMiddle: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingLeft: 10
    },
    middleText1: {
        fontSize: 12,
        color: "#fff"
    },
    middleText2: {
        fontSize: 10,
        color: "#fff"


    },

})