import { Dimensions, Image, StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { plusWhite } from '../../assets/icons/home'
import { useAppSelector } from '../../hooks/storeHook'


const { width, height } = Dimensions.get("window")

type Props = {
    color: any,
    Recomended?: number,
    type: string | "Exercise",
    onPress: () => void
    typeText?: string
}

const AddFood = ({ color, Recomended, type, onPress, typeText }: Props) => {

    const { themeData } = useAppSelector(state => state.theme)

    return (
        <View style={styles.body}>
            <View style={[styles.left, { backgroundColor: color }]}></View>

            <View style={[styles.right, { backgroundColor: themeData['background-secondary'] }]}>
                <View style={styles.rightCard}>
                    <Text style={[styles.rightCardText1, { color: color }]}>{type} </Text>
                    <Text style={[styles.rightCardText2, { color: themeData['text-secondary'] }]}>
                        {
                            type == "Exercise" ? typeText : `Recomended ${Recomended} Kcal`
                        }

                    </Text>
                </View>
                <TouchableOpacity onPress={onPress} style={[styles.iconCart, { backgroundColor: color }]}>
                    <Image style={styles.iconCartImage} source={plusWhite} />
                </TouchableOpacity>

            </View>

        </View>
    )
}

export default AddFood

const styles = StyleSheet.create({
    body: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        width: width,
    },
    left: {
        width: width * 0.03,
        height: 80,
        borderTopLeftRadius: 12,
        borderBottomLeftRadius: 12,

    },
    right: {
        borderTopRightRadius: 12,
        borderBottomRightRadius: 12,
        flexDirection: "row",
        height: 80,
        width: width * 0.82,
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 20,


    },
    rightCard: {
        gap: 2
    },
    rightCardText1: {
        fontSize: 18,
        fontWeight: 500
    },
    rightCardText2: {
        fontSize: 12,

    },

    iconCart: {
        borderRadius: 50,
        padding: 8
    },
    iconCartImage: {
        width: 18,
        height: 18
    },


})