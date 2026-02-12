import { createSlice } from '@reduxjs/toolkit'
import { IUserSettingState } from '../../type/userSetting';
import actSendSupportMsg from './act/actSendSupportMsg';

const initialState: IUserSettingState = {
    sendMessage: null,
    loading: "idle",
    accessToken: null,
    error: null
}
const userSettingSlice = createSlice({
    name: 'userSetting',
    initialState,
    reducers: {
    },
    extraReducers(building) {
    
        building.addCase(actSendSupportMsg.pending, (state) => {
                        state.loading = "pending"
                        state.error = null
                    })
                    .addCase(actSendSupportMsg.fulfilled, (state, action) => {
                        state.loading = "success"
                        state.error = null
                    })
                    .addCase(actSendSupportMsg.rejected, (state, action) => {
                        state.loading = "failed"
                        if (typeof action.payload === "string") {
                            state.error = action.payload
                        }
                    })
        
    }

})
export const {} = userSettingSlice.actions;
export { actSendSupportMsg };
export default userSettingSlice.reducer