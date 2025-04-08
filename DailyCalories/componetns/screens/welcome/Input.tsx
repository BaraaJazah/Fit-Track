import { StyleSheet, Text, View, TextInput, Image, Dimensions, Touchable, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { useAppSelector } from '../../../hooks/storeHook'
import { eye, eyeOff } from '../../../assets/icons'
type Props = {
    title: string
    leftIcon: any,
    rightIcon?: any,
    onPress?: () => void
}
const { width } = Dimensions.get("window")


const Input = ({ title, leftIcon, rightIcon, onPress }: Props) => {
    const { themeData } = useAppSelector(state => state.theme)
    const [secuteInput, setSecuteInput] = useState({ secure: true, icon: eyeOff });
    return (
        <View style={styles.body}>
            <Text style={[styles.title, { color: themeData['text-secondary'] }]}>{title}</Text>
            <View style={styles.inputView}>
                <Image
                    source={leftIcon}
                    style={styles.leftIcon}
                />
                <TextInput
                    style={[styles.input, { color: themeData['text-secondary'] }]}
                    autoCapitalize={'none'}
                    secureTextEntry={secuteInput.secure}
                />
                {
                    rightIcon ?
                        <TouchableOpacity onPress={() => {
                            setSecuteInput(state => ({
                                secure: !state.secure, icon: state.icon === eye ? eyeOff : eye
                            }))
                        }} >
                            <Image
                                source={secuteInput.icon}
                                style={styles.leftIcon}
                            />
                        </TouchableOpacity>
                        : ""
                }
            </View>
        </View>
    )
}

export default Input

const styles = StyleSheet.create({
    body: {
        marginVertical: 4,
        width: width * 0.8
    },
    leftIcon: {
        width: 20,
        height: 20,
        marginHorizontal: 10
    },
    title: {
        // marginVertical: 6,
        marginBottom: 10

    },
    inputView: {
        borderColor: "#eee",
        borderWidth: 1,
        borderRadius: 12,
        flexDirection: "row",
        alignItems: "center",
        padding: 2,
        backgroundColor: "#fff",
        boxShadow: "inset  4px 4px 8px rgba(0, 0, 0, 0.1)",
    },
    input: {
        flex: 1,
        // width: 200
    }
})