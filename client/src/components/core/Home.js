import React from 'react'
import { Container, Jumbotron } from 'react-bootstrap'
import auth from './../auth/auth-helper'
import Dashboard from './Dashboard'
const Home = () => {

    const page = !auth.isAuthenticated() ? (
        <Container>
            <Jumbotron className="mt-5">
                <h1>Hey</h1>
                <p>This here is a cow Counter. Sign Up, Sign In and Count some cows</p>
            </Jumbotron>   
        </Container>
    ) : (
        <Dashboard />
    )
    return (
        page
    )
}

export default Home
