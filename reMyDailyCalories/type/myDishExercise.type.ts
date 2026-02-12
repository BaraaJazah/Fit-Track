import { TLoading } from "./loading"

export interface ImyDishExerciseState {

    myDish: {
        id: number,
        userId: number,
        name: string,
        foodType: string,
        kcal: number,
        protein: number,
        fats: number,
        carbs: number,
        totalQuantity: number,
        serving: number,
        iconName: string,
        explane: string | null;
        my_dish_foods:
        {
            id: number,
            myDishId: number,
            foodId: number,
            EnName: string,
            ArName: string,
            image: string,
            kcal: number,
            protein: number,
            fats: number,
            carbs: number,
            quantity: number,
            haveExplane: number,
        }[] | []
    }[] | [],
    myAddDish :{
            id?:number,
            foodId: number,
            EnName: string,
            ArName: string,
            image: string,
            kcal: number,
            protein: number,
            fats: number,
            carbs: number,
            quantity: number,
            haveExplane: number,
        }[] | []
    myAddTotalDish :{
        id?:number,
        name: string,
        foodType: string,
        iconName: string,
        kcal: number,
        protein: number,
        fats: number,
        carbs: number,
        totalQuantity: number,
        waterQuantity?:number,
        serving:number,
        explane: string,
    } | null



    // Exercise
    myExercise:{
        typeId : string,
        name: string,
        iconName: string,
        met:number,
        explane:string,
    }[]|[]
    loading: TLoading,
    error: string | null
};


export type TMyDish = {
    id: number,
    userId?: number,
    name: string,
    foodType: string,
    kcal: number,
    protein: number,
    fats: number,
    carbs: number,
    totalQuantity: number,
    serving: number,
    iconName: string,
    my_dish_foods:{}[]
    explane: string | null;
}

export type TMyDishFoods = {
    foodId: number,
    EnName: string,
    ArName: string,
    image: string,
    kcal: number,
    protein: number,
    fats: number,
    carbs: number,
    quantity: number,
    haveExplane: number,
}

export type TMyAddTotalDish = {
    name: string,
    foodType: string,
    iconName: string,
    kcal: number,
    protein: number,
    fats: number,
    carbs: number,
    totalQuantity: number,
    serving:number,
    explane: string,
};

export type TMyExercise = {
        type : "cardio" | "strength" | "flexibility",
        name: string,
        iconName: string,
        met:number,
        explane:string,
}