import "./Filters.css";
export default function FilterPanel({ filters, setFilters }) {

  function changeGen(e) {
    setFilters(prev => ({ ...prev, generation: e.target.value }));
  }

  function changeType(e){
    setFilters(prev =>({ ...prev,type:e.target.value}))
  }

  function searchName(e){
    setFilters(prev =>({...prev,name:e.target.value}))
  }

  return (
    <div>
      <h2>All Pokemon</h2>
        <form id="search">
            <h3>Filter by Generation</h3>
            <select 
                id="gen_filter" 
                name="gen_filter" 
                value={filters.generation}
                onChange={changeGen}
            >
                <option value = "ShowAll">Show All</option>
                <option value = "1">Generation 1</option>
                <option value = "2">Generation 2</option>
                <option value = "3">Generation 3</option>
                <option value = "4">Generation 4</option>
                <option value = "5">Generation 5</option>
                <option value = "6">Generation 6</option>
                <option value = "7">Generation 7</option>
                <option value = "8">Generation 8</option>
                <option value = "9">Generation 9</option>
            </select>

            <h3>Filter by Type</h3>
            <select 
                id="type_filter" 
                name="type_filter" 
                value={filters.type}
                onChange={changeType}
            >
                <option value = "ShowAll">Show All</option>
                <option value = "grass">Grass</option>
                <option value = "fire">Fire</option>
                <option value = "water">Water</option>
                <option value = "normal">Normal</option>
                <option value = "flying">Flying</option>
                <option value = "bug">Bug</option>
                <option value = "poison">Poison</option>
                <option value = "rock">Rock</option>
                <option value = "ground">Ground</option>
                <option value = "electric">Electric</option>
                <option value = "psychic">Psychic</option>
                <option value = "ghost">Ghost</option>
                <option value = "ice">Ice</option>
                <option value = "dragon">Dragon</option>
                <option value = "steel">Steel</option>
                <option value = "dark">Dark</option>
                <option value = "fairy">Fairy</option>

            </select>

            <h3>Search</h3>
            <input 
                placeholder = "Tyranitar"
                id="card-name-field" 
                type="text" 
                onChange = {searchName}>
            </input>

        </form>
    </div>
  );
}