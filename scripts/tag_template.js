
const listTagsHtml = document.querySelector(".listTags");

const tagsList = {
  ing: [],
  app: [],
  ust: []
}
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
// tagsCancel.forEach(tag => {
//     tag.addEventListener("click", function(e) {
//         console.log(e.target);
//     })
// })

function deleteTagsList (index, ctx) {
    if (ctx == "ing") {
        tagsList.ing.splice(index, 1);
    } else if (ctx == "app") {
      tagsList.app.splice(index, 1);
    }  else if (ctx == "ust") {
      tagsList.ust.splice(index, 1);
    }
    showTagsList(tagsList);
}
