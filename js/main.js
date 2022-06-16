// var myHttp = new XMLHttpRequest();
// myHttp.open("GET","https://jsonplaceholder.typicode.com/posts");
// myHttp.send();

// userPosts = [];

// myHttp.addEventListener("readystatechange",function () {
//   if (myHttp.readyState == 4) {
//     userPosts = JSON.parse(myHttp.response);
//     displayData()
//   }
// });

// userPosts.length
// function displayData() {
//   var cartona = ``;
//   for (var i = 0; i <userPosts.length; i++) {
//     cartona += `<div class="col-md-3">
//     <h2>${userPosts[i].title}</h2>
//     <p>${userPosts[i].body}</p>
//   </div>`
//   }
//   document.getElementById("data").innerHTML=cartona ;
// }

data = [];

async function getRecipes(meal) {
  var response = await fetch(
   ` https://forkify-api.herokuapp.com/api/search?q=${meal}`
  );
  var recipesFood = await response.json();
  data = recipesFood.recipes;
  displayData();
}
getRecipes('pizza');

function displayData() {
  var cartona = "";
  for (var i = 0; i < data.length; i++) {
    cartona += `
      <div class="col-md-3 my-3">
      <img class = 'w-100 recepts-img' src=${data[i].image_url} />
      <h5 class ='my-2'> ${data[i].title} <h5/>
      <a  href="${data[i].source_url}" target="_blank" class="btn btn-info">source</a>
      <a  onclick = getRecipesDetails(${data[i].recipe_id})  data-bs-toggle="modal" data-bs-target="#exampleModal" class="btn btn-warning">datails</a>
      </div>
      `;
  }
  document.getElementById("rowData").innerHTML = cartona;
}

var links = document.querySelectorAll('.navbar .nav-link')
for(var i = 0  ; i<links.length ; i++){

  links[i].addEventListener('click',function(e){
    var currentMeal = e.target.text
    // console.log(currentMeal);
    getRecipes(currentMeal)
   
  })

}

async function getRecipesDetails(id){
  var response = await fetch(`https://forkify-api.herokuapp.com/api/get?rId=${id}`)
  var details = await response.json();
  var recipeDetalisData = `
  <img class = 'w-100 recepts-img' src='${details.recipe.image_url}'/>
  <h3>${details.recipe.publisher}</h3>
  `
  document.getElementById('recipeData').innerHTML = recipeDetalisData
}