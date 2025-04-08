import { Dimensions, Image, KeyboardAvoidingView, KeyboardAvoidingViewBase, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { CycleDisplayData, HeaderPages } from '../../screens/home'
import { Btn, Packet } from '../../common'
import { useAppDispatch, useAppSelector } from '../../../hooks/storeHook'
import SelectDropdown from 'react-native-select-dropdown'
import { dropDown } from '../../../assets/icons/home'
import { useRouter } from 'expo-router'
import Toast from 'react-native-toast-message'
import { calcNeedKcal } from '../../../hooks'
import Loading from '../../feedback/loading1'
import { Dropdown } from 'react-native-element-dropdown';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { actReset, actSetGoals } from '../../../store/goal/goalSlice'
import Modal from 'react-native-modal';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'


const { width, height } = Dimensions.get("window")

const ModalCalcNeeds = ({ isOpen = false, setIsOpen }) => {
    const { themeData } = useAppSelector(state => state.theme)
    const dispatch = useAppDispatch()
    const router = useRouter()

    const gender = [
        { title: 'man' },
        { title: 'woman' },
    ];
    const data = [
        { id: "1", label: 'Maintaining Weight', goal: 0, type: "normal" },
        { id: "2", label: 'Losing 0.25 KG Per Week', goal: 251, type: "loss" },
        { id: "3", label: 'Losing 0.5 KG Per Week', goal: 501, type: "loss" },
        { id: "4", label: 'Losing 0.75 KG Per Week', goal: 751, type: "loss" },
        { id: "5", label: 'Losing 1 KG Per Week', goal: 1001, type: "loss" },
        { id: "6", label: 'Gaining 0.25 KG Per Week', goal: 250, type: "won" },
        { id: "7", label: 'Gaining 0.5 KG Per Week', goal: 500, type: "won" },
        { id: "8", label: 'Gaining 0.75 KG Per Week', goal: 750, type: "won" },
        { id: "9", label: 'Gaining 1 KG Per Week', goal: 1000, type: "won" },
    ];

    const [isloading, setIsLoading] = useState(false)
    const [delayToast, setDelayToast] = useState(false);

    const [genderValue, setGenderValue] = useState(gender[0].title);
    const [isFocus, setIsFocus] = useState(false);

    const [personData, setPersonData] = useState({
        age: 0,
        gender: gender[0].title,
        weight: 0,
        height: 0,
        type: "normal",
        goal: 0
    })

    const [personNeeds, setPersonNeeds] = useState({
        kcal: 0,
        Protein: 0,
        fats: 0,
        carbs: 0
    })

    const resetData = () => {
        setPersonData({
            age: 0,
            gender: gender[0].title,
            weight: 0,
            height: 0,
            type: "normal",
            goal: 0
        });
        setPersonNeeds({
            kcal: 0,
            Protein: 0,
            fats: 0,
            carbs: 0
        })
    }

    const claculatorGetData = (field, value) => {
        setPersonData(
            {
                ...personData,
                [field]: value
            }
        )
    }

    const showToast = (item) => {
        Toast.show({
            type: 'error',
            text1: 'Error',
            text2: `${item} `,
            position: 'bottom'
        });
    }

    const showToastSuccess = (item) => {
        Toast.show({
            type: 'success',
            text1: 'Success',
            text2: `${item} `,
            position: 'bottom'
        });
    }

    const claculatorBtnHandler = () => {
        setDelayToast(true)

        setTimeout(() => {
            if (personData.age < 12 || personData.age > 90) {

                showToast("Your age must be between 12 to 90")

            } else if (personData.height < 50 || personData.height > 275) {

                showToast("Your height must be between 50 to 275")

            } else if (personData.weight < 10 || personData.weight > 700) {

                showToast("Your weight must be between 10 to 700")

            } else {
                setIsLoading(true)
                setPersonNeeds(calcNeedKcal(personData.gender as "man" | "woman", personData.type as "normal" | "loss" | "won", personData.goal as 0 | 250 | 500 | 500 | 750 | 1000, personData.height, personData.weight, personData.age))

                const timerId = setInterval(() => {
                    setIsLoading(false)
                }, 100);

                return () => clearInterval(timerId);
            }

        }, 100);
    }

    const saveGoal = () => {
        setDelayToast(true);
        setTimeout(() => {
            // console.log(personNeeds)
            const mergeData = {
                ...personNeeds,
                userData: personData
            }


            if (personNeeds?.Protein === 0 && personNeeds.carbs === 0 && personNeeds.fats === 0 && personNeeds.kcal === 0) {
                showToast("Your must add your data to calculate your goal ")

            } else {

                dispatch(actSetGoals(mergeData))
                showToastSuccess("Goal Saved Successfully")
            }

        }, 200);

    }
    return (
        <Modal

            isVisible={isOpen}
            onBackButtonPress={() => { resetData(); setDelayToast(false); setIsOpen(false) }}
            onBackdropPress={() => { resetData(); setDelayToast(false); setIsOpen(false) }}
            animationIn="fadeIn"
            animationOut="fadeOut"
            style={{ margin: 0 }
            }
        >
            <KeyboardAwareScrollView style={{ flex: 1 }} extraHeight={100}>

                <View style={[styles.body, { backgroundColor: themeData['background-secondary-2'], }]}>
                    <HeaderPages onpress={() => { resetData(); setDelayToast(false); setIsOpen(false) }} header='Calc Calories need' title='Calc Calories Need ' text='Embark on a journey of mindfulness with our Mindful Moments Meditation.' />
                    <Packet packetStyle={[styles.packet, { borderColor: themeData['background-secondary'] }]}>

                        <View style={styles.inputBox}>
                            <Text style={{ color: themeData['text-secondary'], fontSize: 12 }}>How old are you?</Text>
                            <TextInput
                                style={[styles.input, { borderColor: themeData['background-secondary'], color: themeData['text-secondary'] }]}
                                onChangeText={(text) => { claculatorGetData("age", text) }}
                                // value={personData?.age.toString()}
                                placeholder='0'
                                placeholderTextColor={themeData['text-primary']}
                                textAlign="center"
                                autoCapitalize={'none'}
                                keyboardType='number-pad'
                                maxLength={2}
                            />
                        </View>

                        <View style={styles.inputBox}>
                            <Text style={{ color: themeData['text-secondary'], fontSize: 12 }}>What is your gender?</Text>

                            <Dropdown
                                style={[styles.input, { borderColor: themeData['background-secondary'], }]}
                                placeholderStyle={{ color: themeData['background-secondary'] }}
                                selectedTextStyle={{
                                    color: themeData['text-secondary'], fontSize: 10,
                                    textTransform: "capitalize",
                                }}
                                renderItem={(item, selected) => (
                                    <View
                                        style={{
                                            backgroundColor: selected ? themeData['background-secondary'] : themeData['background-secondary-2'],
                                            padding: 10,
                                        }}
                                    >
                                        <Text
                                            style={{
                                                color: themeData['text-primary'],
                                                fontSize: 12
                                            }}
                                        >
                                            {item.title}
                                        </Text>
                                    </View>
                                )}
                                iconStyle={styles.iconStyle}
                                itemTextStyle={{ color: themeData['text-secondary'], fontSize: 12, }}
                                data={gender}
                                itemContainerStyle={{ backgroundColor: themeData['background-secondary'], }}
                                maxHeight={200}
                                labelField="title"
                                valueField="title"
                                value={genderValue}
                                onChange={item => {
                                    setGenderValue(item.title);
                                    claculatorGetData("gender", item.title)
                                }}



                            />

                        </View>

                        <View style={styles.inputBox}>
                            <Text style={{ color: themeData['text-secondary'], fontSize: 12 }}>What is your current weight (kg) ?</Text>
                            <TextInput
                                style={[styles.input, { borderColor: themeData['background-secondary'], color: themeData['text-secondary'] }]}
                                onChangeText={(text) => { claculatorGetData("weight", text) }}
                                // value={personData?.weight.toString()}
                                placeholder='0'
                                textAlign="center"
                                placeholderTextColor={themeData['text-primary']}
                                autoCapitalize={'none'}
                                keyboardType='number-pad'
                                maxLength={3}
                            />
                        </View>

                        <View style={styles.inputBox}>
                            <Text style={{ color: themeData['text-secondary'], fontSize: 12 }}>What is your height (cm) ? </Text>
                            <TextInput
                                style={[styles.input, { borderColor: themeData['background-secondary'], color: themeData['text-secondary'] }]}
                                onChangeText={(text) => { claculatorGetData("height", text) }}
                                // value={personData?.height.toString()}
                                placeholder='0'
                                placeholderTextColor={themeData['text-primary']}
                                textAlign="center"
                                autoCapitalize={'none'}
                                keyboardType='number-pad'
                                maxLength={3}

                            />
                        </View>

                        <View style={{ width: width * 0.84, justifyContent: "center", alignItems: "center", }}>
                            <View style={{ width: width * 0.84, marginVertical: 10, }}>
                                <Dropdown
                                    style={[styles.dropdown, isFocus && { borderColor: themeData['background-primary'], borderWidth: 2 }]}
                                    placeholderStyle={{ color: "#999", marginLeft: 10, }}
                                    selectedTextStyle={{ color: "#999", marginLeft: 10, fontSize: 14 }}
                                    iconStyle={styles.iconStyle}
                                    itemTextStyle={{ color: "#999", fontSize: 14, }}

                                    renderItem={(item, selected) => (
                                        <View
                                            style={{
                                                backgroundColor: selected ? themeData['background-secondary'] : themeData['background-secondary-2'],
                                                padding: 16,

                                            }}
                                        >
                                            <Text
                                                style={{
                                                    color: themeData['text-primary'],
                                                    fontSize: 12
                                                }}
                                            >
                                                {item.label}
                                            </Text>
                                        </View>
                                    )}

                                    autoScroll={false}
                                    itemContainerStyle={{ backgroundColor: themeData['background-secondary'], }}

                                    data={data}
                                    maxHeight={200}
                                    labelField="label"
                                    valueField="goal"
                                    placeholder={!isFocus ? 'Select item' : '...'}
                                    value={personData.goal}
                                    onFocus={() => setIsFocus(true)}
                                    onBlur={() => setIsFocus(false)}
                                    onChange={item => {
                                        // setValue(item.goal);
                                        setIsFocus(false);
                                        setPersonData(
                                            {
                                                ...personData,
                                                goal: item.goal,
                                                type: item.type
                                            }
                                        )
                                    }}
                                    renderLeftIcon={() => (
                                        <FontAwesome6
                                            style={{ marginLeft: 8, }}
                                            name="weight-scale"
                                            size={18}
                                            color={isFocus ? themeData['background-primary'] : '#999'}
                                        />
                                    )}
                                />
                            </View>
                        </View>

                        <Btn disabled={isloading} onPress={claculatorBtnHandler} text={isloading ? 'Calculate ...' : 'Calculate'} textColor={'background-secondary-2'} bgColor={'background-primary'}
                            btnStyle={{ width: width * 0.8, margin: 10 }}
                            btnTextStyle={{ color: "#fff" }}
                        />

                    </Packet >

                    <Loading loading={isloading ? "pending" : "idle"}>

                        <Packet packetStyle={[styles.packetTow, { justifyContent: "center", gap: 5, borderColor: themeData['background-secondary'] }]}>

                            <CycleDisplayData color={themeData['background-primary']} text1={`${personNeeds.kcal}`} text2={'Kcal'} />
                            <CycleDisplayData color={themeData['secondary-meal1']} text1={`${personNeeds.Protein}g`} text2={'Protein'} />
                            <CycleDisplayData color={themeData['secondary-meal2']} text1={`${personNeeds.fats}g`} text2={'Fats'} />
                            <CycleDisplayData color={themeData['secondary-meal3']} text1={`${personNeeds.carbs}g`} text2={'Carbs'} />

                        </Packet>
                    </Loading>

                    <View style={[styles.saveView, { flex: 1, alignItems: "center", }]} >
                        <TouchableOpacity onPress={saveGoal} style={[styles.saveBtn, { backgroundColor: themeData['background-primary'] }]}>
                            <Text style={[styles.saveBtnText, { color: "#fff" }]}>Save As Goal</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{ position: "absolute", bottom: 0, zIndex: 400 }}>
                        {
                            delayToast ? <Toast /> : ""
                        }

                    </View>

                </View >


            </KeyboardAwareScrollView>

        </Modal>

    )
}

