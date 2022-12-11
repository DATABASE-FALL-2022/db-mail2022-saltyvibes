import React, {Component, useState} from 'react';
import {Button, Card, Container, Divider, Header, Modal, Segment, Tab, Form} from "semantic-ui-react";

//used for account and account change
function Account(){

    const [open, setOpen] = useState(false);
    console.log(open);
    const handleChange = (event, newValue) => {
        setOpen(true);
    }

    return <Container style={{ height: 800 }}>

        {/*Account*/}
        <Card centered='true'>
            <Card.Content>
                <Card.Header textAlign='center' >My Account</Card.Header>

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
                    <Form.Field>
                        <label>New Name</label>
                        <input placeholder='New Name' />
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
                    <Button onClick={() => setOpen(false)}>Back</Button>

                </Form>

            </Modal.Content>
        </Modal>


    </Container>



}
export default Account;
