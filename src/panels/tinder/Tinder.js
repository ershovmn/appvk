import React from 'react'
import {PanelHeader, View, Panel, ModalCard, ModalRoot } from '@vkontakte/vkui';

class Tinder extends React.Component {
    constructor() {
        super()
        this.state = {
            activeModal: 'modalRoot'
        }
    }

    render() {
        return (
            <View id={this.props.id} activePanel="tinderRoot" modal={
                <ModalRoot activeModal={this.state.activeModal}>
                    <ModalCard 
                        id='modalRoot'
                        onClose = {() => this.setState({activeModal: null})}
                        title='test'
                        actions={[{
                            title: 'push',
                            type: 'primary',
                            action: () => console.log('test')
                        }]}
                    ></ModalCard>
                </ModalRoot>
            }>
                <Panel id='tinderRotot'>
                    <PanelHeader>
                        Tinder
                    </PanelHeader>
                </Panel>
            </View>
        )
    }
}

export default Tinder