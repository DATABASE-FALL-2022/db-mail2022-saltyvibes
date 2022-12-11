import React, { Component } from 'react'
import { Form, Button, List, Grid, Header, Image, Segment } from 'semantic-ui-react'

function ViewFriends() {
    return (
            <Grid textAlign='center' style={{ height: '40vh' }} verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 350 }}>
                <Header as='h1' color='purple' textAlign='center'>Friends</Header>
        <List celled>
            <List.Item>
            <Image avatar src='https://react.semantic-ui.com/images/avatar/small/helen.jpg' />
            <List.Content>
                <List.Header>Jon</List.Header>
                jon@gmail.com
            </List.Content>
            </List.Item>
            <List.Item>
            <Image avatar src='https://react.semantic-ui.com/images/avatar/small/daniel.jpg' />
            <List.Content>
                <List.Header>Pedro</List.Header>
                pedro@gmail.com
            </List.Content>
            </List.Item>
            <List.Item>
            <Image avatar src='https://react.semantic-ui.com/images/avatar/small/daniel.jpg' />
            <List.Content>
                <List.Header>Ophis</List.Header>
                ophis@gmail.com
            </List.Content>
            </List.Item>
        </List>
            <Form>
                <Form.Group>
                <Form.Button content = 'Add'/>
                <Form.Input
                    
                />

            </Form.Group>
            </Form>
            </Grid.Column>
        </Grid>
    )
}

export default ViewFriends