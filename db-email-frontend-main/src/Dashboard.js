import React, {Component, useEffect, useState} from 'react';
import {Accordion, Icon, Button, Card, Container, Divider, Header, Modal, Segment, Tab} from "semantic-ui-react";
import {Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis} from "recharts";
import Emails from "./Emails";
import Axios, {post} from 'axios'
import axios from 'axios'


var User =3


function getUserStatistics(setUserStatistics,setUserMostRecipients,setUserMostReplies,settop5UserInbox,settop5UserOutbox){
    setUserStatistics(0)
    console.log('Getting User Statistics');
    axios.get('http://127.0.0.1:5000/EmailService/EmailWithMostRecipientsbyUser/'+User)
        .then(function(response){
            const response_data = response.data
            console.log(response_data)
            console.log(response_data.Email.email_ID)
            const MailData = response_data.Email.map(item =>{
                return <label>Email ID: {item.email_ID} Subject: {item.subject}<br/></label>
            })
            console.log(MailData)
            setUserMostRecipients(MailData)
        })
        .catch(function(error){
            console.log("Email does not exist")
            console.log(error)
        });
    console.log("Getting Email that has most rerplies")
    axios.get('http://127.0.0.1:5000/EmailService/EmailWithMostRepliesbyUser/'+User)
        .then(function(response){
            const response_data = response.data
            console.log(response_data)
            console.log(response_data.Email.email_ID)
            const MailData = response_data.Email.map(item =>{
                return <label>Email ID: {item.email_ID} Subject: {item.subject}<br/></label>
            })
            console.log(MailData)
            setUserMostReplies(MailData)
        })
        .catch(function(error){
            console.log("User does not exist")
            console.log(error)
        });

    axios.get('http://127.0.0.1:5000/EmailService/TopFiveUsersReceivedEmails/'+User)
        .then(function(response){
            const response_data = response.data
            console.log(response_data)
            console.log(response_data.User.email_ID)
            const MailData = response_data.User.map(item =>{
                return <label>User ID: {item.user_id} Name: {item.name} Email:{item.email_address}<br/></label>
            })
            console.log(MailData)
            settop5UserInbox(MailData)
        })
        .catch(function(error){
            console.log("User does not exist")
            console.log(error)
        });

    axios.get('http://127.0.0.1:5000/EmailService/TopFiveUsersSentEmails/'+User)
        .then(function(response){
            const response_data = response.data
            console.log(response_data)
            console.log(response_data.User.email_ID)
            const MailData = response_data.User.map(item =>{
                return <label>User ID: {item.user_id} Name: {item.name} Email:{item.email_address}<br/></label>
            })
            console.log(MailData)
            settop5UserOutbox(MailData)
        })
        .catch(function(error){
            console.log("User does not exist")
            console.log(error)
        });

}
function getGlobalStatistics(setGlobalStatistics,setMostRecipients,setMostReplies,settop10inbox,settop10outbox){
    setGlobalStatistics(0)
    console.log('Getting Global Statistics');
    axios.get('http://127.0.0.1:5000/EmailService/EmailWithMostRecipients')
        .then(function(response){
            const response_data = response.data
            console.log(response_data)
            console.log(response_data.Email.email_ID)
            const MailData = response_data.Email.map(item =>{
                return <label>Email ID: {item.email_ID} Subject: {item.subject}<br/></label>
            })
            console.log(MailData)
            setMostRecipients(MailData)
        })
        .catch(function(error){
            console.log("Email does not exist")
            console.log(error)
        });

    axios.get('http://127.0.0.1:5000/EmailService/EmailWithMostReplies')
        .then(function(response){
            const response_data = response.data
            // const condition = response_data.Email_With_Most_Recipients.email_ID
            console.log(response_data)
            console.log(response_data.Email.email_ID)
            const MailData = response_data.Email.map(item =>{
                return <label>Email ID: {item.email_ID} Subject: {item.subject}<br/></label>
            })
            console.log(MailData)
            setMostReplies(MailData)
        })
        .catch(function(error){
            console.log("User does not exist")
            console.log(error)
        });

    axios.get('http://127.0.0.1:5000/EmailService/Top10UsersWithMoreEmailsInInbox')
        .then(function(response){
            const response_data = response.data
            // const condition = response_data.Email_With_Most_Recipients.email_ID
            console.log(response_data)
            console.log(response_data.User.email_ID)
            const MailData = response_data.User.map(item =>{
                return <label>User ID: {item.user_id} Name: {item.name} Email:{item.email_address}<br/></label>
            })
            console.log(MailData)
            settop10inbox(MailData)
        })
        .catch(function(error){
            console.log("User does not exist")
            console.log(error)
        });

    axios.get('http://127.0.0.1:5000/EmailService/Top10UsersWithMoreEmailsInOutbox')
        .then(function(response){
            const response_data = response.data
            // const condition = response_data.Email_With_Most_Recipients.email_ID
            console.log(response_data)
            console.log(response_data.User.email_ID)
            const MailData = response_data.User.map(item =>{
                return <label>User ID: {item.user_id} Name: {item.name} Email:{item.email_address}<br/></label>
            })
            console.log(MailData)
            settop10outbox(MailData)
        })
        .catch(function(error){
            console.log("User does not exist")
            console.log(error)
        });

}
function Dashboard() {
    useEffect(()=>{
        if(GlobalStatistics==1){
            getGlobalStatistics(setGlobalStatistics,setMostRecipients,setMostReplies,settop10inbox,settop10outbox)
            }
        else if(UserStatistics==1){
            getUserStatistics(setUserStatistics,setUserMostRecipients,setUserMostReplies,set5UserInbox,settop5UserOutbox)

        }
    })
    const [open, setOpen] = useState(false);
    console.log(open);
    const [open2, setOpen2] = useState(false);
    const [MostRecipients, setMostRecipients] = useState([]);
    const [MostReplies, setMostReplies] = useState([]);
    const [top10inbox, settop10inbox] = useState([]);
    const [top10outbox, settop10outbox] = useState([]);

    const [UserMostRecipients, setUserMostRecipients] = useState([]);
    const [UserMostReplies, setUserMostReplies] = useState([]);
    const [top5UserInbox, set5UserInbox] = useState([]);
    const [top5UserOutbox, settop5UserOutbox] = useState([]);
    const [UserStatistics,setUserStatistics] = useState(0)
    const [GlobalStatistics,setGlobalStatistics] = useState(0)
    console.log(open2);

    const handleChange = (event, newValue) => {
        setOpen(true);
        setUserStatistics(1)
    }
    const handleChange2 = (event, newValue) => {

        setOpen2(true);
        setGlobalStatistics(1)
    }


    return <Container style={{ height: 800 }}>

        <Header size='large'>My Dashboard</Header>

        {/*User Statistics*/}
        <header>User Statistics</header>
        <Button color='teal' content='View'  onClick={handleChange}/>
        <Modal
            centered={false}
            open={open}
            onClose={() => setOpen(false)}
            onOpen={() => (setOpen(true))}
        >
            <Modal.Header>User Statistics</Modal.Header>
            <Modal.Content>
                <Modal.Description >
                    Email with the most recipients: <br/>{UserMostRecipients}
                </Modal.Description>

                <Modal.Description>
                    Email with most replies:      <br/>{UserMostReplies}
                </Modal.Description>

                <Modal.Description>
                    Top 5 Users you send emails to the most: <br/> {top5UserOutbox}
                </Modal.Description>

                <Modal.Description>
                    Top 5 Users who send emails to you the most: <br/> {top5UserInbox}
                </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
                <Button onClick={() => setOpen(false)}>Back</Button>
            </Modal.Actions>
        </Modal>


        <header>Global Statistics</header>
        <Button color='pink' content='View'  onClick={handleChange2} />

        <Modal
            centered={false}
            open={open2}
            onClose={() => setOpen2(false)}
            onOpen={() => setOpen2(true)}
        >
            <Modal.Header>Global Statistics</Modal.Header>
            <Modal.Content>
                <Modal.Description>
                    Email with the most recipients: <br/>{MostRecipients}
                </Modal.Description>

                <Modal.Description>
                    Email with most replies: <br/>{MostReplies}
                </Modal.Description>

                <Modal.Description>
                    Top 10 Users with more emails in their inbox: <br/>{top10inbox}
                </Modal.Description>

                <Modal.Description>
                    Top 10 Users with more emails in their outbox: <br/>{top10outbox}
                </Modal.Description>


            </Modal.Content>
            <Modal.Actions>
                <Button onClick={() => setOpen2(false)}>Back</Button>
            </Modal.Actions>
        </Modal>

    </Container>


}


export default Dashboard;
