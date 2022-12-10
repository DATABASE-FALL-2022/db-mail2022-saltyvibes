import React, {Component, useState} from 'react';
import {Button, Card, Container, Divider, Header, Icon, Image, Modal, Tab} from "semantic-ui-react";
import Dashboard from "./Dashboard";
import Emails from "./Emails";
import Account from "./Account";


function UserView(){
    const [open, setOpen] = useState(false);
    console.log(open);
    const handleChange = (event, newValue) => {
        setOpen(true);
    }

    const [isAuth, setIsAuth] = useState(true)
    const [notShow, setNotShow] = useState(false)
    const panes = [
        {
            menuItem: 'Inbox', render: () => <Tab.Pane active={isAuth}><Container><Header>Anything you need to put here</Header><Divider/></Container><Emails/></Tab.Pane>
        },
        {
            menuItem: 'Outbox', render: () => <Tab.Pane active={isAuth}><Container><Header>Anything you need to put here</Header><Divider/></Container><Emails/></Tab.Pane>
        },
        {
            menuItem: 'Account', render: () => <Tab.Pane active={isAuth}><Account/></Tab.Pane>
        },
        {
            menuItem: 'Profile', render: () => <Tab.Pane active={isAuth}>:) <Card centered='true'>

                <Card.Content>
                    <Card.Header  textAlign='center'  >My Account</Card.Header>
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
                    <Button attached='bottom' onClick={() => setOpen(false)}>Change</Button>
                </Card.Content>
            </Card></Tab.Pane>
        },
        {
            menuItem: 'Friend List', render: () => <Tab.Pane active={isAuth}> this is my header <Dashboard/></Tab.Pane>

        },
        {
            menuItem: 'Dashboard', render: () => <Tab.Pane active={isAuth}>Dashboard :D <Dashboard/></Tab.Pane>
        }
    ]

    return <Tab panes={panes}/>

}
export default UserView;
