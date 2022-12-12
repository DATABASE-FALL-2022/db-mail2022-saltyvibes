import React, {Component, useEffect, useState} from 'react';
import {Button, Card, Container, Divider, Header, Icon, Image, Modal, Tab} from "semantic-ui-react";
import {Routes, Route, useNavigate} from 'react-router-dom';
import Dashboard from "./Dashboard";
import Emails from "./Emails";
import Account from "./Account";
import Inbox from "./Inbox";
import ViewFriends from "./ViewFriends";

var U =3

function UserView(){
    const [open, setOpen] = useState(false);
    console.log(open);
    const navigate = useNavigate();
    const [isAuth, setIsAuth] = useState(true)
    const [UpdateTab, setUpdateTab] = useState(false)

    const navigateToLogin = () => {
        // 👇️ navigate to /Login
        localStorage.clear()
        navigate('/Login');
      };
    const UpdateData = () => {
        localStorage.setItem('Change:','true')
        console.log('I entered here')

    }

    const panes = [
        {
            menuItem: 'Inbox/Outbox', render: () => <Tab.Pane active={isAuth}><Inbox/></Tab.Pane>

        },
        {
            menuItem: 'Profile', render: () => <Tab.Pane active={isAuth}><Account/></Tab.Pane>
        },
        {
            menuItem: 'Friend List', render: () => <Tab.Pane  active={setIsAuth(true)}> <ViewFriends/></Tab.Pane>
        },
        {
            menuItem: 'Dashboard', render: () => <Tab.Pane active={isAuth}><Dashboard /></Tab.Pane>
        },
        {
            menuItem: 'Log Out', render: () => <Header>Do you want to log out? <Button onClick={navigateToLogin}>Yes</Button> <Button>No</Button></Header>
        }
    ]

    return <Tab onTabChange={UpdateData} panes={panes}/>

}
export default UserView;
