import React, {Component, useState} from 'react'
import { Button, Form, Grid, Header, Image, Label, Message, Segment } from 'semantic-ui-react'
import { Navigate } from "react-router-dom"

function Login() {
    return (
    <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 350 }}>
        <Header as='h1' color='purple' textAlign='center'>
            Email Service
        </Header>
        <Form>
            <Segment stacked inverted color = 'red'>
            <Form.Input
                fluid
                icon='mail'
                iconPosition='left'
                label = 'Email'
                labelPosition='left'
            />
            <Form.Input
                fluid
                icon='lock'
                iconPosition='left'
                label = 'Password'
                labelPosition='left'
                type='password'
            />
            <Button color='purple' fluid size='large'>
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