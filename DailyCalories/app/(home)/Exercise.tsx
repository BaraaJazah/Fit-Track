import { Button, Dimensions, FlatList, Image, Modal, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/storeHook'
import { backWhite, details, love, plusWhite, search } from '../../assets/icons/home'
import PagerView from 'react-native-pager-view'
import { AddFoodTabView, Header, } from '../../componetns/screens/home'
import AddFoodTabBtn from '../../componetns/common/AddFoodTabBtn'
import { actGetFoods } from '../../store/food/foodSlice'
import { DishCart, DishCartLove, DishCartMini } from '../../componetns/common'
import { ExerciseCart } from '../../componetns/screens/Exercise'
import { actGetExercise } from '../../store/exercise/exerciseSlice'

const { width, height } = Dimensions.get("window")

const Exercise = ({ isOpen = false, isOpenFunc }) => {
    const { themeData } = useAppSelector(state => state.theme)
    // const { foods, error, loading, } = useAppSelector(state => state.foods)
    const { exercises, error, loading } = useAppSelector(state => state.exercise)
    const { userData } = useAppSelector(state => state.goal)
    const weight = userData.userData.weight === 0 ? 70 : userData.userData.weight

    const [searchInput, setSearchInput] = useState("")
    const [showSearchView, setShowSearchView] = useState(false)



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
        if (exercises.length < 1) {
            dispatch(actGetExercise()).unwrap()
                .then((res) => { })
                .catch((e) => { })
                .finally(() => { })
        }
    }, [dispatch])


    return (

        <View style={[styles.centeredView, { backgroundColor: themeData['background-secondary-2'] }]}>
            <View style={{ gap: 20, justifyContent: "center", alignItems: "center", }}>
                <View style={{ backgroundColor: themeData['background-secondary-2'], width: width, alignItems: "center", zIndex: 2 }}>
                    <Header onPress={() => { }} />

                </View>

                <View style={{}}>
                    <View style={[styles.searchView, { borderColor: themeData['background-secondary'] }]}>
                        <Image style={{ width: 20, height: 20 }} source={search} />

                        <TextInput
                            style={[styles.input,]}
                            onChangeText={text => { onSearchHandler(text) }}
                            value={searchInput}
                            placeholder="Exercise Name"
                            placeholderTextColor={themeData['text-secondary']}
                        />
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

                <SafeAreaView style={styles.container}>
                    <FlatList
                        data={exercises}
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
                            exercises.map((item, index) => (

                                <>
                                    <ScrollView>
                                        <View key={index} style={{ width: width, height: "100%", alignItems: "center", marginTop: 10 }}>
                                            {
                                                item.exercises.map((item, index) => {
                                                    return <ExerciseCart key={index} data={item} weight={weight} />

                                                })
                                            }
                                        </View>
                                    </ScrollView>

                                </>
                            ))
                        }

                    </PagerView>
                </SafeAreaView>
            </View>
        </View>
    )
}


const TabPage = ({ cartWithLove = false, data }) => {
    const { themeData } = useAppSelector(state => state.theme)
    const [showList, setShowList] = useState(null)

    return (
        <View style={{ flex: 1, alignItems: "center", }}>

            <View style={{ flex: 0.1, alignItems: "center", }}>

                {cartWithLove ? <DishCartLove data={data} iconLeft={love} /> : <></>}

                <View style={{ height: 10 }}></View>

            </View>
        </View >
    )
}



export default Exercise

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: '#fff',

    },
    modalView: {
        height: height,
        width: width,
        backgroundColor: 'white',
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
        justifyContent: 'center',

    },
    pager: {
        flex: 1,
        alignSelf: "stretch",
        width: width,
    }
})