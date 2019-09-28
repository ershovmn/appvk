import React from 'react'
import {View, Panel, HeaderButton, PanelHeader} from '@vkontakte/vkui'
import connect from '@vkontakte/vk-connect'

class Order extends React.Component {
    constructor() {
        super()
        this.state = {
            activePanel: 'mainorder',
            count: 0,
            coord: ''
        }

        this.tarcking = this.tarcking.bind(this)
    }

    async tarcking() {
        
    }

    componentDidMount() {
        this.tarcking()
    }

    render() {
        console.log('order')
        return (
            <View id={this.props.id} activePanel='mainorder'>
                <Panel id='mainorder'>
                    <PanelHeader>
                        Test
                    </PanelHeader>

                    {this.state.count}
                    {this.state.coord}
                </Panel>
            </View>
        )
    }
}

export default Order