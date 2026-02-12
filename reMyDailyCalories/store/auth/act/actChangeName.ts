
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { isAxiosError } from "axios";
import { RootState } from "../../store";
import { API_URL } from "@env"



type TData = {
    name:string
}

const actChangeName = createAsyncThunk("/actChangeName", async (data:TData, { rejectWithValue, getState }) => {
    const { auth } = getState() as RootState
    try {
        const res = await axios.put(`${API_URL}/api/changeName`,data,  {
            headers: {
                Authorization: `Bearer ${auth.accessToken}`,
              },
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

export default actChangeName
