import { Dimensions, StyleSheet, Text, View, Modal } from 'react-native'
import React, { useEffect, useState } from 'react'
import WheelPickerExpo from 'react-native-wheel-picker-expo';
import { Button } from 'native-base';
import { useAppDispatch, useAppSelector } from '../../../hooks/storeHook';
import { updateFoodQuan } from '../../../store/user/userSlice';

const { width, height } = Dimensions.get("window")

const ModalSelectGram = ({ isOpen, setIsOpen, foodData, name, type, maxValue }) => {

    const dispatch = useAppDispatch();
    const { userDaily } = useAppSelector(state => state.user)
    const { themeData } = useAppSelector(state => state.theme)

    const [selectedValue, setSelectedValue] = useState(0);

    console.log(foodData.value)

    const onSaveHandler = (() => {

        if (selectedValue.item?.value && selectedValue.item?.value !== 0) {
            const data = {
                meal: name,
                mealData: {
                    id: foodData.id,
                    newQuan: selectedValue.item.value
                }
            }

            dispatch(updateFoodQuan(data));
        }
        setSelectedValue(0)
        setIsOpen(false)
    })



    return (

        <Modal
            visible={isOpen}
            animationType='slide'
            transparent={true}
        >
            <View
                style={styles.body}
            >
                <View style={{
                    width: width, height: width, backgroundColor: themeData['background-secondary-2'],
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 20,
                }}>
                    <Text style={{ color: themeData['text-primary'] }}>Select How Many Gram You Need </Text>


                    <View style={{ paddingVertical: 30, }}>
                        <WheelPickerExpo

                            containerStyle={{
                                backgroundColor: themeData['background-primary'],  // غير اللون هنا
                                borderRadius: 10,  // اختيارية لإضافة زوايا دائرية
                                padding: 10
                            }}
                            items={[...Array(maxValue).keys()].map(num => ({ label: `${((num + 1) * 10)} ${type}`.toString(), value: ((num + 1) * 10) }))}
                            selectedValue={selectedValue}
                            onChange={setSelectedValue}
                        />
                    </View>
                    <Button onPress={onSaveHandler} >Ok</Button>
                </View>
            </View>


        </Modal>
    )
}

export default ModalSelectGram

const styles = StyleSheet.create({
    body: {
        margin: 0, width, height, alignItems: "center",
        justifyContent: "center", backgroundColor: "rgba(0,0,0,0.5)",
    }
})


