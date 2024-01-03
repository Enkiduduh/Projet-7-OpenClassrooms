const listTagsHtml = document.querySelector(".listTags");
const recipesSection = document.querySelector(".card-recipe-container");


async function getRecipes() {
    let response = await fetch("data/recipes.json");

    if (!response.ok) {
        alert("HTTP-Error: "+ response.statut);
    } else {
        let data = await response.json();
        let recipes = data.recipes;
        recipesList = [...recipes];
        return {
          recipes: [...recipes],
        };
    };
};

const tagsList = {
  ing: [],
  app: [],
  ust: []
};

const filtersList = {
  ing: [],
  app: [],
  ust: []
};

let tagsCancel;

function showTagsList (arrayOfTagList) {
    let tagListModelHtml = "";
    if (arrayOfTagList.ing.length > 0) {
      arrayOfTagList.ing.forEach((tag, index)  => {
        tagListModelHtml += `<div class="show-tag">
        <span>${tag}</span>
        <span onclick="deleteTagsList(${index},'ing')" class="delete-tag ing"><i class="fa-solid fa-xmark "></i></span>
      </div>`;
      });
    }
    if (arrayOfTagList.app.length > 0) {
      arrayOfTagList.app.forEach((tag, index) => {
        tagListModelHtml += `<div class="show-tag">
        <span>${tag}</span>
        <span onclick="deleteTagsList(${index},'app')" class=" delete-tag app"><i class="fa-solid fa-xmark "></i></span>
      </div>`;
      });
    }
    if (arrayOfTagList.ust.length > 0) {
      arrayOfTagList.ust.forEach((tag, index) => {
        tagListModelHtml += `<div class="show-tag">
        <span>${tag}</span>
        <span onclick="deleteTagsList(${index},'ust')" class="delete-tag ust"><i class="fa-solid fa-xmark "></i></span>
      </div>`;
      });
    }
    listTagsHtml.innerHTML = tagListModelHtml;

    const deleteIcons = document.querySelectorAll(".delete-tag");
    deleteIcons.forEach((icon) => {
        icon.style.visibility = "hidden";

        icon.parentElement.addEventListener("mouseenter", function () {
            icon.style.visibility = "visible";
        });

        icon.parentElement.addEventListener("mouseleave", function () {
            icon.style.visibility = "hidden";
        });
    });
}

showTagsList(tagsList);

function deleteTagsList(index, category) {
  tagsList[category].splice(index, 1);
  filterRecipesByTags();
  showTagsList(tagsList);

}

function selectTag(category, tag) {
  console.log("SelectTag A");
  if (!tagsList[category].includes(tag)) {
    console.log("SelectTag A");
      tagsList[category].push(tag);
      console.log("selectTag");
      filterRecipesByTags();
  }
  console.log("SelectTag C");
}

function resetFilters() {
    console.log("Reset A");
    if (tagsList.ing.length === 0 && tagsList.app.length === 0 && tagsList.ust.length === 0 ) {
        filtersList = { ing: [], app: [], ust:[] };
        recipesSection.innerHTML = "";
        listTagsHtml.innerHTML = "";
        displayData(recipesList);
        console.log("Reset B");
    }
    console.log("Reset C");
}

function filterRecipesByTags() {
  let filteredRecipes = recipesList;
  Object.keys(tagsList).forEach(category => {
    console.log("Filter A");
      tagsList[category].forEach(tag => {
          filteredRecipes = filteredRecipes.filter(recipe => {
              if (category === 'ing') {
                  return recipe.ingredients.some(ingredient => ingredient.ingredient.includes(tag));
              } else if (category === 'app') {
                  return recipe.appliance.includes(tag);
              } else if (category === 'ust') {
                  return recipe.ustensils.includes(tag);
              }
          });
      });
    });
    if (filteredRecipes !== recipesList) {
      recipesSection.innerHTML = "";
      updateAvailableFilters(filteredRecipes);
      displayData(filteredRecipes);
      console.log("Filter B");
    } else {
        recipesSection.innerHTML = "";
        displayData(recipesList);
        console.log("Filter C");
    }

}

function updateAvailableFilters(filteredRecipesArray) {
  const allIngredients = filteredRecipesArray.flatMap(recipe => recipe.ingredients.map(ing => ing.ingredient));
  filtersList.ing = [...new Set(allIngredients)];
  const allAppliance = filteredRecipesArray.map(recipe => recipe.appliance);
  filtersList.app = [...new Set(allAppliance)];
  const allUstensils = filteredRecipesArray.flatMap(recipe => recipe.ustensils);
  filtersList.ust = [...new Set(allUstensils)];
}
