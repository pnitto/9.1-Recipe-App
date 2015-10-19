let recipes;

$.ajaxSetup({
  beforeSend(xhr, options){
    if(options.url.match(/api.parse.com/)){
      xhr.setRequestHeader('X-Parse-Application-Id',"J0jv7L6rNzE8hnQRwKMYNmDRvY2q9QWGMdxYbMk2")
      xhr.setRequestHeader('X-Parse-REST-API-Key',"xgaqcAUWGrkFEJNldo9VLeqRLw4zmfrVp9UMWpni")
    }
  }
})

const Recipe = Backbone.Model.extend({
  idAttribute: "objectId"
});

const RecipeCollection = Backbone.Collection.extend({
  model: Recipe,
  url: "https://api.parse.com/1/classes/Recipe",
  parse(response){
    return response.results
  }
});

export default {
  getRecipeCollection(){
    return (recipes = recipes || new RecipeCollection())
  }
};
