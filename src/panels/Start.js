import React from 'react'
import {Panel, Epic, Tabbar, TabbarItem, View, PanelHeader} from '@vkontakte/vkui';

import Icon24Place from '@vkontakte/icons/dist/24/place';
import Icon24Recent from '@vkontakte/icons/dist/24/recent';
import Icon24Settings from '@vkontakte/icons/dist/24/settings';
import Icon24Like from '@vkontakte/icons/dist/24/like';
import Icon24Market from '@vkontakte/icons/dist/24/market';

import Settings from './settings/Settings'
import Mymap from './map/Mymap'
import Tinder from './tinder/Tinder'
import Order from './Order/Order'
import FastOrder from './FastOrder/FastOrder'

import serverAddress from '../ServerAddress'

class Start extends React.Component {
    flag_name = false

    constructor(props) {
        super(props)
        this.state = {
            id: props.id,
            activeStory: 'map',
            activePanel: 'epic',
            idRest: null
        }
        this.onStoryChange = this.onStoryChange.bind(this);
    }

    onStoryChange(e) {
        this.setState({ activeStory: e.currentTarget.dataset.story })
    }

    viewChange = (viewID) => {
        this.setState({activeStory: viewID})
    }

    trackingOrder = (orderID) => {
        console.log(orderID)
        this.setState({orderID: orderID, activeStory: 'myorder'})
    }

    render() {
        return (
            <Epic id='epic' activeStory={this.state.activeStory} tabbar={
                <Tabbar>
                    <TabbarItem
                        key='map'
                        onClick={this.onStoryChange}
                        selected={this.state.activeStory === 'map'}
                        data-story='map'
                        text={this.flag_name ? 'Map' : null }
                    ><Icon24Place/></TabbarItem>
                    <TabbarItem
                        key='quick'
                        onClick={this.onStoryChange}
                        selected={this.state.activeStory === 'quick'}
                        data-story='quick'
                        text={this.flag_name ? 'Quick' : null}
                    ><Icon24Recent/> </TabbarItem>
                    <TabbarItem
                        key='tinder'
                        onClick={this.onStoryChange}
                        selected={this.state.activeStory === 'tinder'}
                        data-story='tinder'
                        text={this.flag_name ? 'Tinder' : null }
                    ><Icon24Like/> </TabbarItem>
                    <TabbarItem 
                        key='myorder'
                        onClick={this.onStoryChange}
                        selected={this.state.activeStory === 'myorder'}
                        data-story='myorder'
                        text={this.flag_name ? 'Orders' : null}
                    >
                        <Icon24Market/>
                    </TabbarItem>
                    {/* <TabbarItem
                        key='settings'
                        onClick={this.onStoryChange}
                        selected={this.state.activeStory === 'settings'}
                        data-story='settings'
                        text={this.flag_name ? 'Settings' : null }
                    ><Icon24Settings/> </TabbarItem> */}
                </Tabbar>
                }>
                <Mymap id='map' viewChange={this.viewChange} trackingOrder={this.trackingOrder}/>
                
                <FastOrder trackingOrder={this.trackingOrder} id='quick' />
                <Tinder id='tinder' />
                <Order id='myorder' orderID={this.state.orderID}/>
                <View id='settings' activePanel='settings'>
                    <Panel id='settings'>
                        <Settings />
                    </Panel>
                </View>
                
                {/* <View id='basket' activePanel='basket'>
                    <Panel id='basket'>
                        Basket
                    </Panel>
                </View> */}
            </Epic>
        )
    }
}

export default Start