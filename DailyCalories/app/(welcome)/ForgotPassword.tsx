import { Dimensions, Image, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { Btn, HeaderBack, Packet } from '../../componetns/common'
import { useRouter } from 'expo-router'
import { useAppSelector } from '../../hooks/storeHook'
import { Input } from '../../componetns/screens/welcome'
import { close, email } from '../../assets/icons'
import { Loading } from '../../componetns/feedback'


const { height, width } = Dimensions.get("window")
const ForgotPassword = () => {
    const { themeData } = useAppSelector(state => state.theme)
    const router = useRouter()
    const [showModel, setShowModel] = useState(false)

    const resetPasswordHandeler = () => {
        setShowModel(true)
    }
    return (
        <View style={styles.body}>
            <View style={{ height: height * 0.1 }}>
                <HeaderBack title={"Login"} onPress={() => { router.replace('/SelectLogin') }} />
            </View>
            <View style={styles.main}>
                <Packet>
                    <Text style={[styles.titleText1, { color: themeData['text-primary'] }]}>Forgot Your Password? </Text>
                    <Text style={[styles.titleText2, { color: themeData['text-secondary'] }]}>
                        Enter your register email address. and we’ll send you a one-time verification code to reset your password
                    </Text>
                </Packet>

                <Packet packetStyle={{ alignItems: "center", paddingTop: 0 }} >
                    <Input title={"Your Registered Email"} leftIcon={email} />

                    <Btn
                        bgColor={'background-primary'}
                        text='Send Code'
                        textColor={'background-secondary-2'}
                        onPress={resetPasswordHandeler}
                        btnStyle={styles.loginBtn}
                    />

                </Packet>
            </View>

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

        </View>
    )
}

export default ForgotPassword

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
    loginBtn: {
        width: width * 0.8,
        margin: "auto",
        // width: width * 0.9,
        boxShadow: " 5px 5px 5px rgba(0, 0, 0, 0.2)",
        marginTop: 30

    },

})