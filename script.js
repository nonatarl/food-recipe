const searchBtn = document.getElementById('search-btn');
const mealList = document.getElementById('group-meals');
const mealDetailList = document.querySelector('.recipe-details-content');
const recipeCloseBtn = document.getElementById('recipe-close-btn'); 

searchBtn.addEventListener('click', getMealList);
mealList.addEventListener('click', getMealRecipe);
recipeCloseBtn.addEventListener('click', () => {
  mealDetailList.parentElement.classList.remove('showRecipe');
})

function getMealList() {
  let searchInputTxt = document.getElementById('search-input').value.trim();
  fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputTxt}`)
  .then(response => response.json())
  .then(data => {
    let html = "";
    if(data.meals) {
      data.meals.forEach(meal => {
        html += `
        <div class="meal-list" data-id="${meal.idMeal}">
          <div class="meal-pic">
            <img src="${meal.strMealThumb}" alt="burger">
          </div>
          <div class="meal-name">
            <h3>${meal.strMeal}</h3>
          <a href="#" class="recipe-btn">Get Recipe</a>
          </div>
        </div>
        `;
      });
      mealList.classList.remove('notFound');
    } else {
      html = "Sorry, we didn't find any meal!"
      mealList.classList.add('notFound');
    }
    mealList.innerHTML = html;
  })
};

function getMealRecipe(e) {
  e.preventDefault();
  if(e.target.classList.contains('recipe-btn')) {
    let mealRecipe = e.target.parentElement.parentElement;
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealRecipe.dataset.id}`)
    .then(response => response.json())
    .then(data => mealRecipeModal(data.meals));
  }
}

function mealRecipeModal(meal) {
  meal = meal[0];
  let html = `
    <h2 class="recipe-title">${meal.strMeal}</h2>
    <div class="recipe-instruct">
      <h3>Recipe</h3>
      <p>${meal.strInstructions}</p>
    </div>
    <div class="recipe-img">
      <img src="${meal.strMealThumb}" alt="food">
    </div>
    <div class="recipe-link">
      <a href="${meal.strYoutube}" target="_blank">Watch Video</a>
    </div>
  `;
  mealDetailList.innerHTML = html;
  mealDetailList.parentElement.classList.add('showRecipe');
}
