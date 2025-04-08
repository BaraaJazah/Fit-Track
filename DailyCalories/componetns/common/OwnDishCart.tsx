import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useState } from 'react'
import { useAppSelector } from '../../hooks/storeHook'
import { salad } from '../../assets/icons/Foods'
import { dots, edit, trash } from '../../assets/icons/home';
import Packet from './Packet';
import { ListItem } from '../screens/home';


const { width, height } = Dimensions.get("window");


const dataOfDish = [
    { "name": "Protein", "gram": 12, "oran": 60, "color": 'secondary-meal1' },
    { "name": "Fats", "gram": 45, "oran": 20, "color": 'secondary-meal2' },
    { "name": "Carbs", "gram": 92, "oran": 50, "color": 'secondary-meal3' },
]

const OwnDishCart = ({ }) => {
    const { themeData } = useAppSelector(state => state.theme)
    const [showList, setShowList] = useState(false)

    return (
        <TouchableWithoutFeedback touchSoundDisabled={true}
            onPress={() => { setShowList(false) }}
        >
            <View style={{
                marginBottom: 14, backgroundColor: themeData['background-secondary'], padding: 14,
                borderRadius: 12, width: width * 0.85,
            }}>
                <View style={{ justifyContent: "space-between", flexDirection: "row", alignItems: "center", }}>
                    <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
                        <Image source={salad} style={{ width: 40, height: 40 }} />
                        <View>
                            <Text style={[styles.foodText1, { color: themeData['text-primary'], fontWeight: 500 }]}>Salad with eggs</Text>
                            <Text style={[styles.foodText2, { color: themeData['text-secondary'] }]}>294 kcal -100g</Text>
                        </View>

                    </View>
                    <TouchableOpacity onPress={() => { setShowList(!showList) }} style={{ borderColor: themeData['text-secondary'], borderWidth: 1.5, borderRadius: 50, padding: 4, }}>
                        <Image style={{ width: 20, height: 20 }} source={dots} />
                    </TouchableOpacity>
                    <Packet packetStyle={{
                        position: "absolute", width: width * 0.28, right: 0, top: 38,
                        zIndex: 20, padding: 0, display: showList ? "flex" : "none",
                    }}>
                        <ListItem text='Edit' onPress={() => { }} icon={edit} btnStyle={{ paddingVertical: 7 }} iconStyle={{ width: 16, height: 16 }} textStyle={{ fontSize: 10 }} />
                        <ListItem text='Delete' onPress={() => { }} icon={trash} btnStyle={{ paddingVertical: 7 }} iconStyle={{ width: 16, height: 16 }} textStyle={{ fontSize: 10 }} />
                    </Packet>
                </View>

                {/* Button part food data */}
                <View style={{ marginTop: 20, flexDirection: "row", justifyContent: "space-around" }}>

                    {dataOfDish.map((item, index) => {
                        return (
                            <View key={index} style={{ flexDirection: "row", alignItems: "center" }}>
                                <View style={{ height: 40, width: 5, backgroundColor: "#ccc", borderRadius: 20, marginHorizontal: 10, justifyContent: "flex-end" }}>
                                    <View style={{ backgroundColor: themeData[item.color], height: (item.oran * 40) / 100, borderRadius: 20, }}>
                                    </View>
                                </View>
                                <View>
                                    <Text style={{ fontSize: 10, fontWeight: 600, color: themeData['text-secondary'] }}>{item.gram}g</Text>
                                    <Text style={{ fontSize: 12, color: themeData['text-primary'] }}>{item.name}</Text>
                                </View>
                            </View>
                        )
                    })}

                </View>
            </View >
        </TouchableWithoutFeedback>
    )
}

export default OwnDishCart

const styles = StyleSheet.create({
    foodText1: {
        fontSize: 16
    },
    foodText2: {
        fontSize: 10

    },
})