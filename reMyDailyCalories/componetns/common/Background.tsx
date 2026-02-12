import { Dimensions, ImageBackground, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useAppSelector } from '../../hooks/storeHook'



const { width, height } = Dimensions.get("window")
const Background = ({ children }) => {

    const { themeData } = useAppSelector(state => state.theme)
    return (
        <ImageBackground resizeMode='stretch' source={themeData["background-image"]} style={{ width, height }}>
            {children}
        </ImageBackground>
    )
}

export default Background

const styles = StyleSheet.create({})