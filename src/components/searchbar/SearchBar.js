import React, { Component } from 'react'

import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
    form: {
    //   backgroundColor: 'rgba(210, 207, 210, 0.644)',
      borderLeft: '3px solid white',
      placeholder: 'white',
      marginBottom: '10px',
      borderRadius: '2px',
    },
    input: {
        color: "white"
      }
  });

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
        const {classes} = this.props

        return(
            <Container component="main" maxWidth="xs">
                 <TextField
                 className={classes.form}
                 fullWidth
                 margin="normal"
                 type="text"
                 name="search" 
                 placeholder="   Search" 
                 value={this.state.searchInput} 
                 onChange={this.handleSearch}
                 InputProps={{
                    className: classes.input
                }}
                
                 >
                 </TextField>
            </Container>
           
        )
    }
}

export default withStyles(styles)(SearchBar);

