export let recepesData = {};
export let recepeDetails = {};

export const loadRecepesList = async function () {
  try {
    const response = await fetch(
      'https://api.spoonacular.com/recipes/complexSearch?sort=random&apiKey=ce8f5920b6b4439eb6474e2c6d097ed5'
    );
    const data = await response.json();
    if (!response.ok) throw new Error(`${response.status}`);
    recepesData = data;
    // getting first recepe id for rendering start page
  } catch (err) {}
};

export const loadRecepeDetails = async function (id) {
  try {
    const response = await fetch(
      `https://api.spoonacular.com/recipes/${id}/information?apiKey=ce8f5920b6b4439eb6474e2c6d097ed5`
    );
    const data = await response.json();
    if (!response.ok) throw new Error(`${response.status}`);
    recepeDetails = data;
  } catch (err) {}
};
