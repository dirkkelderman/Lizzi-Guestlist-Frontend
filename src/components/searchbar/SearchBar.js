import React, { Component } from 'react'

import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';


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
            <Container component="main" maxWidth="xs">
                 <TextField
                 fullWidth
                 style={{backgroundColor: "white"}}
                 margin="normal"
                 type="text"
                 name="search" 
                 placeholder="Search" 
                 value={this.state.searchInput} 
                 onChange={this.handleSearch}
                 >
                 </TextField>
            </Container>
           
        )
    }
}

export default SearchBar;