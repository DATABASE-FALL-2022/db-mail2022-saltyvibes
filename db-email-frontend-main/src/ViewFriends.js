import React, {Component, useState} from 'react'
import {Form, Button, List, Grid, Header, Image, Segment, Container, Card, Modal} from 'semantic-ui-react'
import axios from "axios";

function FindFriends(){
    //Bug where you have to hit email two times for the right email address to appear
    console.log('Getting Email Address');
    console.log("This is the user id:" + parseInt(readdata.user_id))
    axios.get('http://127.0.0.1:5000/EmailService/users/'+readdata.user_id)
        .then(function(response){
            const email_address_response_data = response.data
            const user_email_address = email_address_response_data.User.email_address
            console.log( "this is the email address: " + user_email_address)
            setEmailAddress(user_email_address)
            setUserId("")
        })
        .catch(function(error){
        });
}
function ViewFriends() {
    const [Friends,setFriends ] = useState([]);


    const [MostReplies, setMostReplies] = useState([]);
    const [top10inbox, settop10inbox] = useState([]);
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

export default ViewFriends