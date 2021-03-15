import React from 'react'
import LogoLizzi from './lizzilogo groot geel.png'
import {Button, Container} from '@material-ui/core';
import { Link } from "react-router-dom";


function HomePage() {
    return (
        <Container >
            <img style={{width: "100%"}} src={LogoLizzi} alt="Lizzi Logo Groot"></img>
            
            <Button
            type="submit"
            fullWidth
            variant="contained"
            style={{ backgroundColor: "#fad974", color: "black", border: '1px solid black' }}
            component={Link}
            to={`/login`}
          >
            Log In
          </Button>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            style={{ backgroundColor: "black", color: "white", border: '1px solid #fad974' }}
            component={Link}
            to={`/signup`}
          >
            Sign Up
          </Button>
        </Container>
    )
}

export default HomePage
