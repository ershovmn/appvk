import React from 'react'
import {PanelHeader, View, Panel, ModalCard, ModalRoot, FixedLayout, Avatar, Cell, Select } from '@vkontakte/vkui';

import Icon16Done from '@vkontakte/icons/dist/16/done';
import Icon24Like from '@vkontakte/icons/dist/24/like';

class Tinder extends React.Component {
    constructor() {
        super()
        this.state = {
            activeModal: 'modalRoot',
            fisrt: true,
            sex: 'm'
        }
    }

    render() {
        if(this.state.fisrt) {
            return (
                <View id={this.props.id} activePanel='mainFirst'>
                    <Panel id='mainFirst'>
                        <PanelHeader>
                            Фуд-дейтинг
                        </PanelHeader>
                        <p>Найдите себе человека, который разделяет ваши предпочтения в еде.</p>
                        <p>Проводите вместе время за любимыми блюдами.</p>
                        <p>Я хочу найти себе</p>
                        <Select top='Я хочу найти себе' placeholder="">
                            <option value="m" onClick={() => this.setState({sex: 'm'})}>Парня</option>
                            <option value='f' onClick={() => this.setState({sex: 'f'})}>Девушку</option>
                        </Select>
                        {this.state.sex}
                    </Panel>
                </View>
            )
        }
        return (
            <View id={this.props.id} activePanel="tinderRoot">
                <Panel id='tinderRoot'>
                    <PanelHeader>
                        Tinder
                    </PanelHeader>
                    <div style={{height: 'calc(100vh - 100x)', width: '100%'}}>
                        <img style={{height: '100%', marginLeft: 'auto', marginRight: 'auto'}} src='https://ditp.ifmo.ru/images/a50b8bf8381b19bc7977ce6cc853fa00.jpg' />
                    </div>
                    <FixedLayout vertical='bottom'>
                        <Cell 
                            before={<Avatar size={60}><Icon16Done fill="#fff" width={28} height={28} /></Avatar>}
                            asideContent={<Avatar size={60}><Icon24Like fill="#fff" width={28} height={28} /></Avatar>}
                        ></Cell>
                    </FixedLayout>
                </Panel>
            </View>
        )
    }
}

export default Tinder