import React, {useEffect, useState} from 'react';
import {Button, Container, Divider, Form, Grid, Icon, Input, Modal, Segment, Header} from 'semantic-ui-react'
import {Label} from "recharts";
import axios from "axios";


var User;
var Count = 0;
var Checked = true; 
var Done = false; 
var is_premium;
var currentuserid; 
function LoadOutbox(handlingreadingemailoutbox,setButtons,setReadData){
    console.log("I have entered the Outbox");
    Count=1;
    Done = true;
    axios.get("http://127.0.0.1:5000/EmailService/outbox/"+User.toString())
        .then(response => {
            const data = response.data;
            const buttonData = data.Outbox.map(item => {
                if(item.is_friend){
                    if(item.is_reply)
                        return <Button color='teal' onClick={function(event)
                            {
                            handlingreadingemailoutbox();
                            setReadData(item);
                        }}>Subject: {item.subject} <Icon name ='reply' color='black' /> <br/>Date: {item.date_created}</Button>
                    else
                        return <Button color='teal' onClick={function(event)
                            {
                            handlingreadingemailoutbox();
                            setReadData(item);
                        }}>Subject: {item.subject} <br/>Date: {item.date_created}</Button>
                }else{
                    if (item.is_reply)
                        return <Button color='google plus'  onClick={function(event)
                            {
                            handlingreadingemailoutbox();
                            setReadData(item);
                        }}>Subject: {item.subject} <Icon name ='reply' color='black' /><br/>Date: {item.date_created} </Button>
                    else
                        return <Button color='google plus'  onClick={function(event)
                            {
                            handlingreadingemailoutbox();
                            setReadData(item);
                        }}>Subject: {item.subject} <br/>Date: {item.date_created}</Button>}
            });
            setButtons(buttonData);
        })
        .catch(error => {
            console.log(error);
        });
}

function LoadInbox(handlingreadingemail,setReadData,setUserId,getEmailbyID,setButtons,setEmailId,setEmailAddress){
    console.log("I have entered the Inbox");
    console.log("Count: " +Count.toString());
    Done = true;
    axios.get("http://127.0.0.1:5000/EmailService/inbox/"+User.toString())
        .then(response => {
            const data = response.data;
            console.log("Count: " +Count.toString());
            const buttonData = data.Inbox.map(item => {
                if(item.is_friend&&item.user_id !=0){
                    if(item.is_reply)
                        return <Button color='teal' onClick={function(event)
                            {
                                Count = 0;
                            handlingreadingemail();
                            setUserId(item.user_id);
                            setReadData(item);
                            setEmailId(item.email_ID)
                            localStorage.setItem("currentuserid:", item.user_id)
                            getEmailbyID();
                        }
                        }
                          >Subject: {item.subject} <Icon name ='reply' color='black' /><br/>Date: {item.date_created} <br></br> Category: {item.category}</Button>
                    else
                        return <Button color='teal' onClick={function(event)
                            {
                                Count = 0;
                            handlingreadingemail();
                            setUserId(item.user_id);
                            setReadData(item);
                            setEmailId(item.email_ID)
                            localStorage.setItem("currentuserid:", item.user_id)
                            getEmailbyID();
                        }}>Subject: {item.subject} <br/>Date: {item.date_created} <br></br> Category: {item.category}</Button>
                }else if (item.user_id ==0){
                    if (item.is_reply)
                        return <Button color='orange' onClick={function(event)
                            {
                                Count = 0;
                            handlingreadingemail();
                            setUserId(item.user_id);
                            setReadData(item);
                            setEmailId(item.email_ID)
                            localStorage.setItem("currentuserid:", item.user_id)
                            getEmailbyID();
                        }}>Subject: {item.subject}<Icon name ='reply' color='black' /> <br/>Date: {item.date_created} <br></br> Category: {item.category}</Button>
                    else
                        return <Button color='orange' onClick={function(event)
                            {
                            Count = 0;
                            handlingreadingemail();
                            setReadData(item);
                            setUserId(item.user_id);
                            setEmailId(item.email_ID)
                            localStorage.setItem("currentuserid:", item.user_id)
                            getEmailbyID();
                        }}>Subject: {item.subject} <br/>Date: {item.date_created} <br></br> Category: {item.category}</Button>
                }
                else{
                    if(item.is_reply)
                        return <Button color='google plus' onClick={function(event)
                            {
                                Count = 0;
                            handlingreadingemail();
                            setUserId(item.user_id);
                            setReadData(item);
                            setEmailId(item.email_ID)
                            localStorage.setItem("currentuserid:", item.user_id)
                            getEmailbyID();
                        }}>Subject: {item.subject} <Icon name ='reply' color='black' /><br/>Date: {item.date_created} <br></br> Category: {item.category}</Button>
                    else
                        return <Button color='google plus'  onClick={function(event)
                            {
                                Count = 0;
                            handlingreadingemail();
                            setUserId(item.user_id);
                            setReadData(item);
                            setEmailId(item.email_ID)
                            localStorage.setItem("currentuserid:", item.user_id)
                            getEmailbyID();
                        }}>Subject: {item.subject} <br/>Date: {item.date_created} <br></br> Category: {item.category}</Button>}
            });
            setButtons(buttonData);
            Count=1;
        })
        .catch(error => {
            console.log(error);
        });
}

