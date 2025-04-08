import { Button, Dimensions, Image, StyleSheet, Text, Touchable, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useRouter, usePathname, useFocusEffect, useNavigation } from 'expo-router'
import { Chart1, Chart2, Header } from '../../componetns/screens/home'
import { Maskgroup } from '../../assets/images'
import { dots, restaurant, fire, calculatorColor } from '../../assets/icons/home'
import { useAppDispatch, useAppSelector } from '../../hooks/storeHook'
import { ModalCalcNeeds } from '../../componetns/Modals'
import { actDailyActions } from '../../store/goal/goalSlice'
import { calcBurnForExercise } from '../../hooks/calcBurnForExercise'
import { Background } from '../../componetns/common'

const { width, height } = Dimensions.get("window")


const index = () => {
    const router = useRouter()
    const { themeData } = useAppSelector(state => state.theme)
    const dispatch = useAppDispatch()
    const { userData } = useAppSelector(state => state.goal)
    const { userDaily } = useAppSelector(state => state.user)

    const [showCalcNeeds, setShowCalcNeeds] = useState(false)

    let total = {
        kcal: 0,
        protein: 0,
        fats: 0,
        carbs: 0,
        burn: 0
    }
    useEffect(() => {

        userDaily.breakfast.map((item) => {
            total.kcal += item.kcal * (item.quan / 100)
            total.protein += item.protein * (item.quan / 100)
            total.fats += item.fats * (item.quan / 100)
            total.carbs += item.carbs * (item.quan / 100)
        })
        userDaily.lunch.map((item) => {
            total.kcal += item.kcal * (item.quan / 100)
            total.protein += item.protein * (item.quan / 100)
            total.fats += item.fats * (item.quan / 100)
            total.carbs += item.carbs * (item.quan / 100)
        })

        userDaily.dinner.map((item) => {
            total.kcal += item.kcal * (item.quan / 100)
            total.protein += item.protein * (item.quan / 100)
            total.fats += item.fats * (item.quan / 100)
            total.carbs += item.carbs * (item.quan / 100)
        })

        userDaily.snack.map((item) => {
            total.kcal += item.kcal * (item.quan / 100)
            total.protein += item.protein * (item.quan / 100)
            total.fats += item.fats * (item.quan / 100)
            total.carbs += item.carbs * (item.quan / 100)
        })

        userDaily.exercise.map((item) => {
            // total.kcal += item.kcal * (item.quan / 100)
            total.burn += Number(calcBurnForExercise(userData.userData.weight === 0 ? 70 : userData.userData.weight, 60 * (item.quan / 60), item.met))
        })

        dispatch(actDailyActions(total))

    }, [userDaily])


    return (

        <>
            {/* <Background> */}

            <View style={[styles.body, { backgroundColor: themeData['background-secondary'] }]}>
                <View style={{ backgroundColor: themeData['background-secondary-2'], width: width, alignItems: "center", zIndex: 2 }}>
                    <Header onPress={() => { }} />
                </View>

                <View style={[styles.main, { backgroundColor: themeData['background-secondary-2'] }]}>
                    <View style={styles.topPart}>
                        <Image source={Maskgroup} style={styles.topPartImage} />
                        <View style={styles.leftPart}>
                            <Image source={restaurant} style={{ width: 24, height: 24 }} />
                            <Text style={[styles.imageText1, { color: themeData['text-primary'] }]}>{userData.kcal.toFixed(0)}</Text>
                            <Text style={[styles.imageText2, { color: themeData['text-secondary'] }]}>Kcal</Text>
                        </View>
                        <View style={styles.rightPart}>
                            <Image source={fire} style={{ width: 24, height: 24 }} />
                            <Text style={[styles.imageText1, { color: themeData['text-primary'] }]}>{userData.burn.toFixed(0)}</Text>
                            <Text style={[styles.imageText2, { color: themeData['text-secondary'] }]}>burn</Text>
                        </View>
                        <View style={styles.bottomPart}>
                            <TouchableOpacity onPress={() => { setShowCalcNeeds(true) }}>
                                <Image source={calculatorColor} style={{ width: 19, height: 25 }} />
                            </TouchableOpacity>
                            <Text style={[styles.imageText1, { color: themeData['text-primary'] }]}>{userData.kcalGoal}</Text>
                            <Text style={[styles.imageText2, { color: themeData['text-secondary'] }]}>Kcal Goal</Text>
                        </View>
                        <View style={styles.middlePart}>
                            <Chart1 userData={userData} />
                        </View>
                    </View>

                    <View style={styles.middle}>
                        <View style={styles.middleLeft}>
                            <Text style={[styles.middleText1, { color: themeData['text-primary'] }]}>Protein</Text>
                            <View style={styles.middleView}>
                                <View style={{
                                    height: 3,
                                    width: (60 / 100) * (((100 * userData.protein) / userData.proteinGoal) === 0 ? 1 :
                                        ((100 * userData.protein) / userData.proteinGoal)),
                                    maxWidth: 60,
                                    backgroundColor: themeData['secondary-meal1'],
                                    borderRadius: 10,
                                }}></View>
                            </View>
                            <Text style={styles.middleText2}>{userData.protein.toFixed(0)}/{userData.proteinGoal}g</Text>
                        </View>
                        <View style={styles.middleMiddle}>
                            <Text style={[styles.middleText1, { color: themeData['text-primary'] }]}>Fats</Text>
                            <View style={styles.middleView}>
                                <View style={{
                                    height: 3,

                                    width: (60 / 100) * (((100 * userData.fats) / userData.fatsGoal) === 0 ? 1 :
                                        ((100 * userData.fats) / userData.fatsGoal)),


                                    maxWidth: 60,
                                    backgroundColor: themeData['secondary-meal2'],
                                    borderRadius: 10,
                                }}></View>
                            </View>
                            <Text style={styles.middleText2}>{userData.fats.toFixed(0)}/{userData.fatsGoal}g</Text>
                        </View>
                        <View style={styles.middleRight}>
                            <Text style={[styles.middleText1, { color: themeData['text-primary'] }]}>Carbs</Text>
                            <View style={styles.middleView}>
                                <View style={{
                                    height: 3,

                                    width: (60 / 100) * (((100 * userData.carbs) / userData.carbsGoal) === 0 ? 1 :
                                        ((100 * userData.carbs) / userData.carbsGoal)),

                                    maxWidth: 60,
                                    backgroundColor: themeData['secondary-meal3'],
                                    borderRadius: 10,
                                }}></View>

                            </View>
                            <Text style={styles.middleText2}>{userData.carbs.toFixed(0)}/{userData.carbsGoal}g</Text>
                        </View>
                    </View>

                    <View style={{ position: "absolute", bottom: 0, height: height * 0.42, backgroundColor: themeData['background-secondary-2'] }}>
                        <Chart2 />
                    </View >

                </View>

                <ModalCalcNeeds isOpen={showCalcNeeds} setIsOpen={setShowCalcNeeds} />




            </View >
            {/* </Background> */}
        </>


    )
}

