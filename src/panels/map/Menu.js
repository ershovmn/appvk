import React from 'react'

import {PanelHeader, View, Panel, HorizontalScroll, TabsItem, Tabs, List, Cell, Avatar, HeaderButton, platform, IOS, Button, Snackbar} from '@vkontakte/vkui';

import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';
import Icon16Done from '@vkontakte/icons/dist/16/done';

class Menu extends React.Component {
    constructor() {
        super()
        this.state = {
            activePanel: 'mainMenu',
            categories: [],
            items: [],
            currentCategory: -1,
            snackbar: null
        }

        this.openBase = this.openBase.bind(this)
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
                this.setState({items: data})
                var categories = []
                var categoriesID = []
                this.state.items.map((value) => {
                    console.log(value.menu_category)
                    if(categoriesID.indexOf(value.menu_category.id) === -1) {
                        categories.push(value.menu_category)
                        categoriesID.push(value.menu_category.id)
                    }
                })
                this.setState({categories: categories})
                if(this.state.categories && this.state.categories.length > 0) {
                    this.setState({currentCategory: this.state.categories[0].id})
                }
            } catch { } 
        })
    }

    addToCart = (id) => {
        fetch('https://170e4f1c.ngrok.io/api/v1/cart/push?menu_item_id=' + String(id), {
            method: 'GET',
            headers: {
                'Povysh-Token': localStorage.getItem('token')
            }
        })
    }

    openBase = (name) => {
        if (this.state.snackbar) return;
        this.setState({ snackbar:
            <Snackbar
                layout="vertical"
                onClose={() => this.setState({ snackbar: null })}
                before={<Avatar size={24} ><Icon16Done fill="#fff" width={14} height={14} /></Avatar>}
            >
                {name + ' добавлен в корзину'}
            </Snackbar>
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
                            if(value.menu_category.id !== this.state.currentCategory) {
                                return null
                            }
                            return (
                                <Cell
                                    before={<Avatar src='https://burgerking.ru/images/product_images/mobile/cheezy-joe.png' />}
                                    description={value.description}
                                    asideContent={
                                        <Button 
                                            onClick={() => {
                                                this.addToCart(value.id)
                                                this.openBase(value.name)
                                            }}
                                            style={{width: '80px'}}
                                        >{String(value.price) + ' руб'}</Button>
                                    }
                                >
                                    {value.name}
                                </Cell>
                            )
                        })
                        
                        }
                    </List>
                    {this.state.snackbar}
                </Panel>
            </View>
        )
    }
}

export default Menu