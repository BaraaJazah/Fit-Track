
const calcBurnForExercise = (weight, minute, met) => {
    const burn = weight * (minute / 60) * met
    return burn.toFixed(0) 

}


export { calcBurnForExercise, }