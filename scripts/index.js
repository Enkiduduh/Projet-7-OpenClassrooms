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
console.log(recipesList);

// function searchInRecipes(arrayOfRecipes, input) {
//     const temporyRecipesArr = [];
//     console.log("1");
//     if (input.length >= 3) {
//       console.log("2");
//         arrayOfRecipes.forEach(recipe => {
//             const lowerInput = input.toLowerCase();
//             console.log("3");
//             if (recipe.name.toLowerCase().includes(lowerInput) ||
//                 recipe.description.toLowerCase().includes(lowerInput) ||
//                 recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(lowerInput))
//             ) {
//                 temporyRecipesArr.push(recipe);
//                 console.log("4");
//                 console.log(temporyRecipesArr);
//                 console.log("5");
//             }
//             console.log("6");
//         });
//         console.log("7");
//         displayData(temporyRecipesArr);
//         console.log("8");
//       }
// }

const searchBar = document.getElementById("searchbar");
// searchBar.addEventListener("input", function(){
//   console.log("Input event triggered");
//     searchInRecipes(recipesList, searchBar.value);
// });

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
              const ustenstil = recipe.ustentils;
              const description = recipe.description;
              if (name.toLowerCase().includes(`${event.target.value}`) || description.toLowerCase().includes(`${event.target.value}`)) {
                  tempRecipeArray.push(recipe)
                  suggestions.innerHTML = `
                  <li>${recipe.id}</li>`;
              }
          })
              recipesSection.innerHTML = "";
              displayData(tempRecipeArray)
        }
    })
})

const filterIngredients = document.getElementById("filter-ingredients");
const ingredientsIcon = document.getElementById("ingredients-icon");
const filterHidden = document.querySelector(".filter-hidden");
const filterList = document.querySelector(".filter-list");
const ingredientsArr = [];

const InputFilterIngredients = document.getElementById("filter-ingredients-input");

filterIngredients.addEventListener("click", function(){
    ingredientsIcon.classList.toggle("fa-angle-down");
    ingredientsIcon.classList.toggle("fa-angle-up");
    filterHidden.classList.toggle("filter-hidden");
    filterHidden.classList.toggle("filter-visible");
    filterList.innerHTML = "";
    recipesList.forEach((recipe) => {
        const name = recipe.name;
        if (recipe.ingredients && Array.isArray(recipe.ingredients)) {
            recipe.ingredients.forEach((ingredient) => {
                if (ingredient && ingredient.ingredient) {
                  ingredientsArr.push(ingredient.ingredient);
                }
            });
        }
    })
    console.log(ingredientsArr);
    const arrayIngredientsUniques = [...new Set(ingredientsArr)];
    for (let i = 0; i < arrayIngredientsUniques.length; i++) {
        filterList.innerHTML +=`<span>${arrayIngredientsUniques[i]}</span>`;
    }
})
