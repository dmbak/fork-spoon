export let recipesData = {};
export let recipeDetails = {};

export const loadRecipesList = async function () {
  try {
    const response = await fetch(
      'https://api.spoonacular.com/recipes/complexSearch?sort=random&apiKey=ce8f5920b6b4439eb6474e2c6d097ed5'
    );
    const data = await response.json();
    if (!response.ok) throw new Error(`${response.status}`);
    recipesData = data;
    // getting first recepe id for rendering start page
  } catch (err) {}
};

export const loadRecipeDetails = async function (id) {
  try {
    const response = await fetch(
      `https://api.spoonacular.com/recipes/${id}/information?apiKey=ce8f5920b6b4439eb6474e2c6d097ed5`
    );
    const data = await response.json();
    if (!response.ok) throw new Error(`${response.status}`);
    recipeDetails = data;
  } catch (err) {}
};
