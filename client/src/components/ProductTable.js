import React, { useState, useEffect } from 'react'
import { FixedSizeList as List } from 'react-window'
import getLocalData from './../services/ApiFunctions'

const useWindowSize = () => {
	const [windowSize, setWindowSize] = useState({
	  width: 500,
	  height: 500,
	})
  
	useEffect(() => {
		function handleResize() {
			setWindowSize({
			width: window.innerWidth,
			height: window.innerHeight,
			})
		}
		window.addEventListener("resize", handleResize)
		handleResize()
		return () => window.removeEventListener("resize", handleResize)
	}, [])

	return windowSize;
}

const ProductTable = ({ data }) => {
	const [products, setProducts] = useState([])
	let size = []
	size = useWindowSize();
	const width = size.width > 980 ? 25 :  size.width > 600 ? 100 : 175
	
	useEffect(() => {
		getLocalData(data)
			.then(productsFromApi => {
				setProducts(productsFromApi)
			})
	}, []) // eslint-disable-line react-hooks/exhaustive-deps

	if (products.length === 0) 
		return ''
	
	const Row = ({ index, style }) => (
		<div className={`${products[index].availability ? products[index].availability.toLowerCase() : ''} ${index % 2 ? 'list-item-odd grid' : 'list-item-even grid'}`} style={style}>
			<div className="col">{index + 1}</div>
			<div className="col">{products[index].id}</div>
			<div className="col">{products[index].name}</div>
			<div className="col">{products[index].color !== undefined && products[index].color.constructor === Array ? products[index].color.join(', ') : products[index].color}</div>
			<div className="col">{products[index].price}</div>
			<div className="col">{products[index].manufacturer}</div>
			<div className="col">{products[index].availability}</div>
		</div>
	)

	return (
		<>
			Showing {products.length} items.
			<div className="biglist">
				<div className="grid grid-header">
					<div className="col">#</div>
					<div className="col">id</div>
					<div className="col">name</div>
					<div className="col">color</div>
					<div className="col">price</div>
					<div className="col">brand</div>
					<div className="col">stock</div>
				</div>
			</div>
			<List
				className="biglist"
				height={size.height < 1000 ? 500 : size.height - 500}
				itemCount={products.length}
				itemData={products}
				itemSize={width}
				width={900}
			>
				{Row}
			</List>
		</>
	)
}

export default ProductTable
