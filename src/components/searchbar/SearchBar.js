import React, { Component } from 'react'

class SearchBar extends Component {

    constructor(props){
        super(props);
        this.state = {
            searchInput: ''
        }
    }


    handleSearch = (event) => {
        const value = event.target.value;
        this.setState({
            searchInput: value
        });
        this.props.filteredSearch(value);

    }

    render() {
        return(
            
            <label>
                <input type="text" name="search" placeholder="Search" value={this.state.searchInput} onChange={this.handleSearch} />
            </label>
        )
    }
}

export default SearchBar;