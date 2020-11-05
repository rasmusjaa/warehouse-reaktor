import axios from 'axios'
const baseUrl = '/api/'

const getLocalData = (data) => {
	const request = axios.get(baseUrl + data)
	return request.then(response => response.data)
}

export default getLocalData
