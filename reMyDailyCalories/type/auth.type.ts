import { TLoading } from "./loading"

export interface IAuthState {
    user: {
        name: string,
        email: string,
        image: string,
    } | null
    userSubscribe: {
        premier: number,
        premierEndDate: Date,
        limitDish: number,
        limitAI: number,
        myDish: number,
        myAI: number,
        makeReview: number,
        referralCode: number,
        myReferralCode: string,
    } | null

    userImage:string

    accessToken: string | null,
    loading: TLoading,
    error: string | null
}


