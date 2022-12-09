import React, {useEffect, useState} from 'react';
import {Button, Container, Divider, Form, Grid, Modal, Segment} from 'semantic-ui-react'
import {Label} from "recharts";
import axios from "axios";

var Mode=0;
var User = 12;
function Inbox() {
    const [open, setOpen] = useState(false);
    console.log(open);

    const [buttons, setButtons] = useState([]);
    const fetchData = () => {
        axios.get("http://127.0.0.1:5000/EmailService/inbox/"+User.toString())
            .then(response => {
                const data = response.data;
                const buttonData = data.Inbox.map(item => {
                    if(item.is_friend){
                        return <Button color='teal' onClick={handleChange}>Subject: {item.subject} <br/>Date: {item.date_created}</Button>
                    }else{
                    return <Button color='google plus'  onClick={handleChange}>Subject: {item.subject} <br/>Date: {item.date_created}</Button>}
                });
                setButtons(buttonData);
            })
            .catch(error => {
                console.log(error);
            });
    }

    useEffect(() => {
        fetchData();
    }, []);


    const handleChange = (event, newValue) => {
        setOpen(true);
    }

    const SwitchView = () => {
        if (Mode == 0) { //This is Inbox
            Mode = 1;
        } else {
            Mode = 0;
        }
    }

    return (<Segment>
            <Modal
                centered={false}
                open={open}
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
            >
                <Modal.Header>Needs changing!</Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                        This is a modal but it serves to show how buttons and functions can be implemented.
                    </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                    <Button onClick={() => setOpen(false)}>OK</Button>
                </Modal.Actions>
            </Modal>
            <Label ribbon color="blue" size="large">Support</Label>
            <Grid>
                <Grid.Column textAlign="Left">
                    <Form.Input
                        icon='search'
                        iconPosition='left'
                        placeholder='Search'
                    />
                    <Button onClick={SwitchView}>Inbox</Button>
                    <Button onClick={SwitchView}>Outbox</Button>

                </Grid.Column>

            </Grid>
            <br/>
            <div className="ui vertical buttons">
                {buttons}
            </div>

        </Segment>

    )
}
export default Inbox