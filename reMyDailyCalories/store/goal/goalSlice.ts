import { createSlice } from '@reduxjs/toolkit'

interface IGoalState {
    userData: {
        burn: number,
        kcal: number

        kcalGoal: number
        proteinGoal: number
        fatsGoal: number
        carbsGoal: number

        protein: number,
        fats: number,
        carbs: number,

        breakfastRecomended: number,
        lunchRecomended: number,
        dinnerRecomended: number,
        snackRecomended: number,
        waterRecomended: number,


        userData: {
            gender: "man" | "woman"
            weight: number,
            height: number,
            age: number
        }
    }

}

const initialState: IGoalState = {
    userData: {
        burn: 0,

        kcal: 0,
        protein: 0,
        fats: 0,
        carbs: 0,

        kcalGoal: 0,
        proteinGoal: 0,
        fatsGoal: 0,
        carbsGoal: 0,
        breakfastRecomended: 0,
        lunchRecomended: 0,
        dinnerRecomended: 0,
        snackRecomended: 0,
        waterRecomended: 0,

        userData: {
            age: 0,
            gender: "man",
            weight: 0,
            height: 0,
        }

    }

}


const themeSlice = createSlice({
    name: 'goal',
    initialState,
    reducers: {
        actAddBurn: (state, actions) => {

            state.userData.burn += actions.payload
        },
        actRemoveBurn: (state, actions) => {
            state.userData.burn -= actions.payload
        },
        actDailyActions: (state, actions) => {
            state.userData.kcal = actions.payload.kcal;
            state.userData.protein = actions.payload.protein;
            state.userData.carbs = actions.payload.carbs;
            state.userData.fats = actions.payload.fats;

            state.userData.burn = actions.payload.burn;
        },
        actRemoveKcal: (state, actions) => {
            state.userData.kcal -= actions.payload
        },

        actSetGoals: (state, actions) => {
            // state = initialState
            state.userData.userData.age = actions.payload.userData.age
            state.userData.userData.gender = actions.payload.userData.gender
            state.userData.userData.height = actions.payload.userData.height
            state.userData.userData.weight = actions.payload.userData.weight

            state.userData.kcalGoal = actions.payload.kcal
            state.userData.proteinGoal = actions.payload.Protein
            state.userData.carbsGoal = actions.payload.carbs
            state.userData.fatsGoal = actions.payload.fats

            state.userData.breakfastRecomended = actions.payload.breakfastRecomended
            state.userData.lunchRecomended = actions.payload.lunchRecomended
            state.userData.dinnerRecomended = actions.payload.dinnerRecomended
            state.userData.snackRecomended = actions.payload.snackRecomended
            state.userData.waterRecomended = actions.payload.waterRecomended


        },

        actReset: (state) => {
            state.userData.kcalGoal = 0
            state.userData.proteinGoal = 0
            state.userData.carbsGoal = 0
            state.userData.fatsGoal = 0
            state.userData.burn = 0
            state.userData.kcal = 0
            state.userData.protein = 0
            state.userData.fats = 0
            state.userData.carbs = 0


            state.userData.breakfastRecomended = 0
            state.userData.lunchRecomended = 0
            state.userData.dinnerRecomended = 0
            state.userData.snackRecomended = 0
            state.userData.waterRecomended = 0

        },

    },


})
export const { actAddBurn, actRemoveBurn, actDailyActions, actRemoveKcal, actSetGoals, actReset } = themeSlice.actions;
export { };
export default themeSlice.reducer