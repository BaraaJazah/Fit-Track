import { ActivityIndicator, Dimensions, Image, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../hooks/storeHook'
import { salad } from '../../../assets/icons/Foods'
import { dots, edit, trash, details, plusWhite, backWhite, love } from '../../../assets/icons/home';
import { Packet } from '../../common';
import { ListItem } from '../../screens/home';
import { addFood, resetFood } from '../../../store/user/userSlice';
import { calcBurnForExercise } from '../../../hooks/calcBurnForExercise';
import { ModalExersiceDetails } from '../../Modals';

const { width, height } = Dimensions.get("window");

type Props = {
    name: string,
    data: {
        id: number,
        name: string,
        image: string,
        met: number,
    }[],
}

const ExerciseSelcetCart = ({ data, weight }) => {
    const dispatch = useAppDispatch()
    const { themeData } = useAppSelector(state => state.theme)
    const { userData } = useAppSelector(state => state.goal)
    const [showDetials, setShowDetials] = useState(false)
    const [exerciseData, setExerciseData] = useState(null)

    const addFoodHandler = (item) => {
        const data = {
            meal: "exercise",
            mealData: item
        }
        dispatch(addFood(data))
    }

    return (
        <>
            <TouchableWithoutFeedback touchSoundDisabled={true}
                onPress={() => { }}
            >
                <View style={{
                    marginBottom: 14, backgroundColor: themeData['background-secondary'], padding: 14,
                    borderRadius: 12, width: width * 0.85,
                }}>
                    <View style={{ justifyContent: "space-between", flexDirection: "row", alignItems: "center", }}>
                        <View style={{ flexDirection: "row", alignItems: "center", gap: 10, flex: 0.6 }}>
                            <Image src={data?.image} resizeMode='cover' style={{ width: 50, height: 50, borderRadius: 12, }} />
                            <View>
                                <Text style={[styles.foodText1, { color: themeData['text-primary'], fontWeight: 500, }]}>{data?.name}</Text>
                                <Text style={[styles.foodText2, { color: themeData['text-secondary'] }]}>Burn {calcBurnForExercise(weight, 60, data.met)}  kcal in Hour</Text>
                            </View>
                        </View>

                        <View style={{ flexDirection: "row", gap: 8, flex: 0.2, justifyContent: "center" }}>
                            <TouchableOpacity onPress={() => {
                                setShowDetials(true)

                                // if (foodData?.id !== item.id) {
                                // setExerciseData(item.name);
                                // }

                            }} style={{ backgroundColor: themeData['background-primary'], borderRadius: 50, width: 32, height: 32, alignItems: "center", justifyContent: "center" }}>
                                <Image style={{ width: 16, height: 16 }} source={details} />
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => {

                                addFoodHandler(data)

                            }} style={{ backgroundColor: themeData['background-primary'], borderRadius: 50, width: 32, height: 32, alignItems: "center", justifyContent: "center" }}>

                                <Image style={{ width: 18, height: 18 }} source={plusWhite} />
                            </TouchableOpacity>
                        </View>

                    </View>

                    <ModalExersiceDetails isOpen={showDetials} isOpenFunc={setShowDetials} data={data} />
                </View >
            </TouchableWithoutFeedback>
        </>

    )
}

export default ExerciseSelcetCart

const styles = StyleSheet.create({
    foodText1: {
        fontSize: 14
    },
    foodText2: {
        fontSize: 10

    },
})