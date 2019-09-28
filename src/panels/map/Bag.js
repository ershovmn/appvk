import React from 'react'

import {View, Panel, PanelHeader, platform, IOS, HeaderButton, List, Cell, Avatar, Button, FixedLayout} from '@vkontakte/vkui'

import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';
import Icon16Done from '@vkontakte/icons/dist/16/done';

import connect from '@vkontakte/vkui-connect';

class Bag extends React.Component {
    constructor() {
        super()
        this.state = {
            items: [],
            price: 0
        }
    }

    componentDidMount() {
        fetch('https://170e4f1c.ngrok.io/api/v1/cart/view', {
            method: 'GET',
            headers: {
                'Povysh-Token': localStorage.getItem('token')
            }
        }).then((data) => {
            return data.json()
        }).then((data) => {
            this.setState({items: data})
            var price = 0
            this.state.items.map((value) =>{
                price += value.menu_item.price
            })
            this.setState({price: price})
        })
    }

    pay = () => {
        connect.send('VKWebAppOpenPayForm', {app_id: 7150406, action: 'pay-to-service', params: {}})
        fetch('https://170e4f1c.ngrok.io/api/v1/cart/clean', {
            method: 'GET',
            headers: {
                'Povysh-Token': localStorage.getItem('token')
            }
        })
    }

    render() {
        return (
            <View id={this.props.id} activePanel='mainBag'>
                <Panel id='mainBag'>
                    <PanelHeader
                        left={
                            <HeaderButton onClick={this.props.back}>
                                {platform() === IOS ? <Icon28ChevronBack /> : <Icon24Back />}
                            </HeaderButton>
                        }
                    >
                        Bag
                    </PanelHeader>
                    <List>
                        {this.state.items && this.state.items.length > 0 && this.state.items.map((value, index) => {
                            return (
                                <Cell
                                    before={<Avatar src='https://burgerking.ru/images/product_images/mobile/cheezy-joe.png' />}
                                    description={value.menu_item.description}
                                >
                                    {value.menu_item.name}
                                </Cell>
                            )
                        })
                        
                        }
                    </List>
                    <FixedLayout vertical='bottom'>
                        <Button size='xl' onClick={this.pay}>
                            {'Оплатить: ' + String(this.state.price) + ' руб'}
                        </Button>
                    </FixedLayout>
                </Panel>
            </View>
        )
    }
}
export default Bag