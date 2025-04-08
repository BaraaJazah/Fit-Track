import { View, Text, Button } from "react-native";
import { useRouter } from "expo-router";

export default function NotFoundScreen() {
    const router = useRouter();

    return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>صفحة غير موجودة 😕</Text>
            <Button title="العودة إلى الرئيسية" onPress={() => router.back()} />
        </View>
    );
}