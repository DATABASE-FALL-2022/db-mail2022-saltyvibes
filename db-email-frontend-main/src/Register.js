import React, {useEffect, useState} from 'react'
import { Button, Form, Grid, Header, Image, Label, Message, Segment } from 'semantic-ui-react'
import axios from "axios";
import {useNavigate} from "react-router-dom";

var User
function AttemptCreateUser(Name,EmailAddress,Password,date_created,Phone,setPressed,ChangeView) {
    setPressed(false)
    console.log('Attempting to Create User');
    console.log("This is the Name: " +Name)
    console.log("This is the Email: " +EmailAddress)
    console.log("This is the Password: " + Password)
    console.log("This is the Password: " + date_created)
    console.log("This is the Password: " + Phone)
    axios.get('http://127.0.0.1:5000/EmailService/GetUserInformationUsingEmailAddress/'+EmailAddress).
    then(function(response) {
        console.log("User already exists")

    })
        .catch(function(error){//! Possible point of error
            axios.post('http://127.0.0.1:5000/EmailService/users',{
                name:Name,
                email_address: EmailAddress,
                password: Password,
                is_premium: 0,
                phone: Phone,
                date_of_birth: date_created

            }).then(function (response){
                    User =response.data.User.user_id
                    console.log('Created New User')
                    ChangeView('/UserView')
            }

            ).catch(function (error){
                console.log('Could not create new user')
                 console.log(error)
            })

        });

}

function Register() {
    const[EmailAddress,setEmailAddress] = useState("");
    const[Password,setPassword] = useState("");
    const[date_created,setDateCreated] = useState("");
    const[Phone,setPhone] = useState("");
    const[Pressed,setPressed] = useState(false)
    const[Name,setName] = useState("")
    const ChangeView = useNavigate()
    useEffect(()=>{
        if(Pressed==true){
            return AttemptCreateUser(Name,EmailAddress,Password,date_created,Phone,setPressed,ChangeView)
        }
    })
    return(
        <Grid textAlign='center' style={{ height: '90vh' }} verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 350 }}>
            <Header as='h1' color='purple' textAlign='center'>
                Email Service
            </Header>
            <Form>
                <Segment stacked inverted color = 'red'>
                <Form.Input
                    fluid icon='user' iconPosition='left'
                    label = 'Name' labelPosition='left' placeholder='Name'
                    onChange={event => setName(event.target.value)}
                    maxLength="20"
                    value= {Name}/>
                <Form.Input
                    fluid
                    icon='mail'
                    iconPosition='left'
                    label = 'Email'
                    labelPosition='left'
                    placeholder='example@exampleemail.com'
                    maxLength="20"
                    onChange={event => setEmailAddress(event.target.value)}
                    value= {EmailAddress}
                />
                <Form.Input
                    fluid
                    icon='lock'
                    iconPosition='left'
                    label = 'Password'
                    labelPosition='left'
                    placeholder='Password'
                    type='password'

                    maxLength="20"
                    onChange={event => setPassword(event.target.value)}
                    value= {Password}
                />
                <Form.Input
                    fluid
                    type={'numeric'}
                    icon='phone'
                    iconPosition='left'
                    label = 'Phone'
                    labelPosition='left'
                    placeholder='0000000000'
                    maxLength="10"
                    onChange={event => setPhone(event.target.value)}
                    value= {Phone}
                />
                    <Form.Input
                        label='Date of Birth'
                        type="date"
                        id="date_created"
                        name="date_created"
                        onChange={event => setDateCreated(event.target.value)}
                        value= {date_created}
                    ></Form.Input>
                <Button color='purple' fluid size='large' onClick={()=>setPressed(true)}>
                    Register
                </Button>
                </Segment>
            </Form>
            </Grid.Column>
        </Grid>
    )
}

export default Register