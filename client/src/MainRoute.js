import React from 'react'
import {Route, Switch} from 'react-router-dom'
import Menu from './components/core/Menu'
import Home from './components/core/Home'
import SignUp from './components/user/SignUp'
import SignIn from './components/auth/SignIn'
import Profile from './components/user/Profile'

const MainRoute = () => {



    return (
        <>
            <Menu />
            <Switch>
            {/* <PrivateRoute exact path='/home' component={Dashboard} /> */}
                <Route exact path='/' component={Home} />
                <Route  path='/signup' component={SignUp} />
                <Route  path='/signin' component={SignIn} />
                <Route path="/user/:userId" component={Profile}/>
            </Switch>
        </>
    )
}

export default MainRoute
