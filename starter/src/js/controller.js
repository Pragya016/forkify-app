import 'regenerator-runtime/runtime'
import 'core-js/stable'

import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import bookmarksView from './views/bookmarksView.js';
import paginationView from './views/paginationView.js';
import addRecipeView from './views/addRecipeView.js';
import {MODEL_CLOSE_SEC} from './config.js';
 

const controlRecipes = async function(){
  try {
        const id = window.location.hash.slice(1)
    
        if(!id) return;

    //rendering the spinner
    recipeView.renderSpinner();

    // 0)updating results view and bookmarks to mark selected search results
    resultsView.update(model.getSearchResultsPage())
    bookmarksView.render(model.state.bookmarks)

    // 1) loading the recipe
    await model.loadRecipe(id);
    
    // 3)rendering the recipe
    recipeView.render(model.state.recipe);

 } catch (error) {
recipeView.renderError()
}
}

const controlSearchResults = async function(){
  try{
    // rendering the spinner
    resultsView.renderSpinner();
    
    // getting the query 
    const query = searchView.getQuery();

    if(!query) return;

    // loading the search results
    await model.loadSearchResults(query);

    // rendering the search results
    resultsView.render(model.getSearchResultsPage())

    // diplaying the pagination buttons
    paginationView.render(model.state.search)

  }catch(err){
    recipeView.renderError();
  }
}

const controlPagination = function(goToPage){
   // rendering the new search results
   resultsView.render(model.getSearchResultsPage(goToPage))

   // diplaying the new pagination buttons
   paginationView.render(model.state.search);
}

const controlServings = function(newServings){
  // update the data in state
  model.updateServings(newServings)

  // update the recipe view
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);

}

const controlAddBookmark = function(){
  // add bookmark
  if(!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);
  
  // update recipeView
  recipeView.update(model.state.recipe)

  // render bookmark
  bookmarksView.render(model.state.bookmarks)
}

const controlBookmarks = function(){
  bookmarksView.render(model.state.bookmarks)
}

const controlAddRecipe = async function(newRecipe){
  try{
    // show spinner
    addRecipeView.renderSpinner();

    // upload the recipe from the data
    await model.uploadRecipe(newRecipe)

    // render the recipe
    recipeView.render(model.state.recipe);

    // display success message
    addRecipeView.renderMessage();

    // upload bookmarks
    bookmarksView.render(model.state.bookmarks);

    // change ID in the url
    window.history.back()

    // close form window
    setTimeout(() => {
      // addRecipeView.toggleWindow();
      recipeView.render(model.state.recipe);
    }, MODEL_CLOSE_SEC * 1000);
  }catch(err){
    addRecipeView.renderError(err.message);
  }
}

function init(){
  addRecipeView.addHandlerUpload(controlAddRecipe);
  bookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);  
}
init()