import React from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import auth from './../auth/auth-helper'
import { withRouter } from 'react-router'
const Menu = withRouter(({history}) => {
    const links = !auth.isAuthenticated() ? (
            <Nav className="mr-auto">
                <Nav.Link href='/signin'>Sign In</Nav.Link>
                <Nav.Link href='/signup'>Sign Up</Nav.Link>
            </Nav>
    ) : (
        <Nav className="mr-auto">
            <Nav.Link onClick={() => {
                auth.clearJWT(()=>history.push('/'))
            }}>Sign Out</Nav.Link>
        </Nav>
    )
    return (
        <Navbar bg="dark" expand="lg" variant="dark" className="sticky-top nav-bar">
            <Navbar.Brand href='/' >
                CowCounter
            </Navbar.Brand>
            {links}
        </Navbar>
    )
})

export default Menu
