import { Dimensions, Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Ok } from '../../assets/icons'
import { useAppSelector } from '../../hooks/storeHook'
import { Btn } from '../../componetns/common'
// import 

const { height, width } = Dimensions.get("window")


const SuccessMessage = () => {
    const { themeData } = useAppSelector(state => state.theme)

    return (
        <View style={styles.body}>
            <View style={styles.main}>
                <Image source={Ok}
                />
                <Text style={[styles.titleText1, { color: themeData['text-primary'] }]}>Reset Your Password </Text>
                <Text style={[styles.titleText2, { color: themeData['text-secondary'] }]}>
                    Yor password has been successfully changed
                </Text>


                <Btn
                    bgColor={'background-primary'}
                    text='Please Login'
                    textColor={'background-secondary-2'}
                    onPress={() => { }}
                    btnStyle={styles.loginBtn}
                />

            </View>
        </View>
    )
}

export default SuccessMessage

const styles = StyleSheet.create({

    body: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fff",

    },
    main: {
        alignItems: "center",
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
        boxShadow: " 5px 5px 5px rgba(0, 0, 0, 0.2)",
        marginTop: 60
    },

})