import React, {Component, useEffect, useState} from 'react';
import {Button, Card, Container, Divider, Header, Icon, Image, Modal, Tab} from "semantic-ui-react";
import Dashboard from "./Dashboard";
import Emails from "./Emails";
import Account from "./Account";
import Inbox from "./Inbox";
import ViewFriends from "./ViewFriends";

var U =3

function UserView(){
    const [open, setOpen] = useState(false);
    console.log(open);

    const [isAuth, setIsAuth] = useState(true)
    const [UpdateTab, setUpdateTab] = useState(false)


    const UpdateData = () => {
        localStorage.setItem('Change:','true')
        console.log('I entered here')

    }

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
            menuItem: 'Friend List', render: () => <Tab.Pane  active={setIsAuth(true)}> <ViewFriends/></Tab.Pane>
        },
        {
            menuItem: 'Dashboard', render: () => <Tab.Pane active={isAuth}><Dashboard /></Tab.Pane>
        }
    ]

    return <Tab onTabChange={UpdateData} panes={panes}/>

}
export default UserView;