function searchInboxByEmailAddress(handlingreadingemail,SearchInput,setSearchInput,setButtons,setUserId,setReadData,setEmailId,getEmailbyID){
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
                    if(item.is_friend)
                        return <Button color='teal' onClick={function(event)
                            {
                            handlingreadingemail();
                            setUserId(item.user_id);
                            setReadData(item);
                            setEmailId(item.email_ID)
                            localStorage.setItem("currentuserid:", item.user_id)
                            getEmailbyID();
                        }}>Subject: {item.subject}<Icon name ='reply' color='black' /> <br/>Date: {item.date_created}</Button>
                    else
                        return <Button color='teal' onClick={function(event)
                            {
                            handlingreadingemail();
                            setUserId(item.user_id);
                            setReadData(item);
                            setEmailId(item.email_ID)
                            localStorage.setItem("currentuserid:", item.user_id)
                            getEmailbyID();
                        }}>Subject: {item.subject} <br/>Date: {item.date_created}</Button>
                }else if (item.user_id ==0){
                    if (item.is_friend)
                        return <Button color='orange' onClick={function(event)
                            {
                            handlingreadingemail();
                            setUserId(item.user_id);
                            setReadData(item);
                            setEmailId(item.email_ID)
                            localStorage.setItem("currentuserid:", item.user_id)
                            getEmailbyID();
                        }}>Subject: {item.subject}<Icon name ='reply' color='black' /> <br/>Date: {item.date_created}</Button>
                    else
                        return <Button color='orange' onClick={function(event)
                            {
                            handlingreadingemail();
                            setUserId(item.user_id);
                            setReadData(item);
                            setEmailId(item.email_ID)
                            localStorage.setItem("currentuserid:", item.user_id)
                            getEmailbyID();
                        }}>Subject: {item.subject} <br/>Date: {item.date_created}</Button>
                }
                else{
                    if(item.is_friend)
                        return <Button color='google plus' onClick={function(event)
                            {
                            handlingreadingemail();
                            setUserId(item.user_id);
                            setReadData(item);
                            setEmailId(item.email_ID)
                            localStorage.setItem("currentuserid:", item.user_id)
                            getEmailbyID();
                        }}>Subject: {item.subject}<Icon name ='reply' color='black' /> <br/>Date: {item.date_created}</Button>
                    else
                        return <Button color='google plus'  onClick={function(event)
                            {
                            handlingreadingemail();
                            setUserId(item.user_id);
                            setReadData(item);
                            setEmailId(item.email_ID)
                            localStorage.setItem("currentuserid:", item.user_id)
                            getEmailbyID();
                        }}>Subject: {item.subject} <br/>Date: {item.date_created}</Button>}
            });
            setButtons(buttonData);
        })
        .catch(error => {
            console.log(error);
        });

}

