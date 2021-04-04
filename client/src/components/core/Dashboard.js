import React, { useEffect, useState } from 'react'
import { Container, Card, Row, Col } from 'react-bootstrap'
import {list} from '../user/api-user'
import auth from './../auth/auth-helper'
import _ from 'lodash'

const Dashboard = () => {
    const [users, setUsers] = useState([])
    const currentUserId = auth.isAuthenticated().user._id
    
    useEffect(() => {
        const abortController = new AbortController()
        const signal = abortController.signal

        list(signal).then((data) => {
            if (data && data.error) {
                console.log(data.error)
            } else {

                setUsers(_.filter(data, (e) => e._id !== currentUserId))
            }
        })

        return () => {
            abortController.abort()
        }
    }, [currentUserId])

    
    if (users.length === 0) {
       return <Container className="justify-content-md-center" style={{display: "flex"}}>
            <div className="w-50">
                <h2 className = "mt-3 mb-3 text-center">Click a Cow</h2>
                <h4 className = "mt-3 mb-3 text-center"> Looks like you are the first cow to the party.</h4>
                <h4 className = "mt-3 mb-3 text-center"> Check back when others have signed up</h4>
            </div>
        </Container>
    }

    return (
        <Container className="justify-content-md-center" style={{display: "flex"}}>
            <div className="w-50">
            <h2 className = "mt-3 mb-3 text-center">Click a Cow</h2>
                {users.map((item, i) => {
                    return (
                        <a href={"/user/" + item._id} key={i}  style={{ textDecoration: 'none', color: 'black' }} >
                            <Card className="mt-2 mb-2">
                                <Card.Body>
                                    <Row> 
                                        <Col className="text-md-left" style={{fontSize: '15pt'}}>User: {item.username} </Col>
                                        <Col className="text-md-right" style={{fontSize: '15pt'}}>Click Count: {item.clickCount} </Col>
                                    </Row>
                                </Card.Body>
                            </Card>
                        </a>
                    )
                })}
            </div>
        </Container>
    )
}

export default Dashboard
