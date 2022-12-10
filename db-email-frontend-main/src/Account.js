import React, {Component, useState} from 'react';
import {Button, Card, Container, Divider, Header, Modal, Segment, Tab, Form} from "semantic-ui-react";
import {Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis} from "recharts";
import Emails from "./Emails";

//used for statistics
function Account(){
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
        <Card centered='true'>
            <Card.Content>
                <Card.Header textAlign='center' >My Account</Card.Header>


            {/*<Card.Header  textAlign='center'  >My Account</Card.Header>*/}
            <Card.Description>
                Name:
            </Card.Description>

            <Card.Description>
                Email:
            </Card.Description>

            <Card.Description>
                Password:
            </Card.Description>

            <Card.Description>
                Phone:
            </Card.Description>

            <Card.Description>
                Date of Birth:
            </Card.Description>

            <Card.Description>
                Premium User:
            </Card.Description>

        </Card.Content>
        <Card.Content>
            <Button attached='bottom' color='purple' content='Change' onClick={handleChange2} />
        </Card.Content>
        </Card>

        {/*/!*Account*!/*/}
        {/*<header>My Account</header>*/}
        {/*// <Button color='orange' content='View'  onClick={handleChange} />*/}

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


        {/*Account Change*/}
        {/*<header>Changing Account</header>*/}

        <Modal
            centered={false}
            open={open2}
            onClose={() => setOpen2(false)}
            onOpen={() => setOpen2(true)}
        >
            <Modal.Header>Changing Account</Modal.Header>
            <Modal.Content>
                <Form>
                    <Form.Field>
                        <label>New Name</label>
                        <input placeholder='First Name' />
                    </Form.Field>
                    <Form.Field>
                        <label>New Email</label>
                        <input placeholder='New Email' />
                    </Form.Field>
                    <Form.Field>
                        <label>New Password</label>
                        <input placeholder='New Password' />
                    </Form.Field>
                    <Form.Field>
                        <label>New Phone</label>
                        <input placeholder='New Phone' />
                    </Form.Field>
                    <Form.Field>
                        <label>New Date of Birth</label>
                        <input placeholder='New Date of Birth' />
                    </Form.Field>
                    <Form.Field>
                        <label>Premium User</label>
                        <input placeholder='Premium User' />
                    </Form.Field>
                    <Button type='submit'>Save</Button>
                    <Button onClick={() => setOpen2(false)}>Back</Button>

                </Form>

            </Modal.Content>
            {/*<Modal.Actions>*/}
            {/*    <Button onClick={() => setOpen2(false)}>Back</Button>*/}
            {/*    <Button onClick={() => setOpen2(false)}>Save</Button>*/}
            {/*</Modal.Actions>*/}
        </Modal>

        {/*Testing*/}



    </Container>



}
export default Account;
