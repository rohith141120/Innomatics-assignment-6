
const app_id = '179f0cf2';
const app_key = '35fc9bcf2ed4497405b60485ad5da6f6';

const resultContainer = document.getElementById('record-display');
const searchForm = document.querySelector('form');
const searchInput = document.getElementById('input-text');

searchForm.addEventListener('submit', function (event) {
    event.preventDefault();
    searchRecipes();
});

function fetchInitialRecipes() {
    const apiUrl = `https://api.edamam.com/api/recipes/v2?type=public&q=icecream&app_id=${app_id}&app_key=${app_key}`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            displayRecipes(data.hits);
        })
        .catch(error => {
            console.error('Error fetching initial recipes:', error);
            resultContainer.innerHTML = `<h1 class="text-light">Error fetching recipes. Please try again later.</h1>`;
        });
}
function searchRecipes() {
    const query = searchInput.value.trim();
    if (query.length === 0) {
        resultContainer.innerHTML = `<h1 class="text-light">Enter a value</h1>`;
        return;
    }

    const apiUrl = `https://api.edamam.com/api/recipes/v2?type=public&q=${encodeURIComponent(query)}&app_id=${app_id}&app_key=${app_key}`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            displayRecipes(data.hits);
        })
        .catch(error => {
            console.error('Error fetching recipes:', error);
            resultContainer.innerHTML = `<h1 class="text-light">Error fetching recipes. Please try again later.</h1>`;
        });
}

function displayRecipes(recipes) {
    resultContainer.innerHTML = '';

    if (recipes.length === 0) {
        resultContainer.innerHTML = `<h1 class="text-light">No recipes found</h1>`;
        return;
    }

    const gridContainer = document.createElement('div');
    gridContainer.classList.add('row', 'g-4');

    recipes.forEach(hit => {
        const recipe = hit.recipe;

        const recipeElement = document.createElement('div');
        recipeElement.classList.add('col', 'col-12', 'col-md-4', 'col-lg-3', 'my-5');

        recipeElement.innerHTML = `
            <div class="card h-100 text-center bg-dark text-light border border-light">
                <img src="${recipe.image}" class="card-img-top" alt="${recipe.label}">
                <div class="card-body">
                    <h5 class="card-title">${recipe.label}</h5>
                    <h6 class="card-title">Calories: ${Math.round(recipe.calories)}</h6>
                    <p class="card-text">Cuisine: ${recipe.cuisineType ? recipe.cuisineType.join(', ') : 'Not Specified'}</p>
                    <a href="${recipe.url}" class="btn btn-primary">View Recipe</a>
                </div>
            </div>
        `;

        gridContainer.appendChild(recipeElement);
    });

    resultContainer.appendChild(gridContainer);
}

document.addEventListener('DOMContentLoaded', fetchInitialRecipes);
