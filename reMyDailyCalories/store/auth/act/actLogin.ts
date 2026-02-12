
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { isAxiosError } from "axios";
import { API_URL } from "@env"


type TData = {email:string ,password:string};
const actLogin = createAsyncThunk("/actLogin", async (data:TData, { rejectWithValue }) => {

    try {

        const res = await axios.post(`${API_URL}/api/login`, data)
        if (res) {
            return res.data
        }
    } catch (error) {
        if (isAxiosError(error)) {
            return rejectWithValue(error.response?.data?.message || error.response?.data || "An unexpected error")
        }
    }
})

export default actLogin