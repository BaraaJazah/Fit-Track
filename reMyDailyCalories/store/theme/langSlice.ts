import { createSlice } from '@reduxjs/toolkit'
import { arLang } from '../../constants/languages/ar'
import { enLang } from '../../constants/languages/en'
import { trLang } from '../../constants/languages/tr'
import { deLang } from '../../constants/languages/de'



interface IThemeState {
    lang: "ar" | "en" | "de" | "tr" ,
    words: {
        // setting
        "setting",
        "theme & language",
        "dark theme",
        "general",
        "others",
        "privacy policy",
        "customer support",
        "change password",
        "delete account",
        "log out",
        "terms & conditions",   
        "arabic" ,
        "english",
        "turkish",
        "german" ,
        "MsgPrivacy",
        "MsgTerms",
        "MsgDeleteAccount",
        "MsgLogOut",
        "ok",
        "cancel",
        "NewPassword",
"ConfirmNewPassword",
"CurrentPassword",
"Save",
"SupportMsg",
"CustomerSupport",
"Message",
"Subject",
"send",

        // home

        "burn",
        "kcal",
        "kcal goal",
        "protein",
        "fats",
        "carbs",

        "calender",
        "msg of calender",
        "total kcal",
        "Daily Calories Goal",
        "Add New Meal",
        "Add New Meal By AI",
        "available",
        
        // dish
        "My Meals",
        "Favorite",
        "meal name",

        // add

        "Water",
        "Breakfast",
        "Lunch",
        "Dinner",
        "Snack",
        "Exercise",
        "Recommended",
        "Recommended Amount",
        "Recommended Kcal",
        "L",
        "Daily Meals",
        "Daily Exercises",
        "Kcal",

        // exercise
        "minutes",
        "Burn",
        "CaloriesInfo",
        "exerciseName",

        // profile
        "getPremium",
        "myAccount",
        "updates",
        "myMeals",  
        "enterNewName",
        "typeNameHere",
        "changeName",
        "theme",
 "foods",
  "exercises",
  "updateMgs",
    "aiRequest",
  "evaluationReferral",
  "helpUsGrow",
  "inviteFriends",
  "enterCode",
  "copyMessage",
  "rateNow",
  "friendGetsSame",
  "ThanksRating",
"AppreciateFeedback",
"subscription",
"EnterInviteCode",
"TypeCode",
"ConfirmInvitation",
"Rate5Stars",
"TypeComment",


//  own dish

"MyOwnDishesTitle",
"MyOwnDishesDesc",

"HomeFood",
"PreparedFood",

"add",
"gram"
"serving",

"addMealItems",
"searchItem",
"edit",
"searchByName",
"aiSuggestion",
"searchByIngredients",
"generate",
"normalCalories",
"lowCalories",
"highCalories",
"msgCraving",
"msgNotSure",
"msgFridge",
"listItems",
"addAiMeal",
"chooseFoodsYouAte",
"foodName",
"preview",
"noTextDisplay",
"typeDishExplain",
"setAsTitle",
"ingredients",
"preparation",
"rateApp",
"starter",
"pro",
"premium",
"removeAds",
"subscribe",
"flexibleCredit",
"sedentary",
"lightlyActive",
"moderatelyActive",
"veryActive",
"neverActiveDay",
"lightActiveDay",
"moderateActiveDay",
"heavyActiveDay",
"loseQuarterKg",
"gainQuarterKg",
"maintainWeight",
"loss",
"won",
"normal",
"metricUnits",
"usUnits",
"enterAge",
"enterGender",
"enterWeight",
"enterHeight",
"calculate",
"saveAsGoal",
"man",
"woman",
"dailyCalorieGoal",
"selectGrams",
"selectWorkoutDuration",
"selectWater",
"chooseServings",
"chooseNumberOf",
"PleaseSelectIcon",
"Please add dish name",
"The name must be less than 20 characters",
"Please enter number of serving",
"Please enter the number of grams Of the food",
"There is a problem on the server",
"Food Deleted Successfully",
"The Food Updated Successfully",
"The Food Saved Successfully",
"Add an explanation",














    }

}

const initialState: IThemeState = {
    lang: "en",
    words: enLang
}

const langSlice = createSlice({
    name: 'lang',
    initialState,
    reducers: {
        changeLang: (state, actions) => {

            if (actions.payload === 1) {
                state.lang = "ar";
                state.words = arLang;
            }
            else if(actions.payload === 2){
                state.lang = "tr";
                state.words = trLang;
            }
                else if(actions.payload === 3){
                  state.lang = "de";
                state.words = deLang;
            }
            else {
                state.lang = "en";
                state.words = enLang;
            }
        }
    },


})
export const { changeLang } = langSlice.actions;
export { };
export default langSlice.reducer