import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useAppSelector } from '../../../hooks/storeHook'

type TPopts = {
    num: number
}
const Slider = ({ num }: TPopts) => {
    const { themeData } = useAppSelector(state => state.theme)
    return (
        <View style={styles.slider}>
            <View style={[styles.line1, { borderColor: num == 1 ? themeData['background-primary'] : themeData['text-secondary'] }]}></View>
            <View style={[styles.line2, { borderColor: num == 2 ? themeData['background-primary'] : themeData['text-secondary'] }]}></View>
            <View style={[styles.line3, { borderColor: num == 3 ? themeData['background-primary'] : themeData['text-secondary'] }]}></View>
        </View>
    )
}

export default Slider

const styles = StyleSheet.create({
    slider: {
        flexDirection: "row",
        justifyContent: "center",
    },
    line1: {
        width: 30,
        borderBottomWidth: 5,
        borderRadius: 20

    },
    line2: {
        width: 30,
        borderBottomWidth: 5,
        borderRadius: 20
    },
    line3: {
        width: 30,
        borderBottomWidth: 5,
        borderRadius: 20

    },

})