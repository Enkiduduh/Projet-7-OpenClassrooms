let recipesList = [];

async function getRecipes() {
    let response = await fetch("data/recipes.json");

    if (!response.ok) {
        alert("HTTP-Error: "+ response.statut);
    } else {
        let data = await response.json();
        let recipes = data.recipes;
        console.log(recipes);
        recipesList = [...recipes];
        console.log(recipes[2].ingredients)
        return {
          recipes: [...recipes],
        };
    };
};


async function displayData(recipes) {
  const recipesSection = document.querySelector(".card-recipe-container");

  recipes.forEach((recipe) => {
    const recipeModel = recipesTemplate(recipe);
    const recipeCardDOM = recipeModel.getRecipeCardDOM();
    recipesSection.appendChild(recipeCardDOM);
  });
}

async function init() {
  // Récupère les datas des photographes
  const { recipes } = await getRecipes();
  displayData(recipes);
}

init();
