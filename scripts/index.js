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


function searchInRecipes(arrayOfRecipes, input) {
    const temporyRecipesArr = [];
    if (input.length >= 3) {
        const searchIcon = document.getElementById("search-icon");
        const recipesSection = document.querySelector(".card-recipe-container");
        searchIcon.addEventListener("click", function() {
            recipesSection.innerHTML = "";
            arrayOfRecipes.forEach(recipe => {
                const lowerInput = input.toLowerCase();
                if (recipe.name.toLowerCase().includes(lowerInput) ||
                    recipe.description.toLowerCase().includes(lowerInput) ||
                    recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(lowerInput))
                ) {
                    temporyRecipesArr.push(recipe);
                }
            });
            displayData(temporyRecipesArr);
        });
    }
}

const searchBar = document.getElementById("searchbar");
searchBar.addEventListener("click", function(){
    searchBar.value = "";
    searchBar.addEventListener("input", function(){
        console.log("Input event triggered");
        searchBar.textContent = "";
        searchInRecipes(recipesList, searchBar.value);
    });
});


const filterIngredients = document.getElementById("filter-ingredients");
const ingredientsIcon = document.getElementById("ingredients-icon");







const filterHiddenIngredients = document.querySelector(".filter-hidden-ingredients");
const filterListIngredients = document.querySelector(".filter-list-ingredients");
const InputFilterIngredients = document.getElementById("filter-ingredients-input");
const ingredientsArr = [];

filterIngredients.addEventListener("click", function(){
    ingredientsIcon.classList.toggle("fa-angle-down");
    ingredientsIcon.classList.toggle("fa-angle-up");
    filterHiddenIngredients.classList.toggle("filter-hidden");
    filterHiddenIngredients.classList.toggle("filter-visible");
    filterListIngredients.innerHTML = "";
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
      filterListIngredients.innerHTML +=`<span>${arrayIngredientsUniques[i]}</span>`;
    }
})


// function filterByTag(arrayOfRecipes, input) {
//     filterHidden.classList.toggle("filter-hidden");
//     filterHidden.classList.toggle("filter-visible");
//     const ingredientsArr = [];
//     const appareilsArr = [];
//     const ustensilesArr = [];
//     arrayOfRecipes.forEach((recipe) => {
//         if (recipe.appliance) {
//           appareilsArr.push(recipe.appliance);
//         }
//     });
// }


// appareilsIcon.classList.toggle("fa-angle-down");
// appareilsIcon.classList.toggle("fa-angle-up");
// ustensilsIcon.classList.toggle("fa-angle-down");
// ustensilsIcon.classList.toggle("fa-angle-up");

const filterAppareils = document.getElementById("filter-appareils");
const appareilsIcon = document.getElementById("ingredients-icon");
const filterListAppareils = document.querySelector(".filter-list-appareils");
const filterHiddenAppareils = document.querySelector(".filter-hidden-appareils");
const appareilsArr = [];


filterAppareils.addEventListener("click", function(){
  appareilsIcon.classList.toggle("fa-angle-down");
  appareilsIcon.classList.toggle("fa-angle-up");
  filterHiddenAppareils.classList.toggle("filter-hidden-appareils");
  filterHiddenAppareils.classList.toggle("filter-visible");
  filterListAppareils.innerHTML = "";
  recipesList.forEach((recipe) => {
      const name = recipe.name;
      if (recipe.appliance) {
        appareilsArr.push(recipe.appliance);
      }
  })
  const arrayAppareilsUniques = [...new Set(appareilsArr)];
  for (let i = 0; i < arrayAppareilsUniques.length; i++) {
      filterListAppareils.innerHTML +=`<span>${arrayAppareilsUniques[i]}</span>`;
  }
})


const filterUstensils = document.getElementById("filter-ustensils");
const ustensilsIcon = document.getElementById("ingredients-icon");
const filterListUstensils = document.querySelector(".filter-list-ustensils");
const filterHiddenUstensils = document.querySelector(".filter-hidden-ustensils");
const ustensilsArr = [];


filterUstensils.addEventListener("click", function(){
  ustensilsIcon.classList.toggle("fa-angle-down");
  ustensilsIcon.classList.toggle("fa-angle-up");
  filterHiddenUstensils.classList.toggle("filter-hidden-ustensils");
  filterHiddenUstensils.classList.toggle("filter-visible");
  filterListUstensils.innerHTML = "";
  recipesList.forEach((recipe) => {
      const name = recipe.name;
      if (recipe.ustensils) {
        ustensilsArr.push(recipe.ustensils);
      }
  })
  console.log(ustensilsArr);
  const flattenedUstensils = ustensilsArr.flat();
  const arrayUstensilsUniques = [...new Set(flattenedUstensils)];
  for (let i = 0; i < arrayUstensilsUniques.length; i++) {
      filterListUstensils.innerHTML +=`<span class="">${capitalize(arrayUstensilsUniques[i])}</span>`;
  }
})


function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
