
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { isAxiosError } from "axios";
import { RootState } from "../../store";
import { apiGetExerciseType, apiGetExercise } from "../../../Api/ApiLinks";
import { API_URL } from "@env"

const actGetExercise = createAsyncThunk("/actGetExercise", async (_, { rejectWithValue, getState }) => {

    try {

        const [exerciseTypeRes, exerciseRes] = await Promise.all([
            axios.get(`${API_URL}/${apiGetExerciseType}`),
            axios.get(`${API_URL}/${apiGetExercise}`),
        ]);


        const exerciseTypes = exerciseTypeRes.data;
        const exercise = exerciseRes.data;

        const mergedData = exerciseTypes.map(exerciseType => ({
            ...exerciseType,
            exercises: exercise.filter((item) => Number(item.exerciseType_Id) === Number(exerciseType.id)) // ربط الفئات مع الأنواع
        }));


        if (mergedData) {
            return mergedData
        }



    } catch (error) {
        if (isAxiosError(error)) {
            return rejectWithValue(error.response?.data?.message || error.response?.data || "An unexpected error")
        }
    }
})

export default actGetExercise
