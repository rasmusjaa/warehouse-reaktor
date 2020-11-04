const express = require('express')
const app = express()
const cors = require('cors')
const fetch = require('node-fetch');

app.use(cors())

app.use(express.static('build'))


let shirts = [
	{
		id: "f8016f8e3897cbd129ec0fde",
		type: "shirts",
		name: "NYXBE BRIGHT METROPOLIS",
		color: [
			"yellow",
			"pink"
		],
		price: 44,
		manufacturer: "derp"
	},
	{
		id: "a9262d3e27a19f6b9de",
		type: "shirts",
		name: "HUNKOX RAIN",
		color: [
			"black"
		],
		manufacturer: "abiplos"
	},
	{
		id: "1358bf45194ae55f4a251b",
		type: "shirts",
		name: "REPBE LIGHT",
		color: [
			"green"
		],
		price: 21,
		manufacturer: "nouke"
	}
]

const initial = [ { id: "Still fetching data from old API, please refresh" } ]

let jackets = initial

let accessories = [
	{
		id: "f8016f8e3897cbd129ec0fde",
		type: "shirts",
		name: "NYXBE BRIGHT METROPOLIS",
		color: [
			"yellow"
		],
		price: 44,
		manufacturer: "derp"
	}
]

const apiUrl = 'https://bad-api-assignment.reaktor.com'
const headers = {
//	"x-force-error-mode": "all",
	"Content-Type": "application/json"
}

async function fetchManufacturerData(param) {
	console.log('fetching: ' + param);
	const response = await fetch(apiUrl + param, { method: 'GET', headers: headers })
	if (!response.ok)
	throw new Error(`An error has occured: ${response.status}`)
	const data = await response.json()
	if (!data || !data.response || data.response.length < 1 || data.response == '[]')
	throw new Error(`An error has occured: empty data`)
	return data.response
}

async function fetchProductData(param) {
	console.log('fetching: ' + param);
	const response = await fetch(apiUrl + param, { method: 'GET', headers: headers })
	if (!response.ok)
	throw new Error(`An error has occured: ${response.status}`)
	const data = await response.json()
	if (!data || data.length < 1 || data == '[]')
	throw new Error(`An error has occured: empty data`)
	return data
}


let newJackets
let newShirts
let newAccessories
async function fetchAllData() {
	newJackets = await fetchProductData('/products/jackets').catch(error => console.log(error.message))
	newShirts = await fetchProductData('/products/shirts').catch(error => console.log(error.message))
	newAccessories = await fetchProductData('/products/accessories').catch(error => console.log(error.message))
	if (newJackets && newShirts && newAccessories ) {
		const jacketManufacturers = [...new Set(newJackets.map(x => x.manufacturer))]
		const shirtManufacturers = [...new Set(newShirts.map(x => x.manufacturer))]
		const accessoryManufacturers = [...new Set(newAccessories.map(x => x.manufacturer))]
		const manufacturers = [...new Set([...jacketManufacturers, ...shirtManufacturers, ...accessoryManufacturers])]
		console.log(manufacturers);
		jackets = newJackets
		shirts = newShirts
		accessories = newAccessories
	}
}

fetchAllData()
setInterval(fetchAllData, 300000)

app.get('/', (request, response) => {
	response.send('<h1>Server is running</h1>')
})
  
app.get('/api/shirts', (request, response) => {
	response.json(shirts)
})

app.get('/api/jackets', (request, response) => {
	console.log('testing');
	response.json(jackets)
})

app.get('/api/accessories', (request, response) => {
	response.json(accessories)
})
  
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})
