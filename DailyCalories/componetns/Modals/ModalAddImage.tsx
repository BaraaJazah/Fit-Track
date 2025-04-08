import { Dimensions, Image, Modal, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { close, } from '../../assets/icons'
import { plusWhite } from '../../assets/icons/home'
import { useAppSelector } from '../../hooks/storeHook'
import { FoodDetails } from '../common'
import { foodIcon } from '../../assets/icons/Foods/data'

const { width, height } = Dimensions.get("window")


const ModalAddImage = ({ isOpen = false, isOpenFunc, setFoodImage }) => {
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

                    <ScrollView
                        contentContainerStyle={{ justifyContent: "center", gap: 20, paddingBottom: 25, flexDirection: "row", flexWrap: "wrap", marginHorizontal: 20 }} // when use it the scroll will don't move
                        fadingEdgeLength={20}
                        showsVerticalScrollIndicator={false}
                    >
                        {
                            foodIcon.map((item, index) => {
                                return (
                                    <TouchableOpacity onPress={() => { setFoodImage(foodIcon[index]) }} key={index} style={{ backgroundColor: themeData['background-secondary'], padding: 10, borderRadius: 12, }}>
                                        <Image source={item} style={{ width: 50, height: 50 }} />
                                    </TouchableOpacity>
                                )
                            })
                        }
                    </ScrollView>
                </View>
            </View>
        </Modal>
    )
}

export default ModalAddImage

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0,0.4)',

    },
    modalView: {
        minHeight: height * 0.3,
        maxHeight: height * 0.6,
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