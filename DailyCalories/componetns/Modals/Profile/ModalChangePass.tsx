import { StyleSheet, Text, View, Button, Dimensions, Image, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import Modal from 'react-native-modal';
import { Btn, HeaderBack } from '../../common';
import { me } from '../../../assets/images';
import { useAppSelector } from '../../../hooks/storeHook';
import { Box, FormControl, Input, WarningOutlineIcon } from 'native-base';
import { camera } from '../../../assets/icons/add';
import { eye } from '../../../assets/icons';
import { color } from 'native-base/lib/typescript/theme/styled-system';



const { width, height } = Dimensions.get("window")

const ModalChangePass = ({ isOpen, setIsOpen }) => {

    const { themeData } = useAppSelector(state => state.theme)


    return (
        <Modal
            isVisible={isOpen}
            onBackButtonPress={() => setIsOpen(false)}
            onBackdropPress={() => setIsOpen(false)}
            animationIn="fadeInRight"
            animationOut="fadeOutRight"
            animationInTiming={500} // مدة فتح المودال (افتراضي 500)
            animationOutTiming={500} // مدة إغلاق المودال
            // backdropOpacity={1}
            style={{ margin: 0 }
            }
        >
            <View style={[styles.container, { backgroundColor: themeData['background-secondary-2'] }]}>
                <View >
                    <HeaderBack onPress={() => { setIsOpen(false) }} title={"Change Password"} />
                </View>

                <View style={{ marginVertical: 10 }}>
                    <View style={[styles.input, {
                        borderColor: themeData['background-secondary'],
                        flexDirection: "row", justifyContent: "space-between", alignItems: "center"
                    }]} >
                        <TextInput
                            style={{ width: "90%", color: "#999" }}
                            // onChangeText={onChangeText}
                            // value={text}
                            placeholder='Old Password'
                            placeholderTextColor={"#999"}
                            autoCapitalize={'none'}
                        />
                        <Image source={eye} />
                    </View>

                    <View style={[styles.input, {
                        borderColor: themeData['background-secondary'],
                        flexDirection: "row", justifyContent: "space-between", alignItems: "center"
                    }]} >
                        <TextInput
                            style={{ width: "90%", color: "#ccc" }}
                            // onChangeText={onChangeText}
                            // value={text}
                            placeholder='New Password'
                            placeholderTextColor={"#999"}
                            autoCapitalize={'none'}
                        />
                        <Image source={eye} />
                    </View>

                    <View style={[styles.input, {
                        borderColor: themeData['background-secondary'],
                        flexDirection: "row", justifyContent: "space-between", alignItems: "center"
                    }]} >
                        <TextInput
                            style={{ width: "90%", color: "#ccc" }}
                            // onChangeText={onChangeText}
                            // value={text}
                            placeholderTextColor={"#999"}
                            placeholder='Confirm New Password'
                            autoCapitalize={'none'}
                        />
                        <Image source={eye} />
                    </View>

                    <Btn onPress={() => { }} bgColor="background-primary" text='Save' textColor='#ccc'
                        btnStyle={{ width: width * 0.84, marginTop: 20 }}
                        btnTextStyle={{ color: "#fff" }}
                    />

                </View>

            </View>
        </Modal>
    )
}

export default ModalChangePass

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        width, height,
        alignItems: "center",
    },

    image: {
        width: 140,
        height: 140,
        borderRadius: 70,
    },
    titleText1: {
        fontSize: 22,
        fontWeight: 600
    },
    titleText2: {
        fontSize: 14,

    },
    input: {
        width: width * 0.84,
        borderRadius: 12,
        borderWidth: 2,
        padding: 4,
        paddingHorizontal: 16,
        marginVertical: 10,


    },
})