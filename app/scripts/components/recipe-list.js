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
componentWillMount(){
  this.props.recipes.fetch();
  this.props.recipes.on('sync add remove', this.forceUpdate.bind(this, null), this);
},
render(){
  var recipes = this.props.recipes.toJSON();

  return (
    <ul>
      {recipes.map((r) => <li key={r.objectId}>{r.name}</li>)}
    </ul>
  );
}
});

export default RecipeList;
