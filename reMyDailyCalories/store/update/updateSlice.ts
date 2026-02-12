import { createSlice } from '@reduxjs/toolkit'
import { IUpdateState } from '../../type/update.type';
import actCheckUpdate from './act/actCheckUpdate';
import actUpdateFood from './act/actUpdateFood';
import actUpdateExercise from './act/actUpdateExercise';

const initialState: IUpdateState = {
    update: null,
    loading: "idle",
    error: null
}
const updateSlice = createSlice({
    name: 'update',
    initialState,
    reducers: {
    },

    extraReducers(building) {
        building
            .addCase(actCheckUpdate.pending, (state) => {
                state.loading = "pending"
                state.error = null
            })
            .addCase(actCheckUpdate.fulfilled, (state, action) => {
                state.loading = "success"
                state.update = action.payload.data
                state.error = null
            })
            .addCase(actCheckUpdate.rejected, (state, action) => {
                state.loading = "failed"
                if (typeof action.payload === "string") {
                    state.error = action.payload
                }
            })

            // update food

            .addCase(actUpdateFood.pending, (state) => {
                state.loading = "pending"
                state.error = null
            })
            .addCase(actUpdateFood.fulfilled, (state, action) => {
                state.loading = "success"
                state.update = action.payload.data
                state.error = null
            })
            .addCase(actUpdateFood.rejected, (state, action) => {
                state.loading = "failed"
                if (typeof action.payload === "string") {
                    state.error = action.payload
                }
            })

            // update exercise

            .addCase(actUpdateExercise.pending, (state) => {
                state.loading = "pending"
                state.error = null
            })
            .addCase(actUpdateExercise.fulfilled, (state, action) => {
                state.loading = "success"
                state.update = action.payload.data
                state.error = null
            })
            .addCase(actUpdateExercise.rejected, (state, action) => {
                state.loading = "failed"
                if (typeof action.payload === "string") {
                    state.error = action.payload
                }
            })
    }
})
export const {   } = updateSlice.actions;
export {actCheckUpdate  , actUpdateFood, actUpdateExercise  };
export default updateSlice.reducer