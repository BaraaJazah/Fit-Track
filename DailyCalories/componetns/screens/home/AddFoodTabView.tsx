import { useRef, useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, Button, Touchable, TouchableOpacity, Dimensions, ScrollView, Image, FlatList } from 'react-native';
import PagerView from 'react-native-pager-view';
import { DishCart, DishCartLove, TabBtn } from '../../common';
import { useAppSelector } from '../../../hooks/storeHook';
import { useRouter } from 'expo-router';
import { love } from '../../../assets/icons/home';
import { back } from '../../../assets/icons';

const { width, height } = Dimensions.get("window");

type Props = {
    cartWithLove: boolean
    data: {
        id: number,
        type_id: number,
        name: string,
        foods: {}[]
    }[]
}

const AddFoodTabView = ({ cartWithLove, data }: Props) => {
    const ref = useRef();
    const { themeData } = useAppSelector(state => state.theme)
    const [isSelected, setIsSelected] = useState(0)
    return (
        <SafeAreaView style={[styles.container, { transform: [{ translateY: 0 }], }]}>

            <View style={{ flexDirection: "row", width: width * 0.9, marginVertical: 5, flexWrap: "wrap", }}>
                {
                    data?.map((item, index) => (
                        <TabBtn key={index} onPress={() => { ref.current?.setPage(index) }} active={isSelected == index ? true : false} title={item.name} />
                    ))
                }
            </View>


            <PagerView
                style={[styles.pager, { flex: 1 }]}
                ref={ref}
                initialPage={0}
                onPageSelected={(e) => {
                    const selectedPage = e.nativeEvent.position;
                    setIsSelected(selectedPage);
                }}
            >
                {
                    data?.map((item, index) => (

                        <ScrollView key={index}
                            fadingEdgeLength={20}	// make fade in top and botton
                            scrollEnabled={true}	// make scroll anable
                            showsVerticalScrollIndicator={false}
                        >
                            <TabPage data={item.foods} cartWithLove={cartWithLove} />
                        </ScrollView>))
                }

            </PagerView>
        </SafeAreaView >
    )
}

export default AddFoodTabView


const TabPage = ({ cartWithLove, data }) => {
    const { themeData } = useAppSelector(state => state.theme)
    const [showList, setShowList] = useState(null)
    const router = useRouter()

    return (
        <View style={{ flex: 1, alignItems: "center", }}>

            <View style={{ flex: 0.1, alignItems: "center", }}>

                {cartWithLove ? <DishCartLove data={data} iconLeft={love} /> : <DishCart data={data} />}

                <View style={{ height: 10 }}></View>

            </View>
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',

        // marginTop: 60,
    },

    btns: {
        width: width * 0.85,
    },
    pager: {
        alignSelf: "stretch",


    },
    foodText1: {
        fontSize: 16
    },
    foodText2: {
        fontSize: 10

    },

})