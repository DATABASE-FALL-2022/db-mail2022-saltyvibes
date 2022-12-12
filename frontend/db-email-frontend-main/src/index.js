import React from 'react';
import ReactDOM from 'react-dom/client';
import {Route, BrowserRouter, Routes} from 'react-router-dom';
import './index.css';
import '../node_modules/semantic-ui-css/semantic.min.css'
import HomePage from "./HomePage";
import Inbox from "./Inbox";
import UserView from "./UserView";
import Dashboard from "./Dashboard";
import Login from "./Login";
import Register from "./Register";
import ViewFriends from "./ViewFriends";


const root = ReactDOM.createRoot( document.getElementById('root'));
root.render(
    <BrowserRouter>
        <Routes>
            <Route exact path="/Inbox" element={<Inbox/>} />
            <Route exact path="/Home" element={<HomePage/>} />
            <Route exact path="/UserView" element={<UserView/>} />
            <Route exact path="/Dashboard" element={<Dashboard/>} />
            <Route exact path="/Login" element={<Login/>} />
            <Route exact path="/Register" element={<Register/>} />
            <Route exact path="/ViewFriends" element={<ViewFriends/>} />
        </Routes>
    </BrowserRouter>

);

