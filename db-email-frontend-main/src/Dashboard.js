import React, {Component, useState} from 'react';
import {Button, Card, Container, Divider, Header, Modal, Segment, Tab} from "semantic-ui-react";
import {Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis} from "recharts";
import Emails from "./Emails";

//used for statistics
function Dashboard(){

    const [open, setOpen] = useState(false);
    console.log(open);
    const [open2, setOpen2] = useState(false);
    console.log(open2);
    const [open3, setOpen3] = useState(false);
    console.log(open3);
    const [open4, setOpen4] = useState(false);
    console.log(open4);

    const handleChange = (event, newValue) => {
        setOpen(true);
    }
    const handleChange2 = (event, newValue) => {
        setOpen2(true);
    }
    const handleChange3 = (event, newValue) => {
        setOpen3(true);
    }
    const handleChange4 = (event, newValue) => {
        setOpen4(true);
    }

    return <Container style={{ height: 800 }}>
        <Header size='large'>Dashboard</Header>

        {/*/!*Account*!/*/}
        {/*<header>My Account</header>*/}
        {/*<Button color='orange' content='View'  onClick={handleChange} />*/}

        {/*<Modal*/}
        {/*    centered={false}*/}
        {/*    open={open}*/}
        {/*    onClose={() => setOpen(false)}*/}
        {/*    onOpen={() => setOpen(true)}*/}
        {/*>*/}
        {/*    <Modal.Header>My Account</Modal.Header>*/}
        {/*    <Modal.Content>*/}
        {/*        <Modal.Description>*/}
        {/*            Name:*/}
        {/*        </Modal.Description>*/}

        {/*        <Modal.Description>*/}
        {/*            Email:*/}
        {/*        </Modal.Description>*/}

        {/*        <Modal.Description>*/}
        {/*            Password:*/}
        {/*        </Modal.Description>*/}

        {/*        <Modal.Description>*/}
        {/*            Phone:*/}
        {/*        </Modal.Description>*/}

        {/*        <Modal.Description>*/}
        {/*            Date of Birth:*/}
        {/*        </Modal.Description>*/}

        {/*        <Modal.Description>*/}
        {/*            Premium User:*/}
        {/*        </Modal.Description>*/}
        {/*    </Modal.Content>*/}
        {/*    <Modal.Actions>*/}
        {/*        <Button onClick={() => setOpen(false)}>Back</Button>*/}
        {/*    </Modal.Actions>*/}
        {/*</Modal>*/}


        {/*/!*Account Change*!/*/}
        {/*<header>Changing Account</header>*/}
        {/*<Button color='purple' content='View'  onClick={handleChange2} />*/}

        {/*<Modal*/}
        {/*    centered={false}*/}
        {/*    open={open2}*/}
        {/*    onClose={() => setOpen2(false)}*/}
        {/*    onOpen={() => setOpen2(true)}*/}
        {/*>*/}
        {/*    <Modal.Header>Changing Account</Modal.Header>*/}
        {/*    <Modal.Content>*/}
        {/*        <Modal.Description>*/}
        {/*            New Name:*/}
        {/*        </Modal.Description>*/}

        {/*        <Modal.Description>*/}
        {/*            New Email:*/}
        {/*        </Modal.Description>*/}

        {/*        <Modal.Description>*/}
        {/*            New Password:*/}
        {/*        </Modal.Description>*/}

        {/*        <Modal.Description>*/}
        {/*            New Phone:*/}
        {/*        </Modal.Description>*/}

        {/*        <Modal.Description>*/}
        {/*            New Date of Birth:*/}
        {/*        </Modal.Description>*/}

        {/*        <Modal.Description>*/}
        {/*            Premium User:*/}
        {/*        </Modal.Description>*/}
        {/*    </Modal.Content>*/}
        {/*    <Modal.Actions>*/}
        {/*        <Button onClick={() => setOpen2(false)}>Back</Button>*/}
        {/*        <Button onClick={() => setOpen2(false)}>Save</Button>*/}
        {/*    </Modal.Actions>*/}
        {/*</Modal>*/}


        {/*User Statistics*/}
        <header>User Statistics</header>
        <Button color='teal' content='View'  onClick={handleChange3}/>

        <Modal
            centered={false}
            open={open3}
            onClose={() => setOpen3(false)}
            onOpen={() => setOpen3(true)}
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
                <Button onClick={() => setOpen3(false)}>Back</Button>
            </Modal.Actions>
        </Modal>


        <header>Global Statistics</header>
        <Button color='pink' content='View'  onClick={handleChange4} />

        <Modal
            centered={false}
            open={open4}
            onClose={() => setOpen4(false)}
            onOpen={() => setOpen4(true)}
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
                <Button onClick={() => setOpen4(false)}>Back</Button>
            </Modal.Actions>
        </Modal>


    </Container>



}
export default Dashboard;
