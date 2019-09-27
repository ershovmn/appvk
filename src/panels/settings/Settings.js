import React from 'react'

import connect from '@vkontakte/vkui-connect';
import {ListItem, Group, Avatar, PanelHeader, CellButton } from '@vkontakte/vkui';

class Settings extends React.Component {
    constructor() {
        super() 
        this.state = {
            fetchedUser: null
        }
    }

    componentDidMount() {
		connect.subscribe((e) => {
			switch (e.detail.type) {
				case 'VKWebAppGetUserInfoResult':
					this.setState({ fetchedUser: e.detail.data });
					break;
				default:
					console.log(e.detail.type);
			}
		});
		connect.send('VKWebAppGetUserInfo', {});
    }
    
    render() {
        console.log(localStorage.getItem('mapState'))
        return (
            <div>
                <PanelHeader>Settings</PanelHeader>
                {this.state.fetchedUser &&
                <Group title="User Data Fetched with VK Connect">
                    <ListItem
                        before={this.state.fetchedUser.photo_200 ? <Avatar src={this.state.fetchedUser.photo_200}/> : null}
                        description={this.state.fetchedUser.city && this.state.fetchedUser.city.title ? this.state.fetchedUser.city.title : ''}
                    >
                        {`${this.state.fetchedUser.first_name} ${this.state.fetchedUser.last_name}`}
                    </ListItem>
                </Group>}
                <Group>
                    <CellButton onClick={console.log('tap')} data-to='tinder'>
                        Tinder
                    </CellButton>
                    <CellButton onClick={console.log('tap')} data-to='tinder'>
                        Tinder
                    </CellButton>
                </Group>
            </div>
        )
    }
}

export default Settings