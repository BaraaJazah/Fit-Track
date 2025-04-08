import { Dimensions, Image, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { Btn, ColorText, HeaderBack, Packet } from '../../componetns/common'
import { useRouter } from 'expo-router'
import { useAppSelector } from '../../hooks/storeHook'
import { OtpInput } from '../../componetns/screens/welcome'
import { Loading } from '../../componetns/feedback'
import { close } from '../../assets/icons'

const { width, height } = Dimensions.get('window')

const SignUpOtp = () => {
    const { themeData, themeName } = useAppSelector(state => state.theme)
    const router = useRouter()
    const [isPress, setIsPress] = useState(false)
    const [showModel, setShowModel] = useState(false)

    const sendHandler = () => {
        setIsPress(true)
        setShowModel(true)
    }
    return (
        <View style={styles.body}>
            <View style={{ height: height * 0.1 }}>
                <HeaderBack title={"OTP Code"} onPress={() => { router.back() }} />
            </View>
            <View style={styles.main}>
                <Packet>
                    <Text style={[styles.titleText1, { color: themeData['text-primary'] }]}>Enter OTP Code  </Text>
                    <Text style={[styles.titleText2, { color: themeData['text-secondary'] }]}>
                        Please check your email inbox for a message from Healthy. Enter the one-time verification code below.
                    </Text>
                </Packet>

                <Packet>
                    <View style={{ flexDirection: "row", gap: width * 0.03, justifyContent: "center" }}>
                        <OtpInput />
                        <OtpInput />
                        <OtpInput />
                        <OtpInput />
                    </View>
                    <View style={{ marginTop: 20, alignItems: "center", paddingHorizontal: 20, }} >
                        <ColorText text1='You can resend the code in ' text2='56 ' text3='seconds' onPress={() => { }} />
                        <TouchableOpacity style={{ marginTop: 20, }} onPress={() => { setIsPress(false) }}>
                            <Text style={{ color: themeData['text-secondary'] }}>
                                Resend Code
                            </Text>
                        </TouchableOpacity>
                        <View style={{ marginTop: 30, }}>
                            <Btn btnStyle={{ width: width * 0.9, boxShadow: " 5px 5px 5px rgba(0, 0, 0, 0.2)", }}
                                disabled={isPress} text={isPress ? "Send ..." : "Send"}
                                onPress={sendHandler} bgColor={isPress ? "text-secondary" : "background-primary"} textColor="background-secondary-2"

                            />
                        </View>
                    </View>
                </Packet>
            </View >

            <Modal
                animationType="fade"
                transparent={true}
                visible={showModel}
            >
                <View style={styles.model}>
                    <TouchableOpacity onPress={() => { setShowModel(false) }} style={styles.modelCloseBtn}>
                        <Image
                            source={close}
                            style={{ width: 30, height: 30 }}
                        />
                    </TouchableOpacity>
                    <Loading text='Sending Code' />
                </View>
            </Modal>

        </View >
    )
}

export default SignUpOtp

const styles = StyleSheet.create({

    // model
    model: {
        backgroundColor: "rgba(0, 0, 0,0.5)",
        height: height * 1,
        width: width,
        position: "absolute",
        bottom: 0,
        justifyContent: "center",
        alignItems: "center",

    },
    modelCloseBtn: {
        backgroundColor: "#fff",
        position: "absolute",
        padding: 6,
        top: 20,
        right: 20,
        borderRadius: 10,
    },


    //page

    body: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "#fff",

    },
    main: {
        alignItems: "center",
        height: height * 0.8,
    },

    titleText1: {
        fontSize: 24,
        fontWeight: 600,
        marginBottom: 20
    },
    titleText2: {
        fontSize: 16

    },


})