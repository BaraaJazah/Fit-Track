import { createSlice } from '@reduxjs/toolkit'
import { ImyDishExerciseState } from '../../type/myDishExercise.type';
import actGetMyDishs from './act/actGetMyDishs';
import actSetMyDishs from './act/actSetMyDishs';
import actDeleteMyDish from './act/actDeleteMyDish';
import actUpdateDish from './act/actUpdateDish';

const initialState: ImyDishExerciseState = {
    myDish: [],
    myAddDish: [],
    myAddTotalDish:{
        name: "",
        foodType: "",
        iconName: "",
        kcal: 0,
        protein: 0,
        fats: 0,
        carbs: 0,
        totalQuantity: 0,
        waterQuantity: 0,
        serving:0,
        explane: "",
    },
    // exercise
    myExercise:[],
    loading: "idle",
    error: null
}


const myDishExerciseSlice = createSlice({
    name: 'myDishExercise',
    initialState,
    reducers: {
        actAddToMyDish: (state, actions) => {
            const cameData = actions.payload.mealData;
            const data = {
                foodId: cameData.id,
                EnName: cameData.EnName,
                ArName: cameData.ArName,
                TrName: cameData.TrName,
                DeName: cameData.DeName,
                image: cameData.image,
                kcal: cameData.kcal,
                protein: cameData.protein,
                fats: cameData.fats,
                carbs: cameData.carbs,
                quantity: 100,
                haveExplane: cameData.haveExplane,
            };

            const existingIndex = state.myAddDish.findIndex(item => item.foodId === data.foodId);
            if (existingIndex !== -1 ) {
                state.myAddDish[existingIndex].quantity += 100;
            }else{
            state.myAddDish.push(data);
            }
        },
        actUpdateMyDish : (state, actions)=>{
            const cameData = actions.payload;
            const idToRemove = cameData.foodId;
            const Item = state.myAddDish.find(item => item.foodId === idToRemove);
            if (Item) {
                Item.quantity = cameData.newQuan; // تحديث قيمة quan مباشرة
            }
        },
        actDeleteToMyDish: (state, actions) => {
            const cameData = actions.payload;
            const idToRemove = cameData.foodId;
            state.myAddDish = state.myAddDish.filter(item => item.foodId !== idToRemove);
        },
        actCalcolateTotal : (state)=>{
            let data = 
                {
                    kcal: 0,
                    protein: 0,
                    carbs: 0,
                    fats: 0,
                    totalQuantity: 0,
                }; 
            state.myAddDish.map((item)=>{
                data.kcal  += parseInt((item.kcal  * item.quantity / 100).toFixed(0));
                data.protein += parseInt((item.protein * item.quantity / 100).toFixed(0));
                data.carbs  += parseInt((item.carbs * item.quantity / 100).toFixed(0));
                data.fats    += parseInt((item.fats * item.quantity / 100).toFixed(0));
                data.totalQuantity += parseInt((item.quantity).toFixed(0));
            })
            let totalQuantity =  state.myAddTotalDish.waterQuantity + data.totalQuantity;

            state.myAddTotalDish.totalQuantity = totalQuantity ;
            state.myAddTotalDish.kcal = data.kcal;
            state.myAddTotalDish.protein = data.protein;
            state.myAddTotalDish.carbs = data.carbs;
            state.myAddTotalDish.fats = data.fats;
        },
        actResetMyDish: (state) => {
            state.myAddDish = [];
            state.myAddTotalDish ={
                name: "",
                foodType: "",
                iconName: "",
                kcal: 0,
                protein: 0,
                fats: 0,
                carbs: 0,
                totalQuantity: 0,
                serving:0,
                waterQuantity:0,
                explane: "",
            };
        },
        actDishById: (state,actions) => {
            const id = actions.payload;
            const dish = state.myDish.find(item => item.id === id);
            if (dish ) {
                state.myAddTotalDish.id= dish.id;
                state.myAddTotalDish.foodType= dish.foodType;
                state.myAddTotalDish.iconName= dish.iconName;
                state.myAddTotalDish.name= dish.name;
                state.myAddTotalDish.kcal= dish.kcal;
                state.myAddTotalDish.protein= dish.protein;
                state.myAddTotalDish.fats= dish.fats;
                state.myAddTotalDish.carbs= dish.carbs;
                state.myAddTotalDish.serving= dish.serving;
                state.myAddTotalDish.totalQuantity= dish.totalQuantity;
                state.myAddTotalDish.explane= dish.explane;

                state.myAddDish = dish.my_dish_foods;
            }

        },
        actAddWater: (state,actions) => {
            state.myAddTotalDish.waterQuantity = actions.payload
        },
        addCalcolateTotal : (state,actions)=>{
            let data = 
                {
                    totalQuantity: actions.payload.totalQuantity,
                    kcal: actions.payload.kcal,
                    protein: actions.payload.protein,
                    carbs: actions.payload.carbs,
                    fats: actions.payload.fats,
                }; 
    
            // state.myAddDish = [];
            state.myAddTotalDish.totalQuantity = data.totalQuantity;
            state.myAddTotalDish.kcal = data.kcal;
            state.myAddTotalDish.protein = data.protein;
            state.myAddTotalDish.carbs = data.carbs;
            state.myAddTotalDish.fats = data.fats;
        },

        // Exercise

        actResetMyExercise: (state) => {
            state.myExercise = [];
        },

        actResetAllDish : (state)=>{
            state.myDish = [];
            state.myAddDish = [];
            state.myAddTotalDish ={
                name: "",
                foodType: "",
                iconName: "",
                kcal: 0,
                protein: 0,
                fats: 0,
                carbs: 0,
                totalQuantity: 0,
                serving:0,
                waterQuantity:0,
                explane: ""
            }

        }

    },

    extraReducers(building) {
        building
            .addCase(actGetMyDishs.pending, (state) => {
                state.loading = "pending"
                state.error = null
            })
            .addCase(actGetMyDishs.fulfilled, (state, action) => {
                state.loading = "success"
                state.myDish = action.payload.data
                state.error = null
            })
            .addCase(actGetMyDishs.rejected, (state, action) => {
                state.loading = "failed"
                if (typeof action.payload === "string") {
                    state.error = action.payload
                }
            })

            //Set data as my Dishs

            .addCase(actSetMyDishs.pending, (state) => {
                state.loading = "pending"
                state.error = null
            })
            .addCase(actSetMyDishs.fulfilled, (state, action) => {
                state.loading = "success"
                state.myDish = action.payload.data
                state.error = null
            })
            .addCase(actSetMyDishs.rejected, (state, action) => {
                state.loading = "failed"
                if (typeof action.payload === "string") {
                    state.error = action.payload
                }
            })

            // act delete from my dish

            .addCase(actDeleteMyDish.pending, (state) => {
                state.loading = "pending"
                state.error = null
            })
            .addCase(actDeleteMyDish.fulfilled, (state, action) => {
                state.loading = "success"
                state.myDish = action.payload.data
                state.error = null
            })
            .addCase(actDeleteMyDish.rejected, (state, action) => {
                state.loading = "failed"
                if (typeof action.payload === "string") {
                    state.error = action.payload
                }
            })

            // act Get dish By Id 

            // TODO Delete ( or change to update )
            .addCase(actUpdateDish.pending, (state) => {
                state.loading = "pending"
                state.error = null
            })
            .addCase(actUpdateDish.fulfilled, (state, action) => {
                state.loading = "success"
                state.myDish = action.payload.data
                state.error = null
            })
            .addCase(actUpdateDish.rejected, (state, action) => {
                state.loading = "failed"
                if (typeof action.payload === "string") {
                    state.error = action.payload
                }
            })

    }
})
export const { actAddToMyDish , actUpdateMyDish , actDeleteToMyDish  ,
     actResetMyDish ,actCalcolateTotal , actDishById,
     addCalcolateTotal,actAddWater,
    //  exercise
    actResetMyExercise ,
    actResetAllDish
     
    } = myDishExerciseSlice.actions;

export { actGetMyDishs ,actSetMyDishs , actDeleteMyDish , actUpdateDish};
export default myDishExerciseSlice.reducer