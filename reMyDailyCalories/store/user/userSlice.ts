
import { createSlice } from '@reduxjs/toolkit'
import { IUserState, initialState } from '../../type/user.type';

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {

        setNewDay : (state ,actions )=>{
            state.userDaily.day=actions.payload;
            state.userDaily.breakfast = []
            state.userDaily.dinner = []
            state.userDaily.lunch = []
            state.userDaily.snack = []
            state.userDaily.exercise = []
            state.userDaily.water = 0
            state.userDaily.toplam = null
        },

        addWater: (state, actions) => {

            if (actions.payload.op == "+") {
                state.userDaily.water += actions.payload.value
            } else {
                state.userDaily.water -= actions.payload.value
            }
        },
        resetFood: (state) => {
            state.userDaily.breakfast = []
            state.userDaily.dinner = []
            state.userDaily.lunch = []
            state.userDaily.snack = []
            state.userDaily.exercise = []
            state.userDaily.water = 0
            state.userDaily.toplam = null

        },
        addFood: (state, actions) => {

            if (actions.payload.meal !== "exercise") {

                const data = {
                    id: actions.payload.mealData.id,
                    EnName: actions.payload.mealData.EnName,
                    ArName: actions.payload.mealData.ArName,
                    TrName: actions.payload.mealData.TrName,
                    DeName: actions.payload.mealData.DeName,
                    quan: 100,
                    protein: actions.payload.mealData.protein,
                    fats: actions.payload.mealData.fats,
                    carbs: actions.payload.mealData.carbs,
                    kcal: actions.payload.mealData.kcal,
                    image: actions.payload.mealData.image,
                }

                if (actions.payload.meal === "breakfast") {

                    const existingIndex = state.userDaily.breakfast.findIndex(item => item.id === data.id);

                    if (existingIndex !== -1 && state.userDaily.breakfast[existingIndex].quan <= 900) {
                        state.userDaily.breakfast[existingIndex].quan += 100;
                    }
                    else if (existingIndex !== -1) {
                    }

                    else {
                        state.userDaily.breakfast.push(data);
                    }
                }
                else if (actions.payload.meal === "lunch") {

                    const existingIndex = state.userDaily.lunch.findIndex(item => item.id === data.id);

                    if (existingIndex !== -1 && state.userDaily.lunch[existingIndex].quan <= 900) {
                        state.userDaily.lunch[existingIndex].quan += 100;
                    }
                    else if (existingIndex !== -1) {
                    }
                    else {
                        state.userDaily.lunch.push(data);
                    }

                }
                else if (actions.payload.meal === "dinner") {

                    const existingIndex = state.userDaily.dinner.findIndex(item => item.id === data.id);

                    if (existingIndex !== -1 && state.userDaily.dinner[existingIndex].quan <= 900) {
                        state.userDaily.dinner[existingIndex].quan += 100;
                    }
                    else if (existingIndex !== -1) {
                    }
                    else {
                        state.userDaily.dinner.push(data);
                    }

                }
                else if (actions.payload.meal === "snack") {

                    const existingIndex = state.userDaily.snack.findIndex(item => item.id === data.id);

                    if (existingIndex !== -1 && state.userDaily.snack[existingIndex].quan <= 900) {
                        state.userDaily.snack[existingIndex].quan += 100;
                    }
                    else if (existingIndex !== -1) {
                    }
                    else {
                        state.userDaily.snack.push(data);
                    }
                }
            } else {
                const data = {
                    id: actions.payload.mealData.id,
                    EnName: actions.payload.mealData.EnName,
                    ArName: actions.payload.mealData.ArName,
                    TrName: actions.payload.mealData.TrName,
                    DeName: actions.payload.mealData.DeName,
                    quan: 60,
                    met: actions.payload.mealData.met,
                    image: actions.payload.mealData.image,
                }
                const existingIndex = state.userDaily.exercise.findIndex(item => item.id === data.id);

                if (existingIndex !== -1 && state.userDaily.exercise[existingIndex].quan <= 540) {
                    state.userDaily.exercise[existingIndex].quan += 60;
                }
                else if (existingIndex !== -1) {
                }
                else {
                    state.userDaily.exercise.push(data);
                }
            }
        },
        deleteFood: (state, actions) => {


            if (actions.payload.meal === "breakfast") {
                const idToRemove = actions.payload.mealData.id;
                state.userDaily.breakfast = state.userDaily.breakfast.filter(item => item.id !== idToRemove);
            }
            else if (actions.payload.meal === "lunch") {
                const idToRemove = actions.payload.mealData.id;
                state.userDaily.lunch = state.userDaily.lunch.filter(item => item.id !== idToRemove);
            }
            else if (actions.payload.meal === "dinner") {
                const idToRemove = actions.payload.mealData.id;
                state.userDaily.dinner = state.userDaily.dinner.filter(item => item.id !== idToRemove);
            }
            else if (actions.payload.meal === "snack") {
                const idToRemove = actions.payload.mealData.id;
                state.userDaily.snack = state.userDaily.snack.filter(item => item.id !== idToRemove);
            }
            else if (actions.payload.meal === "exercise") {
                const idToRemove = actions.payload.mealData.id;
                state.userDaily.exercise = state.userDaily.exercise.filter(item => item.id !== idToRemove);
            }
        },

        updateFoodQuan: (state, actions) => {

            const { meal, mealData } = actions.payload; // استخراج البيانات من الـ payload

            if (meal === "breakfast") {
                const Item = state.userDaily.breakfast.find(item => item.id === mealData.id);
                if (Item) {
                    Item.quan = mealData.newQuan; // تحديث قيمة quan مباشرة
                }
            }

            else if (meal === "lunch") {
                const Item = state.userDaily.lunch.find(item => item.id === mealData.id);
                if (Item) {
                    Item.quan = mealData.newQuan; // تحديث قيمة quan مباشرة
                }
            }

            else if (meal === "dinner") {
                const Item = state.userDaily.dinner.find(item => item.id === mealData.id);
                if (Item) {
                    Item.quan = mealData.newQuan; // تحديث قيمة quan مباشرة
                }
            }


            else if (meal === "snack") {
                const Item = state.userDaily.snack.find(item => item.id === mealData.id);
                if (Item) {
                    Item.quan = mealData.newQuan; // تحديث قيمة quan مباشرة
                }
            }


            else if (actions.payload.meal === "exercise") {
                const Item = state.userDaily.exercise.find(item => item.id === mealData.id);
                if (Item) {
                    Item.quan = mealData.newQuan; // تحديث قيمة quan مباشرة
                }
            }
        },

    },

})
export const { addFood, addWater, resetFood, deleteFood, updateFoodQuan , setNewDay } = userSlice.actions;
export { };
export default userSlice.reducer
