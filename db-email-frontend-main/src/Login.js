import React, {Component, useEffect, useState} from 'react'
import { Button, Form, Grid, Header, Image, Label, Message, Segment } from 'semantic-ui-react'
import {Navigate, useNavigate} from "react-router-dom"
import axios from "axios";



function AttemptAccess(Email,Password,setPressed,ChangeView){
    setPressed(false)
    console.log('Attempting Access');
    console.log("This is the Email:" + Email)
    console.log("This is the Password:" + Password)
    axios.get('http://127.0.0.1:5000/EmailService/GetUserInformationUsingEmailAddress/'+Email).
    then(function(response) {
        const response_data = response.data
        const AccountPassword = response_data.User.password
        console.log(AccountPassword)
        console.log(Password)
        if(AccountPassword==Password){
            console.log("Log in succesful")
            localStorage.setItem("user_id:",response_data.User.user_id)
            localStorage.setItem("name:",response_data.User.name)
            localStorage.setItem("email_address:",response_data.User.email_address)
            localStorage.setItem("password:",response_data.User.password)
            localStorage.setItem("is_premium:",response_data.User.is_premium)
            localStorage.setItem("phone:",response_data.User.phone)
            localStorage.setItem("date_of_birth:",response_data.User.date_of_birth)

            console.log(localStorage.getItem("user_id:"))
            console.log("-------------------------------------")
            ChangeView('/UserView')
        }
        else{
            console.log("Log in unsuccesful")
        }

        })
        .catch(function(error){
            console.log("User does not exist or Incorrect credentials")
            console.log(error)
        });
}

function Login() {
    const [Pressed, setPressed] = useState(false);
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const ChangeView = useNavigate()
    const HandleEvent = (event, newValue) => {
        setPressed(true);
    }
    useEffect(()=>{
        if(Pressed ==true){
            return AttemptAccess(Email,Password,setPressed,ChangeView)
        }
    })
    return (
    <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 350 }}>
        <Header as='h1' color='purple' textAlign='center'>
            Email Service
        </Header>
        <Form >
            <Segment stacked inverted color = 'red'>
            <Form.Input
                fluid
                icon='mail'
                iconPosition='left'
                label = 'Email'
                labelPosition='left'
                id='email_address'
                onChange={event=>setEmail(event.target.value)}
            />
            <Form.Input
                fluid
                icon='lock'
                iconPosition='left'
                label = 'Password'
                labelPosition='left'
                type='password'
                id='Password'
                onChange={event=>setPassword(event.target.value)}
            />
            <Button onClick={HandleEvent} color='purple' fluid size='large'>
                Login
            </Button>
            </Segment>
        </Form>
        <Message>
            <a href='/Register'>Create an Account</a>
        </Message>
        </Grid.Column>
    </Grid>
    )
}
export default Login