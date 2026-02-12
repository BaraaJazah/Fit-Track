import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { isAxiosError } from "axios";
import { API_URL } from "@env"
import { RootState } from "../../store";

type TData = {
    name: string;
    foodType: string;
    kcal: number;
    protein: number;
    fats: number;
    carbs: number;
    totalQuantity: number;
    serving: number;
    iconName: string;
    explane: string | null;
    my_dish_foods: {
        foodId: number;
        EnName: string;
        ArName: string;
        image: string;
        kcal: number;
        protein: number;
        fats: number;
        carbs: number;
        quantity: number;
        haveExplane: number;
    }[];
  };

const actSetMyDishs = createAsyncThunk("/actSetMyDishs", async (data:TData, { rejectWithValue , getState }) => {
    const { auth } = getState() as RootState

    try {
        const res = await axios.post(`${API_URL}/api/setMyDishs`,data ,{
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

export default actSetMyDishs