import React from 'react';
import connect from '@vkontakte/vkui-connect';
import {Panel, Alert, ScreenSpinner, View } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import Start from './panels/Start'
import Requests from './Requests/Requests'


import FirstLogin from './FirstLogin'

class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			activePanel: 'black',
			fetchedUser: null,
			token: null,
			mytoken: null,
			popout: <ScreenSpinner />,
			test: 'fail',
			firstLogin: false,
			errorAuth: false
		};
	}

	async tryGet(token) {
		//var data={toke: token + '123456789'}
		//localStorage.setItem('token', data.token)
		//this.setState({token: token, mytoken: data.token, activePanel: 'start', popout: null})
		//return
		fetch('https://31dd3131.ngrok.io/api/v1/users/from_vk_token?token=' + token, {
				method: "GET"
			}).then((data) => {
				return data.json()
			}).then((data) => {
				localStorage.setItem('token', data.token)
				this.setState({token: token, mytoken: data.token, activePanel: 'start', popout: null, errorAuth: false})
			})

		// console.log('test1')
		// var mytoken = Requests.getToken(token)
		// console.log('test')
		// localStorage.setItem('token', mytoken)
		// this.setState({token: token, mytoken: mytoken, activePanel: 'start', popout: null})
	}

	componentDidMount() {
		//this.setState({token: '12345', mytoken: '12345', activePanel: 'start', popout: null})
		//setTimeout(() => this.setState({activePanel: 'errorauth'}), 10000)
		var myState = localStorage.getItem('mapState')
		if(myState !== null) {
			myState = JSON.parse(myState)
			myState = {switchRest: myState.switchRest, map: null}
			localStorage.setItem('mapState', JSON.stringify(myState))
		}
		
		connect.send('VKWebAppGetAuthToken', {"app_id": 7150406, "scope": ""})
        var token = null
        connect.subscribe((e) => {
            switch (e.detail.type) {
				case 'VKWebAppAccessTokenReceived':
                    token = e.detail.data.access_token
					this.tryGet(token)
					setTimeout(this.setState({errorAuth: true}), 50000)
					break;
				case 'VKWebAppAccessTokenFailed':
					console.log('error connect Vk')
					this.setState({errorAuth: true})
					break;
				default:
					
			}
        })
	}

	allertPopout = () => {
		this.setState({errorAuth: true})
		return (
			<Alert
				actions={[{
					title: 'Ok',
					autoclose: true,
					style: 'default'
				}]}
				onClose={this.closePopout}
			>
				<h2>Произошла ошибка при авторизации</h2>
				<h2>Повторите попытку позже</h2>
			</Alert>
		)
	}

	closePopout = () => {
		console.log('test')
		this.setState({popout: <ScreenSpinner />})
	}


	render() {
		console.log(this.state)
		try {
			if (this.state.errorAuth) {
				console.log('errorAuth')
				return (
					<View header={false} activePanel='error'>
						<Panel id='error'>
							Произошла ошибка при авторизации
						</Panel>
					</View>
				)
			}
			else if (this.state.firstLogin) {
				console.log('firstLogin')
				return (
					<FirstLogin closeThis={() => this.setState({firstLogin: false})} />
				)
			}
			// else if (this.state.activePanel === 'black') {
			// 	console.log('black')
			// 	return (
			// 		<View header={false} activePanel='error'>
			// 			<Panel id='error'>
			// 				Произошла ошибка при авторизации
			// 			</Panel>
			// 		</View>
			// 	)
			// }
			else {
				return (
					<Start id='start'/>
				);
			}
		}
		catch {
			return (
				<View activePanel='bug'>
					<Panel id='bug'>
						Это не баг, это фича
					</Panel>
				</View>
			)
		}
		
	}
}

export default App;
