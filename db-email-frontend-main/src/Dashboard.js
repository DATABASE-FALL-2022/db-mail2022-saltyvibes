import React, {Component, useEffect, useState} from 'react';
import {Accordion, Icon, Button, Card, Container, Divider, Header, Modal, Segment, Tab} from "semantic-ui-react";
import {Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis} from "recharts";
import Emails from "./Emails";
import Axios, {post} from 'axios'
import axios from 'axios'


//used for statistics



// User Statistics
// async function getMostRecipientsUser() {
//     const state = { recipient: [] }
//     componentDidMount(){
//
//
//     }
//
//
//     const response = await Axios.get("http://127.0.0.1:5000/EmailService/EmailWithMostRecipients/");
//     console.log(response.data);
// }

// "http://127.0.0.1:5000/EmailService/EmailWithMostRecipients/"
//     function getMostRepliesUser(){}
//     function getTop5YouSendEmailsTo(){}
//     function getTop5ThatSendEmailsToYou(){}
//
// // Global Statistics
//     function getEmailMostRecipientsGlobal(){}
//     function getMostRecipientsGlobal(){}
//     function getTop10WithMostEmailsInbox(){}
//     function getTop10WithMostEmailsOutbox(){}



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

    // const level1Panels = [
    //     { key: 'panel-1a', title: 'Level 1A', content: 'Level 1A Contents' },
    //     { key: 'panel-ba', title: 'Level 1B', content: 'Level 1B Contents' },
    // ]
    //
    // const Level1Content = (
    //     <div>
    //         Welcome to level 1
    //         <Accordion.Accordion panels={level1Panels} />
    //     </div>
    // )
    //
    // const level2Panels = [
    //     { key: 'panel-2a', title: 'Level 2A', content: 'Level 2A Contents' },
    //     { key: 'panel-2b', title: 'Level 2B', content: 'Level 2B Contents' },
    // ]
    //
    // const Level2Content = (
    //     <div>
    //         Welcome to level 2
    //         <Accordion.Accordion panels={level2Panels} />
    //     </div>
    // )
    //
    // const rootPanels = [
    //     { key: 'panel-1', title: 'Level 1', content: { content: Level1Content } },
    //     { key: 'panel-2', title: 'Level 2', content: { content: Level2Content } },
    // ]

    const [cardData, setCardData] = useState([]);
    const[visible, setVisible] = useState(5);

    const allCardData = async () => {
        const response = await axios.get("http://127.0.0.1:5000/EmailService/EmailWithMostRecipients/")
        setCardData(response.data.results)
    }
    useEffect( () => {
        allCardData();
    }, [])

    const renderCard = (person, index)=>{
        return (
            <Card style={ {width: "18rem"} }>
                <Card.Header>hey</Card.Header>
                <Card.Content>
                    This is a card :D
                </Card.Content>
            </Card>
        )
    }


    return <Container style={{ height: 800 }}>
        <Header size='large'>My Dashboard</Header>

        <Accordion>
            <Accordion.Title>Hi!</Accordion.Title>
            <Accordion.Content>
                This is my accordion
            </Accordion.Content>
        </Accordion>

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
