import React from 'react'
import {View, Panel} from '@vkontakte/vkui'

class Order extends React.Component {
    constructor() {
        super()
        this.state = {
            activePanel: 'main'
        }
    }

    render() {
        return (
            <View id={this.props.id} activaPanel={this.state.activePanel}>
                <Panel id='main'>
                    Main order
                </Panel>
            </View>
        )
    }
}

export default Order