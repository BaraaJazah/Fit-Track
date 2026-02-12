import { TLoading } from "./loading"

export interface IAuthState {

    foods: {
        id: number,
        EnName: string,
        ArName: string,
        TrName: string,
        DeName: string,
        image: string,
        food_types:
        {
            id: number,
            catagoryId: number,
            EnName: string,
            ArName: string,
            TrName: string,
            DeName: string,
            foods:
            {
                id: number,
                typeId: number,
                EnName: string,
                ArName: string,
                TrName: string,
                DeName: string,
                image: string,
                kcal: number,
                protein: number,
                carbs: number,
                fats: number,
                haveExplane: number,
            }[]

        }[]


    }[] | [],

    searchFood:{
        id: number,
        typeId: number,
        EnName: string,
        ArName: string,
        TrName: string,
        DeName: string,
        image: string,
        kcal: number,
        protein: number,
        carbs: number,
        fats: number,
        haveExplane: number,
    }[]|[]

    foodAI:{
        name: string,
        preparation: string[],
        ingredients: {
            component:string,
            amount:number,
            state:string,
            required:boolean,
        }[] ,
        total:number,
        kcal: number,
        protein: number,
        carbs: number,
        fats: number,
    }|null


    loading: TLoading,
    error: string | null
}
