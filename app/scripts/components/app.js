import RecipeList from 'components/recipe-list';
import RecipeForm from 'components/recipe-form';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      search: '',
      sort: 'id',
      order: 'asc'
    };
    _.bindAll(this, 'onSearch', 'onSort', 'onOrder');
  }
  componentDidMount(){
    this._forceUpdate = this.forceUpdate.bind(this,null);
    this.props.recipes.on('add change remove', this._forceUpdate)
  }
  componentWillUnmount(){
    this.props.recipes.off('add change remove', this._forceUpdate)
  }
  onSearch(e){
  this.setState({search: e.target.value.trim().toLowerCase() });
  }
  onSort(e){
    this.setState({sort: e.target.value });
  }
  onOrder(e){
  this.setState({order: e.target.value });
  }
  render(){
    var recipes = this.props.recipes.models;
    console.log(recipe)
    recipes = _.filter(recipes, (recipe)=> _.any(recipe.values(),(value)=> typeof value == 'string'
  && value.trim().toLowerCase().indexOf(this.state.search) > -1
)
);
  recipes = _.sortBy(recipes, (recipe)=> recipe.get(this.state.sort))

  if(this.state.order == 'desc'){
    recipes = recipes.reverse();
  }
    return (
    <div>
      <h1>{this.props.title}</h1>
      <RecipeList models={recipes}/>
      <RecipeForm models={recipes} onSearch={this.onSearch} onSort={this.onSort} onOrder={this.onOrder}/>
    </div>
  );
  }
}

export default App;
