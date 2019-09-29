import React from 'react'
import {PanelHeader, View, Panel, ModalCard, ModalRoot, FixedLayout, Avatar, Cell, Select, Tabs, TabsItem, TabbarItem } from '@vkontakte/vkui';

import Icon16Cancel from '@vkontakte/icons/dist/16/cancel';
import Icon24Like from '@vkontakte/icons/dist/24/like';

import serverAddress from '../../ServerAddress'
import { formatWithOptions } from 'util';

class Tinder extends React.Component {
    constructor() {
        super()
        this.state = {
            activeModal: 'modalRoot',
            first: true,
            sex: '0',
            people: [],
            currentIndex: 0,
            activePanel: 'tinderroot'
        }

        this.getPeople = this.getPeople.bind(this)
    }

    testArray = [
        {user: {name: 'persik1', id: 1, src: 'https://vk.com/images/stickers/94/512.png'}},
        {user: {name: 'persik2', id: 2, src: 'https://vk.com/images/stickers/49/512.png'}},
        {user: {name: 'persik3', id: 3, src: 'http://vkclub.su/_data/stickers/persik/sticker_vk_persik_002.png'}},
        {user: {name: 'persik4', id: 4, src: 'https://vk.com/images/stickers/73/512.png'}},
        {user: {name: 'persik5', id: 5, src: 'https://vk.com/images/stickers/75/512.png'}},
        {user: {name: 'persik6', id: 6, src: 'https://s.tcdn.co/fdb/2c3/fdb2c3d5-ae19-3b60-8ffc-7b3b8099cfe5/6.png'}},
        {user: {name: 'persik7', id: 7, src: 'http://vkclub.su/_data/stickers/persik/sticker_vk_persik_006.png'}},
        {user: {name: 'persik8', id: 8, src: 'http://vkclub.su/_data/stickers/persik/sticker_vk_persik_006.png'}}
    ]

    getPeople = () => {
        fetch(serverAddress + '/api/v1/matcher/queue', {
            method: 'GET',
            headers: {
                'Povysh-Token': localStorage.getItem('token')
            }
        }).then((data) => {
            return data.json()
        }).then((data) => {
            console.log(data)
            this.setState({people: data, first: false, activePanel: 'tinderroot'})
        })
    }

    componentDidMount() {
        fetch(serverAddress + '/api/v1/matcher/profile', {
            method: 'GET',
            headers: {
                'Povysh-Token': localStorage.getItem('token')
            }
        }).then((data) => {
            return data.json()
        }).then((data) => {
            if(data === null) {
                this.setState({first: true, activePanel: 'mainfirst'})
            }
            else {
                this.getPeople()
            }
        })
    }

    sendNewProfile = (id) => {
        fetch(serverAddress + '/api/v1/matcher/set_preference?looking_for=' + id, {
            method: 'GET',
            headers: {
                'Povysh-Token': localStorage.getItem('token')
            }
        }).then((data) => {
            return data.json()
        }).then((data) => {
            console.log(data)
            this.setState({first: false})
            this.getPeople()
        })
    }

    onClickLike = () => {
        var array = this.state.people
        if(array.length === 0) return
        fetch(serverAddress + '/api/v1/matcher/commit?action=like&matchee_id=' + String(array[0].id), {
            method: 'GET',
            headers: {
                'Povysh-Token': localStorage.getItem('token')
            }
        })
        array.splice(0, 1)
        this.setState({people: array})
    }

    onClickNoLike = () => {
        var array = this.state.people
        if(array.length === 0) return
        fetch(serverAddress + '/api/v1/matcher/commit?action=dislike&matchee_id=' + String(array[0].id), {
            method: 'GET',
            headers: {
                'Povysh-Token': localStorage.getItem('token')
            }
        })
        array.splice(0, 1)
        this.setState({people: array})
        //запрос
    }

    render() {
        console.log(this.state)
        // if(this.state.first) {
        //     return (
        //         <View activePanel='mainfirst'>
                    
        //         </View>
                    
        //     )
        // }
        console.log(this.state)
        return (
            <View id='root' activePanel={this.state.activePanel}>
                <Panel id='mainfirst'>
                        <PanelHeader>
                            Фуд-дейтинг
                        </PanelHeader>
                        <p>Найдите себе человека, который разделяет ваши предпочтения в еде.</p>
                        <p>Проводите вместе время за любимыми блюдами.</p>
                        <p>Я хочу найти себе</p>
                        <Select onChange={(e) => this.setState({sex: e.target.value})}>
                            <option value="0">Парня</option>
                            <option value='1'>Девушку</option>
                        </Select>
                        <FixedLayout vertical='bottom'>
                            <Tabs>
                                <TabsItem onClick={() => {
                                    this.sendNewProfile(this.state.sex)
                            }}>Начать</TabsItem>
                            </Tabs>
                        </FixedLayout>
                    </Panel>
                <Panel id='tinderroot'>
                    <PanelHeader>
                        Tinder
                    </PanelHeader>
                        <div style={{
                            display: 'flex', 
                            flexDirection: 'column',
                            height: '100vh',
                            alignItems: 'center', 
                        }}>
                            {this.state.people && this.state.people.length > 0 && <img style={{height: '50%'}} src={this.state.people[0].user.photo_url}/>}
                        </div>
                    {console.log(this.state)}
                    <FixedLayout vertical='bottom'>
                        <Tabs>
                            <TabsItem onClick={this.onClickNoLike}><Icon16Cancel width={28} height={28} /></TabsItem>
                            <TabsItem>{this.state.people && this.state.people.length > 0 && <h1>{this.state.people[0].user.name}</h1>}</TabsItem>
                            <TabsItem onClick={this.onClickLike}><Icon24Like width={28} height={28} /></TabsItem>
                        </Tabs>
                        {/* <Cell 
                            before={<Avatar size={60} onClick={() => console.log('clickkkkkk')}><Icon16Cancel fill="#fff" width={28} height={28} /></Avatar>}
                            asideContent={<Avatar size={60} ><Icon24Like fill="#fff" width={28} height={28} /></Avatar>}
                    >{this.state.people && this.state.people.length > 0 && <h1 style={{marginLeft: 'auto', marginRight: 'auto'}}>{this.state.people[this.state.currentIndex].user.name}</h1>}</Cell> */}
                    </FixedLayout>
                </Panel>
            </View>
        )
    }
}

export default Tinder