import React from 'react'
import { View, PanelHeader, Panel } from '@vkontakte/vkui'

class Bag extends React.Component {
    constructor() {
        super()

        this.state = {

        }
    }

    render() {
        return (
            <View id={this.props.id} activePanel='mainBag'>
                <Panel id='mainBag'>
                    <PanelHeader>
                        Bag
                    </PanelHeader>
                    Туть ничего неть
                </Panel>
            </View>
        )
    }
}

export default Bag