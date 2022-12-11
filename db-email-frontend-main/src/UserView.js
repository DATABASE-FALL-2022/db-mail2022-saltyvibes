import React, {Component, useState} from 'react';
import {Button, Card, Container, Divider, Header, Icon, Image, Modal, Tab} from "semantic-ui-react";
import Dashboard from "./Dashboard";
import Emails from "./Emails";
import Account from "./Account";
import Inbox from "./Inbox";

var U =3

function UserView(){
    const [open, setOpen] = useState(false);
    console.log(open);

    const [isAuth, setIsAuth] = useState(true)
    const [notShow, setNotShow] = useState(false)

    const panes = [
        {
            menuItem: 'Inbox', render: () => <Tab.Pane active={isAuth}><Inbox/></Tab.Pane>

        },
        {
            menuItem: 'Outbox', render: () => <Tab.Pane active={isAuth}><Container><Header>Anything you need to put here</Header><Divider/></Container><Emails/></Tab.Pane>
        },
        {
            menuItem: 'Profile', render: () => <Tab.Pane active={isAuth}><Account/></Tab.Pane>
        },
        {
            menuItem: 'Friend List', render: () => <Tab.Pane active={isAuth}> this is my friends list <Dashboard/></Tab.Pane>
        },
        {
            menuItem: 'Dashboard', render: () => <Tab.Pane active={isAuth}><Dashboard /></Tab.Pane>
        }
    ]

    return <Tab panes={panes}/>

}
export default UserView;
