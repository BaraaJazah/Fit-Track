
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { isAxiosError } from "axios";
import { RootState } from "../../store";
import { apiGetExerciseType, apiGetExercise } from "../../../Api/ApiLinks";
import { API_URL } from "@env"

const actGetExercise = createAsyncThunk("/actGetExercise", async (_, { rejectWithValue, getState }) => {

    try {
        const res = await axios.get(`${API_URL}/api/getAllExercises`)
        if (res) {
            return res.data
        }

    } catch (error) {
        if (isAxiosError(error)) {
            return rejectWithValue(error.response?.data?.message || error.response?.data || "An unexpected error")
        }
    }
})

export default actGetExercise
