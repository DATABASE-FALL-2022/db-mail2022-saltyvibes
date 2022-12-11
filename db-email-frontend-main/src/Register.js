import React from 'react'
import { Button, Form, Grid, Header, Image, Label, Message, Segment } from 'semantic-ui-react'

function Register() {
    return(
        <Grid textAlign='center' style={{ height: '90vh' }} verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 350 }}>
            <Header as='h1' color='purple' textAlign='center'>
                Email Service
            </Header>
            <Form>
                <Segment stacked inverted color = 'red'>
                <Form.Input fluid icon='user' iconPosition='left' label = 'Name' labelPosition='left' placeholder='Name'/>
                <Form.Input
                    fluid
                    icon='mail'
                    iconPosition='left'
                    label = 'Email'
                    labelPosition='left'
                    placeholder='example@exampleemail.com'
                />
                <Form.Input
                    fluid
                    icon='lock'
                    iconPosition='left'
                    label = 'Password'
                    labelPosition='left'
                    placeholder='Password'
                    type='password'
                />
                <Form.Input
                    fluid
                    icon='phone'
                    iconPosition='left'
                    label = 'Phone'
                    labelPosition='left'
                    placeholder='000-000-0000'
                />
                <Form.Input
                    fluid
                    icon='birthday cake'
                    iconPosition='left'
                    label = "Date of Birth"
                    labelPosition='left'
                    placeholder='yyyy-mm-dd'
                />
                <Button color='purple' fluid size='large'>
                    Register
                </Button>
                </Segment>
            </Form>
            </Grid.Column>
        </Grid>
    )
}

export default Register