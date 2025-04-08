import { combineReducers, configureStore } from '@reduxjs/toolkit'
import {
    persistStore, persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'
import AsyncStorage from "@react-native-async-storage/async-storage";

import ThemeReducer from './theme/themeSlice'
import foodsReducer from "./food/foodSlice"
import goalsReducer from "./goal/goalSlice"
import userReducer from "./user/userSlice"
import exerciseReducer from "./exercise/exerciseSlice"




const ThemePersistConfig = {
    key: 'theme',
    storage: AsyncStorage,
    // whitelist: ["themeName", "themeData"]
    whitelist: [""]

}


const FoodPersistConfig = {
    key: 'foods',
    storage: AsyncStorage,
    // whitelist: ["type", "catagories"]
}


const goalPersistConfig = {
    key: 'goal',
    storage: AsyncStorage,
    whitelist: ["userData"]
    // whitelist: [""]
}



const userPersistConfig = {
    key: 'user',
    storage: AsyncStorage,
    whitelist: ["userDaily"]
    // whitelist: [""]
}


const exercisePersistConfig = {
    key: 'exercise',
    storage: AsyncStorage,
    whitelist: ["userData"]
    // whitelist: [""]

}

const rootReducer = combineReducers({
    theme: persistReducer(ThemePersistConfig, ThemeReducer),
    foods: persistReducer(FoodPersistConfig, foodsReducer),
    goal: persistReducer(goalPersistConfig, goalsReducer),
    user: persistReducer(userPersistConfig, userReducer),
    exercise: persistReducer(exercisePersistConfig, exerciseReducer),

})

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware(
            {
                serializableCheck: {
                    ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
                },
            }
        )
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const persistor = persistStore(store)