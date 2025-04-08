import { ActivityIndicator, Dimensions, Image, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/storeHook'
import { salad } from '../../assets/icons/Foods'
import { dots, edit, trash, details, plusWhite } from '../../assets/icons/home';
import Packet from './Packet';
import { ListItem } from '../screens/home';
import { ModalShowDetails } from '../Modals';
import { addFood, resetFood } from '../../store/user/userSlice';
import { actAddKcal } from '../../store/goal/goalSlice';

const { width, height } = Dimensions.get("window");


const dataOfDish = [
    { "name": "Protein", "gram": 12, "oran": 60, "color": 'secondary-meal1' },
    { "name": "Fats", "gram": 45, "oran": 20, "color": 'secondary-meal2' },
    { "name": "Carbs", "gram": 92, "oran": 50, "color": 'secondary-meal3' },

]


type Props = {
    name: string,
    data: {
        id: number,
        catagory_id: number,
        name: string,
        image: string,
        kcal: number,
        protein: number,
        carbs: number,
        fats: number,
        weight: number,
        weightType: string,
    }[],
}

const DishCart = ({ data, name }: Props) => {
    const dispatch = useAppDispatch()
    const { themeData } = useAppSelector(state => state.theme)
    const [showDetials, setShowDetials] = useState(false)
    const [isLoading, setIsLoading] = useState(false)


    const [foodData, setFoodData] = useState(null)
    const [foodDataToAdd, setFoodDataToAdd] = useState(null)

    const addFoodHandler = (item) => {
        const data = {
            meal: name,
            mealData: item
        }
        dispatch(addFood(data))
    }

    return (
        <>
            {
                data.map((item, index) => (
                    <TouchableWithoutFeedback touchSoundDisabled={true}
                        onPress={() => { }}
                    >
                        <View style={{
                            marginBottom: 14, backgroundColor: themeData['background-secondary'], padding: 14,
                            borderRadius: 12, width: width * 0.85,
                        }}>
                            <View style={{ justifyContent: "space-between", flexDirection: "row", alignItems: "center", }}>
                                <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
                                    <Image src={item.image} resizeMode='cover' style={{ width: 50, height: 50, borderRadius: 12, }} />
                                    <View>
                                        <Text style={[styles.foodText1, { color: themeData['text-primary'], fontWeight: 500 }]}>{item?.name}</Text>
                                        <Text style={[styles.foodText2, { color: themeData['text-secondary'] }]}>{item?.kcal} kcal -100g</Text>
                                    </View>
                                </View>

                                <View style={{ flexDirection: "row", gap: 10 }}>
                                    <TouchableOpacity onPress={() => {
                                        setShowDetials(true)
                                        if (foodData?.id !== item.id) {
                                            setFoodData(item.name);
                                        }

                                    }} style={{ backgroundColor: themeData['background-primary'], borderRadius: 50, width: 32, height: 32, alignItems: "center", justifyContent: "center" }}>
                                        <Image style={{ width: 16, height: 16 }} source={details} />
                                    </TouchableOpacity>

                                    <TouchableOpacity onPress={() => {

                                        addFoodHandler(item)

                                    }} style={{ backgroundColor: themeData['background-primary'], borderRadius: 50, width: 32, height: 32, alignItems: "center", justifyContent: "center" }}>

                                        <Image style={{ width: 18, height: 18 }} source={plusWhite} />
                                    </TouchableOpacity>
                                </View>

                            </View>

                            <ModalShowDetails isOpen={showDetials} isOpenFunc={setShowDetials} data={foodData} />
                        </View >
                    </TouchableWithoutFeedback>
                ))}
        </>

    )
}

export default DishCart

const styles = StyleSheet.create({
    foodText1: {
        fontSize: 14
    },
    foodText2: {
        fontSize: 10

    },
})