import React from 'react'

import {PanelHeader, View, Panel, HorizontalScroll, TabsItem, Tabs, List, Cell, Avatar, HeaderButton, platform, IOS, Button, Snackbar, FixedLayout, Alert} from '@vkontakte/vkui';

import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';
import Icon16Done from '@vkontakte/icons/dist/16/done';

import Bag from './Bag'
import { timingSafeEqual } from 'crypto';

class Menu extends React.Component {
    constructor() {
        super()
        this.state = {
            activePanel: 'mainMenu',
            categories: [],
            items: [],
            currentCategory: -1,
            snackbar: null,
            bag: false
        }

        this.openBase = this.openBase.bind(this)
    }

    getRestsID = () => {
        var str = String(this.props.restsID[0])
        for(var i = 1; i < this.props.restsID.length; i++) {
            str += ',' + String(this.props.restsID[i])
        }
        return str
    }

    componentDidMount() {
        fetch('/api/v1/places/food?restaurant_id=' + this.getRestsID(), {
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
        fetch('/api/v1/cart/view', {
            method: 'GET',
            headers: {
                'Povysh-Token': localStorage.getItem('token')
            }
        }).then((data) => {
            return data.json()
        }).then((data) => {
            if(data.length > 0 && this.props.restsID.indexOf(data[0].menu_item.restaraunt_id) === -1) {
                this.setState({bag: true})
            }
        })
    }

    addToCart = ({id, name}) => {
        fetch('/api/v1/cart/push?menu_item_id=' + String(id), {
            method: 'GET',
            headers: {
                'Povysh-Token': localStorage.getItem('token')
            }
        }).then((data) => {
            return data.json()
        }).then((data) => {
            if(data.is_saved) {
                this.openBase(name)
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

    clearBag = () => {
        fetch('/api/v1/cart/clean', {
            method: 'GET',
            headers: {
                'Povysh-Token': localStorage.getItem('token')
            }
        })
        this.setState({bag: false})
    }

    render() {
        if(this.state.bag) {
            return (
                    <Panel id='mainError'>
                        <div style={{height: '50px'}}></div>
                        <p>У вас в корзине что-то есть, очистить её и продолжить?</p> 
                        <Button onClick={this.clearBag} size='xl'>Да</Button>
                        <p></p>
                        <Button onClick={() => this.setState({bag: false, activePanel: 'bag'})} size='xl'>Нет, перейти в корзину</Button>
                    </Panel>
            )
        }
        if(this.state.activePanel === 'bag') {
            return (
                <Bag id={this.props.id} trackingOrder={this.props.trackingOrder} back={() => this.setState({activePanel: 'mainMenu' })} />
            )
        }
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
                    <Tabs type="buttons">
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
                                    before={<Avatar src={'' + value.photo_url} />}
                                    description={value.description}
                                    asideContent={
                                        <Button 
                                            onClick={() => {
                                                this.addToCart({id: value.id, name: value.name})
                                                
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

                    <FixedLayout vertical='bottom'>
                        <Tabs>
                            <TabsItem onClick={() => {
                            this.setState({activePanel: 'bag'})
                        }}>Перейти к корзине</TabsItem>
                        </Tabs>
                    </FixedLayout>
                    {this.state.snackbar} 
                </Panel>
            </View>
        )
    }
}

export default Menu