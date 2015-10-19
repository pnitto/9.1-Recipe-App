import store from 'store';


const IngredientInput = React.createClass({
  propTypes: {
    name: React.PropTypes.string,
    qty: React.PropTypes.number,
    isNew: React.PropTypes.bool,
    onAdd: React.PropTypes.func
  },
  handleAddIngredient(e){
    e.preventDefault();
    this.props.onAdd({
        name: this.refs.name.value,
        qty: Number(this.refs.qty.value)
    })
    this.refs.name.value = '';
    this.refs.qty.value = '';
  },
  render(){
    return (
      <fieldset>
        <input type="text" placeholder="Ingredient" defaultValue={this.props.name} ref="name" />
        <input type="number" placeholder="Quanity" defaultValue={this.props.qty} ref="qty" />

      {this.props.isNew && <button onClick={this.handleAddIngredient}>+</button> }
      </fieldset>
    );
  }

})

const RecipeForm = React.createClass({
  getInitialState(){
    return {
      ingredients: []
    };
  },
  handleSubmit(e){
    e.preventDefault();
    store.getRecipeCollection().create({
      name: this.refs.name.value,
      ingredients: this.state.ingredients
    }, {wait: true});

    this.refs.name.value = '';
    this.refs.ingredients = '';
},
handleAddIngredient(ingredient){
  this.setState({
    ingredients: this.state.ingredients.concat([ingredient])
  })
},
render(){
  var sortOptions;
  var recipes = this.props.recipes
  return (
    <div>
    <form onSubmit={this.handleSubmit}>
      <fieldset>
      <input type="text" placeholder="Name" ref="name" />
      </fieldset>
      <fieldset>
        {this.state.ingredients.map((i,index) =><IngredientInput {...i} key={index} /> )}
        <IngredientInput isNew onAdd={this.handleAddIngredient} />
      </fieldset>

      <button type="submit">Save</button>
    </form>
    <h4>Search</h4>
    <input type="text" onKeyUp={this.props.onSearch} />
  </div>
  )
}
})
export default RecipeForm;
