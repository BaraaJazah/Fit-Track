import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'


type Props = {
    text: string,
    icon: any,
    onPress: () => void
    btnStyle?: any,
    iconStyle?: any
    textStyle?: any
}

const ListItem = ({ text, icon, onPress, btnStyle, iconStyle, textStyle }: Props) => {
    return (
        <TouchableOpacity style={[styles.listItem, btnStyle]} onPress={onPress}>
            <Image style={[styles.listItemImage, iconStyle]} source={icon} />
            <Text style={[styles.listItemText, textStyle]}>{text}</Text>
        </TouchableOpacity>
    )
}

export default ListItem

const styles = StyleSheet.create({
    listItem: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 12,
        borderRadius: 12,
    },
    listItemImage: {
        marginHorizontal: 14,
        height: 22,
        width: 22
    },
    listItemText: {
        fontSize: 12,
        color: "#999"
    },
})