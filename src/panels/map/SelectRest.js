import React from 'react'

import {View, Panel, PanelHeader, HeaderButton, platform, IOS, List, Cell, FixedLayout, Button} from '@vkontakte/vkui'

import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';
import Icon16Done from '@vkontakte/icons/dist/16/done';
import { throws } from 'assert';

import Menu from './Menu'

class SelectRest extends React.Component {
    constructor() {
        super()
        this.state = {
            checked: [],
            activePanel: 'mainSelectRest',
            restsID: []
        }
    }

    componentDidMount() {
        var array = []
        this.props.rests.map(() => {
            array.push(false)
        })
        this.setState({checked: array})
    }

    render() {
        if(this.state.activePanel === 'menu') {
            return (
                <Menu id={this.props.id} restsID={this.state.restsID} back={() => this.setState({activePanel: 'mainSelectRest'})} />
            )
        }
        return (
            <View id={this.props.id} activePanel='mainSelectRest'>
                <Panel id='mainSelectRest'>
                    <PanelHeader
                        left={
                            <HeaderButton onClick={this.props.back}>
                              {platform() === IOS ? <Icon28ChevronBack /> : <Icon24Back />}
                              
                            </HeaderButton>
                          }
                    >
                        Select Rest
                    </PanelHeader>
                    <List>
                        {this.props.rests.map((value, index) => {
                            return (
                                <Cell 
                                    selectable
                                    onClick={() => {
                                        var array = this.state.checked
                                        array[index] = !array[index]
                                        this.setState({checked: array})
                                    }}
                                >{value.name}</Cell>
                            )
                        })}
                    </List>
                    <FixedLayout vertical='bottom'>
                        <Button size='xl' onClick={() => {
                            var array = []
                            this.state.checked.map((value, index) => {
                                if(value) {
                                    array.push(this.props.rests[index].id)
                                }
                            })
                            this.setState({restsID: array, activePanel: 'menu'})
                        }}>
                            Продолжить
                        </Button>
                    </FixedLayout>
                </Panel>
            </View>
        )
    }
}

export default SelectRest