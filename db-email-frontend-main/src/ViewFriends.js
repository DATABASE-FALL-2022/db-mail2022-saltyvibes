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

// function removeFriend(setFriends){
//     //Bug where you have to hit email two times for the right email address to appear
//     Done = true
//     console.log('Remove Friend');
//     User=localStorage.getItem("user_id:")
//     console.log("This is the user id:" + parseInt(User))
//     axios.get('http://127.0.0.1:5000/EmailService/GetUserInformationUsingEmailAddress/'+EmailAddress).
//     then(function(response) {
//         console.log("User found")
//         const Friend_id =response.data.User.user_id
//
//     }).catch(function(error){
//                 console.log("User not found")
//                 console.log(error)
//             });
//     // axios.delete('http://127.0.0.1:5000/EmailService/Friend/',{
//     //
//     //         "owner_id"      :  use ,
//     //         "friend_id"     :  7
//     //
//     //     }
//     //     )
//     //     .then(function(response){
//     //         const response_data = response.data
//     //         const Users = response_data.Friend.map(item=>{
//     //             return <Card.Description>User ID: {item.user_id} Name: {item.name} <br/>Email:{item.email_address}<br/></Card.Description>
//     //         })
//     //         setFriends(Users)
//     //         console.log("Friends found")
//     //     })
//     //     .catch(function(error){
//     //         console.log("Friends not found")
//     //         console.log(error)
//     //     });
// }


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
    const[Open2,setOpen2] = useState(false)
    const createFriend = event =>
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

const removeFriend= event => {
            //Bug where you have to hit email two times for the right email address to appear
            Done=false
            setOpen2(false)

            console.log('Remove Friend');
            User=localStorage.getItem("user_id:")
            console.log("This is the user id:" + parseInt(User))
            axios.get('http://127.0.0.1:5000/EmailService/GetUserInformationUsingEmailAddress/'+FriendEmail).
            then(function(response) {
                console.log("User found")
                const Friend_id =response.data.User.user_id
                axios.delete('http://127.0.0.1:5000/EmailService/Friend/'+User+'/'+Friend_id).
                then(function(response) {
                    console.log("Friend deleted")
                FindFriends(setFriends())
                }).catch(function(error){
                    console.log("Failed to delete")
                    console.log(error)
                });
            }).catch(function(error){
                console.log("User not found")
                console.log(error)
            });

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

        <Modal
            centered={true}
            open={Open2}
            dialogClassName="modal-100w"
            size="large"
            onClose={()=>setOpen2(false)}
        >
            <Modal.Header>Delete Friend:</Modal.Header>
            <form>
                <label for="email_address">Friend Email:</label>
                <br></br>
                <input
                    type="text"
                    id="email_address"
                    name="email_address"
                    onChange={event => setFriendEmail(event.target.value)}

                ></input>
            </form>
            <Button  color='red' content='Remove' onClick={removeFriend} />
            <Button onClick={() => (Done=false,setOpen2(false))}>Close</Button>
        </Modal>

        {/*Account*/}
        <Card centered='true'>
            <Card.Content >
                <Card.Header textAlign='center' >Friends</Card.Header>

                {Friends}

            </Card.Content>
            <Card.Content>
                <Button attached='bottom' color='purple' content='Add Friend' onClick={()=>setOpen(true)} />
                <Button attached='bottom' color='red' content='Remove Friend' onClick={()=>setOpen2(true)} />
            </Card.Content>
        </Card>

        {/*Account Change*/}



    </Container>)
}

export default ViewFriends