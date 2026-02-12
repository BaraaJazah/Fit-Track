
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { isAxiosError } from "axios";
import { API_URL } from "@env"


const actGetFoods = createAsyncThunk("/actGetFoods", async (_, { rejectWithValue }) => {

    try {
       
        const res = await axios.get(`${API_URL}/api/getAllFoods`)
        if (res) {
            return res.data
        }
    

    } catch (error) {
        if (isAxiosError(error)) {
            return rejectWithValue(error.response?.data?.message || error.response?.data || "An unexpected error")
        }
    }
})

export default actGetFoods