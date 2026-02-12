export const calcNeedKcal = (gender: "man" | "woman", type: "normal" | "loss" | "won", goal: 0 | 250 | 500 | 750 | 1000, height: number, weight: number, age: number , active:number) => {
    let kcal = 0
    let protein = 0
    let fats = 0
    let carbs = 0
    let carbsGram = 0
    let breakfastRecomended = 0
    let lunchRecomended = 0
    let dinnerRecomended = 0
    let snackRecomended = 0
    let waterRecomended = 0

    // kcal And fats

    if (gender === "man" && type === "normal") {
        kcal = ((10 * weight) + (6.25 * height) - (5 * age) + 5) * active

    } else if (gender === "man" && type === "loss") {
        kcal = ((10 * weight) + (6.25 * height) - (5 * age) + 5) * active - (goal * 1.1)
    }
    else if (gender === "man" && type === "won") {
        kcal = ((10 * weight) + (6.25 * height) - (5 * age) + 5) * active + (goal * 1.1) // / 1000 * 1100
    }
    else if (gender === "woman" && type === "normal") {
        kcal = ((10 * weight) + (6.25 * height) - (5 * age) - 161) * active
    }
    else if (gender === "woman" && type === "loss") {
        kcal = ((10 * weight) + (6.25 * height) - (5 * age) - 161) * active - (goal * 1.1)
    }
    else if (gender === "woman" && type === "won") {
        kcal = ((10 * weight) + (6.25 * height) - (5 * age) - 161) * active + (goal * 1.1)
    }

    // Protein

    if (type === "won") {
        protein = weight * (1.25 + (goal / 1000) )  // 1.5 - 2.15
    }
    else if (type === "loss") {
        protein = weight * (1.35 + (goal / 1000) ) // 1.6 - 2.35
    } else {
        protein = weight * 1.2;
    }

    // fats 
    if (type === "normal") {
        fats = weight * 0.8
    }
    else if (type === "won") {
        fats = weight * (1 + (goal / 1000) * 0.2)   // 1.05 => 1.2  
    }
    else if (type === "loss") {
        fats = weight * (0.8 - (goal / 1000) * 0.2)   // 0.75 - 0.6   
    }

    carbs = kcal - (protein * 4 + fats * 9) // in kcal
    carbsGram = Math.max(carbs / 4, 0);


    if (type === "normal") {
        breakfastRecomended = kcal * (25 / 100)
        lunchRecomended = kcal * (35 / 100)
        dinnerRecomended = kcal * (25 / 100)
        snackRecomended = kcal * (15 / 100)

    }
    else if (type === "loss") {
        breakfastRecomended = kcal * (30 / 100)
        lunchRecomended = kcal * (40 / 100)
        dinnerRecomended = kcal * (20 / 100)
        snackRecomended = kcal * (10 / 100)
    }
    else if (type === "won") {
        breakfastRecomended = kcal * (30 / 100)
        lunchRecomended = kcal * (30 / 100)
        dinnerRecomended = kcal * (25 / 100)
        snackRecomended = kcal * (15 / 100)
    }
    waterRecomended = weight * 30
    return {
        kcal: kcal.toFixed(0) as any,
        Protein: protein.toFixed(0) as any,
        fats: fats.toFixed(0) as any,
        carbs: carbsGram.toFixed(0) as any,

        breakfastRecomended: breakfastRecomended.toFixed(0) as any,
        lunchRecomended: lunchRecomended.toFixed(0) as any,
        dinnerRecomended: dinnerRecomended.toFixed(0) as any,
        snackRecomended: snackRecomended.toFixed(0) as any,
        waterRecomended: waterRecomended.toFixed(0) as any,
    }


}   