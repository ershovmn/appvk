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
import Bag from './Bag/Bag'

class Start extends React.Component {
    flag_name = true

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
                        key='bag'
                        onClick={this.onStoryChange}
                        selected={this.state.activeStory === 'bag'}
                        data-story='bag'
                        text={this.flag_name && 'Bag'}
                    >
                        <Icon24Market/>
                    </TabbarItem>
                    <TabbarItem
                        key='settings'
                        onClick={this.onStoryChange}
                        selected={this.state.activeStory === 'settings'}
                        data-story='settings'
                        text={this.flag_name ? 'Settings' : null }
                    ><Icon24Settings/> </TabbarItem>
                </Tabbar>
                }>
                <Mymap id='map' viewChange={this.viewChange}/>
                
                <View id='quick' activePanel='quick'>
                    <Panel id='quick'>
                        <PanelHeader>Quick</PanelHeader>
                        Quick
                    </Panel>
                </View>
                <Tinder id='tinder' />
                <View id='settings' activePanel='settings'>
                    <Panel id='settings'>
                        <Settings />
                    </Panel>
                </View>
                <Bag id='bag' />
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