import React, {useState} from 'react'
import { Form, Button, Card, Container, Modal, Alert} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import {create }from '../user/api-user'
const SignUp = () => {

    const [values, setValues] = useState({
        username: '',
        password: '',
        open: false,
        error: ''
      })
      
    const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value })
    }
    const onClickSubmit = async (e) => {
        e.preventDefault()
        const user = {
            username: values.username ,
            password: values.password
        }


        create(user).then((data) => {
            if (data.error) {
                setValues({...values, error: data.error})
            } else {
                setValues({...values, error:'', open: true})
            }
            })
        }
    
    const handleClose = () => {
        setValues({...values, open: false})
    }

    return (
        <Container className="justify-content-md-center" style={{display:'flex'}}>
            <div className="w-50">
                <Card>
                    <Card.Body>
                        <h2 className="text-center mb-4">Sign Up</h2>
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
                                Sign Up
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
                <div className="w-100 text-center mt-2">
                    Already have an account? <Link to='/signin'>Sign In</Link>
                </div>
                <Modal show={values.open} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Your Account has been created!</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Thanks for joining <strong>CowCounter</strong>. Click "Sign In" to get started</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button href='/signin' variant="primary" onClick={handleClose}>
                            Sign In
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </Container>
    )
}
export default SignUp