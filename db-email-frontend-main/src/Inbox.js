import React, {useEffect, useState} from 'react';
import {Button, Container, Divider, Form, Grid, Input, Modal, Segment} from 'semantic-ui-react'
import {Label} from "recharts";
import axios from "axios";


var User = 3;
var Count = 0;
var Checked = true;

function LoadOutbox(handleChange,setButtons){
    console.log("I have entered the Outbox");
    Count=1;
    axios.get("http://127.0.0.1:5000/EmailService/outbox/"+User.toString())
        .then(response => {
            const data = response.data;
            const buttonData = data.Outbox.map(item => {
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

function LoadInbox(handleChange,setButtons){
    console.log("I have entered the Inbox");
    console.log("Count: " +Count.toString());
    Count=1;
    console.log("Count: " +Count.toString());
    axios.get("http://127.0.0.1:5000/EmailService/inbox/"+User.toString())
        .then(response => {
            const data = response.data;
            const buttonData = data.Inbox.map(item => {
                if(item.is_friend&&item.user_id !=0){
                    return <Button color='teal' onClick={handleChange}>Subject: {item.subject} <br/>Date: {item.date_created}</Button>
                }else if (item.user_id ==0){
                    return <Button color='orange' onClick={handleChange}>Subject: {item.subject} <br/>Date: {item.date_created}</Button>
                }
                else{
                    return <Button color='google plus'  onClick={handleChange}>Subject: {item.subject} <br/>Date: {item.date_created}</Button>}
            });
            setButtons(buttonData);
        })
        .catch(error => {
            console.log(error);
        });
}

function searchInboxByEmailAddress(handleChange,SearchInput,setSearchInput,setButtons){
    console.log("I have begun a search in Inbox");
    console.log("Search Input: " +SearchInput);
    Checked = true;
    setSearchInput("");
    console.log("Search Input: " +SearchInput);
    axios.get("http://127.0.0.1:5000/EmailService/inbox/"+User.toString()+"/email_address/"+SearchInput)
        .then(response => {
            const data = response.data;
            const buttonData = data.Inbox.map(item => {
                if(item.is_friend&&item.user_id !=0){
                    return <Button color='teal' onClick={handleChange}>Subject: {item.subject} <br/>Date: {item.date_created}</Button>
                }else if (item.user_id ==0){
                    return <Button color='orange' onClick={handleChange}>Subject: {item.subject} <br/>Date: {item.date_created}</Button>
                }
                else{
                    return <Button color='google plus'  onClick={handleChange}>Subject: {item.subject} <br/>Date: {item.date_created}</Button>}
            });
            setButtons(buttonData);
        })
        .catch(error => {
            console.log(error);
        });

}

function searchOutboxByEmailAddress(handleChange,SearchInput,setSearchInput,setButtons){
    console.log("I have begun a search in Outbox");
    console.log("Search Input: " +SearchInput);
    Checked = true;
    setSearchInput("");
    console.log("Search Input: " +SearchInput);
    axios.get("http://127.0.0.1:5000/EmailService/outbox/"+User.toString()+"/email_address/"+SearchInput)
        .then(response => {
            const data = response.data;
            const buttonData = data.Outbox.map(item => {
                if(item.is_friend&&item.user_id !=0){
                    return <Button color='teal' onClick={handleChange}>Subject: {item.subject} <br/>Date: {item.date_created}</Button>
                }else if (item.user_id ==0){
                    return <Button color='orange' onClick={handleChange}>Subject: {item.subject} <br/>Date: {item.date_created}</Button>
                }
                else{
                    return <Button color='google plus'  onClick={handleChange}>Subject: {item.subject} <br/>Date: {item.date_created}</Button>}
            });
            setButtons(buttonData);
        })
        .catch(error => {
            console.log(error);
        });

}
function Inbox() {
    const [open, setOpen] = useState(false);
    console.log(open);
    const [MailBox, setMailbox] = useState(0);
    const [buttons, setButtons] = useState([]);
    const [searching, setSearching] = useState(false);
    const [SearchInput, setSearchInput] = useState("");

    useEffect(() => {
        if(SearchInput.length === 0&&Checked==false){
            Count = 0
            Checked=true
        }
        if(MailBox==1&&Count==0){
            return LoadOutbox(handleChange,setButtons)
        }
        else if(MailBox==0&&Count==0){
            return LoadInbox(handleChange,setButtons)
            }
        else if(MailBox==0&&SearchInput!=""){
            return searchInboxByEmailAddress(handleChange,SearchInput,setSearchInput,setButtons)
         }
        else if(MailBox==1&&SearchInput!=""){
            return searchOutboxByEmailAddress(handleChange,SearchInput,setSearchInput,setButtons)
        }


    });


    const handleChange = (event, newValue) => {
        setOpen(true);
    }

    const SearchChange = (e) => {
        e.preventDefault();
        Checked=false
        setSearchInput(e.target.value);
    };



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
                    <Input
                        type='text'
                        icon='search'
                        iconPosition='left'
                        placeholder='Search'
                        onChange={SearchChange}



                    />
                    <Button onClick={() => (Count = 0,setMailbox(0))}>Inbox</Button>
                    <Button onClick={() => (Count = 0,setMailbox(1))}>Outbox</Button>

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