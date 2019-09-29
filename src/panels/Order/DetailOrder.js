import React from 'react'
import {View, Panel, PanelHeader, platform, IOS, Group, Cell, HeaderButton, List, Avatar, Button} from '@vkontakte/vkui'

import serverAddress from '../../ServerAddress'

import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';
import Icon16Done from '@vkontakte/icons/dist/16/done';

import Bag from '../map/Bag'

class DetailOrder extends React.Component {
    constructor() {
        super()
        this.state = {
            order: null,
            isLoaded: false,
            bag: false,
            activePanel: 'root'
        }
    }

    componentDidMount() {
        fetch(serverAddress + '/api/v1/order/detailed?id=' + String(this.props.orderID), {
            method: 'GET',
            headers: {
                'Povysh-Token': localStorage.getItem('token')
            }
        }).then((data) => {
            return data.json()
        }).then((data) => {
            this.setState({order: data, isLoaded: true})
        })
    }

    checkNullBag = () => {
        var a = fetch(serverAddress + '/api/v1/cart/view', {
            method: 'GET',
            headers: {
                'Povysh-Token': localStorage.getItem('token')
            }
        }).then((data) => {
            return data.json()
        }).then((data) => {
            if(data.length === 0) {
                return false
            } else {
                return true
            }
        })
        return a
    }

    addToBagItems = () => {
        var a = this.checkNullBag()
        console.log(a)
        if(a.value) {
            return
        }

        this.state.order.menu_item.map((value, index) => {
            var idItem = value.menu_item.id
            fetch(serverAddress + '/api/v1/cart/push?menu_item_id=' + String(idItem), {
                method: 'GET',
                headers: {
                    'Povysh-Token': localStorage.getItem('token')
                }
            })
        })

        this.setState({activePanel: 'bag'})
    }

    render() {
        console.log(this.props)
        if(this.state.activePanel === 'bag') {
            return (
                <Bag id={this.props.id} trackingOrder={() => {}} back={() => this.setState({activePanel: 'root' })}/>
            )
        }
        if(!this.state.isLoaded) {
            return (
                <View id={this.props.id} activePanel='detailorder'>
                <Panel id='detailorder'>
                    <PanelHeader
                        left={
                            <HeaderButton onClick={this.props.back}>
                              {platform() === IOS ? <Icon28ChevronBack /> : <Icon24Back />}
                              
                            </HeaderButton>
                          }
                    >
                        Описание заказа
                    </PanelHeader>
                </Panel>
            </View>
            )
        }
        return (
            <View id={this.props.id} activePanel='detailorder'>
                <Panel id='detailorder'>
                    <PanelHeader
                        left={
                            <HeaderButton onClick={() => {console.log('clickkkkkkk'); this.props.back()}}>
                              {platform() === IOS ? <Icon28ChevronBack /> : <Icon24Back />}
                              
                            </HeaderButton>
                          }
                    >
                        Описание заказа
                    </PanelHeader>
                    <Group title='Основные детали заказа'>
                        <Cell description={this.state.order.created_at}>Дата и время заказа</Cell>
                        <Cell description={this.state.order.tracking}>Номер отслеживания заказа</Cell>
                        <Cell description={this.state.order.status}>Статус заказа</Cell>
                    </Group>
                    {this.state.order.status === 0 &&
                        <Group title='Отслеживание заказа'>

                        </Group>
                    }
                    <Group title='Заказанные товары'>
                        <List>
                            {this.state.order.menu_item && this.state.order.menu_item.length > 0 && this.state.order.menu_item.map((value, index) => {
                                return (
                                    <Cell 
                                        before={<Avatar src={serverAddress + value.menu_item.photo_url} />}
                                        description={value.menu_item.description}
                                        asideContent={
                                            <Button style={{width: '80px'}}
                                            >{String(value.menu_item.price) + ' руб'}</Button>
                                        }
                                    >{value.menu_item.name}</Cell>
                                )
                            })}
                        </List>
                    </Group>
                    <Button onClick={this.addToBagItems} size='xl'>Повторить заказ</Button>
                </Panel>
            </View>
        )
    }
}

export default DetailOrder