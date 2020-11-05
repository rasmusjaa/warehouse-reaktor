const express = require('express')
const app = express()
const cors = require('cors')
const fetch = require('node-fetch');

app.use(cors())
app.use(express.static('build'))

const initial = [ { id: "Still fetching data from old API, please refresh" } ]
let jackets = initial
let shirts = initial
let accessories = initial

const apiUrl = 'https://bad-api-assignment.reaktor.com'
const headers = {
	"Content-Type": "application/json"
}

async function fetchManufacturerData(param) {
	console.log('fetching: ' + param);
	const response = await fetch(apiUrl + '/availability/' + param, { method: 'GET', headers: headers })
	if (!response.ok)
		throw new Error(`Trying again because an error has occured: ${response.status}`)
	const data = await response.json()
	if (!data || !data.response || data.response.length < 1 || data.response == '[]')
		throw new Error(`Trying again because an error has occured: empty data`)
	return data.response
}

async function fetchProductData(param) {
	console.log('fetching: ' + param);
	const response = await fetch(apiUrl + '/products/' + param, { method: 'GET', headers: headers })
	if (!response.ok)
		throw new Error(`Trying again because an error has occured: ${response.status}`)
	const data = await response.json()
	if (!data || data.length < 1 || data == '[]')
		throw new Error(`Trying again because an error has occured: empty data`)
	return data
}

async function fetchAllData() {
	let categories = [ 'jackets', 'shirts', 'accessories' ]
	let categoryData = []
	let errors = 0
	for (i = 0; i < categories.length; i++) {
		categoryData[i] =  await fetchProductData(categories[i]).catch(error => {
			errors++
			if (errors > 9) {
				console.log(`${errors} errors in row, trying again in 5 minutes`)
				return
			}
			console.log(`error count ${errors}. ${error.message}`)
			i--
		})
		if (errors > 9)
			return
	}
	errors = 0

	let allManufacturers = []
	let manufacturers = []
	for (i = 0; i < categories.length; i++) {
		allManufacturers[i] = [...new Set(categoryData[i].map(x => x.manufacturer))]
		manufacturers.push(...allManufacturers[i])
	}
	manufacturers = [...new Set(manufacturers)]
	
	let manufacturerData = []
	for (i = 0; i < manufacturers.length; i++) {
		manufacturerData[i] =  await fetchManufacturerData(manufacturers[i]).catch(error => {
			errors++
			if (errors > 9) {
				console.log(`${errors} errors in row, trying again in 5 minutes`)
				return
			}
			console.log(`error count ${errors}. ${error.message}`)
			i--
		})
		if (errors > 9)
			return
	}

	const regex = 'E>(.*)<\/I'
	for (i = 0; i < categoryData.length; i++) {
		console.log('combining ' + manufacturers[i] + ' stocks');
		for (j = 0; j < categoryData[i].length; j++) {
			let manindex = manufacturers.indexOf(categoryData[i][j].manufacturer)
			let stock = manufacturerData[manindex].find(item => item.id === categoryData[i][j].id.toUpperCase())
			categoryData[i][j].availability = stock.DATAPAYLOAD.match(regex)[1]
		}
	}
	jackets = categoryData[0]
	shirts = categoryData[1]
	accessories = categoryData[2]

	console.log('data from old api loaded');
}

fetchAllData()
setInterval(fetchAllData, 300000)

app.get('/api/shirts', (request, response) => {
	response.json(shirts)
})

app.get('/api/jackets', (request, response) => {
	response.json(jackets)
})

app.get('/api/accessories', (request, response) => {
	response.json(accessories)
})

app.get('*', (request, response) => {
	response.sendFile(__dirname + '/build/index.html');
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})
