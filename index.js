// index.js

const fs = require('fs');

class RecipeFinder {
  constructor() {
    this.recipes = [];
  }

  loadRecipes() {
    try {
      const data = fs.readFileSync('recipes.json', 'utf8');
      this.recipes = JSON.parse(data);
      console.log('Recipes loaded successfully.');
    } catch (err) {
      console.error('Error loading recipes:', err);
    }
  }

  saveRecipes() {
    try {
      const data = JSON.stringify(this.recipes, null, 2);
      fs.writeFileSync('recipes.json', data);
      console.log('Recipes saved successfully.');
    } catch (err) {
      console.error('Error saving recipes:', err);
    }
  }

  findRecipe(keyword) {
    const results = this.recipes.filter(recipe => {
      return recipe.title.toLowerCase().includes(keyword.toLowerCase()) ||
             recipe.ingredients.toLowerCase().includes(keyword.toLowerCase());
    });
    return results;
  }

  displayRecipes(recipes) {
    console.log('Found Recipes:');
    recipes.forEach((recipe, index) => {
      console.log(`${index + 1}. ${recipe.title}`);
      console.log('Ingredients:', recipe.ingredients);
      console.log('Instructions:', recipe.instructions);
      console.log('-------------------------------------');
    });
  }
}

const recipeFinder = new RecipeFinder();
recipeFinder.loadRecipes();

// Example: Search for a recipe
const searchKeyword = 'pasta';
const searchResults = recipeFinder.findRecipe(searchKeyword);
recipeFinder.displayRecipes(searchResults);
