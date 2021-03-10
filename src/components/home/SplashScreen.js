import React from 'react'
import Container from "@material-ui/core/Container";
import LizziLogo from './lizzilogo groot geel.png'


function SplashScreen() {
    return (
        <Container>
            <img src={LizziLogo} style={{width: "100%"}} alt='Logo Lizzi' />
        </Container>
    )
}

export default SplashScreen
