import React, {Component, useEffect, useState} from 'react';
import {Button, Card, Container, Divider, Header, Modal, Segment, Tab, Form} from "semantic-ui-react";
import {type} from "@testing-library/user-event/dist/type";
import axios from "axios";

var Count= 0
//used for account and account change

var User

function getUserData(setStart,setEmail, setPassword,setName,setPhone, setDate_Of_Birth, setPremiumUser){
    setStart(false)
    console.log('Getting User Data');
    User=localStorage.getItem("user_id:")
    console.log("This is the user id:" + parseInt(User))
    axios.get('http://127.0.0.1:5000//EmailService/users/'+User)
        .then(function(response){
            const response_data = response.data
            setEmail(response_data.User.email_address)
            setPassword(response_data.User.password)
            setName(response_data.User.name)
            setPhone(response_data.User.phone)
            setDate_Of_Birth(response_data.User.date_of_birth)
            setPremiumUser(response_data.User.is_premium)
        })
        .catch(function(error){
            console.log("User does not exist")
        });
}

function changeUserData(setChange, Email, Password, Name, Phone, Date_Of_Birth, PremiumUser) {
    console.log('Attempting to change User Data');
    User=localStorage.getItem("user_id:")
    setChange(false)
    axios.put('http://127.0.0.1:5000//EmailService/users/'+User,{
        name:Name,
        email_address:Email,
        password:Password,
        is_premium:PremiumUser,
        phone:Phone,
        date_of_birth:Date_Of_Birth
    })
        .then(function(response){
            localStorage.setItem("name:",response.data.User.name)
            localStorage.setItem("email_address:",response.data.User.email_address)
            localStorage.setItem("password:",response.data.User.password)
            localStorage.setItem("is_premium:",response.data.User.is_premium)
            localStorage.setItem("phone:",response.data.User.phone)
            localStorage.setItem("date_of_birth:",response.data.User.date_of_birth)
            console.log('Updated User')
        })
        .catch(function(error){
            console.log("Couldn't Update User")
        });


}

function Account(user){
    console.log("Hello from the other side")
    if(typeof user!=='undefined'){
        console.log("It is undefined")

    }
    useEffect(()=>
    {if(Start==true)
    {return getUserData(setStart,setEmail, setPassword,setName,setPhone, setDate_Of_Birth, setPremiumUser)}
        else if(Change==true){
        console.log('I am here')
            return changeUserData(setChange,Email, Password,Name,Phone, Date_Of_Birth, PremiumUser)

    }

        else if(Email!=''&& Password!=''&&Name!=''&&Phone!=''&& Date_Of_Birth!=''&& PremiumUser!=''){
        return getUserData(setStart,setEmail, setPassword,setName,setPhone, setDate_Of_Birth, setPremiumUser)
    }
        else
            {console.log('do nothing')

        }
    }
        )
    const handleChange = (event, newValue) => {
        Count=1
        setOpen(true);
        setStart(1)
    }
    const [Start,setStart] = useState(0);
    const [Change,setChange] = useState(0);
    const [open, setOpen] = useState(false);
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const [Name, setName] = useState("");
    const [Phone, setPhone] = useState("");
    const [Date_Of_Birth, setDate_Of_Birth] = useState("");
    const [PremiumUser, setPremiumUser] = useState("");
    console.log(open);
    console.log("Hello from the other side")
    if(Count ==0)
        handleChange()



    return (<Container style={{ height: 800 }}>

        {/*Account*/}
        <Card centered='true'>
            <Card.Content >
                <Card.Header textAlign='center' >My Account</Card.Header>

                <Card.Description>
                    Name:       {Name}
                </Card.Description>

                <Card.Description>
                    Email:       {Email}
                </Card.Description>

                <Card.Description>
                    Password:     {Password}
                </Card.Description>

                <Card.Description>
                    Phone:       {Phone}
                </Card.Description>

                <Card.Description>
                    Date of Birth:    {Date_Of_Birth}
                </Card.Description>

                <Card.Description>
                    Premium User:       {PremiumUser}
                </Card.Description>

            </Card.Content>
        <Card.Content>
            <Button attached='bottom' color='purple' content='Change' onClick={handleChange} />
        </Card.Content>
        </Card>

        {/*Account Change*/}
        <Modal
            centered={false}
            open={open}
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
        >
            <Modal.Header>Changing Account</Modal.Header>
            <Modal.Content>
                <Form>
                    <Form.Input
                        fluid
                        icon='Name'
                        iconPosition='left'
                        label = 'Name'
                        labelPosition='left'
                        id='Name'
                        onChange={event=>setName(event.target.value)}
                    />
                    <Form.Input
                        fluid
                        icon='lock'
                        iconPosition='left'
                        label = 'email_address'
                        labelPosition='left'
                        type='email_address'
                        id='email_address'
                        onChange={event=>setEmail(event.target.value)}
                    />
                    <Form.Input
                        fluid
                        icon='Name'
                        iconPosition='left'
                        label = 'New Password'
                        labelPosition='left'
                        id='New Password'
                        onChange={event=>setPassword(event.target.value)}
                    />
                    <Form.Input
                        fluid
                        icon='lock'
                        iconPosition='left'
                        label = 'Phone'
                        labelPosition='left'
                        type='Phone'
                        id='Phone'
                        onChange={event=>setPhone(event.target.value)}
                    />
                    <Form.Input
                        fluid
                        icon='Name'
                        iconPosition='left'
                        label = 'New Date of Birth'
                        labelPosition='left'
                        id='New Date of Birth'
                        onChange={event=>setDate_Of_Birth(event.target.value)}
                    />
                    <Form.Input
                        fluid
                        icon='lock'
                        iconPosition='left'
                        label = 'Premium User'
                        labelPosition='left'
                        type='Premium User'
                        id='Premium User'
                        onChange={event=>setPremiumUser(event.target.value)}
                    />
                    <Button type='submit'onClick={() => setChange(true)}>Save</Button>
                    <Button onClick={() => setOpen(false)}>Back</Button>

                </Form>

            </Modal.Content>
        </Modal>


    </Container>)



}
export default Account;
