class Requests {
	myproxy = "http://192.168.43.244:3000"
	
    getToken(token) {
        fetch(this.myproxy + '/api/v1/users/from_vk_token?token=' + token, {
				method: "GET"
			}).then((data) => {
				return data.json()
			}).then((data) => {
				return(data.token)
			})
    }
}

export default Requests