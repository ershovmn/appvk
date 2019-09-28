import React from 'react'

import {View, Panel, PanelHeader} from '@vkontakte/vkui'

class SelectRest extends React.Component {
    constructor() {
        super()
        this.state = {

        }
    }

    render() {
        return (
            <View id={this.props.id} activePanel='mainSelectRest'>
                <Panel id='mainSelectRest'>
                    Заебало
                </Panel>
            </View>
        )
    }
}

export default SelectRest