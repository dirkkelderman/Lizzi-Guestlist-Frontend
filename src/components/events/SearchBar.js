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
        this.props.filterEvent(value);

    }

    render() {
        return(
            <div>
            <label>
                Search:
                <input type="text" name="search" value={this.state.searchInput} onChange={this.handleSearch} />
            </label>
            </div>
        )
    }
}

export default SearchBar;