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

const searchBar = document.getElementById("searchbar");

searchBar.addEventListener("input", function(event){
    const regExp = /^[a-zA-Z]{3,}$/;
    const match = regExp.test(event.target.value);
    if (match) {
      console.log("palier 1");
      const regExp = /coco/i;;
      const testCoco = regExp.test(event.target.value);
      const tempRecipeArray = [];
          if (testCoco) {
              console.log("palier 2");
              console.log(recipesList[0].name);
              console.log(recipesList[0].name.includes("coco"));
              recipesList.forEach((recipe) => {
                  const name = recipe.name;
                  for (i = 0 ; i < recipesList.length; i++) {
                      if (recipe[i].includes("coco")) {
                          tempRecipeArray.push(recipe[i])
                      }
                      console.log(tempRecipeArray);
                  }
              })
          }
    }
})
