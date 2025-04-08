
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { isAxiosError } from "axios";
import { RootState } from "../../store";
import { apiGetCatagories, apiGetFoods, apiGetType } from "../../../Api/ApiLinks";
import { API_URL } from "@env"


const actGetFoods = createAsyncThunk("/getFoods", async (_, { rejectWithValue, getState }) => {

    try {
        const [typeRes, categoriesRes, foodsRes] = await Promise.all([
            axios.get(`${API_URL}/${apiGetType}`),
            axios.get(`${API_URL}/${apiGetCatagories}`),
            axios.get(`${API_URL}/${apiGetFoods}`)
        ]);

        const types = typeRes.data;
        const categories = categoriesRes.data;
        const foods = foodsRes.data;

        const mergedData = types.map(type => ({
            ...type,
            categories: categories.filter((category) => Number(category.type_id) === Number(type.id)) // ربط الفئات مع الأنواع
                .map(category => ({
                    ...category,
                    foods: foods.filter(food => Number(food.category_id) === Number(category.id)) // ربط الأطعمة مع الفئات
                }))
        }));

        // console.log(JSON.stringify(mergedData, null, 2));

        if (mergedData) {
            return mergedData
        }

    } catch (error) {
        console.log(error)
        if (isAxiosError(error)) {
            return rejectWithValue(error.response?.data?.message || error.response?.data || "An unexpected error")
        }
    }
})

export default actGetFoods