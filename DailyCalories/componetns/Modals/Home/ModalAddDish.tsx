import { Dimensions, Image, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { CycleDisplayData, HeaderPages } from '../../../componetns/screens/home'
import { useRouter } from 'expo-router'
import { useAppSelector } from '../../../hooks/storeHook'
import { Packet } from '../../../componetns/common'
import { image, details, trash, trashWight, dropDown } from '../../../assets/icons/home'
import { salad } from '../../../assets/icons/Foods'
import { ModalAddFood, ModalAddImage, ModalShowDetails } from '../../../componetns/Modals'


const { width, height } = Dimensions.get("window")

const ModalAddDish = ({ isOpen = false, setIsOpen, name }) => {
    const { themeData } = useAppSelector(state => state.theme)
    const router = useRouter()

    const [foodImage, setFoodImage] = useState(image);


    const [addFoodVisible, setAddFoodVisible] = useState(false);
    const [detailsVisible, setdetailsVisible] = useState(false);
    const [addImageVisible, setAddImageVisible] = useState(false);

    return (
        <Modal
            animationType="fade"
            transparent={false}
            visible={isOpen}
        >
            <View style={[styles.body, { backgroundColor: themeData['background-secondary-2'] }]}>
                <View style={{ height: height * 0.25 }}>
                    <HeaderPages right={true} onPressRight={() => { setAddFoodVisible(true) }} onpress={() => { setIsOpen(false) }}
                        header={`Add new ${name}`}
                        title={`Add new ${name}`}
                        text='Embark on a journey of mindfulness with our Mindful Moments Meditation.' />

                </View>

                <Packet packetStyle={[styles.packet, , { borderColor: themeData['background-secondary'], }]}>
                    <View style={styles.middlePartHead}>
                        <TouchableOpacity onPress={() => { setAddImageVisible(true) }}>
                            <Image source={foodImage} style={styles.middlePartIcon} />
                        </TouchableOpacity>
                        <TextInput
                            style={[styles.input, { borderColor: themeData['background-secondary'], color: themeData['text-secondary'] }]}
                            // onChangeText={onChangeNumber}
                            // value={number}
                            placeholder="Dish Name"
                            placeholderTextColor={themeData['text-secondary']}
                        />
                    </View>
                    <ScrollView
                        contentContainerStyle={styles.middlePartHeadBody} // when use it the scroll will don't move
                        fadingEdgeLength={10}	// make fade in top and botton
                        scrollEnabled={true}	// make scroll anable
                        showsVerticalScrollIndicator={false}
                    >
                        {
                            Array(4).fill(0).map((item, index) => {
                                return (
                                    <View key={index} style={[styles.cart, { backgroundColor: themeData['background-secondary'], justifyContent: "center" }]}>
                                        <View style={styles.cartTop}>
                                            <View style={{ flexDirection: 'row', alignItems: "center", gap: 14 }} >
                                                <Image source={salad} style={{ width: 40, height: 30 }} />
                                                <View>
                                                    <Text style={{ fontSize: 14, fontWeight: 500, color: themeData['text-primary'] }}>Tomates</Text>
                                                    <Text style={{ fontSize: 10, color: themeData['text-secondary'] }}>60 kcal -100g</Text>
                                                </View>
                                            </View>

                                            <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
                                                <TouchableOpacity onPress={() => { setdetailsVisible(true) }} style={[styles.cartRightIconView, { backgroundColor: themeData['background-primary'] }]}>
                                                    <Image style={styles.cartRightIcon} source={details} />
                                                </TouchableOpacity>
                                                <View style={[styles.cartRightIconView, { backgroundColor: themeData['secondary-meal2'] }]}>
                                                    <Image style={styles.cartRightIcon} source={trashWight} />
                                                </View>
                                            </View>

                                        </View>

                                        <View style={styles.cartBotton}>
                                            <Text style={{ color: themeData['text-secondary'], marginLeft: 50, }}> 120 Kcal</Text>
                                            <View style={{
                                                backgroundColor: themeData['background-secondary-2'],
                                                borderColor: themeData['background-secondary'],
                                                borderWidth: 1,
                                                borderRadius: 12,
                                                width: width * 0.18,
                                                flexDirection: "row",
                                                alignItems: "center",
                                                justifyContent: "space-evenly",
                                                // height: 30,

                                            }}>
                                                <TextInput
                                                    style={[styles.kcalInput, { color: themeData['text-secondary'], padding: 16 }]}
                                                    // onChangeText={onChangeNumber}
                                                    // value={number}
                                                    placeholder="100g"
                                                    placeholderTextColor={themeData['text-secondary']}
                                                    keyboardType='number-pad'
                                                    maxLength={4}
                                                    textAlign='center'
                                                />
                                            </View>
                                        </View>
                                    </View>
                                )
                            })
                        }

                    </ScrollView>
                </Packet>

                <Packet packetStyle={[styles.packet2, { borderColor: themeData['background-secondary'], }]}>
                    <View style={{
                        marginBottom: 10,
                        flexDirection: "row",
                        justifyContent: "space-around",
                        flexWrap: "wrap",
                        rowGap: 10,
                        paddingTop: 15,
                    }}>
                        <CycleDisplayData color={themeData['background-primary']} text1={"1760"} text2={'Kcal'} />
                        <CycleDisplayData color={themeData['secondary-meal1']} text1={`${60}g`} text2={'Protein'} />
                        <CycleDisplayData color={themeData['secondary-meal2']} text1={`${20}g`} text2={'Fats'} />
                        <CycleDisplayData color={themeData['secondary-meal3']} text1={`${42}g`} text2={'Carbs'} />
                    </View>
                    <View style={{ justifyContent: "center", alignItems: "center", }}>
                        <TouchableOpacity style={[styles.saveBtn, { backgroundColor: themeData['background-primary'], marginTop: 10 }]}>
                            <Text style={[{ color: "#fff" }]}>Save</Text>
                        </TouchableOpacity>
                    </View>
                </Packet>

                <ModalAddFood isOpen={addFoodVisible} isOpenFunc={() => { setAddFoodVisible(false) }} />
                <ModalShowDetails isOpen={detailsVisible} isOpenFunc={() => { setdetailsVisible(false) }} />
                <ModalAddImage isOpen={addImageVisible} isOpenFunc={() => { setAddImageVisible(false) }} setFoodImage={setFoodImage} />

            </View>
        </Modal>
    )
}

export default ModalAddDish

const styles = StyleSheet.create({
    body: {
        height: height,
        width: width,
        alignItems: "center",
        justifyContent: "space-between",
    },
    packet: {
        borderWidth: 4,
        marginBottom: 10,
        height: height * 0.5,
        paddingBottom: 6
    },

    packet2: {
        borderWidth: 4,
        borderColor: "#eee",
        marginBottom: 10,
        height: height * 0.23,
        justifyContent: "center",
    },

    inputBox: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginVertical: 5
    },
    middlePartHeadBody: {
        gap: 10
    },
    middlePartHead: {
        flexDirection: "row",
        marginVertical: 12,
        justifyContent: "center",
        alignItems: "center",
        gap: 20,

    },
    middlePartIcon: {
        height: 40,
        width: 40,
    },
    input: {
        borderWidth: 1,
        borderRadius: 12,
        width: width * 0.7,
        padding: 16,

    },
    cart: {
        borderRadius: 12,
        paddingVertical: 8,
        paddingHorizontal: 20,
    },
    cartTop: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    cartBotton: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 10,
        alignItems: "center"
    },

    cartRightIcon: {
        width: 16,
        height: 16,
    },

    cartRightIconView: {
        padding: 8,
        borderRadius: 50,
        alignItems: "center",
        justifyContent: "center"
    },
    kcalInput: {
        fontSize: 10,
    },
    saveBtn: {
        width: width * 0.66,
        borderRadius: 12,
        paddingVertical: 10,
        alignItems: "center",
        justifyContent: "center",
        height: 50,
        zIndex: 2
    },
})