import React from 'react';
import connect from '@vkontakte/vk-connect';
import {Panel, Alert, ScreenSpinner, View } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import Start from './panels/Start'
import Requests from './Requests/Requests'

import serverAddress from './ServerAddress'

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
			errorAuth: false,
			blackPanel: true,
			blackText: ''
		};
	}

	 tryGet(id) {
		fetch(serverAddress + '/api/v1/users/from_vk_id?id=' + id, {
				method: "GET"
			}).then((data) => {
				return data.json()
			}).then((data) => {
				localStorage.setItem('token', data.token)
				this.setState({id: id, mytoken: data.token, activePanel: 'start', popout: null, errorAuth: false, blackPanel: false, firstLogin: data.is_new})
			})
	}

	componentDidMount() {
		var myState = localStorage.getItem('mapState')
		if(myState !== null) {
			myState = JSON.parse(myState)
			myState = {switchRest: myState.switchRest, map: null}
			localStorage.setItem('mapState', JSON.stringify(myState))
		}

		connect.sendPromise('VKWebAppGetUserInfo')
			.then((data) => {
				this.tryGet(data.id)
			})
			.catch((error) => {
				console.log(error)
				this.setState({errorAuth: true})
			})
		
		// connect.subscribe((e) => {
		// 	switch (e.detail.type) {
		// 		case 'VKWebAppGetUserInfoResult':
		// 			this.setState({ fetchedUser: e.detail.data });
		// 			break;
		// 		default:
		// 			console.log(e.detail.type);
		// 	}
		// });
		// connect.send('VKWebAppGetUserInfo', {});

		// connect.send('VKWebAppGetAuthToken', {"app_id": 7150406, "scope": ""})
        // var token = null
        // connect.subscribe((e) => {
        //     switch (e.detail.type) {
		// 		case 'VKWebAppAccessTokenReceived':
		// 			token = e.detail.data.access_token
		// 			this.setState({blackText: token})
		// 			this.tryGet(token)
		// 			setTimeout(() => {
		// 				if(this.state.activePanel !== 'start') {
		// 					this.setState({errorAuth: true})}}
		// 					, 50000)
		// 			break;
		// 		case 'VKWebAppAccessTokenFailed':
		// 			console.log('error connect Vk')
		// 			this.setState({errorAuth: true})
		// 			break;
		// 		default:
					
		// 	}
		// })
		// var token = null
		// console.log('start')
		// connect.send('VKWebAppGetAuthToken', {"app_id": 7150406, "scope": ""})
		// connect.subscribe((e) => {

		// 	.then((data)=> {	
		// 		token = data.access_token
		// 		this.tryGet(token)
		// 		console.log(data)
		// 		setTimeout(() => {
		// 			if(this.state.activePanel !== 'start') {
		// 				this.setState({errorAuth: true})}}
		// 				, 50000)
		// 	})
		// 	.catch((error) => {
		// 		this.setState({errorAuth: true})
		// 	})
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
			if (this.state.firstLogin) {
				console.log('firstLogin')
				return (
					<FirstLogin closeThis={() => this.setState({firstLogin: false})} />
				)
			}
			else if (this.state.errorAuth) {
				console.log('errorAuth')
				return (
						<Panel id='error'>
							Произошла ошибка при авторизации
						</Panel>
				)
			}
			else if (this.state.blackPanel) {
				return (
					<View id='blackview' activePanel='panel' popout={<ScreenSpinner/>}>
						<Panel id='black'>
							
						</Panel>
					</View>
				)
			}
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
