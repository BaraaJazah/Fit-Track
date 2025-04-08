import { createSlice } from '@reduxjs/toolkit'
import { IAuthState } from '../../type/Foods';
import actGetFoods from './act/actGetFoods';


const initialState: IAuthState = {
    foods: [],
    loading: "idle",
    error: null
}


const themeSlice = createSlice({
    name: 'foods',
    initialState,
    reducers: {
        changeTheme: (state, actions) => {

        }
    },


    extraReducers(building) {
        building
            .addCase(actGetFoods.pending, (state) => {
                state.loading = "pending"
                state.error = null
            })
            .addCase(actGetFoods.fulfilled, (state, action) => {
                state.loading = "success"
                state.foods = action.payload
                state.error = null
            })
            .addCase(actGetFoods.rejected, (state, action) => {
                state.loading = "failed"
                if (typeof action.payload === "string") {
                    state.error = action.payload
                }
            })
    }


})
export const { changeTheme } = themeSlice.actions;
export { actGetFoods };
export default themeSlice.reducer