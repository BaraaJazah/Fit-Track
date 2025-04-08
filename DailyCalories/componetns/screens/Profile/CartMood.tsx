import { Image, StyleSheet, Text, TouchableOpacity, View, Switch } from 'react-native'
import React, { useState } from 'react'
import { moon, sun } from '../../../assets/icons/add'
import { backWhite, dropDown } from '../../../assets/icons/home'
import { back } from '../../../assets/icons'
import { useAppSelector } from '../../../hooks/storeHook'

const CartMood = ({ darkMood, setDarkMood }) => {

    const { themeData, themeName } = useAppSelector(state => state.theme)


    return (
        <View style={[styles.cart, {
            backgroundColor: themeData['background-secondary-2'], borderColor: themeData['background-secondary'],
            padding: 6, paddingHorizontal: 15, borderRadius: 14
        }]}>
            <View style={styles.cartLeft}>
                <Image source={themeName == "dark" ? sun : moon} style={styles.cartLeftIcon} />
                <Text style={[styles.cartLeftText, { color: themeData['text-primary'] }]}>
                    {
                        themeName == "dark" ? "Light Theme" : "Dark Theme"
                    }
                </Text>
            </View>

            <Switch
                trackColor={{ false: themeData['background-secondary'], true: themeData['background-secondary'] }}
                thumbColor={darkMood ? themeData['background-primary'] : themeData['background-secondary']}
                onValueChange={setDarkMood}
                value={darkMood}
            />
        </View>

    )
}

export default CartMood

const styles = StyleSheet.create({

    cart: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginVertical: 6,
        borderWidth: 3,


    },
    cartLeft: {
        flexDirection: "row",
        alignItems: "center"
    },
    cartRight: {

    },
    cartLeftIcon: {
        width: 24,
        height: 24
    },
    cartIcon: {
        width: 16,
        height: 16,
        transform: [{ rotate: "270deg" }]
    },
    cartLeftText: {
        padding: 10,
        fontWeight: 500,
        opacity: 0.6,
        fontSize: 14,
    }

})