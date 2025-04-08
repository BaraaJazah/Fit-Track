import { TLoading } from "./loading"

export interface IAuthState {

    foods: {
        id: number,
        name: string,
        image: string,
        categories:
        {
            id: number,
            type_id: number,
            name: string,
            foods:
            {
                id: number,
                catagory_id: number,
                name: string,
                image: string,
                kcal: number,
                protein: number,
                carbs: number,
                fats: number,
                weight: number,
                weightType: string,
            }[]

        }[]


    }[] | [],

    loading: TLoading,
    error: string | null
}

