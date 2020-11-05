import React, { useState, useEffect } from 'react'
import { Route, NavLink, BrowserRouter, Redirect, Switch } from "react-router-dom"
import { FixedSizeList as List } from 'react-window'
import My404Component from './My404Component'
import functions from './../services/ApiFunctions'

// in stock as WebGL2RenderingContext, out red. mobile menu

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
		});
	  }

	  window.addEventListener("resize", handleResize)
	  
	  handleResize()
	  
	  return () => window.removeEventListener("resize", handleResize);
	}, [])
  
	return windowSize;
}

const Header = () => {
	return (
		<div>
			<ul className="header">
				<li><NavLink to="/jackets">Jackets</NavLink></li>
				<li><NavLink to="/shirts">Shirts</NavLink></li>
				<li><NavLink to="/accessories">Accessories</NavLink></li>
			</ul>
		</div>
	)
}

const Footer = () => {
	return (
		<div className="footer">
			<h3>Warehouse</h3>
			<p>Stock situation by color:<br />
				<span className="green">In stock</span><br />
				<span className="orange">Less than 10</span><br />
				<span className="red">Out of stock</span><br />
			</p>
		</div>
	)
}

const ProductTable = ({ getFunction }) => {
	const [products, setProducts] = useState([])
	let size = []
	size = useWindowSize();
	
	useEffect(() => {
			getFunction()
			.then(initialProducts => {
				setProducts(initialProducts)
			})
	}, []) // eslint-disable-line react-hooks/exhaustive-deps

	const Row = ({ index, style }) => (
		<div className={index % 2 ? `list-item-odd grid ${products[index].availability.toLowerCase()}` : `list-item-even grid ${products[index].availability.toLowerCase()}`} style={style}>
			<div className="col">{index}</div>
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
				itemSize={size.width > 980 ? 25 : 100}
				width={900}
			>
				{Row}
			</List>
		</>
	)
}

const Jackets = () => {
	return (
	  <div>
		<h1>Jackets</h1>
		<ProductTable getFunction={functions.getJackets} />
	  </div>
	)
}

const Shirts = () => {
	return (
	  <div>
		<h1>Shirts</h1>
		<ProductTable getFunction={functions.getShirts} />
	  </div>
	)
}

const Accessories = () => {
	return (
	  <div>
		<h1>Accessories</h1>
		<ProductTable getFunction={functions.getAccessories} />
	  </div>
	)
}

const Main = () => {
	return (
	<BrowserRouter>
		<div>
			<Header />
			<div className="content">
				<Switch>
					<Route exact path="/" component={Jackets}/>
					<Route path="/jackets" component={Jackets}/>
					<Route path="/shirts" component={Shirts}/>
					<Route path="/accessories" component={Accessories}/>
					<Route path='/404' component={My404Component} />
					<Redirect from='/*' to='/404' />
				</Switch>
			</div>
			<Footer />
		</div>
	</BrowserRouter>
	)
}

export default Main
