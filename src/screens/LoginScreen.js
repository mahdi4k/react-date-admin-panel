import React, {useState, useEffect} from 'react';
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
            <img className='position-absolute' src="/img/bg.svg" alt=""/>
            <Container>

                <Col className='pt-6 loginSection' md={{span: 8, offset: 2}}>
                    <img className='logo' src="/logo.svg" alt=""/>
                    <div className='p-5 loginForm bg-white '>
                        <h2 className='mb-5'>Login to your account</h2>
                         {message && <Message variant='danger' ErrorsMessage={message}/>}

                        <Form onSubmit={submitHandler}>
                            <Form.Group controlId='email'>
                                <Form.Label>Email Address :</Form.Label>
                                <Form.Control type='email' value={email}
                                              onChange={(e) => setEmail(e.target.value)}>
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId='password'>
                                <Form.Label>Password :</Form.Label>
                                <Form.Control type='password' value={password}
                                              onChange={(e) => setPassword(e.target.value)}>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId="rememberCheckBox">
                                <Form.Check custom type="checkbox" label="Remember my login details" />
                            </Form.Group>
                            <div className='d-flex mt-5 justify-content-between'>
                                <Button className='d-flex btn btn-custom-submit text-center justify-content-center w-25' type='submit'
                                >
                                    login
                                </Button>
                                <button className='btn '>Forget Password</button>
                            </div>

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
