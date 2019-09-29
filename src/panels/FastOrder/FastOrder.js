import React from 'react'
import connect from '@vkontakte/vk-connect'

import {View, Panel, Group, Cell, List, PanelHeader} from '@vkontakte/vkui'

import serverAddress from '../../ServerAddress'
import Menu from '../map/Menu'
import SelectRest from '../map/SelectRest'

class FastOrder extends React.Component {
    constructor() {
        super()
        this.state = {
            rests: [],
            foodCourts: [],
            activePanel: 'fastroot',
            restsID: [],
            myrests: []
        }
    }

    myrests = []

    componentDidMount() {
        var coords = [0, 0]
        connect.sendPromise('VKWebAppGetGeodata')
            .then((data) => {
                coords = [data.lat, data.long]
                fetch(serverAddress + '/api/v1/places/raw_around?lat=' + String(coords[0]) + '&lon=' + String(coords[1])  + '&radius=10', {
                    method: 'GET',
                    headers: {
                        'Povysh-Token': localStorage.getItem('token')
                    }
                }).then((data) => {
                    return data.json()
                }).then((data) => {
                    this.setState({rests: data.kek})
                })
        
                fetch(serverAddress + '/api/v1/places/footcourts_around?lat=' + String(coords[0]) + '&lon=' + String(coords[1])  + '&radius=1000', {
                    method: 'GET',
                    headers: {
                        'Povysh-Token': localStorage.getItem('token')
                    }
                }).then((data) => {
                    return data.json()
                }).then((data) => {
                    this.setState({foodCourts: data})
                    console.log(data)
                })
            })
            .catch((error) => {
                console.log(error)
            })
        
    }

    getRestaraunts(id) {
        var res = []
        fetch(serverAddress + '/api/v1/places/foodcourt_rests?foodcourt_id=' + String(id), {
            method: 'GET',
            headers: {
                'Povysh-Token': localStorage.getItem('token')
            }
        }).then((data) => {
            return data.json()
        }).then((data) => {
            console.log(data)
            this.myrests = data
        })
        return res
    }

    render() {
        console.log(this.state)
        if(this.state.activePanel === 'menu') {
            return (
                <Menu 
                    trackingOrder={this.props.trackingOrder} 
                    id='menu' 
                    restsID={[this.state.id]} 
                    back={() => this.setState({activePanel: 'fastroot'})} />
            )
        }
        if(this.state.activePanel === 'selectRests') {
            console.log(this.state)
            var res = this.getRestaraunts(this.state.id)
            console.log(this.myrests)
            return (
                <SelectRest 
                    id='selectRest' 
                    trackingOrder={this.props.trackingOrder}
                    foodCourtID={this.state.id}
                    rests={this.state.myrests}
                    back={() => this.setState({activePanel: 'fastroot'})}
                />
            )
        }
        return (
            <View id={this.props.id} activePanel='mainFastOrder'>
                <Panel id='mainFastOrder'>
                    <PanelHeader>
                        Быстрый заказ
                    </PanelHeader>
                    <Group title='Ближайшие рестораны'>
                        <List>
                            {this.state.rests && this.state.rests.length > 0 && this.state.rests.map((value, index) => {
                                return(<Cell onClick={() => {
                                    this.setState({activePanel: 'menu', id: value.id})
                                }}>{value.name}</Cell>)
                            })}
                        </List>
                    </Group>
                    <Group title='Ближайшие фудкорты'>
                        <List>
                            {this.state.foodCourts && this.state.foodCourts.length > 0 && this.state.foodCourts.map((value, index) => {
                                console.log(value)
                                return(<Cell onClick={() =>{
                                    this.setState({activePanel: 'selectRests', id: value.id, myrests: value.restaraunts })
                                }}>{value.name}</Cell>)
                            })}
                        </List>
                    </Group>
                </Panel>
            </View>
        )
    }
}

export default FastOrder