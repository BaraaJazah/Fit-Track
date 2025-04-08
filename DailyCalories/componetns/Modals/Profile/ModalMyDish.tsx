import { Button, Dimensions, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useRef } from 'react'
import { HeaderPages } from '../../../componetns/screens/home'
import { useRouter } from 'expo-router'
import { Packet } from '../../../componetns/common'
import { TabView } from '../../../componetns/screens/home'
import { useAppSelector } from '../../../hooks/storeHook'
import Modal from 'react-native-modal';


const { width, height } = Dimensions.get("window")

const ModalMyDish = ({ isOpen = false, setIsOpen }) => {
    const router = useRouter()
    const ref = useRef();
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
            style={{ margin: 0 }}
        >
            <View style={[styles.body, { backgroundColor: themeData['background-secondary-2'] }]}>

                <HeaderPages onpress={() => { setIsOpen(false) }} header='My Dishs' title='My Dishs ' text='Embark on a journey of mindfulness with our Mindful Moments Meditation.' />
                <Packet packetStyle={[styles.packet, { borderColor: themeData['background-secondary'] }]}>
                    <TabView />
                </Packet>

            </View>
        </Modal>
    )
}

export default ModalMyDish

const styles = StyleSheet.create({
    body: {
        height: height,
        width: width,
        alignItems: "center"
    },
    packet: {
        borderWidth: 4,

        height: height * 0.74 - 6,
        padding: 8,


    },

})