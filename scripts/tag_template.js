
const listTagsHtml = document.querySelector(".listTags");
const tagsList = {
    ing: ["carotte", "courgette", "navet"],
    app: ["blender", "four"],
    ust: ["couteau", "bol"]
}
let tagsCancel;

function showTagsList (arrayOfTagList) {
    let tagListModelHtml = "";
    if (arrayOfTagList.ing.length > 0) {
      arrayOfTagList.ing.forEach((tag, index)  => {
        tagListModelHtml += `<div class="tag">
        <span>${tag}</span>
        <span onclick="deleteTagsList(${index},'ing')" class="tag-cancel ing">x</span>
      </div>`;
      });
    }
    if (arrayOfTagList.app.length > 0) {
      arrayOfTagList.app.forEach((tag, index) => {
        tagListModelHtml += `<div class="tag">
        <span>${tag}</span>
        <span onclick="deleteTagsList(${index},'app')" class="tag-cancel app">x</span>
      </div>`;
      });
    }
    if (arrayOfTagList.ust.length > 0) {
      arrayOfTagList.ust.forEach((tag, index) => {
        tagListModelHtml += `<div class="tag">
        <span>${tag}</span>
        <span onclick="deleteTagsList(${index},'ust')" class="tag-cancel ust">x</span>
      </div>`;
      });
    }
    listTagsHtml.innerHTML = tagListModelHtml;
    tagsCancel = document.querySelectorAll(".tag-cancel");

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
