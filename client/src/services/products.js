import axios from 'axios'
const baseUrl = '/api/'

const functions = {
	getShirts: function() {
		const request = axios.get(baseUrl + 'shirts')
		return request.then(response => response.data)
	},
	getJackets: function() {
		const request = axios.get(baseUrl + 'jackets')
		return request.then(response => response.data)
	},
	getAccessories: function() {
		const request = axios.get(baseUrl + 'accessories')
		return request.then(response => response.data)
	}
}

export default functions
