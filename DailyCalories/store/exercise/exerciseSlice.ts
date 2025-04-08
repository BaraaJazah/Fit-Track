import { createSlice } from '@reduxjs/toolkit'
import { IExerciseState } from '../../type/Exercise';
import actGetExercise from './act/actGetExercise';


const initialState: IExerciseState = {
    exercises: [],
    loading: "idle",
    error: null
}


const themeSlice = createSlice({
    name: 'exercise',
    initialState,
    reducers: {
        changeTheme: (state, actions) => {

        }
    },


    extraReducers(building) {
        building
            .addCase(actGetExercise.pending, (state) => {
                state.loading = "pending"
                state.error = null
            })
            .addCase(actGetExercise.fulfilled, (state, action) => {
                state.loading = "success"
                state.exercises = action.payload
                state.error = null
            })
            .addCase(actGetExercise.rejected, (state, action) => {
                state.loading = "failed"
                if (typeof action.payload === "string") {
                    state.error = action.payload
                }
            })
    }


})
export const { changeTheme } = themeSlice.actions;
export { actGetExercise };
export default themeSlice.reducer