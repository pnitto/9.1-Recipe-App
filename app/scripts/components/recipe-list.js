import store from 'store';

const RecipeList = React.createClass({
    propTypes: {
      recipes: React.PropTypes.object
    },
getDefaultProps(){
  return {
    recipes : store.getRecipeCollection()
  }
},
getInitialState(){
  return {
    search: React.PropTypes.string
  }
},
componentWillMount(){
  this.props.recipes.fetch();
  this.props.recipes.on('sync add remove', this.forceUpdate.bind(this, null), this);
},
onSearch(e){
  this.setState({ search: e.target.value.trim().toLowerCase()})
},
render(){
  var recipes = this.props.recipes.toJSON();
  var recipe = this.props.recipes.models;
  var names = _.map(recipe, (recipe) => recipe.get('name'))
  recipe = _.filter(recipe, (recipe)=> _.any(recipe.values(),(value)=> typeof value == 'string'
  && value.trim().toLowerCase().indexOf(this.state.search) > -1
  )
);

  return (
    <ul>
      {recipes.map((r) => <li key={r.objectId}>{r.name}</li>)}
    </ul>
  );
}
});

export default RecipeList;
