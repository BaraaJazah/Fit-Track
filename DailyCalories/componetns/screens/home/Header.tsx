import { Dimensions, Image, InteractionManager, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { back } from '../../../assets/icons'
import { dots, calender, calculator, dish, bicycle, logout, Settings } from '../../../assets/icons/home'
import { useAppSelector } from '../../../hooks/storeHook'
import ListItem from './ListItem'
import { useFocusEffect, useRouter } from 'expo-router'
import { ModalOwnDish, ModalCalcNeeds } from '../../Modals'

const { width, height } = Dimensions.get("window")

type Props = {
    onPress: () => void
}
const Header = ({ onPress, }: Props) => {
    const { themeData, themeName } = useAppSelector(state => state.theme)
    const router = useRouter()
    const [showList, setShowList] = useState(false)
    const [showCalcNeeds, setShowCalcNeeds] = useState(false)
    const [showOwnDish, setShowOwnDish] = useState(false)

    const getFormattedDate = () => {
        const today = new Date();
        return today.toLocaleDateString("en-GB", {
            day: "numeric",
            month: "short",
            weekday: "long",
        });
    };

    useFocusEffect(
        useCallback(() => {
            return () => {
                setShowList(false);
            };
        }, [])
    );


    return (
        <View style={[styles.body, { backgroundColor: themeData['background-secondary-2'] }]}>

            <TouchableOpacity onPress={onPress} style={[styles.left, { backgroundColor: themeData['background-secondary'] }]}>
                <Image source={calender} style={styles.leftIcon} />
            </TouchableOpacity>

            <View ><Text style={[styles.title, { color: themeData['text-primary'] }]}>{getFormattedDate()}</Text></View>

            <TouchableOpacity onPress={() => { setShowList(!showList) }} style={[styles.right, { backgroundColor: themeData['background-secondary'] }]}>
                <Image source={dots} style={styles.rightIcon} />
            </TouchableOpacity>

            <View style={[styles.list,
            {
                backgroundColor: themeData['background-secondary'],
                borderWidth: 2,


            },
            themeName === "dark" ? { borderColor: "#404040" } : { borderColor: "#eee" },

            showList ? { display: "flex" } : { display: "none" }]}>

                <ListItem text='Calc calories need' icon={calculator} onPress={() => { setShowCalcNeeds(true); setShowList(false) }} />


                {/* <ListItem text='My own dishs' icon={dish} onPress={() => {
                    router.push("/(homeScreens)/ownDish"); setShowList(false)
                }} /> */}


                <ListItem text='My own dishs' icon={dish} onPress={() => {
                    setShowOwnDish(true); setShowList(false)
                }} />

                {/* <ListItem text='My own dishs' icon={dish} onPress={() => { router.push("/(homeScreens)/AddDish"); setShowList(false) }} /> */}

                <ListItem text='My own exsercies' icon={bicycle} onPress={() => { }} />
                <ListItem text='setting' icon={Settings} onPress={() => { router.replace("/Profile") }} />
                <ListItem text='Log out' icon={logout} onPress={() => { }} />
            </View>

            <ModalCalcNeeds isOpen={showCalcNeeds} setIsOpen={setShowCalcNeeds} />
            <ModalOwnDish isOpen={showOwnDish} setIsOpen={setShowOwnDish} />

        </View>
    )
}

export default Header

const styles = StyleSheet.create({
    body: {
        flexDirection: "row",
        width: width,
        height: height * 0.08,
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "center",
        marginVertical: height * 0.01
    },
    left: {
        position: "absolute",
        left: 0,
        marginLeft: 20,
        borderRadius: 14,
        width: 46,
        height: 46,
        justifyContent: "center",
        alignItems: "center"
    },
    leftIcon: {
        width: 20,
        height: 24
    },
    rightIcon: {
        width: 28,
        height: 28
    },

    title: {
        fontWeight: 600,
        fontSize: 16
    },
    right: {
        position: "absolute",
        right: 0,
        marginRight: 20,
        borderRadius: 14,
        width: 46,
        height: 46,
        justifyContent: "center",
        alignItems: "center"
    },

    list: {
        position: "absolute",
        width: 190,
        height: 250,
        borderRadius: 12,
        paddingVertical: 6,
        top: 64,
        right: 20,
        justifyContent: "space-between",


    },


})