export default ModalCalcNeeds

const styles = StyleSheet.create({
    body: {
        height: height,
        width: width,
        alignItems: "center"
    },
    packet: {
        borderWidth: 4,
        borderColor: "#eee",
        marginBottom: 10,
    },
    inputBox: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginVertical: 5
    },
    input: {
        borderWidth: 1,
        width: 100,
        height: 40,
        borderRadius: 12,
        fontSize: 12,
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        paddingHorizontal: 14
    },

    dropdownMenuStyle: {
        backgroundColor: '#E9ECEF',
        borderRadius: 8,
    },
    dropdownItemStyle: {
        width: '100%',
        flexDirection: 'row',
        paddingHorizontal: 12,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 8,
    },

    // packet Tow
    packetTow: {
        borderWidth: 4,
        borderColor: "#eee",
        marginBottom: 10,
        flexDirection: "row",
        justifyContent: "space-around",
        flexWrap: "wrap",
        rowGap: 20,
        paddingTop: 15,
    },
    packetTowpart: {
        flexDirection: "row",
        width: width * 0.4,
        alignItems: "center",
        justifyContent: "center",
    },

    packetTowpartView1: {
        width: 30,
        height: 30,
        borderRadius: 50,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 4,
        marginRight: 16
    },

    packetTowResult: {
        width: width * 0.24,
        height: 70,
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center",
    },


    // botton Btn and Input

    saveView: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        height: 60,

    },


    saveBtn: {
        width: width * 0.8,
        borderRadius: 12,
        paddingVertical: 10,
        alignItems: "center",
        justifyContent: "center",
        height: 50,
        zIndex: 2
    },
    saveBtnText: {
        // padding: 10,

    },



    saveInput: {
        borderRadius: 12,
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,

    },
    saveInputInput: {
        borderWidth: 2,
        width: 100,
        height: 50,
        borderRadius: 12,
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
        transform: [{ translateX: -2 }]

    },














    container: {
        backgroundColor: 'white',
        padding: 16,
    },
    dropdown: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
    },

    label: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 16,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },












})