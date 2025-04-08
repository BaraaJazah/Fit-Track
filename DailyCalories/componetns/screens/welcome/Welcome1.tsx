import { Animated, Button, Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { useRouter } from 'expo-router'
import { useAppSelector } from '../../../hooks/storeHook';
import { Slider } from '../../../componetns/screens/welcome';
import { Btn } from '../../../componetns/common';



const { width, height } = Dimensions.get("window")
const SIZE = width * 0.7;

const Welcome1 = ({ translateX, index }) => {
    const { themeData } = useAppSelector(state => state.theme)


    return (
        <>
            <View style={{ flex: 1, width: width, padding: 20, alignItems: "center", justifyContent: "center", }}>
                <Text style={[styles.buttonPartTitle, { color: themeData['text-primary'], }]}>
                    Maintain your calories and stay healthy!
                </Text>
                <Text style={[styles.buttonPartText, { color: themeData['text-secondary'] }]}>
                    Lorem ipsum dolor sit amet, conse ctetur adipi scing elit. Nibh convallis varius iaculis
                    Lorem ipsum dolor sit amet, conse ctetur adipi scing elit. Nibh convallis varius iaculis
                </Text>

            </View>
        </>

    )
}

export default Welcome1

const styles = StyleSheet.create({

    buttonPartTitle: {
        fontSize: 28,
        fontWeight: 600,
        marginBottom: 24,
    },
    buttonPartText: {
        fontSize: 16,
    },




})