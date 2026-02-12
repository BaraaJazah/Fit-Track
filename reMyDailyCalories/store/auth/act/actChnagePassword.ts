
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { isAxiosError } from "axios";
import { RootState } from "../../store";
import { API_URL } from "@env"



type TData = {
    currentPasswd:string
    password:string
    confirm_password:string
}

const actChangePassword = createAsyncThunk("/actChangePassword", async (data:TData, { rejectWithValue, getState }) => {
    const { auth } = getState() as RootState
    try {
        const res = await axios.put(`${API_URL}/api/changePassword`,data,  {
            headers: {
                Authorization: `Bearer ${auth.accessToken}`,
              },
        })

        if (res) {
            return res.data
        }

    } catch (error) {
        if (isAxiosError(error)) {
            return rejectWithValue(error.response?.data?.message || error.response?.data || "An unexpected error")
        }
    }
})

export default actChangePassword
