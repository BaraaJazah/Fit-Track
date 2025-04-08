import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { Packet } from '../../componetns/common'
import { salad } from '../../assets/icons/Foods'
import { me } from '../../assets/images'
import { Header } from '../../componetns/screens/home'
import { useAppDispatch, useAppSelector } from '../../hooks/storeHook'
import { CartLink, CartMood } from '../../componetns/screens/Profile'
import { camera, english, german, lock, moon, premium, star, sun, syria, turkish } from '../../assets/icons/add'
import { bicycle, dish, dropDown, edit, love, person, Settings } from '../../assets/icons/home'
import { Dropdown } from 'react-native-element-dropdown'
import { ModalChangePass, ModalMyDish, ModalSetting } from '../../componetns/Modals/Profile'
import { ModalOwnDish } from '../../componetns/Modals'
import { changeTheme } from '../../store/theme/themeSlice'




const { width, height } = Dimensions.get("window")
const Profile = () => {

    const { themeData, themeName } = useAppSelector(state => state.theme)
    const dispatch = useAppDispatch()
    const [darkMood, setDarkMood] = useState(themeName == "dark" ? true : false);

    //  modal states
    const [myAccount, setMyAccount] = useState(false);
    const [myDish, setMyDish] = useState(false);
    const [myExercise, setMyExercise] = useState(false);
    const [getPremium, setGetPremium] = useState(false);
    const [setting, setSetting] = useState(false);



    const changeThemeHandler = () => {
        setDarkMood(!darkMood)
        dispatch(changeTheme(darkMood ? 0 : 1))
    }



    return (
        <View style={[styles.container, { backgroundColor: themeData['background-secondary-2'] }]}>

            <Packet packetStyle={{
                width: width * 0.94, paddingVertical: 0, backgroundColor: themeData['background-secondary-2'], height: height * 0.25,
                justifyContent: "center"
            }}>
                <View style={{ alignItems: "center", flexDirection: "row", gap: 10 }}>
                    <View style={styles.profileImage}>
                        <Image source={me} style={styles.Image} />

                        <View style={{
                            width: 45, height: 45, backgroundColor: themeData['background-secondary-2'], borderRadius: 30, position: "absolute",
                            alignItems: "center",
                            justifyContent: "center",
                            bottom: 0,
                            right: 10
                        }}>
                            <TouchableOpacity onPress={() => { }} style={{
                                width: 35, height: 35, backgroundColor: "#eee", borderRadius: 20,
                                alignItems: "center",
                                justifyContent: "center",
                            }}>
                                <Image source={camera} style={{ width: 20, height: 20, }} />
                            </TouchableOpacity>
                        </View>


                    </View>
                    <View style={styles.profileTexts}>
                        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
                            <Text style={[styles.profileText1, { color: themeData['text-primary'] }]}>Baraa Jazah</Text>
                            <TouchableOpacity onPress={() => { }}>
                                <Image source={edit} style={{ width: 24, height: 24 }} />
                            </TouchableOpacity>
                        </View>
                        <Text style={[styles.profileText2, { color: themeData['text-secondary'] }]}>baraajazah@gmail.com </Text>
                        <View style={{ flexDirection: "row", marginTop: 6, }}>
                            <View style={{
                                borderWidth: 1, padding: 4, paddingHorizontal: 10, borderColor: "#ccc", borderRadius: 8, flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: 8
                            }}>
                                <Image source={premium} style={{ width: 16, height: 16, }} />
                                <Text style={[styles.profileText3, { color: themeData['text-secondary'], }]}>Premium</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </Packet >
            <Packet packetStyle={{
                marginVertical: 20, alignItems: "center", backgroundColor: themeData['background-secondary'],
                width: width, height: height * 0.75 + 20,
                transform: [{ translateY: -20 }], borderRadius: 40
            }}>

                <View style={{ width: width * 0.9, paddingVertical: 20 }}>
                    <Text style={[styles.titleText, { color: themeData['text-secondary'], }]}>Theme</Text>
                    <CartMood darkMood={darkMood} setDarkMood={changeThemeHandler} />

                    {/* <View style={{
                        flexDirection: "row", alignItems: "center", backgroundColor: themeData['background-secondary-2'], padding: 6,
                        marginVertical: 10,
                        borderRadius: 12,
                    }}>
                        <Dropdown
                            style={[styles.input,]}
                            selectedTextStyle={{
                                color: themeData['text-primary'],
                                padding: 10,
                                fontWeight: 500,
                                opacity: 0.6,
                                fontSize: 14,
                                textTransform: "capitalize",
                            }}

                            renderItem={(item) => (
                                <View style={{
                                    flexDirection: "row", paddingVertical: 14,
                                    backgroundColor: themeData['background-secondary'],
                                }}>
                                    <Image source={item.icon} style={{ width: 20, height: 20, marginHorizontal: 10 }} />
                                    <Text style={{
                                        color: themeData['text-secondary'],
                                        fontSize: 14, textTransform: "capitalize"
                                    }} >{item.lang}</Text>
                                </View>
                            )}
                            data={language}
                            maxHeight={200}
                            labelField="lang"
                            valueField="lang"
                            value={langValue}
                            autoScroll={false}
                            onChange={item => {
                                setLangValue({
                                    lang: item.lang,
                                    icon: item.icon
                                });
                            }}

                            renderLeftIcon={() => (
                                <Image source={langValue.icon} style={{ width: 24, height: 24, marginLeft: 10 }} />
                            )}
                            renderRightIcon={() => (
                                <Image source={dropDown} style={{ width: 16, height: 16 }} />
                            )}
                        />
                    </View> */}
                </View>

                <View style={{ width: width * 0.9, }}>
                    <Text style={[styles.titleText, { color: themeData['text-secondary'] }]}>General</Text>
                    <CartLink text={"My Dishs"} leftIcon={dish} rightIcons={dropDown} onPress={() => { setMyDish(true) }} />
                    <CartLink text={"My Exercises"} leftIcon={bicycle} rightIcons={dropDown} onPress={() => { }} />
                    <CartLink text={"Get Premium"} leftIcon={premium} rightIcons={dropDown} onPress={() => { }} />
                    <CartLink text={"Change Password"} leftIcon={lock} rightIcons={dropDown} onPress={() => { setMyAccount(true) }} />
                    <CartLink text={"Setting"} leftIcon={Settings} rightIcons={dropDown} onPress={() => { setSetting(true) }} />
                </View>

            </Packet>

            <ModalChangePass isOpen={myAccount} setIsOpen={setMyAccount} />
            <ModalMyDish isOpen={myDish} setIsOpen={setMyDish} />
            <ModalSetting isOpen={setting} setIsOpen={setSetting} darkMood={darkMood} setDarkMood={setDarkMood} />

        </View >
    )
}

export default Profile

const styles = StyleSheet.create({
    container: {
        width,
        height,
        alignItems: "center",
        // backgroundColor: "#fff"
    },
    profileImage: {
        marginVertical: 16
    },
    Image: {
        width: 100,
        height: 100,
        borderRadius: 45,
        marginRight: 20

    },
    profileTexts: {
        // alignItems: "center",
        rowGap: 4
    },
    profileText1: {
        fontSize: 20,
        fontWeight: 700
    },
    profileText2: {
        fontSize: 14,
    },
    profileText3: {
        fontSize: 14,
        fontWeight: 500,
    },

    line: {
        height: 1,
        width: width * 0.84,
        backgroundColor: "#ccc",
    },
    titleText: {
        fontWeight: 800,
        marginLeft: 6
    },
    // DropDowm

    input: {
        width: width * 0.9 - 22,
    }

})