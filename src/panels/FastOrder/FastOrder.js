import React from 'react'
import connect from '@vkontakte/vk-connect'

import {View, Panel} from '@vkontakte/vkui'

class FastOrder extends React.Component {
    constructor() {
        super()
        this.state = {

        }
    }

    componentDidMount() {
        var coords = [0, 0]
        connect.sendPromise('VKWebAppGetGeodata')
            .then((data) => {
                coords = [data.lan, data.long]
            })
            .catch((error) => {
                console.log(error)
            })
    }

    render() {
        return (
            <View id={this.props.id} activePanel='mainFastOrder'>
                <Panel id='mainFastOrder'>

                </Panel>
            </View>
        )
    }
}

export default FastOrder