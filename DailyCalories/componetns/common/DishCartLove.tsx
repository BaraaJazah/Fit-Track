import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { memo, useCallback, useState } from 'react'
import { useAppSelector } from '../../hooks/storeHook'
import { food1, food2, salad } from '../../assets/icons/Foods'
import { dots, edit, trash, details, plusWhite, backWhite } from '../../assets/icons/home';
import Packet from './Packet';
import { ListItem } from '../screens/home';
import { router } from 'expo-router';
import { ModalFoodDetials } from '../Modals';

const { width, height } = Dimensions.get("window");


const dataOfDish = [
    { "name": "Protein", "gram": 12, "oran": 60, "color": 'secondary-meal1' },
    { "name": "Fats", "gram": 45, "oran": 20, "color": 'secondary-meal2' },
    { "name": "Carbs", "gram": 92, "oran": 50, "color": 'secondary-meal3' },
]

type Props = {
    iconLeft: any,
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
const DishCartLove = memo(({ iconLeft, data }: Props) => {
    const { themeData } = useAppSelector(state => state.theme)
    const [showList, setShowList] = useState(false)
    const [showDetials, setShowDetials] = useState(false)
    const [foodData, setFoodData] = useState(null)

    return (
        <>
            {

                data.map((item, index) => (
                    <TouchableWithoutFeedback key={index} touchSoundDisabled={true}
                        onPress={() => { setShowList(false) }}
                    >
                        <View style={{
                            marginBottom: 14, backgroundColor: themeData['background-secondary'], padding: 14,
                            borderRadius: 12, width: width * 0.85,
                        }}>
                            <View style={{ justifyContent: "space-between", flexDirection: "row", alignItems: "center", }}>
                                <View style={{ flexDirection: "row", alignItems: "center", gap: 16 }}>
                                    <Image src={item.image} resizeMode='cover' style={{ width: 50, height: 50, borderRadius: 12, }} />
                                    <View>
                                        <Text style={[styles.foodText1, { color: themeData['text-primary'], fontWeight: 500 }]}>{item.name}</Text>
                                        <Text style={[styles.foodText2, { color: themeData['text-secondary'] }]}>{item.kcal} kcal -100g</Text>
                                    </View>

                                </View>

                                <View style={{ flexDirection: "row", gap: 10 }}>
                                    <TouchableOpacity onPress={() => { }} style={{ backgroundColor: themeData['background-primary'], borderRadius: 50, padding: 8, }}>
                                        <Image style={{ width: 16, height: 16 }} source={iconLeft} />
                                    </TouchableOpacity>

                                    <TouchableOpacity onPress={() => {

                                        // router.push({ pathname: "/DishDetails", params: item }) 
                                        setShowDetials(!showDetials)
                                        if (foodData?.id !== item.id) {
                                            setFoodData(item);
                                        }


                                    }} style={{ backgroundColor: themeData['background-primary'], borderRadius: 50, padding: 8, }}>
                                        <Image style={{ width: 16, height: 16 }} source={backWhite} />
                                    </TouchableOpacity>
                                </View>

                            </View>
                            <ModalFoodDetials data={foodData} isOpen={showDetials} isOpenFunc={setShowDetials} />

                        </View >
                    </TouchableWithoutFeedback>
                ))
            }
        </>

    )
})

export default DishCartLove



const styles = StyleSheet.create({
    foodText1: {
        fontSize: 12
    },
    foodText2: {
        fontSize: 10

    },
})