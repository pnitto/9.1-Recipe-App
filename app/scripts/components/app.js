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

    return (
    <div>
      <h1>{this.props.title}</h1>
      <RecipeList/>
      <RecipeForm  onSearch={this.onSearch} />
    </div>
  );
  }
}

export default App;