export default index

const styles = StyleSheet.create({
    body: {
        justifyContent: "center",
        alignItems: "center",
        height: height,

    },
    main: {
        width: width,
        height: height * 0.9,
    },
    // Top Part
    topPart: {
        width: width,
        top: -100,
        height: height * 0.37,

    },
    topPartImage: {
        width: width,
        position: "absolute",
        height: 420

    },
    leftPart: {
        width: 100,
        height: 100,
        top: 140,
        justifyContent: "center",
        alignItems: "center",
        gap: 4


    },
    rightPart: {
        width: 100,
        height: 100,
        position: "absolute",
        right: 0,
        top: 140,
        justifyContent: "center",
        alignItems: "center",
        gap: 4

    },
    middlePart: {
        width: 100,
        height: 100,
        position: "absolute",
        left: 150,
        top: 110,
    },
    bottomPart: {
        width: 100,
        height: 100,
        position: "absolute",
        left: (width / 2) - 50,
        top: 290,
        justifyContent: "center",
        alignItems: "center",
        gap: 4
    },
    imageText1: {
        fontSize: 20,
        fontWeight: 600,
    },
    imageText2: {
        fontSize: 12,

    },

    // middle Part
    middle: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        height: height * 0.1,

    },
    middleLeft: {
        alignItems: "center",
    },
    middleText1: {
        fontSize: 16,
        fontWeight: 600
    },
    middleView: {
        height: 3,
        width: 60,
        marginVertical: 10,
        backgroundColor: "#E9E9E9",
        borderRadius: 10,

    },
    middleText2: {
        fontSize: 12,
        color: "#878488",
        fontWeight: 500


    },


    middleMiddle: {
        alignItems: "center",

    },
    middleRight: {
        alignItems: "center",

    },



})