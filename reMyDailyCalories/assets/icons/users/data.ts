import {
    man1,
    man2,
    man3,
    man4,
    man5,
    man6,
    man7,
    man8,
    man9,
    man10,
    girl1,
    girl2,
    girl3,
    girl4,
    girl5,
    girl6,
    girl7,
    girl8,
    girl9,
    girl10,

} from "./index"


export const usersIcon = [
    "man1",
    "girl1",
    "man2",
    "girl2",
    "man3",
    "girl3",
    "man4",
    "girl4",
    "man5",
    "girl5",
    "man10",
    "girl10",
    "man6",
    "girl6",
    "man7",
    "girl7",
    "man8",
    "girl8",
    "man9",
    "girl9",
]

export const getUsersIcon = (iconName)=>{
    if ( iconName === "man1" ) return man1 ;
    if ( iconName === "man2" ) return man2 ;
    if ( iconName === "man3" ) return man3 ;
    if ( iconName === "man4" ) return man4 ;
    if ( iconName === "man5" ) return man5 ;
    if ( iconName === "man6" ) return man6 ;
    if ( iconName === "man7" ) return man7 ;
    if ( iconName === "man8" ) return man8 ;
    if ( iconName === "man9" ) return man9 ;
    if ( iconName === "man10" ) return man10;

    if ( iconName === "girl1" ) return  girl1 ;
    if ( iconName === "girl2" ) return  girl2 ;
    if ( iconName === "girl3" ) return  girl3 ;
    if ( iconName === "girl4" ) return  girl4 ;
    if ( iconName === "girl5" ) return  girl5 ;
    if ( iconName === "girl6" ) return  girl6 ;
    if ( iconName === "girl7" ) return  girl7 ;
    if ( iconName === "girl8" ) return  girl8 ;
    if ( iconName === "girl9" ) return  girl9 ;
    if ( iconName === "girl10" ) return girl10;


}