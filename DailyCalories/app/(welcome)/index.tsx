import { Button, Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useRef, useState } from 'react'
import { useRouter } from 'expo-router'
import { useAppSelector } from '../../hooks/storeHook';
import { Slider, Welcome1, Welcome2, Welcome3 } from '../../componetns/screens/welcome';
import Animated, { useAnimatedScrollHandler, useSharedValue, withSpring } from 'react-native-reanimated'
import { Btn } from '../../componetns/common';
import { logo } from '../../assets/images';
import { salad, food10, food5, food4, food6 } from '../../assets/icons/Foods';


const { width, height } = Dimensions.get("window")

const index = () => {
    const router = useRouter();
    const { themeData } = useAppSelector(state => state.theme)

    const translateX = useSharedValue(1)
    const scrollHandler = useAnimatedScrollHandler((event) => {
        translateX.value = withSpring(event.contentOffset.x);
    });


    const scrollViewRef = useRef(null);
    const [currentPage, setCurrentPage] = useState(0);
    const totalPages = 3; // عدد الصفحات

    const goNext = () => {
        if (currentPage < totalPages - 1) {
            const nextPage = currentPage + 1;
            scrollViewRef.current?.scrollTo({ x: nextPage * width, animated: true });
            setCurrentPage(nextPage);
        }
    };

    const goBack = () => {
        if (currentPage > 0) {
            const prevPage = currentPage - 1;
            scrollViewRef.current?.scrollTo({ x: prevPage * width, animated: true });
            setCurrentPage(prevPage);
        }
    };


    return (
        <>

            <View style={{ width: width, height: height }}>

                <View style={{ width: width, height: height, backgroundColor: themeData['background-primary'], alignItems: "center", }}>
                    <View style={[styles.topPart, { justifyContent: "center" }]}>
                        <Image source={food4} style={{ width: 300, height: 300 }} />
                    </View>
                    <View style={[styles.buttonPart, { backgroundColor: themeData['background-secondary-2'] }]}>
                        <Animated.ScrollView
                            horizontal={true}
                            ref={scrollViewRef}
                            onScroll={scrollHandler}
                            scrollEventThrottle={16} // 1000 ms / 60frame = 16 (frame in seconde) " update onScroll func each 16 ms " 
                            pagingEnabled            // جعل التمرير بين الصفحات من صفحه الى صفحه ولن يكون سلسا
                            showsHorizontalScrollIndicator={false}
                            scrollEnabled={false} // منع السحب باليد
                        >
                            <Welcome1 translateX={translateX} key={1} index={1} />
                            <Welcome2 translateX={translateX} key={2} index={2} />
                            <Welcome3 translateX={translateX} key={3} index={3} />

                        </Animated.ScrollView>

                        <View style={styles.buttonPartBtn}>
                            {
                                currentPage === 0 ? "" :
                                    <Btn textColor='background-secondary-2' bgColor="background-primary" text='Back' onPress={goBack} />
                            }

                            {
                                currentPage === 2 ?
                                    <Btn textColor='background-secondary-2' bgColor="background-primary" text='Start' onPress={() => { router.replace("/(home)") }} />
                                    :
                                    <Btn textColor='background-secondary-2' bgColor="background-primary" text='Next' onPress={goNext} />
                            }
                        </View>

                        <View style={styles.slider}>
                            <Slider num={currentPage + 1} />
                        </View>
                    </View>
                </View>
            </View>
        </>

    )
}

export default index

const styles = StyleSheet.create({
    topPart: {
        flex: 0.5
    },
    buttonPart: {
        flex: 0.5,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        justifyContent: "center",
        alignItems: "center",
    },
    buttonPartTitle: {
        fontSize: 28,
        fontWeight: 600,
        marginBottom: 20,

    },
    buttonPartText: {
        fontSize: 16

    },
    slider: {
        margin: height * 0.05,
    },
    buttonPartBtn: {
        flexDirection: "row",
        justifyContent: "space-around",
        width: width * 0.8,

    },



})