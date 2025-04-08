import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { back } from '../../assets/icons'
import { plusHeader } from '../../assets/icons'
import { useAppSelector } from '../../hooks/storeHook'

const { width, height } = Dimensions.get("window")

type Props = {
    title: string,
    right?: boolean
    onPress: () => void
    onPressRight?: () => void
}
const HeaderBack = ({ title, right = false, onPress, onPressRight = () => { } }) => {
    const { themeData } = useAppSelector(state => state.theme)
    return (
        <View style={[styles.body, { backgroundColor: themeData['background-secondary-2'], }]}>
            <TouchableOpacity onPress={onPress} style={[styles.left, { backgroundColor: themeData['background-secondary'] }]}>
                <Image source={back} style={styles.leftIcon} />
            </TouchableOpacity>
            <View ><Text style={[styles.title, { color: themeData['text-primary'] }]}>{title}</Text></View>
            {
                right ?
                    <TouchableOpacity onPress={onPressRight} style={[styles.right, { backgroundColor: themeData['background-secondary'] }]}>
                        <Image source={plusHeader} style={styles.leftIcon} />
                    </TouchableOpacity>

                    :
                    ""
            }

        </View>
    )
}

export default HeaderBack

const styles = StyleSheet.create({
    body: {
        flexDirection: "row",
        width: width * 0.94,
        height: height * 0.06,
        borderRadius: 12,

        justifyContent: "center",
        alignItems: "center",
        marginVertical: height * 0.01
    },
    left: {
        position: "absolute",
        left: 0,
        marginLeft: 10,
        padding: 12,
        borderRadius: 14
    },
    leftIcon: {
        width: 14,
        height: 14
    },
    title: {
        fontWeight: 800,
        fontSize: 16,
        textTransform: "capitalize",
        textAlign: "center",
    },
    right: {
        position: "absolute",
        right: 0,
        marginRight: 10,
        padding: 12,
        borderRadius: 14
    },
})