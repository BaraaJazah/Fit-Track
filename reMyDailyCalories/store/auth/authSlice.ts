import { createSlice } from '@reduxjs/toolkit'
import { IAuthState } from '../../type/auth.type';
import actLogin from './act/actLogin';
import actRegister from './act/actRegister';
import actReferralReward from './actSubscibe/actReferralReward';
import actRateReward from './actSubscibe/actRateReward';
import actGetSubscribeData from './actSubscibe/actGetSubscribeData';
import actChangeImage from './act/actChangeImage';
import actChangeName from './act/actChangeName';
import actChangePassword from './act/actChnagePassword';
import actDeleteAccount from './act/actDeleteAccoumt';


const initialState: IAuthState = {
    user: null,
    userSubscribe:null,
    userImage:"man1",
    loading: "idle",
    accessToken: null,
    error: null
}
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        actLogout: (state) => {
            state.user = null
            state.accessToken = null
            state.error = null
            state.loading = "idle"
        },

        actSetUserImage: (state,active) => {
            state.userImage = active.payload
        },
    },
    extraReducers(building) {
        building

        // Login

        .addCase(actLogin.pending, (state) => {
            state.loading = "pending"
            state.error = null
        })
        .addCase(actLogin.fulfilled, (state, action) => {
            state.loading = "success"

            state.user = action.payload.data;
            state.accessToken = action.payload.data.token;
            state.userSubscribe = action.payload.data.userSubscribe;

            state.error = null
        })
        .addCase(actLogin.rejected, (state, action) => {
            state.loading = "failed"
            if (typeof action.payload === "string") {
                state.error = action.payload;  
            }
        })

        //  Register

        .addCase(actRegister.pending, (state) => {
            state.loading = "pending"
            state.error = null
        })
        .addCase(actRegister.fulfilled, (state, action) => {
            state.loading = "success"

            state.user = action.payload.data;
            state.accessToken = action.payload.data.token;
            state.userSubscribe = action.payload.data.userSubscribe;
            state.error = null
        })
        .addCase(actRegister.rejected, (state, action) => {
            state.loading = "failed"
            if (typeof action.payload === "string") {
                state.error = action.payload;
            }
        })

        // get refrral reward

        .addCase(actReferralReward.pending, (state) => {
            state.loading = "pending"
            state.error = null
        })
        .addCase(actReferralReward.fulfilled, (state, action) => {
            state.loading = "success"

            state.userSubscribe.limitDish  = action.payload.data.limitDish;
            state.userSubscribe.limitAI  = action.payload.data.limitAI;
            state.userSubscribe.referralCode  = action.payload.data.referralCode;

            state.error = null
        })
        .addCase(actReferralReward.rejected, (state, action) => {
            state.loading = "failed"
            if (typeof action.payload === "string") {
                state.error = action.payload;
            }
        })


        // get Rate reward

        .addCase(actRateReward.pending, (state) => {
            state.loading = "pending"
            state.error = null
        })
        .addCase(actRateReward.fulfilled, (state, action) => {
            state.loading = "success"

            state.userSubscribe.limitDish  = action.payload.data.limitDish;
            state.userSubscribe.limitAI  = action.payload.data.limitAI;
            state.userSubscribe.makeReview  = action.payload.data.makeReview;

            state.error = null
        })
        .addCase(actRateReward.rejected, (state, action) => {
            state.loading = "failed"
            if (typeof action.payload === "string") {
                state.error = action.payload;
            }
        })


        // refresh Subscribe Data

        .addCase(actGetSubscribeData.pending, (state) => {
            state.loading = "pending"
            state.error = null
        })
        .addCase(actGetSubscribeData.fulfilled, (state, action) => {
            state.loading = "success"

            state.userSubscribe = action.payload.data;

            state.error = null
        })
        .addCase(actGetSubscribeData.rejected, (state, action) => {
            state.loading = "failed"
            if (typeof action.payload === "string") {
                state.error = action.payload;
            }
        })

        // chnage image

        .addCase(actChangeImage.pending, (state) => {
            state.loading = "pending"
            state.error = null
        })
        .addCase(actChangeImage.fulfilled, (state, action) => {
            state.loading = "success"
            state.user = action.payload.data;
            state.error = null
        })
        .addCase(actChangeImage.rejected, (state, action) => {
            state.loading = "failed"
            if (typeof action.payload === "string") {
                state.error = action.payload;
            }
        })

        // chnage name

        .addCase(actChangeName.pending, (state) => {
            state.loading = "pending"
            state.error = null
        })
        .addCase(actChangeName.fulfilled, (state, action) => {
            state.loading = "success"
            state.user = action.payload.data;
            state.error = null
        })
        .addCase(actChangeName.rejected, (state, action) => {
            state.loading = "failed"
            if (typeof action.payload === "string") {
                state.error = action.payload;
            }
        })

        // chnage password

        .addCase(actChangePassword.pending, (state) => {
            state.loading = "pending"
            state.error = null
        })
        .addCase(actChangePassword.fulfilled, (state, action) => {
            state.loading = "success"
            state.error = null
        })
        .addCase(actChangePassword.rejected, (state, action) => {
            state.loading = "failed"
            if (typeof action.payload === "string") {
                state.error = action.payload;
            }
        })

        // delete account

        .addCase(actDeleteAccount.pending, (state) => {
            state.loading = "pending"
            state.error = null
        })
        .addCase(actDeleteAccount.fulfilled, (state, action) => {
            state.loading = "success"
            state.user = null;
            state.accessToken= null,
            state.error = null
        })
        .addCase(actDeleteAccount.rejected, (state, action) => {
            state.loading = "failed"
            if (typeof action.payload === "string") {
                state.error = action.payload;
            }
        })
        
    }

})
export const {actLogout , actSetUserImage} = authSlice.actions;
export { actLogin , actRegister , actRateReward , actReferralReward , actGetSubscribeData,
    actChangeImage,actChangeName,actChangePassword  , actDeleteAccount

 };
export default authSlice.reducer