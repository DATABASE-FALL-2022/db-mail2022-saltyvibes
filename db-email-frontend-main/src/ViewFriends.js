import React, {Component, useEffect, useState} from 'react'
import {Form, Button, List, Grid, Header, Image, Segment, Container, Card, Modal} from 'semantic-ui-react'
import axios from "axios";

var User = 3
var Done = false
function FindFriends(setFriends){
    //Bug where you have to hit email two times for the right email address to appear
    Done = true
    console.log('Finding Friends');
    User=localStorage.getItem("user_id:")
    console.log("This is the user id:" + parseInt(User))
    axios.get('http://127.0.0.1:5000/EmailService/Friend/'+User)
        .then(function(response){
            const response_data = response.data
            const Users = response_data.Friend.map(item=>{
                return <Card.Description>User ID: {item.user_id} Name: {item.name} <br/>Email:{item.email_address}<br/></Card.Description>
                })
            setFriends(Users)
            console.log("Friends found")
        })
        .catch(function(error){
            console.log("Friends not found")
            console.log(error)
        });
}


function ViewFriends() {
    const [Friends,setFriends ] = useState([]);
    const [FriendEmail,setFriendEmail] = useState("");
    if('true'==localStorage.getItem('Change:')){
        Done = false
        localStorage.setItem('Change:','false')
    }

    console.log('I entered here')
    useEffect(()=>{
        if(Done ==false) {
            console.log("loading")
            return FindFriends(setFriends)
        }})
    const[Open,setOpen] = useState(false)
    const createFriend = event => {
        {
            Done = true
            event.preventDefault(); // 👈️ prevent page refresh
            console.log('Entered method createFriend:');
            console.log('Getting user id from email address: '+ FriendEmail);

            axios.get('http://127.0.0.1:5000/EmailService/GetUserInformationUsingEmailAddress/'+FriendEmail).
            then(function(response) {
                const response_data = response.data
                const Friend_id = response_data.User.user_id
                axios.get('http://127.0.0.1:5000/EmailService/Friend/'+User+'/'+Friend_id)
                    .then(function(response){
                        console.log("Friend does exist")
                    })
                    .catch(function(error){//!Be careful, this can catch a false positive
                        console.log("Friend does not exist, we can add a friend")
                        console.log('Adding Friend');
                        console.log("This is the user id:  " + User)
                        console.log("This is the friend id:" + parseInt(Friend_id))
                        axios.post('http://127.0.0.1:5000/EmailService/Friend',{
                            owner_id:User,
                            friend_id:Friend_id
                        })
                            .then(function(response){

                                console.log("Created new Friend ")

                            })
                            .catch(function(error){
                                console.log("Error while creating friend")
                                //console.log(error)
                            });
                    });
            })
                .catch(function(error){
                    console.log("User not Found")
                    console.log(error)
                });


        }

    }
    return (<Container style={{ height: 800 }}>
        <Modal
            centered={true}
            open={Open}
            dialogClassName="modal-100w"
            size="large"
            onClose={()=>setOpen(false)}
        >
            <Modal.Header>Adding Friend:</Modal.Header>
            <form onSubmit={createFriend}>
                <label for="email_address">Friend Email:</label>
                <br></br>
                <input
                    type="text"
                    id="email_address"
                    name="email_address"
                    onChange={event => setFriendEmail(event.target.value)}
                    value= {FriendEmail}
                ></input>
                <br></br>
                <input type ="submit"></input>
            </form>
            <Button onClick={() => (Done=false,setOpen(false))}>Close</Button>
        </Modal>
        {/*Account*/}
        <Card centered='true'>
            <Card.Content >
                <Card.Header textAlign='center' >Friends</Card.Header>

                {Friends}

            </Card.Content>
            <Card.Content>
                <Button attached='bottom' color='purple' content='Add Friend' onClick={()=>setOpen(true)} />
            </Card.Content>
        </Card>

        {/*Account Change*/}



    </Container>)
}

export default ViewFriends