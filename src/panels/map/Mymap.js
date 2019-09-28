import React from 'react'
import {PanelHeader, View, Panel, Search,  ModalCard, ModalRoot, ModalPage, ModalPageHeader, platform, IOS, HeaderButton, Group, Select } from '@vkontakte/vkui';
import {List, Cell, Switch} from '@vkontakte/vkui';
import {YMaps, Map, GeolocationControl, Clusterer, Placemark} from 'react-yandex-maps'
import connect from '@vkontakte/vk-connect';

import Menu from './Menu'
import SelectRest from './SelectRest'

import Icon24Done from '@vkontakte/icons/dist/24/done'
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';


class Mymap extends React.Component {
    restaurants = [
        {coord: [55.70, 37.60], code: 0, id: 12345},
        {coord: [55.70, 37.61], code: 1, id: 82936},
        {coord: [55.70, 37.62], code: 2, id: 12761},
        {coord: [55.50, 37.60], code: 0, id: 18235},
        {coord: [55.80, 37.31], code: 1, id: 11813},
        {coord: [55.50, 36.92], code: 2, id: 16381},
        {coord: [55.90, 35.60], code: 0, id: 12936},
    ]

    map = null

    rest = [
        {name: 'Macdonalds', id: 0, url: 'https://www.pinclipart.com/picdir/middle/113-1137531_mcdonalds-logo-transparent-png-mcdonalds-logo-png-clipart.png'},
        {name: 'KFC', id: 1, url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjI-yxfVTMbNT6ogrdOVoKeaL3UG5zbtgWLWPZqtBs8yGJbWx9'},
        {name: 'BurgerKing', id: 2, url: 'https://cdn.imgbin.com/12/7/6/imgbin-hamburger-whopper-french-fries-burger-king-chicken-sandwich-burger-king-kGm4a8Unj0yht3gTpGYpkHedg.jpg'}
    ]

    foodCourts = [
        {coord: [56.00, 37.60], restaurants: [0, 1, 2], id: 1243},
        {coord: [56.20, 37.60], restaurants: [0, 1, 2], id: 4357},
    ]

    constructor(props) {
        super(props)
        this.state = {
            activePanel: 'map',
            restaurants: this.restaurants,
            map: {center: [56.00, 37.60], zoom: 14},
            id: props.id,
            mode: 'all',
            contextOpened: false,
            switchRest:[true, true, true],
            rest: this.rest,
            foodCourts: [],
            go: this.props.go,
            modals: {
                activeModal: null,
                modalHistory: [],
                data: {
                    type: null,
                    id: null,
                    title: null,
                    rests: []
                }
            },
            search: '',
            displayMap: 'block',
            displayList: 'none',
            restrictMapArea: [[0, 0], [60, 60]],
            rests: [],
            filters: [],
            cuisine: [
                {id: 1, checked: true},
                {id: 2, checked: true},
                {id: 3, checked: true},
            ],
            price_tag: [
                true,
                true,
                true,
                true
            ]
        }

        //this.select = this.select.bind(this)
        this.switchClick = this.switchClick.bind(this)
        this.openModal = this.openModal.bind(this)

        this.modalBack = () => {
            this.setActiveModal(this.state.modals.modalHistory[this.state.modals.modalHistory.length - 2])
        }
    }

    onBoundsChange = () => {
        try {
            this.setState({
                map: {
                    center: this.map.getCenter(),
                    zoom: this.map.getZoom()
                }
            })
            //localStorage.setItem('mapState', JSON.stringify(this.state))
        }
        catch{

        }
    }

    componentDidMount() {
        var myState = localStorage.getItem('mapState')
        console.log(myState)
        var coords = [59.9339453, 30.302315699999994]

        connect.sendPromise("VKWebAppGetGeodata")
            .then((data) => {
                console.log(data)
                coords = [data.lat, data.long]
                this.setState({map: {center: coords, zoom: '13'}})
            })

        // navigator.geolocation.getCurrentPosition((position) => {
        //     console.log('geolocation')
        //     coords = [position.coords.latitude, position.coords.longitude]
        // })
        if(myState !== null) {
            var JSONmyState = JSON.parse(myState)
            var switchRest = JSONmyState.switchRest
            if(JSONmyState.map === null) {
                //JSONmyState.map = {center: [0, 0], zoom: 14}
                console.log(switchRest)
                JSONmyState = {
                    map: {center: coords, switchRest: switchRest}
                }
                this.setState(JSONmyState)
            }
            else{
                this.setState(JSONmyState)
            }
        }
        else {
            console.log('elese')
            var JSONmyState = {
                map: {
                    center: coords,
                    zoom: 14
                }
            }
            this.setState(JSONmyState)
        }
        // this.setState({map: {
        //     center: coords,
        //     zoom: this.state.zoom
        // }})
        console.log(localStorage.getItem('token'))
        fetch('/api/v1/utilities/bounds?lat=' + String(coords[0]) + '&lon=' + String(coords[1]), {
            method: 'GET',
            headers: {
                'Povysh-Token': localStorage.getItem('token')
            }
        }).then((data) => {
            return data.json()
        }).then((data) => {
            try {
                var bounds = data.bounds
                this.setState({restrictMapArea: [[bounds[0], bounds[1]], [bounds[2], bounds[3]]]})
            } catch { } 
        })
        fetch('/api/v1/places/around?lat=' + String(coords[0]) + '&lon=' + String(coords[1]) + '&radius=10', {
            method: 'GET',
            headers: {
                'Povysh-Token': localStorage.getItem('token')
            }
        }).then((data) => {
            return data.json()
        }).then((data) => {
            try {
                var rests = data
                this.setState({rests: rests})
            } catch { } 
        })
        fetch('/api/v1/utilities/filters', {
            method: 'GET',
            headers: {
                'Povysh-Token': localStorage.getItem('token')
            }
        }).then((data) => {
            return data.json()
        }).then((data) => {
            try {
                this.setState({filters: data})
            } catch {}
        })

        fetch('/api/v1/places/footcourts_around?lat=' + String(coords[0]) + '&lon=' + String(coords[1]) + '&radius=10', {
            method: 'GET',
            headers: {
                'Povysh-Token': localStorage.getItem('token')
            }
        }).then((data) => {
            return data.json()
        }).then((data) => {
            try {
                this.setState({foodCourts: data})
            }
            catch {}
        })
    }

    componentDidUpdate() {
        var JSONmyState= {map: this.state.map, switchRest: this.state.switchRest}
        //console.log(localStorage.getItem('token'))
        localStorage.setItem('mapState', JSON.stringify(JSONmyState))
    }
    
    switchClick(e) {
        var id = Number(e.currentTarget.dataset.mode)
        var array = this.state.switchRest
        array[id] = !array[id]
        this.setState({switchRest: array})
        console.log(this.state)
        //localStorage.setItem('mapState', JSON.stringify(this.state))
    }

    openModal(data) {
        console.log(data)
        this.setState({modals: {
            data: data,
            activeModal: data.type
        }})
        //localStorage.setItem('mapState', JSON.stringify(this.state))
    }

    setActiveModal(activeModal) {
        activeModal = activeModal || null 

        this.setState({modals:{
            activeModal: activeModal,
            data: this.state.modals.data
        }})
        //localStorage.setItem('mapState', JSON.stringify(this.state))
    }

    onKeyPressed = (e) => {
        console.log(e)
        if(e.key === 'Enter' && this.state.displayList === 'block') {
            console.log('hi')
            this.setState({displayMap: 'block', displayList: 'none'})
        }
    }

    getIdRestsOnFoodCourt = (id) => {
        var res = []
        this.state.foodCourts.map((value) => {
            if(value.id === id) {
                value.restaraunts.map((item) => {
                    res.push(item.id)
                })
            }
        })
        return res
    }

    render() {
        console.log(this.state)
        var modal = (
            <ModalRoot activeModal={this.state.modals.activeModal}>
                <ModalCard 
                    id='restModalCard'
                    onClose={() => this.setActiveModal(null)}
                    title={this.state.modals.data.title}
                    caption={String(this.state.modals.data.address)}
                    actions={[{
                        title: 'Меню',
                        type: 'primary',
                        action: () => {this.setActiveModal(null); this.setState({activePanel: 'menu'})}
                    }]}
                >
                    <p>
                        {this.state.modals.data.description}
                    </p>
                </ModalCard>
                <ModalCard
                    id='foodcourtModalCard'
                    onClose={() => this.setActiveModal(null)}
                    title={this.state.modals.data.title}
                    caption={String(this.state.modals.data.address)}
                    actions={[{
                        title: 'Меню',
                        type: 'primary',
                        action: () => {
                            this.setActiveModal(null)
                            this.setState({activePanel: 'selectRest'})
                        }
                    }]}
                >
                    <p>
                        {this.state.modals.data.description}
                    </p>
                </ModalCard>
                <ModalPage 
                    id='filter'
                    onClose={() => this.setActiveModal(null)}
                    header={
                        <ModalPageHeader
                            //left={platform() === ANDROID && <HeaderButton onClick={() => this.setActiveModal(null)}><Icon24Cancel /></HeaderButton>}
                            right={<HeaderButton onClick={() => this.setActiveModal(null)}>{platform() === IOS ? 'Готово' : <Icon24Done />}</HeaderButton>}
                        >
                            Фильтры
                        </ModalPageHeader>
                    }
                >
                    {this.state.filters && this.state.filters.cuisine && 
                        <Group title="Кухня">
                            <List>
                                {this.state.filters.cuisine.items && this.state.filters.cuisine.items.length > 0 && this.state.filters.cuisine.items.map((item, index) => {
                                    if(this.state.cuisine[item.id - 1].checked) {
                                        return (
                                            <Cell 
                                                key={index} 
                                                defaultChecked
                                                asideContent={<Switch defaultChecked onClick={() => {
                                                    var array = this.state.cuisine
                                                    array[item.id-1].checked = !array[item.id-1].checked
                                                    this.setState({cuisine: array})
                                                }}/>}
                                            >{item.name}</Cell>
                                        )
                                    }
                                    return (
                                        <Cell 
                                            key={index} 
                                            asideContent={<Switch onClick={() => {
                                                var array = this.state.cuisine
                                                array[item.id-1].checked = !array[item.id-1].checked
                                                this.setState({cuisine: array})
                                            }}/>}
                                        >{item.name}</Cell>
                                    )
                                })}
                            </List>
                        </Group>
                    }
                    {this.state.filters && this.state.filters.price_tag && 
                        <Group title='Ценовой диапазон'>
                            <List>
                                {this.state.filters.price_tag.items && this.state.filters.price_tag.items.length > 0 && this.state.filters.price_tag.items.map((value, index) => {
                                    if(this.state.price_tag[index]) {
                                        return (
                                            <Cell 
                                                key={index} 
                                                defaultChecked
                                                asideContent={<Switch defaultChecked onClick={() => {
                                                    var array = this.state.price_tag
                                                    array[index] = !array[index]
                                                    this.setState({price_tag: array})
                                                }}/>}
                                            >{String(value[0]) + '-' + String(value[1])}</Cell>
                                        )
                                    }
                                    return (
                                        <Cell 
                                            key={index} 
                                            asideContent={<Switch onClick={() => {
                                                var array = this.state.price_tag
                                                array[index] = !array[index]
                                                this.setState({price_tag: array})
                                            }}/>}
                                        >{String(value[0]) + '-' + String(value[1])}</Cell>
                                    )
                                })}
                            </List>
                        </Group>
                    }
                    {/* <List>
                        
                        {this.state.rest.map((value, index) => {
                            if(this.state.switchRest[index]) {
                                return (
                                    <Cell key={index} asideContent={<Switch defaultChecked onClick={this.switchClick} data-mode={value.id}/>}>{value.name}</Cell>
                                )
                            }
                            else {
                                return (
                                    <Cell key={index} asideContent={<Switch onClick={this.switchClick} data-mode={value.id}/>}>{value.name}</Cell>
                                )
                            }
                        })}
                    </List> */}
                </ModalPage>
            </ModalRoot>
        )
        if(this.state.activePanel === 'menu') {
            return (
                <Menu id='menu' trackingOrder={this.props.trackingOrder} restsID={[this.state.modals.data.id]} back={() => this.setState({activePanel: 'map'})}/>
            )
        }
        if(this.state.activePanel === 'selectRest') {
            return (
                <SelectRest
                    id='selectRest' 
                    trackingOrder={this.props.trackingOrder}
                    foodCourtID={this.state.modals.data.id}
                    rests={this.state.modals.data.rests}
                    back={() => this.setState({activePanel: 'map'})}
                    />
            )
        }
        return (
            <View header={platform() === IOS} activePanel={this.state.activePanel} modal={modal}>
                <Panel id='map' style={{overflow: 'hidden'}}>
                    {platform() === IOS && <PanelHeader>
                        <Search 
                            id='search'
                            theme='header'
                            value={this.state.search} 
                            onChange={(value) => this.setState({search: value})} 
                            onFocus={() => this.setState({displayMap: 'none', displayList: 'block'})}
                            onBlur={() => this.setState({displayMap: 'block', displayList: 'none'})}
                            onKeyDown={this.onKeyPressed}
                            tabIndex='0'
                        />
                    </PanelHeader>}
                    {platform() !== IOS && 
                        <Search 
                            id='search'
                            value={this.state.search} 
                            onChange={(value) => this.setState({search: value})} 
                            onFocus={() => this.setState({displayMap: 'none', displayList: 'block'})}
                            onBlur={() => this.setState({displayMap: 'block', displayList: 'none'})}
                            onKeyDown={this.onKeyPressed}
                            tabIndex='0'
                        />
                    }
                    
                    <div style={{display: this.state.displayList}}>
                        <List>
                            {this.state.rests && this.state.rests.length > 0 && this.state.rests.map((value, index) => {
                                var str1 = value.name.toLowerCase()
                                var str2 = this.state.search.toLowerCase()
                                if(str1.indexOf(str2) === -1 ) {
                                    return null
                                }
                                return <Cell key={index} expandable onClick={() => {
                                    console.log(value.latitude)
                                    console.log(value.longitude)
                                    this.setState({map: {
                                    center: [value.latitude, value.longitude],
                                    zoom: 14
                                }})}}
                                >{value.name}</Cell>
                            })}
                        </List>
                    </div>
                    <div>
                        <YMaps>
                            <Map height='100vh' width='100%' state={{center: this.state.map.center, zoom: this.state.map.zoom}}
                                options={{
                                    restrictMapArea: this.state.restrictMapArea
                                }}
                                instanceRef={map => this.map=map}
                                onBoundsChange={this.onBoundsChange}
                            >
                                <Clusterer 
                                    options={{preset: 'islands#invertedVioletClusterIcons'}}
                                >
                                    {this.state.rests && this.state.rests.length > 0 && this.state.rests.map((value, index) => {
                                        if(!this.state.cuisine[value.cuisine.id-1].checked || !this.state.price_tag[value.price_rating]) {
                                            return null
                                        }
                                        if(value.name.indexOf(this.state.search) === -1) {
                                            return null
                                        }
                                        return (
                                            <Placemark 
                                                key={index}
                                                onClick={() => {this.openModal({
                                                    type: 'restModalCard',
                                                    title: value.name,
                                                    id: value.id,
                                                    address: value.address,
                                                    description: value.description,
                                                    rests: []
                                                })}}
                                                geometry={[value.latitude, value.longitude]}
                                                properties={{
                                                    iconContent: value.name[0],
                                                }}
                                                options={{
                                                    preset: 'islands#orangeIcon'
                                                }}
                                            >

                                            </Placemark>
                                        )
                                    })}

                                    {this.state.foodCourts && this.state.foodCourts.length > 0 && this.state.foodCourts.map((value, index) => {
                                        
                                        return (
                                            <Placemark
                                                key={index}
                                                onClick={() => {this.openModal({
                                                    type: 'foodcourtModalCard',
                                                    title: value.name,
                                                    id: value.id,
                                                    address: value.address,
                                                    description: value.description,
                                                    rests: value.restaraunts
                                                })}}
                                                geometry={[value.latitude, value.longitude]}
                                                properties={{
                                                    iconContent: value.restaraunts.length,
                                                }}
                                                options={{
                                                    preset: 'islands#orangeIcon'
                                                }}
                                            ></Placemark>
                                        )
                                    })}
                                </Clusterer>
                            </Map>
                        </YMaps>
                        <div style={{position: 'fixed', bottom: '50px', right: '10px'}}>
                            {/* <img src='https://vk.com/images/stickers/94/512.png' style={{height: '75px'}} onClick={() => this.setActiveModal('filter')}/> */}
                            <img src='http://about-telegram.ru/wp-content/uploads/2018/03/kot-persik-stickers-telegram_21.png' style={{height: '75px'}} onClick={() => this.setActiveModal('filter')}/>
                        </div>
                    </div>
                    {/* <div style={{width: "100%", height: "calc(100vh - 92px)"}}>
                        
                        
                    </div> */}
                </Panel>
            </View>
        )
    }
}

export default Mymap