import { Button, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useEffect } from 'react'
import { useRouter, usePathname, useFocusEffect } from 'expo-router'
import { useAppSelector } from '../hooks/storeHook';


const index = () => {
    const router = useRouter();
    const { themeData, themeName } = useAppSelector(state => state.theme)
    useFocusEffect(
        useCallback(() => {
            const timerId = setTimeout(() => {
                router.push('/(home)');
            }, 1000);

            return () => clearTimeout(timerId);
        }, [])
    );

    return (
        <View style={[styles.containder, { backgroundColor: themeData['background-primary'] }]}>
            <Text style={{ color: "#fff" }}>welcome</Text>
            <Text style={{ color: "#fff" }}>My Daily Calories</Text>
            <Button onPress={() => { router.push('/(welcome)/SignUpOtp') }} title='click' />
        </View>
    )
}
export default index

const styles = StyleSheet.create({
    containder: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",

    }
})