import { TLoading } from "../../type"
import { StyleSheet, Text, View } from "react-native"
import { ActivityIndicator } from "react-native"


type Props = {
    children: React.ReactNode
    loading: TLoading
    error?: string | null
}


export default function Loading({ children, loading, error }: Props) {

    if (loading === "pending")
        return (

            <View style={styles.body}>
                <Text style={[styles.bodyText, { color: "green" }]}>Loading ...</Text>
                <ActivityIndicator size="large" hidesWhenStopped={false} animating={true} color="green" />
            </View>

        )
    else if (error)
        return (
            // <Lottie animationData={lottie_NotFound} style={{ height: "60vh" }} />
            <View style={styles.body}>
                <Text style={[styles.bodyText, { color: "green" }]}>Error ...</Text>
                <ActivityIndicator size="large" hidesWhenStopped={false} animating={true} color="green" />
            </View>
        )
    else
        return (
            <>
                {children}
            </>)
}


const styles = StyleSheet.create({
    body: {
        backgroundColor: "rgba(255, 255, 255,0.8)",
        width: 200,
        height: 200,
        // position: "absolute",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1,
        borderRadius: 12,
    },
    bodyText: {
        fontSize: 16,
        fontWeight: 600,
        marginBottom: 20
    }


})