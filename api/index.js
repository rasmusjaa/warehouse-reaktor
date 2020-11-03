const express = require('express')
const app = express()
const cors = require('cors')

app.use(cors())

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

let jackets = [
	{
		id: "f8016f8e3897cbd129ec0fde",
		type: "shirts",
		name: "NYXBE BRIGHT METROPOLIS",
		color: [
			"yellow"
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
		price: 56,
		manufacturer: "abiplos"
	}
]

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

app.get('/', (request, response) => {
	response.send('<h1>Server is running</h1>')
})
  
app.get('/api/shirts', (request, response) => {
	response.json(shirts)
})

app.get('/api/jackets', (request, response) => {
	response.json(jackets)
})

app.get('/api/accessories', (request, response) => {
	response.json(accessories)
})
  
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})
