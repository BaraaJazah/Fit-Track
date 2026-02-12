
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { isAxiosError } from "axios";
import { API_URL } from "@env"


type TData = {
    name:string,
    email:string,
    password:string,
    confirm_password:string
};
const actRegister = createAsyncThunk("/actRegister", async (data:TData, { rejectWithValue }) => {

    try {

        const res = await axios.post(`${API_URL}/api/register`, data)
        if (res) {
            return res.data
        }
    } catch (error) {
        if (isAxiosError(error)) {
            return rejectWithValue(error.response?.data?.message || error.response?.data || "An unexpected error")
        }
    }
})

export default actRegister