import React, {Component, useEffect, useState} from 'react';
import {Accordion, Icon, Button, Card, Container, Divider, Header, Modal, Segment, Tab} from "semantic-ui-react";
import {Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis} from "recharts";
import Emails from "./Emails";
import Axios, {post} from 'axios'
import axios from 'axios'


//used for statistics



// // User Statistics
// async function getMostRecipientsUser() {
//     const state = { recipient: [] }
//     componentDidMount(){
//
//     }
//
//
//     const response = await Axios.get("http://127.0.0.1:5000/EmailService/EmailWithMostRecipientsbyUser/");
//     console.log(response.data);
// }
// "http://127.0.0.1:5000/EmailService/EmailWithMostRecipientsbyUser/"

//     function getMostRepliesUser(){}
// "http://127.0.0.1:5000/EmailService/EmailWithMostRepliesbyUser/"

//     function getTop5UserSendEmailsTo(){}
// "http://127.0.0.1:5000/EmailService/TopFiveUsersSentEmails/"

//     function getTop5UserReceivedEmails(){}
// "http://127.0.0.1:5000/TopFiveUsersReceivedEmails/"



// // Global Statistics
//     function getEmailMostRecipientsGlobal(){}
// "http://127.0.0.1:5000/EmailService/EmailWithMostRecipients"

//     function getMostRecipientsGlobal(){}
// "http://127.0.0.1:5000/EmailService/EmailWithMostReplies"

//     function getTop10WithMostEmailsInbox(){}
// "http://127.0.0.1:5000/EmailService/Top10UsersWithMoreEmailsInInbox"

//     function getTop10WithMostEmailsOutbox(){}
// "http://127.0.0.1:5000/EmailService/ETop10UsersWithMoreEmailsInOutbox"



function Dashboard() {
    const [open, setOpen] = useState(false);
    console.log(open);
    const [open2, setOpen2] = useState(false);
    console.log(open2);

    const handleChange = (event, newValue) => {
        setOpen(true);
    }
    const handleChange2 = (event, newValue) => {
        setOpen2(true);
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
            onOpen={() => setOpen(true)}
        >
            <Modal.Header>User Statistics</Modal.Header>
            <Modal.Content>
                <Modal.Description>
                    Email with the most recipients:
                </Modal.Description>

                <Modal.Description>
                    Email with most replies:
                </Modal.Description>

                <Modal.Description>
                    Top 5 Users you send emails to the most:
                </Modal.Description>

                <Modal.Description>
                    Top 5 Users who send emails to you the most:
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
                    Email with the most recipients:
                </Modal.Description>

                <Modal.Description>
                    Email with most replies:
                </Modal.Description>

                <Modal.Description>
                    Top 10 Users with more emails in their inbox:
                </Modal.Description>

                <Modal.Description>
                    Top 10 Users with more emails in their outbox:
                </Modal.Description>


            </Modal.Content>
            <Modal.Actions>
                <Button onClick={() => setOpen2(false)}>Back</Button>
            </Modal.Actions>
        </Modal>

    </Container>
        // return getMostRecipientsUser();

}


export default Dashboard;
