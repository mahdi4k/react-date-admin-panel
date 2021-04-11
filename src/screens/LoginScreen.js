import React, {useState, useEffect} from 'react';
import {Link} from "react-router-dom";
import {Form, Button, Col, Container} from "react-bootstrap";
import apiClient from "../services/EventService";
import Message from "../components/Message";
const LoginScreen = ({location, history}) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')

    const redirect = location.search ? location.search.split('=')[1] : '/'

    let userInfo = localStorage.getItem("user_api");
    useEffect(() => {

        if (userInfo) {
            history.push(redirect)
        }

    }, [history, userInfo, redirect])

    const submitHandler = async (e) => {
        e.preventDefault()


        try {
            const {data} = await apiClient.post('/auth/local', {
                identifier :  email, password
            })
            console.log(data)
                 localStorage.setItem('user_api', JSON.stringify(data.jwt))
                 history.push('/')
        } catch (error) {

            error.response && setMessage(error.response.data.message[0]['messages'][0])
        }


    }
    return (
        <>
            <Container>
                <Col md={{span: 8, offset: 2}}>
                    <div className='p-3 mt-3 bg-white loginForm'>
                        <h1>login</h1>
                        {message && <Message variant='danger' ErrorsMessage={message}/>}

                        <Form onSubmit={submitHandler}>
                            <Form.Group controlId='email'>
                                <Form.Label>email</Form.Label>
                                <Form.Control type='email' value={email}
                                              onChange={(e) => setEmail(e.target.value)}>
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId='password'>
                                <Form.Label>password</Form.Label>
                                <Form.Control type='password' value={password}
                                              onChange={(e) => setPassword(e.target.value)}>
                                </Form.Control>
                            </Form.Group>

                            <Button className='d-flex  text-center justify-content-center w-25' type='submit'
                                    variant='primary'>
                                login
                            </Button>

                        </Form>

                        {/*<div className='text-right my-4'>
                            <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
                                ثبت نام
                            </Link>
                        </div>*/}

                    </div>

                </Col>
            </Container>
        </>

    );
};

export default LoginScreen;
