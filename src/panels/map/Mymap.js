import React from 'react'
import {PanelHeader, View, Panel, Search,  ModalCard, ModalRoot, ModalPage, ModalPageHeader, platform, IOS, HeaderButton } from '@vkontakte/vkui';
import {List, Cell, Switch} from '@vkontakte/vkui';
import {YMaps, Map, GeolocationControl, Clusterer, Placemark} from 'react-yandex-maps'

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
            foodCourts: this.foodCourts,
            go: this.props.go,
            modals: {
                activeModal: null,
                modalHistory: [],
                data: {
                    type: null,
                    id: null,
                    title: null
                }
            },
            search: '',
            displayMap: 'block',
            displayList: 'none',
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
        var coords = [0, 0]
        navigator.geolocation.getCurrentPosition((position) => {
            coords = [position.coords.latitude, position.coords.longitude]
        })
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
            var JSONmyState = {
                map: {
                    center: coords,
                    zoom: 14
                }
            }
            this.setState(JSONmyState)
        }
    }

    componentDidUpdate() {
        var JSONmyState= {map: this.state.map, switchRest: this.state.switchRest}
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

    render() {
        console.log(this.state)
        var modal = (
            <ModalRoot activeModal={this.state.modals.activeModal}>
                <ModalCard 
                    id='restModalCard'
                    onClose={() => this.setActiveModal(null)}
                    title={this.state.modals.data.title}
                    caption={String(this.state.modals.data.id)}
                    actions={[{
                        title: 'Меню',
                        type: 'primary',
                        action: () => {this.setActiveModal(null); this.setState({activePanel: 'testmap'})}
                    }]}
                ></ModalCard>
                <ModalPage 
                    id='foodcourtModalPage'
                    onClose={() => this.setActiveModal(null)}
                    header={
                        <ModalPageHeader right={<HeaderButton onClick={() => this.setActiveModal(null)}>{platform() === IOS ? 'Готово' : <Icon24Done />}</HeaderButton>}>
                            {this.state.modals.data.title}
                        </ModalPageHeader>
                    }
                >
                    <List>
                        <Cell key='1' onClick={() => console.log('click foodcourt')}>Food Court</Cell>
                    </List>
                </ModalPage>
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
                    <List>
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
                    </List>
                </ModalPage>
            </ModalRoot>
        )
        return (
            <View header={false} activePanel={this.state.activePanel} modal={modal}>
                <View id='testmap' activePanel='testmap'>
                    <Panel id='testmap'>
                        <PanelHeader
                            left={<HeaderButton onClick={() => this.setState({activePanel: 'map'})}>
                                {platform() === IOS ? <Icon28ChevronBack/> : <Icon24Back/>}
                            </HeaderButton>}
                        >
                            Test
                        </PanelHeader>
                    </Panel>
                </View>
                
                <Panel id='map' style={{overflow: 'hidden'}}>
                    <Search 
                        id='search'
                        value={this.state.search} 
                        onChange={(value) => this.setState({search: value})} 
                        onFocus={() => this.setState({displayMap: 'none', displayList: 'block'})}
                        onBlur={() => this.setState({displayMap: 'block', displayList: 'none'})}
                        onKeyDown={this.onKeyPressed}
                        tabIndex='0'
                    />
                    <div style={{display: this.state.displayList}}>
                        <List>
                            {this.state.restaurants.map((value, index) => {
                                var str1 = this.state.rest[value.code].name.toLowerCase()
                                var str2 = this.state.search.toLowerCase()
                                if(str1.indexOf(str2) === -1 ) {
                                    return null
                                }
                                return <Cell key={index}>{this.state.rest[value.code].name}</Cell>
                            })}
                        </List>
                    </div>
                    <div style={{width: "100%", height: "calc(100vh - 92px)", display: this.state.displayMap, overflow: 'hidden'}}>
                        <YMaps>
                            <Map width="100%" height="100%" state={{center: this.state.map.center, zoom: this.state.map.zoom }} 
                                instanceRef={map => this.map=map}
                                onBoundsChange={this.onBoundsChange}
                                options={{
                                    restrictMapArea: [
                                        [60.056,29.511],
                                        [50.056,37.829]
                                    ]
                                }}
                                //controls={['smallZoom']}
                            >
                                <GeolocationControl />
                                <Clusterer 
                                    options={{
                                        preset: 'islands#invertedVioletClusterIcons',
                                        //groupByCoordinates: false,
                                    }}>
                                    {this.state.restaurants.map((value, index) => {
                                        var str1 = this.state.rest[value.code].name.toLowerCase()
                                        var str2 = this.state.search.toLowerCase()
                                        if((this.state.switchRest[value.code] && str1.indexOf(str2) !== -1) || (str1.indexOf(str2) !== -1 && str2 !== '')) {
                                            return (
                                                <Placemark 
                                                    key={index}
                                                    onClick={() => {this.openModal({
                                                        type: 'restModalCard',
                                                        title: this.state.rest[value.code].name,
                                                        id: value.id
                                                    })}}
                                                    geometry={value.coord}
                                                    properties={{
                                                        iconContent: this.state.rest[value.code].name[0],
                                                    }}
                                                    options={{
                                                        preset: 'islands#orangeIcon'
                                                    }}
                                                />
                                            )
                                        }
                                        return null
                                    })}
                                    {this.state.foodCourts.map((value, index) => {
                                        var count = 0
                                        value.restaurants.forEach(element => {
                                            var str1 = this.state.rest[element].name.toLowerCase()
                                            var str2 = this.state.search.toLowerCase()
                                            if((this.state.switchRest[element] && str1.indexOf(str2) !== -1) || (str1.indexOf(str2) !== -1 && str2 !== '')) {
                                                count += 1
                                            } 
                                        })

                                        var count1 = this.state.restaurants.length

                                        if(count === 0) {
                                            return (null)
                                        }
                                    
                                        return (
                                            <Placemark 
                                                key = {count1 + index}
                                                geometry={value.coord}
                                                properties={{
                                                    iconContent: count,
                                                }}
                                                options={{
                                                    preset: 'islands#orangeIcon'
                                                }}
                                                onClick={() => {this.openModal({
                                                    type: 'foodcourtModalPage',
                                                    id: value.id,
                                                    title: 'foodcourt'
                                                })}}
                                            />
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
                </Panel>
            </View>
        )
    }
}

export default Mymap