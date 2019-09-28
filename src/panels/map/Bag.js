import React from 'react'

import {View, Panel, PanelHeader, platform, IOS, HeaderButton, List, Cell, Avatar, Tabs, TabsItem, FixedLayout, PullToRefresh} from '@vkontakte/vkui'

import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';
import Icon16Done from '@vkontakte/icons/dist/16/done';

import connect from '@vkontakte/vkui-connect';

class Bag extends React.Component {
    constructor() {
        super()
        this.state = {
            items: [],
            price: 0,
            fetching: false
        }

        this.getBag = this.getBag.bind(this)
        this.onRefresh = this.onRefresh.bind(this)
    }

    onRefresh = () => {
        this.setState({fetching: true})
        this.getBag()
    }

    getBag = () => {
        fetch('/api/v1/cart/view', {
            method: 'GET',
            headers: {
                'Povysh-Token': localStorage.getItem('token')
            }
        }).then((data) => {
            return data.json()
        }).then((data) => {
            var price = 0
            console.log(data)
            data.map((value) =>{
                price += value.menu_item.price
            })
            console.log(price)
            this.setState({items: data, price: price, fetching: false})
        })
    }

    componentDidMount() {
        this.getBag()
    }

    pay = () => {
        connect.send('VKWebAppOpenPayForm', {app_id: 7150406, action: 'pay-to-service', params: {}})
        fetch('/api/v1/cart/complete', {
            method: 'GET',
            headers: {
                'Povysh-Token': localStorage.getItem('token')
            }
        }).then((data) => {
            return data.json()
        }).then((data) => {
            var orderID = data.tracking
            console.log(data)
            this.props.trackingOrder(orderID)
        })
    }

    render() {
        return (
            <View id={this.props.id} activePanel='mainBag'>
                <Panel id='mainBag'>
                    <PullToRefresh onRefresh={this.onRefresh} isFetching={this.state.fetching}>
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
                                        before={<Avatar size={64} src={ '' + value.menu_item.photo_url } />}
                                        description={value.menu_item.description}
                                    >
                                        {value.menu_item.name}
                                    </Cell>
                                )
                            })
                            
                            }
                        </List>
                    
                        <FixedLayout vertical='bottom'>
                            <Tabs>
                                <TabsItem onClick={this.pay}>
                                    {'Оплатить: ' + String(this.state.price) + ' руб'}
                                </TabsItem>
                            </Tabs>
                        </FixedLayout>
                    </PullToRefresh>
                </Panel>
            </View>
        )
    }
}
export default Bag