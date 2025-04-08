import { Dimensions, Image, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { Btn, ColorText, GoogleBtn, HeaderBack, Packet } from '../../componetns/common'
import { usePathname, useRouter } from 'expo-router'
import { useAppSelector } from '../../hooks/storeHook'
import { Input } from '../../componetns/screens/welcome'
import { email, lock, close } from '../../assets/icons'
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { Loading } from '../../componetns/feedback'

const { width, height } = Dimensions.get('window')

const Login = () => {
    const router = useRouter()
    const { themeData } = useAppSelector(state => state.theme)
    const [showModel, setShowModel] = useState(false)

    const loginHandeler = () => {
        setShowModel(true)
    }
    return (
        <View style={styles.body}>
            <View style={{ height: height * 0.1 }}>
                <HeaderBack title={"Login"} onPress={() => { router.replace('/SelectLogin') }} />
            </View>
            <View style={styles.main}>
                <Packet>
                    <Text style={[styles.titleText1, { color: themeData['text-primary'] }]}>Welcome Back! </Text>
                    <Text style={[styles.titleText2, { color: themeData['text-secondary'] }]}>
                        Sign in to continue your wellness journey.
                    </Text>
                </Packet>

                {/* Form */}

                <Packet packetStyle={{ alignItems: "center", paddingTop: 0 }} >
                    <Input title={"Email"} leftIcon={email} />
                    <Input title={"Password"} leftIcon={lock} rightIcon={true} />
                    <View style={styles.RemFor}>
                        <View style={styles.RemForLeft}>
                            <BouncyCheckbox
                                size={20}
                                disableText
                                fillColor={themeData['background-primary']}
                                onPress={(isChecked: boolean) => { }}
                            />
                            <Text style={{ marginHorizontal: 6, fontSize: 12, color: themeData['text-secondary'] }}>Remember Me</Text>
                        </View>
                        <TouchableOpacity >
                            <Text style={[styles.RemForRight, { color: themeData['background-primary'] }]}>Forgot Password?</Text>
                        </TouchableOpacity>

                    </View>
                    <Btn
                        bgColor={'background-primary'}
                        text='Login'
                        textColor={'background-secondary-2'}
                        onPress={loginHandeler}
                        btnStyle={styles.loginBtn}
                    />

                    <View style={{ flexDirection: "row", alignItems: "center", margin: 30, marginBottom: 20 }}>
                        <View style={styles.line}></View>
                        <Text style={styles.lineText}>or</Text>
                        <View style={styles.line}></View>
                    </View>
                    <View style={styles.googleBtns}>
                        <GoogleBtn
                            onPress={() => { }}
                            text='Continue With Google'
                            icon={"google"}
                            btnStyle={styles.googleBtn}
                        />
                        <GoogleBtn
                            onPress={() => { }}
                            text='Continue With Facebook'
                            icon={'facebook'}
                            btnStyle={styles.googleBtn}
                        />
                    </View>


                </Packet>
                <View >
                    <ColorText text1='I Don’t have an account? ' text2='Sign Up' onPress={() => { router.push("/Register") }} />
                </View>
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
                    <Loading text='Login' />
                </View>
            </Modal>
        </View >
    )
}

export default Login

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
        justifyContent: "space-evenly",
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

    },
    // Remmber & Forgot
    RemFor: {
        flexDirection: "row",
        width: width * 0.84,
        justifyContent: "space-between",
        paddingHorizontal: 12,
        marginTop: 10,
        marginBottom: 20,
        alignItems: "center"
    },
    RemForLeft: {
        flexDirection: "row",
        marginVertical: 6
    },
    RemForRight: {
        fontSize: 12,
    },

    // line

    line: {
        height: 1,
        width: width * 0.35,
        backgroundColor: "#ccc"
    },
    lineText: {
        marginHorizontal: 10,
        color: "#ccc",
    },


    googleBtns: {
        width: width * 0.9,
        alignItems: "center",

    },
    googleBtn: {
        width: width * 0.8,
        marginVertical: 10,

    },
})