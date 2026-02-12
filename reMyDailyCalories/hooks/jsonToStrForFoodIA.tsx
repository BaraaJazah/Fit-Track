export function jsonToStrForFoodIA(data, ingr, prep) {
  let result = "";

  // Section 1: Ingredients
  result += `##${ingr}["#F47551"]\n`;
  data.ingredients.forEach((item, index) => {
    const number = index + 1;
    const name = item.component;
    const state = item.state ? `${item.state} ` : "";
    const amount = `${item.amount}g`;
    const required = item.required ? "" : "اختياري";
    result += `${number} - ${name} ${state}${amount} ${required}\n`;
  });

  // Section 2: Preparation
  result += `\n##${prep}["#FFA935"]\n`;

  data.preparation.forEach((step, index) => {
    const number = index + 1;
    result += `${number} - ${step}\n`;
  });

  return result.trim();
}
