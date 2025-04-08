import { ActivityIndicator, Button, Dimensions, FlatList, Image, KeyboardAvoidingView, Modal, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/storeHook'
import { backWhite, love, plusWhite, search } from '../../assets/icons/home'
import PagerView from 'react-native-pager-view'
import { AddFoodTabView, Header, HeaderPages, } from '../../componetns/screens/home'
import AddFoodTabBtn from '../../componetns/common/AddFoodTabBtn'
import { actGetFoods } from '../../store/food/foodSlice'
import { DishCartMini } from '../../componetns/common'
import { AddDailyFoodTabView } from '../screens/Add'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'


const { width, height } = Dimensions.get("window")

const ModalAddFood = ({ name, isOpen = false, isOpenFunc }) => {
    const { themeData } = useAppSelector(state => state.theme)
    const { userDaily } = useAppSelector(state => state.user)


    const { foods, error, loading, } = useAppSelector(state => state.foods)
    const [searchInput, setSearchInput] = useState("")
    const [showSearchView, setShowSearchView] = useState(false)
    const [showViewPager, setShowViewPager] = useState(false)

    const [isSelected, setIsSelected] = useState(0)

    const dispatch = useAppDispatch();
    const ref = useRef();


    const onSearchHandler = (text) => {
        setSearchInput(text)
        // console.log(searchInput)

        if (text.length === 0) {
            setShowSearchView(false)
        } else {
            setShowSearchView(true)
        }
    }

    useEffect(() => {
        if (foods.length < 1) {
            dispatch(actGetFoods()).unwrap()
                .then((res) => { })
                .catch((e) => { })
                .finally(() => { })
        }
    }, [dispatch])


    useEffect(() => {
        if (isOpen) {
            setTimeout(() => setShowViewPager(true), 300); // تأخير ظهور الـ ViewPager
        } else {
            setShowViewPager(false);
        }
    }, [isOpen]);


    const [foodsData1, setfoodsData1] = useState([]);
    let foodData = []

    useEffect(() => {

        if (name === "breakfast") {
            foodData = userDaily?.breakfast

        } else if (name === "dinner") {
            foodData = userDaily?.dinner
        }
        else if (name === "lunch") {
            foodData = userDaily?.lunch
        }
        else if (name === "snack") {
            foodData = userDaily?.snack
        }

        setfoodsData1(foodData)
    }, [userDaily, name])



    return (

        <Modal
            animationType="fade"
            transparent={true}
            visible={isOpen}
        >

            <KeyboardAvoidingView style={{ flex: 1, position: "absolute" }} >

                <View style={styles.centeredView}>
                    <View style={[styles.modalView, { gap: 20, justifyContent: "center", alignItems: "center", backgroundColor: themeData['background-secondary-2'] }]}>

                        <TouchableOpacity onPress={isOpenFunc} style={[styles.closeBtn, { backgroundColor: themeData['background-primary'] }]} >
                            <Image source={plusWhite} style={{ width: 16, height: 16, transform: [{ rotate: '45deg' }] }} />
                        </TouchableOpacity>

                        <View style={{}}>
                            <View style={[styles.searchView, { borderColor: themeData['background-secondary'] }]}>
                                <Image style={{ width: 20, height: 20 }} source={search} />

                                <TextInput
                                    style={[styles.input,]}
                                    onChangeText={text => { onSearchHandler(text) }}
                                    value={searchInput}
                                    placeholder="search ..."
                                    placeholderTextColor={themeData['text-secondary']}
                                />
                                <View style={{ backgroundColor: themeData['background-primary'], width: 28, height: 28, borderRadius: 50, alignItems: "center", justifyContent: "center" }}>
                                    <Text style={{ color: themeData['background-secondary'] }}>{foodsData1.length}</Text>
                                </View>
                            </View>

                            {/* Results For Search */}

                            <View style={{ display: showSearchView ? "flex" : "none" }}>

                                <FlatList
                                    data={Array(4).fill(0)}
                                    style={{
                                        width: width * 0.8, maxHeight: 200, backgroundColor: themeData['background-secondary-2'],
                                        position: "absolute",
                                        top: 2, zIndex: 2,
                                        borderRadius: 12,
                                        // paddingVertical: 10
                                    }}
                                    showsVerticalScrollIndicator={false}
                                    // horizontal={true}
                                    fadingEdgeLength={20}
                                    keyExtractor={(item) => item.id}
                                    renderItem={({ item, index }) => {
                                        return (
                                            <>
                                                <DishCartMini iconOne={love} iconTwo={backWhite} onPressOne={() => { }} onPressTwo={() => { }} />
                                                {/* <View style={{ height: 20 }}></View> */}

                                            </>
                                        )
                                    }}
                                />

                            </View>

                        </View>

                        {showViewPager ?
                            <SafeAreaView style={styles.container}>
                                <FlatList
                                    data={foods}
                                    style={{
                                        maxHeight: height * 0.13,
                                        borderRadius: 12, width: width * 0.9,
                                    }}
                                    showsHorizontalScrollIndicator={false}
                                    horizontal={true}
                                    fadingEdgeLength={20}
                                    keyExtractor={(item) => item.id.toString()}
                                    renderItem={({ item, index }) => {
                                        return (
                                            <>
                                                <AddFoodTabBtn key={index} onPress={() => { ref.current?.setPage(index) }} active={isSelected == index ? true : false} image={item.image} title={item.name} />
                                            </>
                                        )
                                    }}
                                />

                                <PagerView
                                    style={[styles.pager, {}]}
                                    ref={ref}
                                    initialPage={0}
                                    onPageSelected={(e) => {
                                        const selectedPage = e.nativeEvent.position;
                                        setIsSelected(selectedPage);
                                    }}

                                >
                                    {
                                        foods.map((item, index) => (

                                            <>
                                                <View key={index} style={{ width: width, height: "100%", }}>
                                                    <AddDailyFoodTabView name={name} data={item.categories} />
                                                </View>

                                            </>
                                        ))
                                    }

                                </PagerView>

                            </SafeAreaView>
                            :

                            <SafeAreaView style={styles.container}>
                                <ActivityIndicator size="large" hidesWhenStopped={false} animating={true} color="#0000ff" />
                            </SafeAreaView>
                        }

                    </View>

                </View>

            </KeyboardAvoidingView>


        </Modal>

    )
}

export default ModalAddFood

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        width: width,
        height: height,
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0,0.5)',

    },
    modalView: {
        height: height * 0.8,
        width: width,

        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        alignItems: 'center',

    },
    searchView: {
        height: 50,
        width: width * 0.8,
        borderRadius: 12,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 14,
        borderWidth: 2,

    },
    input: {
        borderRadius: 12,
        flex: 1,
        padding: 12,

    },

    closeBtn: {
        backgroundColor: "red",
        borderRadius: 50,
        padding: 10,
        transform: [{ translateY: -18 }]

    },

    container: {
        flex: 1,
        alignItems: 'center',
        // justifyContent: 'center',

    },
    pager: {
        flex: 1,
        alignSelf: "stretch",
        width: width,
    }
})

// 