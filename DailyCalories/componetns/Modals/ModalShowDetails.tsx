import { Dimensions, Image, Modal, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { close, } from '../../assets/icons'
import { plusWhite } from '../../assets/icons/home'
import { useAppSelector } from '../../hooks/storeHook'
import { FoodDetails } from '../common'

const { width, height } = Dimensions.get("window")


const ModalShowDetails = ({ isOpen = false, isOpenFunc, data }) => {
    const { themeData } = useAppSelector(state => state.theme)

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={isOpen}
        >
            <View style={styles.centeredView}>
                <View style={[styles.modalView, { backgroundColor: themeData['background-secondary-2'] }]}>
                    <TouchableOpacity onPress={isOpenFunc} style={[styles.closeBtn, { backgroundColor: themeData['background-primary'] }]} >
                        <Image source={plusWhite} style={{ width: 16, height: 16, transform: [{ rotate: '45deg' }] }} />
                    </TouchableOpacity>
                    <View style={{ gap: 20, justifyContent: "center", paddingBottom: 45 }}>
                        <FoodDetails color={themeData['background-primary']} title='Kcal' type=' kcal' value={data?.kcal} />
                        <FoodDetails color={themeData['secondary-meal1']} title='Protine' type=' g' value={data?.protein} />
                        <FoodDetails color={themeData['secondary-meal3']} title='Carbs' type=' g' value={data?.carbs} />
                        <FoodDetails color={themeData['secondary-meal2']} title='Fat' type=' g' value={data?.fats} />
                    </View>
                </View>
            </View>
        </Modal>
    )
}

export default ModalShowDetails

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0,0.4)',

    },
    modalView: {
        width: width,
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        alignItems: 'center',

    },

    closeBtn: {
        backgroundColor: "red",
        borderRadius: 50,
        padding: 10,
        transform: [{ translateY: -18 }]

    },

})