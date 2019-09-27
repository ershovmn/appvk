import React from 'react'
import {View, Panel, Button, Gallery, FixedLayout, Tabs, TabsItem} from '@vkontakte/vkui'


class FirstLogin extends React.Component {
    constructor() {
        super()
        this.state = {
        }
    }

    render() {
        return (
            <View header={false} activePanel='main'>
                <Panel id='main'>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <div style={{height: '200px', width: '100%', display: 'block'}}>
                            <Gallery
                                slideWidth='100%'
                                style={{height: '100%', width: '100%'}}
                                bullets="dark"
                            >
                                <div>Hello</div>
                                <div>Hi</div>
                                <div>H</div>
                            </Gallery>
                        </div>
                    </div>
                    
                    <FixedLayout vertical='bottom'>
                        <Tabs>
                            <TabsItem onClick={this.props.closeThis}>Начать использовать</TabsItem>
                        </Tabs>
                    </FixedLayout>
                </Panel>
            </View>
        )
    }
}

export default FirstLogin