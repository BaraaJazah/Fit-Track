import { useRef, useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, Button, Touchable, TouchableOpacity, Dimensions, ScrollView, Image } from 'react-native';
import PagerView from 'react-native-pager-view';
import { AddFood, OwnDishCart, TabBtn } from '../../common';
import { useAppSelector } from '../../../hooks/storeHook';
import { salad } from '../../../assets/icons/Foods';
import { dots } from '../../../assets/icons/home';
import { useRouter } from 'expo-router';
import { ModalAddDish } from '../../Modals';

const { width, height } = Dimensions.get("window");

const TabView = () => {
    const ref = useRef();
    const { themeData } = useAppSelector(state => state.theme)
    const [isSelected, setIsSelected] = useState(0)


    return (
        <SafeAreaView style={[styles.container]}>

            <ScrollView
                style={styles.btns}
                contentContainerStyle={{ gap: width * 0.05, }} // when use it the scroll will don't move
                fadingEdgeLength={20}	// make fade in top and botton
                scrollEnabled={true}	// make scroll anable
                horizontal={true}   	// make scroll in horizantal
                showsHorizontalScrollIndicator={false}
            >
                <TabBtn onPress={() => { ref.current?.setPage(0) }} active={isSelected == 0 ? true : false} title={"Breakafast"} />
                <TabBtn onPress={() => { ref.current?.setPage(1) }} active={isSelected == 1 ? true : false} title={"dinner"} />
                <TabBtn onPress={() => { }} active={isSelected == 3 ? true : false} title={"sweet"} />
                <TabBtn onPress={() => { }} active={isSelected == 4 ? true : false} title={"snack"} />

            </ScrollView>
            <PagerView
                style={[styles.pager,]}
                ref={ref}
                initialPage={0}
                onPageSelected={(e) => {
                    const selectedPage = e.nativeEvent.position;
                    setIsSelected(selectedPage);
                }}
            >
                <ScrollView key="1"
                    fadingEdgeLength={20}	// make fade in top and botton
                    scrollEnabled={true}	// make scroll anable
                    showsVerticalScrollIndicator={false}
                >
                    <TabPage name={"Breakafast"} />
                </ScrollView>

                <ScrollView key="2"
                    fadingEdgeLength={20}	// make fade in top and botton
                    scrollEnabled={true}	// make scroll anable
                    showsVerticalScrollIndicator={false}
                >
                    <TabPage name={"Dinner"} />
                </ScrollView>
            </PagerView>

        </SafeAreaView>
    )
}

export default TabView




const TabPage = ({ name }) => {
    const { themeData } = useAppSelector(state => state.theme)
    const [showList, setShowList] = useState(null)
    const [showAddDish, setShowAddDish] = useState(false)

    const router = useRouter()

    return (
        <View style={{ flex: 1, marginTop: 10, alignItems: "center", }}>
            <View style={{ flex: 0.2 }}>
                {/* <AddFood onPress={() => { router.push("/(homeScreens)/AddDish") }} type={name} Recomended={675} color={themeData['background-primary']} /> */}
                <AddFood onPress={() => { setShowAddDish(true) }} type={name} Recomended={675} color={themeData['background-primary']} />

            </View>

            <View style={{ flex: 0.85, marginTop: 20, alignItems: "center", }}>
                <OwnDishCart />
                <OwnDishCart />
            </View>


            <ModalAddDish name={name} isOpen={showAddDish} setIsOpen={setShowAddDish} />

        </View >
    )
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,

    },

    btns: {
        width: width * 0.85,

    },
    pager: {
        alignSelf: "stretch",
        height: (height * 0.63),
    },
    foodText1: {
        fontSize: 16
    },
    foodText2: {
        fontSize: 10

    },

})