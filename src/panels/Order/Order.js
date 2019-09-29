import React from 'react'
import {View, Panel, HeaderButton, PanelHeader, List, Cell, PullToRefresh} from '@vkontakte/vkui'
import connect from '@vkontakte/vk-connect'

import serverAddress from '../../ServerAddress'

import DetailOrder from './DetailOrder'

class Order extends React.Component {
    constructor() {
        super()
        this.state = {
            activePanel: 'mainorder',
            count: 0,
            coord: '',
            data: [],
            orderID: -1,
            fetching: false,
        }

        this.tarcking = this.tarcking.bind(this)
        this.onRefresh = this.onRefresh.bind(this)
    }

    async tarcking() {
        
    }

    onRefresh = () => {
        this.setState({fetching: true})
        fetch(serverAddress + '/api/v1/users/orders', {
            mathod: 'GET',
            headers: {
                'Povysh-Token': localStorage.getItem('token')
            }
        }).then((data) => {
            return data.json()
        }).then((data) => {
            this.setState({data: data, fetching: false})
        })
    }


    componentDidMount() {
        this.tarcking()
        fetch(serverAddress + '/api/v1/users/orders', {
            mathod: 'GET',
            headers: {
                'Povysh-Token': localStorage.getItem('token')
            }
        }).then((data) => {
            return data.json()
        }).then((data) => {
            this.setState({data: data})
            console.log(data)
        })
    }

    render() {
        console.log('order')
        if(this.state.activePanel === 'detailorder') {
            return (
                <DetailOrder id='detailorder' orderID={this.state.orderID} back={() => {console.log('lox'); this.setState({activePanel: 'mainorder'})}} />
            )
        }
        return (
            <View id={this.props.id} activePanel={this.state.activePanel}>
                <Panel id='mainorder'>
                    <PullToRefresh onRefresh={this.onRefresh} isFetching={this.state.fetching}>
                        <PanelHeader>
                            Мои заказы
                        </PanelHeader>
                        <List>
                            {this.state.data && this.state.data.length > 0 && this.state.data.map((value, index) => {
                                return (
                                    <Cell 
                                        key={index}
                                        description={'дата ' + value.created_at}
                                        onClick={() => this.setState({orderID: value.id, activePanel: 'detailorder'})}
                                    >{value.tracking}</Cell>
                                )
                            })}
                        </List>
                    </PullToRefresh>
                </Panel>
            </View>
        )
    }
}

export default Order