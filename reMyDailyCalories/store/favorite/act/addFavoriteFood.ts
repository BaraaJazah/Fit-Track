
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { isAxiosError } from "axios";
import { RootState } from "../../store";
import { API_URL } from "@env"


type TData   = {
    "catagoryId":string,
    "foodId" :number,
    "EnName" :string,
    "ArName" :string,
    "image" :string,
    "kcal":number,
    "protein":number,
    "fats" :number,
    "carbs" :number,
    "haveExplane":number
}; 

const actAddFavoriteFood = createAsyncThunk("/actAddFavoriteFood", async (data : TData, { rejectWithValue, getState }) => {
    const { auth } = getState() as RootState

    try {
        const res = await axios.post(`${API_URL}/api/addFavoriteFood`, data, {
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

export default actAddFavoriteFood
