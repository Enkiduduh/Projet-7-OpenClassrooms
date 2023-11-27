let recipesList = [];

async function getRecipes() {
    let response = await fetch("data/recipes.json");

    if (!response.ok) {
        alert("HTTP-Error: "+ response.statut);
    } else {
        let data = await response.json();
        let recipes = data.recipes;
        // console.log(recipes);
        recipesList = [...recipes];
        // console.log(recipes[2].ingredients)
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

const searchBar = document.getElementById("searchbar");

searchBar.addEventListener("input", function(event){
    const recipesSection = document.querySelector(".card-recipe-container");
    const suggestions = document.querySelector(".suggestions");
    const regExp = /^[a-zA-Z]{3,}$/;
    const match = regExp.test(event.target.value);
    const searchIcon = document.getElementById("search-icon");
    suggestions.textContent = "";
    searchIcon.addEventListener("click", function() {
      if (event.target.value === "") {
        displayData(recipesList);
      }
        if (match) {
          const tempRecipeArray = [];
          console.log("palier 1")
          recipesList.forEach((recipe) => {
              const name = recipe.name;
              if (name.toLowerCase().includes(`${event.target.value}`)) {
                  tempRecipeArray.push(recipe)
                  suggestions.innerHTML = `
                  <li>${name}</li>`;
              }
          })
              recipesSection.innerHTML = "";
              displayData(tempRecipeArray)
        }
    })
})
