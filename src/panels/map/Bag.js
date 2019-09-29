import React from 'react'

import {View, Panel, PanelHeader, platform, IOS, HeaderButton, List, Cell, Avatar, Tabs, TabsItem, FixedLayout, PullToRefresh, ModalRoot, ModalCard, Group, Button, ModalPage} from '@vkontakte/vkui'

import {ModalPageHeader, Select, Input} from '@vkontakte/vkui'

import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';
import Icon16Done from '@vkontakte/icons/dist/16/done';

import connect from '@vkontakte/vkui-connect';
import Icon24Done from '@vkontakte/icons/dist/24/done'

import serverAddress from '../../ServerAddress'

class Bag extends React.Component {
    constructor() {
        super()
        this.state = {
            items: [],
            price: 0,
            fetching: false,
            activeModal: null,
            orderID: null,
            mode: 0
        }

        this.getBag = this.getBag.bind(this)
        this.onRefresh = this.onRefresh.bind(this)
    }

    onRefresh = () => {
        this.setState({fetching: true})
        this.getBag()
    }

    getBag = () => {
        fetch(serverAddress + '/api/v1/cart/view', {
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
        //connect.send('VKWebAppOpenPayForm', {app_id: 7150406, action: 'pay-to-service', params: {}})
        fetch(serverAddress + '/api/v1/cart/complete', {
            method: 'GET',
            headers: {
                'Povysh-Token': localStorage.getItem('token')
            }
        }).then((data) => {
            return data.json()
        }).then((data) => {
            var orderID = data.tracking
            console.log(data)
            this.setState({orderID: data[0].tracking, activeModal: 'orderDetail'})
            //this.props.trackingOrder(orderID)
        })
    }

    render() {
        return (
            <View id={this.props.id} activePanel='mainBag' modal={
                <ModalRoot activeModal={this.state.activeModal}>
                    <ModalCard
                        id='orderDetail'
                        onClose={() => this.setState({activeModal: null})}
                        title='Заказ готовится'
                        caption='номер вашего заказа'
                        actions={[{
                            title: 'Ok',
                            type: 'primary',
                            action: () => {this.setState({activeModal: null})}
                        }]}
                    >
                        <div style={{marginRight:'auto', marginLeft:'auto'}}>{this.state.orderID}</div>
                    </ModalCard>
                    <ModalPage
                        id='editDetailOrder'
                        onClose={() => this.setState({activeModal: null})}
                        header={
                            <ModalPageHeader
                                right={<HeaderButton onClick={() => this.setState({activeModal: null})}>{platform() === IOS ? 'Готово' : <Icon24Done />}</HeaderButton>}
                            >
                                Детали заказа
                            </ModalPageHeader>
                        }
                    >
                        <Select onChange={(e) => this.setState({mode: e.target.value})}>
                            <option value='0'>Обычный заказ</option>
                            <option value='1'>Планирование</option>
                        </Select>
                        {this.state.mode === 0 &&
                            <div>
                                <Cell>Выберите время</Cell>
                                <Input type='time' />
                            </div>
                        }
                        {this.state.mode === 1 &&
                            <div>
                                <Group title='День недели'>
                                    <Cell asideContent={<Switch />}>Понедельник</Cell>
                                    <Cell asideContent={<Switch />}>Вторник</Cell>
                                    <Cell asideContent={<Switch />}>Среда</Cell>
                                    <Cell asideContent={<Switch />}>Четверг</Cell>
                                    <Cell asideContent={<Switch />}>Пятница</Cell>
                                    <Cell asideContent={<Switch />}>Суббота</Cell>
                                    <Cell asideContent={<Switch />}>Воскресенье</Cell>
                                </Group>
                                <Group title='время'>
                                    <Input type='time' />
                                </Group>
                            </div>
                        }
                    </ModalPage>
                </ModalRoot>
            }>
                <Panel id='mainBag'>
                    <PullToRefresh onRefresh={this.onRefresh} isFetching={this.state.fetching}>
                        <PanelHeader
                            left={
                                <HeaderButton onClick={this.props.back}>
                                    {platform() === IOS ? <Icon28ChevronBack /> : <Icon24Back />}
                                </HeaderButton>
                            }
                        >
                            Корзина
                        </PanelHeader>
                        <Group title='Детали заказа'>
                            <Cell description='Предполагаемое время готовности заказа'>12:03</Cell>
                            <Button onClick={() => this.setState({activeModal: 'editDetailOrder'})} size='xl'>Изменить</Button>
                        </Group>
                        <Group title='Товары'>
                            <List>
                                {this.state.items && this.state.items.length > 0 && this.state.items.map((value, index) => {
                                    return (
                                        <Cell
                                            before={<Avatar size={64} src={serverAddress + value.menu_item.photo_url } />}
                                            description={value.menu_item.description}
                                        >
                                            {value.menu_item.name}
                                        </Cell>
                                    )
                                })}
                            </List>
                        </Group>
                        <div style={{height: '50px', width: '100%'}}>

                        </div>
                        
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