function searchOutboxByEmailAddress(handlingreadingemailoutbox,SearchInput,setSearchInput,setButtons,setReadData){
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
                    if(item.is_reply)
                        return <Button color='teal' onClick={function(event)
                            {
                            handlingreadingemailoutbox();
                            setReadData(item);
                        }}>Subject: {item.subject} <Icon name ='reply' color='black' /><br/>Date: {item.date_created}    </Button>
                    else
                        return <Button color='teal' onClick={function(event)
                            {
                            handlingreadingemailoutbox();
                            setReadData(item);
                        }}>Subject: {item.subject} <br/>Date: {item.date_created} </Button>
                }else if (item.user_id ==0){
                    if (item.is_reply)
                        return <Button color='orange' onClick={function(event)
                            {
                            handlingreadingemailoutbox();
                            setReadData(item);
                        }}>Subject: {item.subject}  <Icon name ='reply' color='black' /><br/>Date: {item.date_created}</Button>
                    else
                        return <Button color='orange' onClick={function(event)
                            {
                            handlingreadingemailoutbox();
                            setReadData(item);
                        }}>Subject: {item.subject} <br/>Date: {item.date_created}</Button>
                }
                else{
                    if(item.is_reply)
                        return <Button color='google plus'  onClick={function(event)
                            {
                            handlingreadingemailoutbox();
                            setReadData(item);
                        }}>Subject: {item.subject} <Icon name ='reply' color='black' /> <br/>Date: {item.date_created} </Button>
                    else
                        return <Button color='google plus'  onClick={function(event)
                            {
                            handlingreadingemailoutbox();
                            setReadData(item);
                        }}>Subject: {item.subject} <br/>Date: {item.date_created}</Button>}
            });
            setButtons(buttonData);
        })
        .catch(error => {
            console.log(error);
        });

}


