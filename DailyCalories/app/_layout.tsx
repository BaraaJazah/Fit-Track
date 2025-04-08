import React from 'react'
import { Text, View, Button } from "react-native";
import { Stack, useRouter } from 'expo-router';
import { store, persistor } from '../store/store'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

const _layout = () => {
  const router = useRouter();

  return (

    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Stack
          screenOptions={{
            headerShown: false
          }}
        />
      </PersistGate>
    </Provider >

  )
}
export default _layout
