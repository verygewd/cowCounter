import React, { useState } from 'react'
import { Form, Button, Card, Container, Alert} from 'react-bootstrap'
import { Link, Redirect } from 'react-router-dom'
import { signin } from './api-auth'
import auth from './auth-helper'

const SignIn = (props) => {
    const [values, setValues] = useState({
        username: '',
        password: '',
        error: '',
        redirectToReferrer: false
    })

    const onClickSubmit = (e) => {
        e.preventDefault()
        const user = {
            username: values.username,
            password: values.password
        }
        
        signin(user).then((data) => {
            if (data.error) {
                setValues({...values, error: data.error})
            } else {
                auth.authenticate(data, () => {
                    setValues({...values, error: '', redirectToReferrer: true})
                })
            }
        })
    }

    const handleChange = key => event => {
        setValues({...values, [key]: event.target.value})
    }


    const {from} = props.location.state || {
        from: {
            pathname: '/'
        }
    }

    const {redirectToReferrer} = values
    if (redirectToReferrer) {
        return (<Redirect to={from} />)
    }
    return (
        <Container className="justify-content-md-center" style={{display:'flex'}}>
            <div className="w-50">
                <Card>
                    <Card.Body>
                        <h2 className="text-center mb-4">Sign In</h2>
                        {values.error && <Alert variant="danger">{values.error}</Alert>}
                        <Form onSubmit={onClickSubmit}>
                            <Form.Group id="username">
                                <Form.Label>Username</Form.Label>
                                <Form.Control type="text" onChange={handleChange('username')} required />
                            </Form.Group>
                            <Form.Group id="password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" onChange={handleChange('password')} required />
                            </Form.Group>
                            <Button  className="w-100" type="submit">
                                Sign In
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
                <div className="w-100 text-center mt-2">
                    Need an account? <Link to='/signup'>Sign Up</Link>
                </div>
            </div>
        </Container>
    )
}

export default SignIn
