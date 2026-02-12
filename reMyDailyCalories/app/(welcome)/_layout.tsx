import React from "react";
import { Text, View, Button } from "react-native";
import { Stack, useRouter } from "expo-router";

const _layout = () => {
  const router = useRouter();

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: "none", // تغيير طريقة الانتقال
      }}
    />
  );
};
export default _layout;
