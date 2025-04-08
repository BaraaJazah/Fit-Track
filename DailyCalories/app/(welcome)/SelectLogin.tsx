import { Dimensions, Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Btn, GoogleBtn } from '../../componetns/common'
import { usePathname, useRouter } from 'expo-router'
import { logo } from "../../assets/images"
import { useAppSelector } from '../../hooks/storeHook'

const { width } = Dimensions.get('window')

const SelectLogin = () => {
    const router = useRouter()
    const { themeData } = useAppSelector(state => state.theme)
    return (
        <View style={styles.body}>
            <Image
                source={logo}
                style={styles.logo}
            />
            {/* title */}
            <View style={styles.title}>
                <Text style={styles.mainTitle}>Let’s Get Start</Text>
                <Text style={[styles.secondTitle, { color: themeData['text-secondary'] }]}>let’s dive in into your Account</Text>
            </View>

            {/* google-facebook */}
            <View>
                <GoogleBtn icon='google' btnStyle={[styles.googleBtn]} btnTextStyle={[styles.googleBtnText, { color: themeData['text-secondary'] }]} textColor='background-secondary-2' bgColor="background-primary" text='Google' onPress={() => { }} />
                <GoogleBtn icon='facebook' btnStyle={[styles.googleBtn]} btnTextStyle={[styles.googleBtnText, { color: themeData['text-secondary'] }]} textColor='background-secondary-2' bgColor="background-primary" text='Facebook' onPress={() => { }} />
            </View>

            {/* botton */}
            <View >
                <Btn btnStyle={styles.btn} textColor='background-secondary-2' bgColor="background-primary" text='Sign Up' onPress={() => { router.push('/Register') }} />
                <Btn btnStyle={styles.btn} textColor='background-primary' bgColor="background-secondary" text='Log In' onPress={() => { router.push('/Login') }} />
            </View>

            <View style={styles.footer}>
                <Text style={[styles.footerTitle, { color: themeData['text-secondary'] }]}>Privacy Policy</Text>
                <Text style={[styles.footerText, { color: themeData['text-secondary'] }]}>Terms of Service</Text>
            </View>

        </View>
    )
}

export default SelectLogin

const styles = StyleSheet.create({
    body: {
        flex: 1,
        justifyContent: "space-evenly",
        alignItems: "center",
        backgroundColor: "#fff",
    },
    logo: {
        width: 71, height: 65
    },
    title: {
        alignItems: "center",
    },
    mainTitle: {
        fontSize: 36,
        fontWeight: 600
    },
    secondTitle: {
        fontSize: 16,
        marginTop: 4,
    },

    googleBtn: {
        width: width * 0.9,
        margin: 8,
        borderColor: "#eee"
    },
    googleBtnText: {
        fontSize: 16
    },

    btn: {
        width: width * 0.9,
        margin: 8,
        boxShadow: " 5px 5px 5px rgba(0, 0, 0, 0.2)",
    },

    footer: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        width: width * 0.9,


    },
    footerTitle: {
        fontSize: 14
    },
    footerText: {
        fontSize: 14

    },

})