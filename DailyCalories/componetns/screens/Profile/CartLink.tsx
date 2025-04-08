import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { moon, sun } from '../../../assets/icons/add'
import { backWhite, dropDown } from '../../../assets/icons/home'
import { back } from '../../../assets/icons'
import { useAppSelector } from '../../../hooks/storeHook'

const CartLink = ({ text, leftIcon, rightIcons, onPress }) => {

    const { themeData } = useAppSelector(state => state.theme)



    return (
        <TouchableOpacity onPress={onPress} style={[styles.cart, {
            borderColor: themeData['background-secondary'],
            backgroundColor: themeData['background-secondary-2'], padding: 6, paddingHorizontal: 15, borderRadius: 14
        }]}>
            <View style={styles.cartLeft}>
                <Image source={leftIcon} style={styles.cartLeftIcon} />
                <Text style={[styles.cartLeftText, { color: themeData['text-primary'] }]}>{text}</Text>
            </View>
            <Image source={rightIcons} style={styles.cartIcon} />
        </TouchableOpacity>
    )
}

export default CartLink

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
        width: 20,
        height: 20
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