function Inbox() {

    if('true'==localStorage.getItem('Change:')){
        Done = false
        localStorage.setItem('Change:','false')
    }
    User=localStorage.getItem("user_id:");
    is_premium =  localStorage.getItem("is_premium:");
    console.log("This is the value of is premium: " + is_premium)
    console.log("This is the count" + Count)
    useEffect(() => {
        if(SearchInput.length === 0&&Checked==false){
            Count = 0
            Checked=true
        }
        else if(MailBox==1&&Done==false){
            return LoadOutbox(handlingreadingemailoutbox,setButtons,setReadData)
        }
        else if(MailBox==0&&Done==false){
            return LoadInbox(handlingreadingemail,setReadData,setUserId,getEmailbyID,setButtons,setEmailId,setEmailAddress)
            }
        else if(MailBox==0&&SearchInput!=""){
            return searchInboxByEmailAddress(handlingreadingemail,SearchInput,setSearchInput,setButtons,setUserId,setReadData,setEmailId,getEmailbyID)
         }
        else if(MailBox==1&&SearchInput!=""){
            return searchOutboxByEmailAddress(handlingreadingemailoutbox,SearchInput,setSearchInput,setButtons,setReadData)

        }


    });
    const handleChange = (event, newValue) => {
        setOpen(true);
    }
    const handlingcreatechange = (event,newValue) => {
        setShow(true);
    }
    const handlingreadingemail = (event,newValue) => {
        setReadEmail(true);
    }
    const handlingreadingemailoutbox = (event,newValue) => {
        setReadEmailOutbox(true)
    }
    const SearchChange = (e) => {
        e.preventDefault();
        Checked=false
        setSearchInput(e.target.value);
    };
    const handlingchangecategory = (event,newValue) => {
        setChangeCategory(true);
    }

    const getEmailbyID = event => {
        //Bug where you have to hit email two times for the right email address to appear
        console.log('Getting Email Address');
        currentuserid = localStorage.getItem("currentuserid:")
        console.log("This is the email id: " + parseInt(currentuserid))
        axios.get('http://127.0.0.1:5000/EmailService/users/'+currentuserid)
        .then(function(response){
            const email_address_response_data = response.data
            const user_email_address = email_address_response_data.User.email_address
            console.log( "this is the email address: " + user_email_address)
            setEmailAddress(user_email_address)
            setUserId("")
        })
        .catch(function(error){
        });
    };
    const handleSubmitReply = event => {
        console.log('handleSubmitreply ran');
        event.preventDefault(); // 👈️ prevent page refresh
        axios.post('http://127.0.0.1:5000/EmailService/reply', {
            date_created: date_created,
            subject: subject,
            user_id: User,
            body: body,
            original_id:email_id
          }).then(function (response){
            console.log("Done Creating Email and Reply");
          })
          .catch(function (error) {
            console.log(error);
          }) 
          // 👇️ access input values here
        console.log('date_created 👉️', date_created);
        console.log('subject 👉️', subject);
        console.log('user_id 👉️', email_address);
        console.log('body 👉️', body);
        // 👇️ clear all input values in the form
        setDateCreated('');
        setSubject('');
        setEmailId('');
        setBody('');

    }
    const handleSubmitDelete = event => {
        console.log('handleSubmitDelete ran');
        event.preventDefault();
        axios.put('http://127.0.0.1:5000/EmailService/receive', {
            user_id : User,
            email_id : readdata.email_ID,
            new_user_id : User,
            new_email_id : readdata.email_ID,
            is_viewed : 0,
            is_deleted : 1,
            category : readdata.category

        }).then(function(response){

        }).catch(function(error){
            console.log(error)
        })

    }
    const handleSubmitDeleteFromDatabase = event => {
        console.log('handleSubmitDeleteFromDatabase ran');
        event.preventDefault();
        if(is_premium == 1){
            axios.delete('http://127.0.0.1:5000/EmailService/email/' + readdata.email_ID)
            .then(function(response){
                console.log("Email Deleted FROM Database")
            })
            .catch(function(error){

            })

        }
        else{
            setIsNotPremium(true);
        }
    }
    const handleSubmitDeleteOutbox = event => {
        console.log('handleSubmitDeleteOutbox ran');
        event.preventDefault();
        axios.put('http://127.0.0.1:5000/EmailService/email/' + readdata.email_ID, {
            date_created: readdata.date_created,
            subject: readdata.subject,
            body: readdata.body,
            user_id: readdata.user_id,
            is_deleted: 1 

        }).then(function(response){
            console.log("Finished Deleting Outbox Email")
        }).catch(function(error){
            console.log(error)
        })
    }
    const handleSubmitchangecategory = event => {
        console.log('handleSubmitchangecategory ran');
        console.log("this is viewed:" + readdata.is_viewed)
        event.preventDefault(); // 👈️ prevent page refresh
        axios.put('http://127.0.0.1:5000/EmailService/receive', {
            user_id : User,
            email_id : readdata.email_ID,
            new_user_id : User,
            new_email_id : readdata.email_ID,
            is_viewed : 0,
            is_deleted : 0,
            category : category 

        }).then(function(response){

        }).catch(function(error){
            console.log(error)
        })
        console.log("category is:" + category)
        setCategory(''); 
    }
    const handleSubmit = event => {
        console.log('handleSubmit ran');
        event.preventDefault(); // 👈️ prevent page refresh
        axios.get('http://127.0.0.1:5000/EmailService/GetUserInformationUsingEmailAddress/'+email_address).
        then(function(response) {
            const email_address_response_data = response.data
            const user_id_email = email_address_response_data.User.user_id
        axios.post('http://127.0.0.1:5000/EmailService/email', {
            date_created: date_created,
            subject: subject,
            user_id: User,
            body: body
          })
          .then(function (response) {
            const data = response.data
            const email_id = data.Email.email_id
            axios.post('http://127.0.0.1:5000/EmailService/receive',{
                user_id:user_id_email,
                email_id: email_id
            })
            .then(function(response) {
                console.log(response)
            })
            .catch(function(error){
                console.log(error)
            })
          })
          .catch(function (error) {
            console.log(error);
          }) 
        }).catch(function(error) {
            console.log(error)
        })
          
        // 👇️ access input values here
        console.log('date_created 👉️', date_created);
        console.log('subject 👉️', subject);
        console.log('user_id 👉️', email_id);
        console.log('body 👉️', body);
        // 👇️ clear all input values in the form
        setDateCreated('');
        setSubject('');
        setEmailAddress('');
        setBody('');

      };

    

    // B
    const[body,setBody] = useState("");
    const [buttons, setButtons] = useState([]);
    //C 
    const [category,setCategory] = useState("");
    const [changeCategory,setChangeCategory] = useState(false);
    // D
    const[date_created,setDateCreated] = useState("");
    const[deleting,setDeleting] = useState("");
    const[deletingoutbox,setDeletingOutbox] = useState(false);
    const[deletingfromdb,setDeletingFromDB] = useState(false);
    // E
    const[email_address,setEmailAddress] = useState("");
    const[email_id,setEmailId] = useState(""); 
    // F
    const[FriendEmail,setFriendEmail] = useState("");
    // M
    const [MailBox, setMailbox] = useState(0);
    const [isnotpremium,setIsNotPremium] = useState(false);
    // O
    const [open, setOpen] = useState(false);
    // R
    const [readdata,setReadData] = useState([])
    const [reademail,setReadEmail] = useState(false);
    const [replying,setReplying] = useState(false);
    const[reademailoutbox,setReadEmailOutbox] = useState(false);
    // S
    const [SearchInput, setSearchInput] = useState("");
    const [show,setShow] = useState(false);
    const[subject,setSubject] = useState("");
    // U
    const [user_id,setUserId] = useState("");

    console.log(open);
    console.log("The user id is Inbox:" + user_id)







try{
    return (<Segment>



            <Modal
            centered={true}
            open={changeCategory}
            dialogClassName="modal-100w"
            size="large"
            >
            <Modal.Header> Change Category </Modal.Header>
                <form onSubmit={handleSubmitchangecategory}>
                    <input
                    type="text"
                    id="category"
                    name="category"
                    placeholder="New Category"
                    maxlength="20"
                    onChange={event => setCategory(event.target.value)}
                    value = {category}
                    >
                    </input>
                    <input type ="submit"></input>
                </form>
                <Button onClick={() => setChangeCategory(false) }>Close</Button>
            </Modal>



            {/*Create Email*/}
            <Modal
                centered={true}
                open={show}
                dialogClassName="modal-100w"
                size="large"
            >
                <Modal.Header>Creating Email</Modal.Header>

                <form onSubmit={handleSubmit}>
                    <label for="date">Date Created:</label>
                    <br></br>
                    <input 
                    type="date" 
                    id="date_created" 
                    name="date_created"
                    onChange={event => setDateCreated(event.target.value)}
                    value= {date_created}
                    ></input>
                    <br></br>
                    <label for="Subject"> Subject:</label>
                    <br></br>
                    <input 
                    type="text" 
                    id="subject" 
                    name="subject"
                    maxlength="20"
                    onChange={event => setSubject(event.target.value)}
                    value= {subject}
                    ></input>
                    <br></br>
                    <label for="Email Address">Email Address:</label>
                    <br></br>
                    <input 
                    type="text" 
                    id="email_address" 
                    name="email address"
                    maxlength="20"

                    onChange={event => setEmailAddress(event.target.value)}
                    value= {email_address}
                    ></input>
                    <br></br>
                    <label for="body">Body:</label>
                    <br></br>
                    <textarea 
                    rows="4" 
                    cols ="50" 
                    name="body" 
                    id="body"
                    maxlength="150"
                    onChange={event => setBody(event.target.value)}
                    value= {body}
                    > Enter text here</textarea>
                    <br></br>
                    <input type ="submit"></input>
                </form>

                <Button onClick={() => setShow(false)}>Close</Button>
            </Modal>
            
            <Modal
            centered={true}
            open={deleting}
            dialogClassName="modal-100w"
            size="large"
            >
                <Header as="h1" color='blue'>
                        Deleting Email
                    </Header>
            <Button onClick={handleSubmitDelete}>Hit here to delete</Button>
            <Button onClick={() => (setDeleting(false),setReadEmail(false),Done = false)}>Close</Button>
            </Modal>
            {/*Read Email*/}
            <Modal
            centered={true}
            open={reademail}
            dialogClassName="modal-100w"
            size="large"
            >
                    <Header as="h1" color='blue'>
                        Subject: {JSON.stringify(readdata.subject)}
                    </Header>
                    <Header as="h1" color='blue'>
                        Category: <br></br> {JSON.stringify(readdata.category)}
                    </Header>
                    <Header as="h1">
                        From
                         <br>
                        </br>
                        {JSON.stringify(email_address)}
                    </Header>
                    <Header as="h1"
                    >
                        Date: {JSON.stringify(readdata.date_created)}
                    </Header>
                    <Header as="h1">
                        Body:
                         <br>
                        </br>
                        {JSON.stringify(readdata.body)}
                    </Header>
                    <Button onClick={() => setReplying(true)}>Reply</Button>
                <Button onClick={() => setReadEmail(false)}>Close</Button>
                <Button onClick={() => setChangeCategory(true)}>Change Category</Button>
                <Button onClick={() => setDeleting(true)}>Delete</Button>
            </Modal>

            {/*Reply Email*/}
            <Modal
            centered={true}
                open={replying}
                dialogClassName="modal-100w"
                size="large"
            >
                <Modal.Header>Creating Email</Modal.Header>
                <form onSubmit={handleSubmitReply}>
                    <label for="date">Date Created:</label>
                    <br></br>
                    <input 
                    type="date" 
                    id="date_created" 
                    name="date_created"
                    onChange={event => setDateCreated(event.target.value)}
                    value= {date_created}
                    ></input>
                    <br></br>
                    <label for="Subject"> Subject:</label>
                    <br></br>
                    <input 
                    type="text" 
                    id="subject" 
                    name="subject"
                    maxlength="20"
                    onChange={event => setSubject(event.target.value)}
                    value= {subject}
                    ></input>
                    <br></br>
                    <label for="body">Body:</label>
                    <br></br>
                    <textarea 
                    rows="4" 
                    cols ="50" 
                    name="body" 
                    id="body"
                    maxlength="150"
                    onChange={event => setBody(event.target.value)}
                    value= {body}
                    > Enter text here</textarea>
                    <br></br>
                    <input type ="submit"></input>
                </form>
                <Button onClick={() => setReplying(false)}>Close</Button>
            </Modal>

            {/*Outbox Read Email*/}
            <Modal
            centered={true}
            open={reademailoutbox}
            dialogClassName="modal-100w"
            size="large"
            >
                    <Header as="h1" color='blue'>
                        Subject: {JSON.stringify(readdata.subject)}
                    </Header>
                    <Header as="h1"
                    >
                        Date: {JSON.stringify(readdata.date_created)}
                    </Header>
                    <Header as="h1">
                        Body:
                         <br>
                        </br>
                        {JSON.stringify(readdata.body)}
                    </Header>
                    <Button onClick={() => setDeletingOutbox(true) }>Delete </Button>
                    <Button onClick={() => setReplying(true)}>Reply</Button>
                <Button onClick={() => setReadEmailOutbox(false)}>Close</Button>
                <Button onClick={() => setDeletingFromDB(true)}>Delete from database</Button>
            </Modal>

            <Modal
            centered={true}
            open={isnotpremium}
            dialogClassName="modal-100w"
            size="large"
            >
                <Header as="h1" color='blue'>
                        You are not premium user, Get Premium to be able to do this... 
                    </Header>
                <Button onClick={() => setIsNotPremium(false)}>Close</Button>
            </Modal>

            <Modal
            centered={true}
            open={deletingfromdb}
            dialogClassName="modal-100w"
            size="large"
            >
                <Header as="h1" color='blue'>
                        Deleting Email
                    </Header>
                <Button onClick={handleSubmitDeleteFromDatabase}>Are you sure you want to delete?</Button>
                <Button onClick={() => (setDeletingFromDB(false),setReadEmailOutbox(false),Done = false)}>Hit here to close the window</Button>
            </Modal>

            <Modal
            centered={true}
            open={deletingoutbox}
            dialogClassName="modal-100w"
            size="large"
            >
                <Header as="h1" color='blue'>
                        Deleting Email
                    </Header>
            <Button onClick={handleSubmitDeleteOutbox}>Hit here to delete</Button>
            <Button onClick={() =>(setDeletingOutbox(false),setReadEmailOutbox(false),Done = false)}>Close</Button>
            </Modal>


            <Label ribbon color="blue" size="large">Support</Label>
            <Grid>
                <Grid.Column textAlign="Left">
                    <Input
                        type='text'
                        icon='search'
                        iconPosition='left'
                        placeholder='Search with email address'
                        onChange={SearchChange}
                    />
                    <Button onClick={() => (Done=false,setMailbox(0))}>Inbox</Button>
                    <Button onClick={() => (Done=false,setMailbox(1))}>Outbox</Button>
                    <Button onClick={handlingcreatechange}>Create Email</Button>
                </Grid.Column>

            </Grid>
            <br/>
            <div className="ui vertical buttons">
                {buttons}
            </div>

        </Segment>

    )}
    catch (error){
        console.log(error)
    }

}
export default Inbox