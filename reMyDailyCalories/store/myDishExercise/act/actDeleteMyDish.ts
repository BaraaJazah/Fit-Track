import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { isAxiosError } from "axios";
import { API_URL } from "@env"
import { RootState } from "../../store";


type TData = {

    'id':number
}
const actDeleteMyDish = createAsyncThunk("/actDeleteMyDish", async (data:TData, { rejectWithValue , getState }) => {
    const { auth } = getState() as RootState
    try {
        const res = await axios.delete(`${API_URL}/api/deleteMyDish/${data.id}` ,{
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

export default actDeleteMyDish