import { createSlice } from '@reduxjs/toolkit'
import { IExerciseState } from '../../type/Exercise';
import actGetExercise from './act/actGetExercise';


const initialState: IExerciseState = {
    exercises: [],
    searchExercise :[],
    loading: "idle",
    error: null
}


const themeSlice = createSlice({
    name: 'exercise',
    initialState,
    reducers: {
        actSearchExercise: (state, actions) => {

            const searchTerm = actions.payload?.toLowerCase()?.trim() || '';
            state.searchExercise = state.exercises.flatMap(category => {
                return category.exercise_types.flatMap(type => {
                    const filteredExercise = type.exercises.filter(food => 
                    food.EnName.toLowerCase().includes(searchTerm) || 
                    food.ArName.toLowerCase().includes(searchTerm)
                    );
                    
                    return filteredExercise.map(food => ({
                    ...food,
                    catagoryId: type.catagoryId
                    }));
                });
            });
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
                state.exercises = action.payload.data
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
export const { actSearchExercise } = themeSlice.actions;
export { actGetExercise };
export default themeSlice.reducer