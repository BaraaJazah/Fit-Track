import { createSlice } from '@reduxjs/toolkit'
import { lightTheme } from '../../constants/themes/lightTheme'
import { darkTheme } from '../../constants/themes/darkTheme'

interface IThemeState {
    themeName: "dark" | "light",
    themeData: {

        "background-primary",
        "background-secondary",
        "background-secondary-2"

        "text-primary",
        "text-secondary",

        "primary-icons",

        "secondary-meal1",
        "secondary-meal2",
        "secondary-meal3",
        "secondary-meal4",
        "secondary-meal5",

    }

}

const initialState: IThemeState = {

    // themeName: "light",
    // themeData: lightTheme
    themeName: "dark",
    themeData: darkTheme

}


const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        changeTheme: (state, actions) => {
            if (actions.payload === 0) {
                state.themeName = "light";
                state.themeData = lightTheme;
            } else {
                state.themeName = "dark";
                state.themeData = darkTheme;
            }
        }
    },


})
export const { changeTheme } = themeSlice.actions;
export { };
export default themeSlice.reducer