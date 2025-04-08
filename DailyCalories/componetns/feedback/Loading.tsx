import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useAppSelector } from '../../hooks/storeHook'


type Props = {
    text: string
}
const Loading = ({ text }: Props) => {
    const { themeData } = useAppSelector(state => state.theme)
    return (
        <View style={styles.body}>
            <Text style={[styles.bodyText, { color: themeData['text-primary'] }]}>{text} ...</Text>
            <ActivityIndicator size="large" hidesWhenStopped={false} animating={true} color={themeData['background-primary']} />
        </View>
    )
}

export default Loading

const styles = StyleSheet.create({
    body: {
        backgroundColor: "rgba(255, 255, 255,0.8)",
        width: 200,
        height: 200,
        position: "absolute",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1,
        borderRadius: 12,
    },
    bodyText: {
        fontSize: 16,
        fontWeight: 600,
        marginBottom: 20
    }


})