import { TLoading } from "./loading"

export interface IUserState {
    userDaily: {
        day: string,

        breakfast: {
            id: number,
            EnName: string,
            ArName: string,
            quan: number,
            protein: number,
            fats: number
            carbs: number
            kcal: number
            image: string
        }[] | [],
        lunch: {
            id: number,
            EnName: string,
            ArName: string,
            quan: number,
            protein: number
            fats: number
            carbs: number
            kcal: number
            image: string
        }[] | [],
        dinner: {
            id: number,
            EnName: string,
            ArName: string,
            quan: number,
            protein: number
            fats: number
            carbs: number
            kcal: number
            image: string
        }[] | [],
        snack: {
            id: number,
            EnName: string,
            ArName: string,
            quan: number,
            protein: number
            fats: number
            carbs: number
            kcal: number
            image: string
        }[] | [],

        exercise: {
            id: number,
            EnName: string,
            ArName: string,
            met: number,
            quan: number,
            image: string
        }[] | [],

        water: number
        toplam: {
            protein: number
            fats: number
            carbs: number
            kcal: number
            burn: number

        }

    }
}


export const initialState: IUserState = {
    userDaily: {
        day: "",
        breakfast: [],
        lunch: [],
        dinner: [],
        snack: [],
        exercise: [],
        water: 0,
        toplam: {
            protein: 0,
            fats: 0,
            carbs: 0,
            kcal: 0,
            burn: 0,
        }

    }
}
