import React from 'react';
import {Button, Header, Icon, List} from 'semantic-ui-react';
import TimeAgo from 'react-timeago';
import 'semantic-ui-css/semantic.min.css';

export class KeywordList extends React.Component {
    render() {
        if (!this.props.keywords) {
            return null;
        }

        return (
            <div>
                <Header as='h2' icon>
                    <Icon name='settings'/>
                    등록된 키워드
                </Header>
                <List divided>
                    {
                        this.props.keywords.map((row) => {

                            // in order to convert unix timestamp (in seconds) to milliseconds, multiple by 1000
                            let date = new Date(row.mod_dtime * 1000);

                            return (<List.Item key={row.keyword}>
                                    <Button onClick={() => this.props.deleteKeyword(row.keyword)} floated='right'>
                                            Delete
                                    </Button>
                                    <List.Icon name='newspaper' size='large'/>
                                    <List.Content>
                                        <List.Header>
                                            <Header floated='left' size='small'>
                                                {row.keyword}
                                            </Header>
                                        </List.Header>
                                        <List.Content floated='left'>
                                            <List.Description><TimeAgo date={date}/></List.Description>
                                        </List.Content>
                                    </List.Content>
                                </List.Item>
                            )
                        })
                    }
                </List>
            </div>
        )
    }
}

export default KeywordList
