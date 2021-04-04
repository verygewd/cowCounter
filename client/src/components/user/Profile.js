import React, { useEffect, useState } from 'react'
import { Button, Card, Container } from 'react-bootstrap'
import { Redirect, useHistory } from "react-router-dom";
import { read, update } from './api-user';
import auth from '../auth/auth-helper'
import cow from '../../images/cow.png'
const Profile = ({match}) => {
    const [redirectToSignIn, setRedirect] = useState(false)
    const [user, setUser] = useState({})
    const history = useHistory()
    const [clicks, setClicks] = useState()
    
    useEffect(() => {
        const abortController  = new AbortController()
        const signal = abortController.signal
        
        read({ userId: match.params.userId}, {t: auth.isAuthenticated().token}, signal).then((data) => {
            if (data && data.error) {
                setRedirect(true)
            } else {
                setUser(data)
            }
        })
    
        return () => {
            abortController.abort()
        }
    }, [match.params.userId])

    useEffect(() => {
        let clicks = user.clickCount === undefined ? 0 : user.clickCount
        clicks = clicks + 1
        update({userId: match.params.userId},
            {t: auth.isAuthenticated().token},
            {clickCount: clicks})
        setClicks(clicks)
    }, [match.params.userId, user])


    if (redirectToSignIn) {
        <Redirect to={'/signin'} />
    }
    return (
        <Container className="justify-content-md-center" style={{display:'flex'}}>
            <div className="w-50">
                <Card>
                    <Card.Body>
                        <h2 className="text-center mb-4">Username: {user.username}</h2>
                        <Card.Img src={cow}/>
                        <h4 className="mt-3 text-center">Click Count: {clicks}</h4>
                        <Button onClick={() => history.push('/')} className="btn btn-primary w-100">Back</Button>
                    </Card.Body>
                
                </Card>
            </div>
        </Container>
    )
}

export default Profile
