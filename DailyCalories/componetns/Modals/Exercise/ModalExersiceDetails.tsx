import { BackHandler, Dimensions, Image, Modal, StyleSheet, Text, View } from 'react-native'
import React, { memo, useEffect } from 'react'
import { useLocalSearchParams, useRouter, useSegments } from 'expo-router'
import { Btn, FoodDetails, HeaderBack } from '../../common'

import { useAppSelector } from '../../../hooks/storeHook'



const { width, height } = Dimensions.get("window")


type Props = {
    isOpen: boolean
    isOpenFunc: any
    data: any
}

const ModalExersiceDetails = ({ isOpen, isOpenFunc, data }: Props) => {
    const router = useRouter()
    const { themeData } = useAppSelector(state => state.theme)

    // useEffect(() => {
    //     const backAction = () => {
    //         isOpenFunc(false)
    //         return true;
    //     };
    //     const backHandler = BackHandler.addEventListener(
    //         "hardwareBackPress",
    //         backAction
    //     );
    //     return () => backHandler.remove();
    // }, []);


    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={isOpen}
        >
            <View style={styles.body}>
                <Image src={data?.image?.toString()} style={{ height: height * 0.45, width: width }} />


                <View style={{ height: height * 0.1, position: "absolute", }}>
                    <HeaderBack onPress={() => { isOpenFunc(false) }} title={data?.name} />
                </View>

                <View style={{
                    height: height * 0.55 + 24, borderTopLeftRadius: 30, borderTopRightRadius: 26,
                    top: -24, backgroundColor: "#fff", width: width,
                    alignItems: "center",

                }}>
                    <View style={{ width: width * 0.8, }} >
                        <View style={{ justifyContent: "space-between", flexDirection: "row", paddingTop: 30, }}>
                            <Text style={{ fontSize: 18, fontWeight: 600, color: themeData['text-primary'], textTransform: "capitalize", }}>{data?.name}</Text>
                            <Text style={{ fontSize: 18, fontWeight: 600, color: themeData['text-primary'] }}>100g</Text>
                        </View>

                        <View style={{ justifyContent: "space-between", flexDirection: "row", paddingTop: 10, }}>
                            <Text style={{ fontSize: 14, color: themeData['text-secondary'] }}>vegitables</Text>
                            <Text style={{ fontSize: 14, color: themeData['text-secondary'] }}>{data?.kcal} Kcal</Text>
                        </View>

                        <View style={{ gap: 20, paddingVertical: 30, alignItems: "center" }}>
                            <FoodDetails color={themeData['background-primary']} title='Kcal' type=' kcal' value={data?.kcal as any} />
                            <FoodDetails color={themeData['secondary-meal1']} title='Protine' type=' g' value={data?.protein as any} />
                            <FoodDetails color={themeData['secondary-meal3']} title='Carbs' type=' g' value={data?.carbs as any} />
                            <FoodDetails color={themeData['secondary-meal2']} title='Fat' type=' g' value={data?.fats as any} />
                        </View>
                        <View style={{ paddingTop: 10, alignItems: "center" }}>

                            <Btn bgColor='background-primary' onPress={() => { }} textColor='#fff' text='Add To Favorate' disabled={false}
                                btnStyle={{ width: width * 0.7, borderRadius: 12, }}
                                btnTextStyle={{ color: "#fff" }}
                            />
                        </View>

                    </View>
                </View>
            </View>
        </Modal>
    )
}

export default ModalExersiceDetails

const styles = StyleSheet.create({
    body: {
        height: height,
        width: width,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "space-between",
    },
    packet: {
        borderWidth: 1,
        borderColor: "#eee",
        marginBottom: 10,
        height: height * 0.5,
        paddingBottom: 6
    },

})