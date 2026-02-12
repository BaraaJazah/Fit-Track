
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { isAxiosError } from "axios";
import { API_URL } from "@env"
import { RootState } from "../../store";


const actGetMyDishs = createAsyncThunk("/actGetMyDishs", async (_, { rejectWithValue , getState }) => {
    const { auth } = getState() as RootState
    try {
        const res = await axios.get(`${API_URL}/api/getMyDishs`,{
            headers: {
                Authorization: `Bearer ${auth.accessToken}`
            }
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

export default actGetMyDishs