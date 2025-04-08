

import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useState } from 'react'
import { useAppSelector } from '../../hooks/storeHook'
import { salad } from '../../assets/icons/Foods'
import { dots, edit, trash, details, plusWhite } from '../../assets/icons/home';
import Packet from './Packet';
import { ListItem } from '../screens/home';
import { ModalShowDetails } from '../Modals';


const { width, height } = Dimensions.get("window");

const dataOfDish = [
    { "name": "Protein", "gram": 12, "oran": 60, "color": 'secondary-meal1' },
    { "name": "Fats", "gram": 45, "oran": 20, "color": 'secondary-meal2' },
    { "name": "Carbs", "gram": 92, "oran": 50, "color": 'secondary-meal3' },

]

type Props = {
    iconOne: any
    onPressOne: () => void
    iconTwo: any
    onPressTwo: () => void
}

const DishCartMini = ({ iconOne, onPressOne, iconTwo, onPressTwo }: Props) => {
    const { themeData } = useAppSelector(state => state.theme)
    const [showList, setShowList] = useState(false)
    const [showDetials, setShowDetials] = useState(false)


    return (
        <>
            <TouchableWithoutFeedback touchSoundDisabled={true}
                onPress={() => { setShowList(false) }}
            >
                <View style={{
                    marginVertical: 6, backgroundColor: themeData['background-secondary'], padding: 14,
                    borderRadius: 12, width: width * 0.7,
                    margin: "auto"
                }}>
                    <View style={{ justifyContent: "space-between", flexDirection: "row", alignItems: "center", }}>
                        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
                            <Image source={salad} style={{ width: 30, height: 30 }} />
                            <View>
                                <Text style={[styles.foodText1, { color: themeData['text-primary'], fontWeight: 500 }]}>Salad with eggs</Text>
                                <Text style={[styles.foodText2, { color: themeData['text-secondary'] }]}>294 kcal -100g</Text>
                            </View>

                        </View>

                        <View style={{ flexDirection: "row", gap: 10 }}>
                            <TouchableOpacity onPress={onPressOne} style={{ backgroundColor: themeData['background-primary'], borderRadius: 50, padding: 8, }}>
                                <Image style={{ width: 12, height: 12 }} source={iconOne} />
                            </TouchableOpacity>

                            <TouchableOpacity onPress={onPressTwo} style={{ backgroundColor: themeData['background-primary'], borderRadius: 50, padding: 8, }}>
                                <Image style={{ width: 12, height: 12 }} source={iconTwo} />
                            </TouchableOpacity>
                        </View>
                        <ModalShowDetails isOpen={showDetials} isOpenFunc={setShowDetials} />

                    </View>

                </View >
            </TouchableWithoutFeedback >

        </>
    )
}

export default DishCartMini

const styles = StyleSheet.create({
    foodText1: {
        fontSize: 12
    },
    foodText2: {
        fontSize: 8

    },
})