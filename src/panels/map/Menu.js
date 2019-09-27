import React from 'react'

import {PanelHeader, View, Panel, HorizontalScroll, TabsItem, Tabs, List, ListItem, Avatar, HeaderButton, platform, IOS} from '@vkontakte/vkui';

import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';

class Menu extends React.Component {
    constructor() {
        super()
        this.state = {
            activePanel: 'mainMenu',
            categories: [],
            items: [],
            currentCategory: -1
        }
    }

    componentDidMount() {
        console.log(this.props)
        fetch('https://170e4f1c.ngrok.io/api/v1/places/food?restaurant_id=' + String(this.props.restID), {
            method: 'GET',
            headers: {
                'Povysh-Token': localStorage.getItem('token')
            }
        }).then((data) => {
            return data.json()
        }).then((data) => {
            try {
                this.setState({categories: data.categories, items: data.items})
                if(this.state.categories && this.state.categories.length > 0) {
                    this.setState({currentCategory: this.state.categories[0].id})
                }
            } catch { } 
        })
    }

    render() {

        return (
            <View id={this.props.id} activePanel={this.state.activePanel}>
                <Panel id='mainMenu'>
                    <PanelHeader
                        left={
                            <HeaderButton onClick={this.props.back}>
                              {platform() === IOS ? <Icon28ChevronBack /> : <Icon24Back />}
                              
                            </HeaderButton>
                          }
                    >
                        Menu
                    </PanelHeader>
                    <Tabs type='button'>
                        <HorizontalScroll>
                            {this.state.categories.length > 0 && this.state.categories.map((value, index) => {
                                return (
                                    <TabsItem
                                        key={index}
                                        onClick={() => this.setState({currentCategory: value.id})}
                                        selected={this.state.currentCategory === value.id}
                                        style={{marginLeft: '10px'}}
                                    >
                                        {value.name}
                                    </TabsItem>
                                )
                            })}
                        </HorizontalScroll>
                    </Tabs>
                    <List>
                        {this.state.items && this.state.items.length > 0 && this.state.items.map((value, index) => {
                            if(value.menu_category_id !== this.state.currentCategory) {
                                return null
                            }
                            return (
                                <ListItem
                                    before={<Avatar src='https://burgerking.ru/images/product_images/mobile/cheezy-joe.png' />}
                                    description={value.description}
                                >
                                    {value.name}
                                </ListItem>
                            )
                        })
                        
                        }
                    </List>
                </Panel>
            </View>
        )
    }
}

export default Menu