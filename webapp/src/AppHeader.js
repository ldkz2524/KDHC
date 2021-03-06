import React from 'react';
import {Button, Container, Header, Icon, Menu, Segment} from 'semantic-ui-react'
import {NavLink} from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';

class AppHeader extends React.Component {
    login() {
        this.props.auth.login();
    }

    logout() {
        this.props.auth.logout();
    }

    render() {
        const {isAuthenticated} = this.props.auth;

        return (
            <Segment
                inverted
                textAlign='center'
                vertical
                padded
            >
                <Container>
                    <Menu inverted pointing secondary size='large'>
                        <Menu.Item name="news" as={NavLink} to='/news'>News</Menu.Item>
                        <Menu.Item name="keyword" as={NavLink} to='/keyword'>Keyword</Menu.Item>
                        <Menu.Item position='right'>
                            {
                                !isAuthenticated() && (
                                    <Button
                                        as='a' inverted
                                        onClick={this.login.bind(this)}
                                        animated='fade'
                                        size='medium'
                                    >
                                        <Button.Content hidden>Sign In</Button.Content>
                                        <Button.Content visible>
                                            <Icon name='sign in'/>
                                        </Button.Content>
                                    </Button>
                                )
                            }
                            {
                                isAuthenticated() && (
                                    <Button.Group>
                                        <Button
                                            as={NavLink} inverted
                                            to='/manageKeyword'
                                            animated='fade'
                                            size='medium'
                                        >
                                            <Button.Content hidden>Manage</Button.Content>
                                            <Button.Content visible>
                                                <Icon name='settings'/>
                                            </Button.Content>
                                        </Button>
                                        <Button
                                            as='a' inverted
                                            onClick={this.logout.bind(this)}
                                            animated='fade'
                                            size='medium'
                                        >
                                            <Button.Content hidden>Sign Out</Button.Content>
                                            <Button.Content visible>
                                                <Icon name='sign out'/>
                                            </Button.Content>
                                        </Button>
                                    </Button.Group>
                                )
                            }
                        </Menu.Item>
                    </Menu>
                </Container>
                <Container text>
                    <Header as='h2' icon textAlign='center' inverted>
                        <Icon name='newspaper' circular/>
                        <Header.Content>
                            KDHC
                        </Header.Content>
                    </Header>
                </Container>
            </Segment>
        );
    }
}

export default AppHeader;