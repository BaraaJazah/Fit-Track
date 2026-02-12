import { createSlice } from '@reduxjs/toolkit'
import { IAuthState } from '../../type/calender';
import actSetMyCalender from './act/actSetMyCalender';
import actGetMyCalender from './act/actGetMyCalender';

const initialState: IAuthState = {
    calender: [],
    loading: "idle",
    error: null
}
const calenderSlice = createSlice({
    name: 'calender',
    initialState,
    reducers: {
        checkIfDefferent:(state, actions)=>{
            const data = actions.payload;
            const dayCalendar = state.calender.find(item => item.day === data.day);

            if (dayCalendar ) {   // if found
                if(dayCalendar.kcal.toString() === data.kcal &&
                    dayCalendar.protein.toString() === data.protein &&
                    dayCalendar.fats.toString() === data.fats &&
                    dayCalendar.carbs.toString() === data.carbs &&
                    dayCalendar.burn.toString() === data.burn 
                  ){
                    actions.payload = 0 
                }else{
                    actions.payload = 1
                }
            }else{   // if not found
                actions.payload = 1
            }

        },

         resetCalender:(state)=>{
            state.calender = []
        }
    },

    extraReducers(building) {
        building
            .addCase(actGetMyCalender.pending, (state) => {
                state.loading = "pending"
                state.error = null
            })
            .addCase(actGetMyCalender.fulfilled, (state, action) => {
                state.loading = "success"
                state.calender = action.payload.data
                state.error = null
            })
            .addCase(actGetMyCalender.rejected, (state, action) => {
                state.loading = "failed"
                if (typeof action.payload === "string") {
                    state.error = action.payload
                }
            })

            // set My Calender

            .addCase(actSetMyCalender.pending, (state) => {
                state.loading = "pending"
                state.error = null
            })
            .addCase(actSetMyCalender.fulfilled, (state, action) => {
                state.loading = "success"
                state.calender = action.payload.data
                state.error = null
            })
            .addCase(actSetMyCalender.rejected, (state, action) => {
                state.loading = "failed"
                if (typeof action.payload === "string") {
                    state.error = action.payload
                }
            })
    }
})
export const {  checkIfDefferent , resetCalender } = calenderSlice.actions;
export {actGetMyCalender,actSetMyCalender  };
export default calenderSlice.reducer