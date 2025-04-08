import { Alert, BackHandler, Dimensions, Image, ScrollView, StyleSheet, Text, Button, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { CycleDisplayData, HeaderPages } from '../../screens/home'
import { useRouter } from 'expo-router'
import { useAppDispatch, useAppSelector } from '../../../hooks/storeHook'
import { Packet } from '../../common'
import { image, details, trash, trashWight, dropDown } from '../../../assets/icons/home'
import { salad } from '../../../assets/icons/Foods'
import { ModalAddFood, ModalAddFoodToMeal, ModalAddImage, ModalSelectExercise, ModalSelectGram, ModalShowDetails } from '..'
import { deleteFood } from '../../../store/user/userSlice'
import Modal from 'react-native-modal';
import { calcBurnForExercise } from '../../../hooks/calcBurnForExercise'





const { width, height } = Dimensions.get("window")

type Props = {
    isOpen: boolean,
    setIsOpen: (boolean) => void,
    name: "breakfast" | "lunch" | "dinner" | "snack" | "exercise"
}
const numbers = Array.from({ length: 24 }, (_, i) => i.toString()); // 0 - 23

const ModalAddMeal = ({ isOpen = false, setIsOpen, name }: Props) => {

    const dispatch = useAppDispatch()
    const { themeData } = useAppSelector(state => state.theme)
    const { userDaily } = useAppSelector(state => state.user)
    const { userData } = useAppSelector(state => state.goal)


    const [addFoodVisible, setAddFoodVisible] = useState(false);
    const [detailsVisible, setdetailsVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [delyaModal, setDelyaModal] = useState(false);

    const [foodsData1, setfoodsData1] = useState([]);
    const [exerciseData, setExerciseData] = useState([]);

    const [foodDetails, setFoodDetails] = useState({});

    const foodName = name
    let foodData = []
    let exerciseDatas = []


    useEffect(() => {

        setIsLoading(false)
        if (name === "breakfast") {
            foodData = userDaily?.breakfast

        } else if (name === "dinner") {
            foodData = userDaily?.dinner
        }
        else if (name === "lunch") {
            foodData = userDaily?.lunch
        }
        else if (name === "snack") {
            foodData = userDaily?.snack
        }
        else if (name === "exercise") {

            exerciseDatas = userDaily?.exercise
            setExerciseData(exerciseDatas)
        }

        setfoodsData1(foodData)
        setIsLoading(true)
    }, [userDaily, name])


    const addFoodHandler = (item) => {
        const data = {
            meal: name,
            mealData: item
        }

        dispatch(deleteFood(data))
    }

    let totalBurn = 0;
    const total = {
        kcal: 0,
        protein: 0,
        fats: 0,
        carbs: 0
    }
    if (foodsData1.length > 0) {

        foodsData1.map((item) => {
            total.kcal += item.kcal * (item.quan / 100)
            total.protein += item.protein * (item.quan / 100)
            total.fats += item.fats * (item.quan / 100)
            total.carbs += item.carbs * (item.quan / 100)
        })
    }

    if (exerciseData && exerciseData.length > 0) {
        exerciseData.map((item) => {
            totalBurn += Number(calcBurnForExercise(userData.userData.weight === 0 ? 70 : userData.userData.weight, item.quan, item.met))
        })
    }



    const [showGramSelect, setShowGramSelect] = useState(false);
    const [dataForGramSelect, setDataForGramSelect] = useState({
        id: 0,
        value: 0
    });


    return (
        <Modal
            isVisible={isOpen}
            onBackButtonPress={() => setIsOpen(false)}
            onBackdropPress={() => setIsOpen(false)}
            animationIn="fadeIn"
            animationOut="fadeOut"
            style={{ margin: 0 }
            }
        >


            <View style={[styles.body, { backgroundColor: themeData['background-secondary-2'] }]}>
                <View style={{ height: height * 0.25 }}>
                    <HeaderPages right={true} onPressRight={() => { setDelyaModal(true); setAddFoodVisible(true) }} onpress={() => { setIsOpen(false) }} header={`Add  ${foodName}`} title={`Add Your ${foodName}`} text='Embark on a journey of mindfulness with our Mindful Moments Meditation.' />
                </View>

                <Packet packetStyle={[styles.packet, { borderColor: themeData['background-secondary'] }]}>
                    <View style={styles.middlePartHead}>

                    </View>
                    <ScrollView
                        contentContainerStyle={styles.middlePartHeadBody} // when use it the scroll will don't move
                        fadingEdgeLength={10}	// make fade in top and botton
                        scrollEnabled={true}	// make scroll anable
                        showsVerticalScrollIndicator={false}
                    >
                        {

                            isLoading && name !== "exercise" && foodsData1.map((item, index) => {


                                return (
                                    <View key={index} style={[styles.cart, { backgroundColor: themeData['background-secondary'], justifyContent: "center" }]}>
                                        <View style={styles.cartTop}>
                                            <View style={{ flexDirection: 'row', alignItems: "center", gap: 14 }} >
                                                {/* <Image src={item.image} style={{ width: 40, height: 30 }} /> */}
                                                <Image src={item.image} resizeMode='cover' style={{ width: 50, height: 50, borderRadius: 12, }} />

                                                <View>
                                                    <Text style={{ fontSize: 14, fontWeight: 500, color: themeData['text-primary'] }}>{item?.food_name}</Text>
                                                    <Text style={{ fontSize: 10, color: themeData['text-secondary'] }}>{item.kcal} kcal -100g</Text>
                                                </View>
                                            </View>

                                            <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
                                                <TouchableOpacity onPress={() => { setFoodDetails(item); setdetailsVisible(true) }} style={[styles.cartRightIconView, { backgroundColor: themeData['background-primary'] }]}>
                                                    <Image style={styles.cartRightIcon} source={details} />
                                                </TouchableOpacity>
                                                <TouchableOpacity onPress={() => { addFoodHandler(item) }} style={[styles.cartRightIconView, { backgroundColor: themeData['secondary-meal2'] }]}>
                                                    <Image style={styles.cartRightIcon} source={trashWight} />
                                                </TouchableOpacity>
                                            </View>

                                        </View>

                                        <View style={[styles.cartBotton, {}]}>
                                            <Text style={{ color: themeData['text-secondary'], marginLeft: 60, }}> {(item.kcal * (item.quan / 100)).toFixed(0)} Kcal</Text>

                                            <TouchableOpacity onPress={() => {
                                                setDataForGramSelect({
                                                    id: item.id,
                                                    value: item.quan
                                                }); setShowGramSelect(true)
                                            }}>
                                                <View style={{
                                                    backgroundColor: themeData['background-secondary-2'],
                                                    borderColor: themeData['background-secondary'],
                                                    borderWidth: 1,
                                                    borderRadius: 12,
                                                    width: width * 0.18,
                                                    flexDirection: "row",
                                                    alignItems: "center",
                                                    justifyContent: "space-evenly",
                                                }}>

                                                    <Text
                                                        style={[styles.kcalInput, { color: themeData['text-secondary'], padding: 8 }]}
                                                    >
                                                        {item.quan} g
                                                    </Text>
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                        <ModalShowDetails data={foodDetails} isOpen={detailsVisible} isOpenFunc={() => { setdetailsVisible(false) }} />
                                        <ModalSelectGram isOpen={showGramSelect} setIsOpen={setShowGramSelect}
                                            foodData={dataForGramSelect} name={name}
                                            type={"g"}
                                            maxValue={100}
                                        />
                                    </View>
                                )
                            })



                        }

                        {
                            isLoading && name === "exercise" && exerciseData.map((item, index) => {

                                const burn = calcBurnForExercise(userData.userData.weight === 0 ? 70 : userData.userData.weight, 60, item.met)
                                return <>

                                    <View key={index} style={[styles.cart, { backgroundColor: themeData['background-secondary'], justifyContent: "center" }]}>
                                        <View style={styles.cartTop}>
                                            <View style={{ flexDirection: 'row', alignItems: "center", gap: 14 }} >
                                                {/* <Image src={item.image} style={{ width: 40, height: 30 }} /> */}
                                                <Image src={item.image} resizeMode='cover' style={{ width: 50, height: 50, borderRadius: 12, }} />
                                                <View>
                                                    <Text style={{ fontSize: 14, fontWeight: 500, color: themeData['text-primary'] }}>{item?.name}</Text>
                                                    <Text style={{ fontSize: 10, color: themeData['text-secondary'] }}>{burn} kcal - Hour</Text>
                                                </View>
                                            </View>

                                            <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
                                                <TouchableOpacity onPress={() => { setFoodDetails(item); setdetailsVisible(true) }} style={[styles.cartRightIconView, { backgroundColor: themeData['background-primary'] }]}>
                                                    <Image style={styles.cartRightIcon} source={details} />
                                                </TouchableOpacity>
                                                <TouchableOpacity onPress={() => { addFoodHandler(item) }} style={[styles.cartRightIconView, { backgroundColor: themeData['secondary-meal2'] }]}>
                                                    <Image style={styles.cartRightIcon} source={trashWight} />
                                                </TouchableOpacity>
                                            </View>
                                        </View>

                                        <View style={[styles.cartBotton, {}]}>
                                            <Text style={{ color: themeData['text-secondary'], marginLeft: 60, }}> {(burn * (item.quan / 60)).toFixed(0)} Kcal</Text>


                                            <TouchableOpacity onPress={() => {
                                                setDataForGramSelect({
                                                    id: item.id,
                                                    value: item.quan
                                                }); setShowGramSelect(true)
                                            }}>
                                                <View style={{
                                                    backgroundColor: themeData['background-secondary-2'],
                                                    borderColor: themeData['background-secondary'],
                                                    borderWidth: 1,
                                                    borderRadius: 12,
                                                    width: width * 0.18,
                                                    flexDirection: "row",
                                                    alignItems: "center",
                                                    justifyContent: "space-evenly",
                                                }}>
                                                    <Text
                                                        style={[styles.kcalInput, { color: themeData['text-secondary'], padding: 8 }]}
                                                    >
                                                        {item.quan} minute
                                                    </Text>
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                        <ModalShowDetails data={foodDetails} isOpen={detailsVisible} isOpenFunc={() => { setdetailsVisible(false) }} />
                                        <ModalSelectGram isOpen={showGramSelect} setIsOpen={setShowGramSelect}
                                            foodData={dataForGramSelect} name={name}
                                            type={"minute"}
                                            maxValue={30}
                                        />

                                    </View>

                                </>
                            })
                        }

                    </ScrollView>
                </Packet>

                <Packet packetStyle={[styles.packet2, { borderColor: themeData['background-secondary'] }]}>
                    <View style={{
                        marginBottom: 10,
                        flexDirection: "row",
                        justifyContent: "space-around",
                        flexWrap: "wrap",
                        rowGap: 30,
                        paddingTop: 15,
                    }}>
                        {
                            name === "exercise" ?

                                <View style={styles.packetTowpart}>
                                    <View style={{ width: width * 0.06, alignItems: "center", }}>
                                        <View style={[styles.packetTowpartView1, { borderColor: themeData['secondary-meal2'] }]}></View>
                                    </View>
                                    <View style={{ width: width * 0.15, alignItems: "center", position: "absolute", }}>
                                        <Text style={{ color: themeData['text-primary'], fontSize: 12, fontWeight: 500 }}>Burn </Text>
                                        <Text style={{ color: themeData['text-secondary'], fontSize: 10, textAlign: "center" }}>{totalBurn} Kcal</Text>
                                    </View>
                                </View>
                                :
                                <>
                                    <CycleDisplayData color={themeData['background-primary']} text1={`${total.kcal.toFixed(0)}g`} text2={'Kcal'} />
                                    <CycleDisplayData color={themeData['secondary-meal1']} text1={`${total.protein.toFixed(0)}g`} text2={'Protein'} />
                                    <CycleDisplayData color={themeData['secondary-meal2']} text1={`${total.fats.toFixed(0)}g`} text2={'Fats'} />
                                    <CycleDisplayData color={themeData['secondary-meal3']} text1={`${total.carbs.toFixed(0)}g`} text2={'Carbs'} />
                                </>
                        }

                    </View>

                </Packet>
                {
                    delyaModal && foodName !== "exercise" ?
                        <ModalAddFoodToMeal name={foodName} isOpen={addFoodVisible} isOpenFunc={() => { setDelyaModal(false); setAddFoodVisible(false) }} />
                        : ""
                }
                {
                    delyaModal && foodName === "exercise" ?
                        <ModalSelectExercise name={foodName} isOpen={addFoodVisible} isOpenFunc={() => { setDelyaModal(false); setAddFoodVisible(false) }} />
                        : ""
                }

            </View>

        </Modal >
    )
}

export default ModalAddMeal

const styles = StyleSheet.create({
    body: {
        flex: 1,
        height: height,
        width: width,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "space-between",
    },
    packet: {
        borderWidth: 4,
        marginBottom: 10,
        height: height * 0.5,
        paddingBottom: 6
    },

    packet2: {
        borderWidth: 4,
        marginBottom: 10,
        height: height * 0.23,
        justifyContent: "center",
    },

    inputBox: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginVertical: 5
    },
    middlePartHeadBody: {
        gap: 10
    },
    middlePartHead: {
        flexDirection: "row",
        marginVertical: 12,
        justifyContent: "center",
        alignItems: "center",
        gap: 20,

    },
    middlePartIcon: {
        height: 40,
        width: 40,
    },
    input: {
        borderWidth: 1,
        borderRadius: 12,
        width: width * 0.7,
        padding: 16,

    },
    cart: {
        borderRadius: 12,
        paddingVertical: 12,
        paddingHorizontal: 20,
    },
    cartTop: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    cartBotton: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 10,
        alignItems: "center"
    },

    cartRightIcon: {
        width: 16,
        height: 16,
    },

    cartRightIconView: {
        padding: 8,
        borderRadius: 50,
        alignItems: "center",
        justifyContent: "center"
    },
    kcalInput: {
        fontSize: 10,
    },
    saveBtn: {
        width: width * 0.66,
        borderRadius: 12,
        paddingVertical: 10,
        alignItems: "center",
        justifyContent: "center",
        height: 50,
        zIndex: 2
    },

    // for kcal exercise

    packetTowpart: {
        width: width * 0.4,
        alignItems: "center",
        justifyContent: "center",
        gap: 10
    },

    packetTowpartView1: {
        width: width * 0.2,
        height: width * 0.2,
        borderRadius: 50,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 5,

    },

})