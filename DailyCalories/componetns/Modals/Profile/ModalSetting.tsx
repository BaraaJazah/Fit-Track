import { Button, Dimensions, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useRef, useState } from 'react'
import { HeaderPages } from '../../../componetns/screens/home'
import { useRouter } from 'expo-router'
import { HeaderBack, Packet } from '../../../componetns/common'
import { useAppDispatch, useAppSelector } from '../../../hooks/storeHook'
import Modal from 'react-native-modal';
import { CartLink, CartMood } from '../../screens/Profile'
import { dropDown, person } from '../../../assets/icons/home'
import { english, german, list, lock, logout, message, moon, syria, trash, turkish } from '../../../assets/icons/add'
import { Image } from 'react-native'
import { Dropdown } from 'react-native-element-dropdown'
import { changeTheme } from '../../../store/theme/themeSlice'



const { width, height } = Dimensions.get("window")

const ModalSetting = ({ isOpen = false, setIsOpen, darkMood, setDarkMood }) => {
    const router = useRouter()
    const ref = useRef();
    const dispatch = useAppDispatch()
    const { themeData, themeName } = useAppSelector(state => state.theme)

    const language = [
        { id: "1", icon: syria, lang: 'Arabic' },
        { id: "2", icon: english, lang: 'English' },
        { id: "3", icon: turkish, lang: 'Turkish' },
        { id: "4", icon: german, lang: 'German' },
    ];

    const [langValue, setLangValue] = useState({
        lang: language[0].lang,
        icon: language[0].icon
    })

    const changeThemeHandler = () => {
        setDarkMood(!darkMood)
        dispatch(changeTheme(darkMood ? 0 : 1))
    }

    return (
        <Modal
            isVisible={isOpen}
            onBackButtonPress={() => setIsOpen(false)}
            onBackdropPress={() => setIsOpen(false)}
            animationIn="fadeInRight"
            animationOut="fadeOutRight"
            animationInTiming={500} // مدة فتح المودال (افتراضي 500)
            animationOutTiming={500} // مدة إغلاق المودال
            style={{ margin: 0 }}
        >
            <View style={[styles.body, { backgroundColor: themeData['background-secondary-2'] }]}>

                <HeaderBack onPress={() => { setIsOpen(false) }} title={"Setting"} />
                <Packet packetStyle={[styles.packet,]}>
                    <View style={{ width: width * 0.9, paddingTop: 20 }}>
                        <Text style={[styles.titleText, { color: themeData['text-secondary'], }]}>Theme & Language</Text>
                        <CartMood darkMood={darkMood} setDarkMood={changeThemeHandler} />

                        <View style={{
                            flexDirection: "row", alignItems: "center", backgroundColor: themeData['background-secondary-2'], padding: 6,
                            marginVertical: 10,
                            borderRadius: 12,
                            borderWidth: 3,
                            borderColor: themeData['background-secondary']
                        }}>
                            <Dropdown
                                style={{ width: width * 0.9 - 28, }}
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
                        </View>
                    </View>

                    <View style={{ width: width * 0.9, paddingTop: 20 }}>
                        <Text style={[styles.titleText, { color: themeData['text-secondary'] }]}>General</Text>
                        <CartLink text={"Privacy Policy"} leftIcon={lock} rightIcons={dropDown} onPress={() => { }} />
                        <CartLink text={"Customer Support"} leftIcon={message} rightIcons={dropDown} onPress={() => { }} />
                        <CartLink text={"Terms & Conditions"} leftIcon={list} rightIcons={dropDown} onPress={() => { }} />
                    </View>

                    <View style={{ width: width * 0.9, paddingTop: 20 }}>
                        <Text style={[styles.titleText, { color: themeData['text-secondary'] }]}>Others</Text>
                        <CartLink text={"Delete Account"} leftIcon={trash} rightIcons={dropDown} onPress={() => { }} />
                        <CartLink text={"Log out"} leftIcon={logout} rightIcons={""} onPress={() => { }} />

                    </View>

                </Packet>
            </View>
        </Modal>
    )
}

export default ModalSetting

const styles = StyleSheet.create({
    body: {
        height: height,
        width: width,
        backgroundColor: "#fff",
        alignItems: "center"
    },
    packet: {
        paddingVertical: 20,
        padding: 8,
    },
    titleText: {
        fontWeight: 800,
        marginLeft: 6
    },

})