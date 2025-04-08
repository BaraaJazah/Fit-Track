import { Dimensions, StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native'
import React from 'react'
import { useAppSelector } from '../../hooks/storeHook'

const { width, height } = Dimensions.get("window")

type Props = {
    children: React.ReactNode,
    packetStyle?: StyleProp<ViewStyle>
}
const Packet = ({ children, packetStyle }: Props) => {

    const { themeData } = useAppSelector(state => state.theme)

    return (
        <View style={[styles.body, packetStyle, { backgroundColor: themeData['background-secondary-2'] }]}>
            {children}
        </View>
    )
}

export default Packet

const styles = StyleSheet.create({
    body: {
        width: width * 0.94,
        borderRadius: 12,
        padding: 20,
        paddingTop: 6
    }
})